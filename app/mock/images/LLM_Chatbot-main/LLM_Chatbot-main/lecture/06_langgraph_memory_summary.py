#Trimming
# - 불필요하거나 오래된 정보를 제거하여 입력 토큰 수를 줄이는 과정
# Summary
# - 긴 내용을 짧게 재구성하여 핵심 정보만 남기는 과정

# -> Multi-turn
# - AI Assistant와 Human의 대화기록을 Memory에 저장하고
# - 다음 질문 때 "대화기록 + 질문"을 전달해서 답변을 생성
# - 대화기록(30건) + 질문(1) => 31 전달 => 답변을생성 [시간과 자원 낭비]
# * 요약(Summary)
# 1) 대화기록(30건) =>summary(1건) + 질문(1) => 답변을생성

# Threshold(임계값) = 10
#
# 누적요약:
# 13번째 대화 => 요약(1~10) + 대화기록(11,12) + 질문(13)
# 25번째째 대화 => 요약(1~2010) + 대화기록(21,22, 23, 24) + 질문(25)

# 대화기록을 저장하는 방법
# 1. .txt 파일로 저장(append())
# 2. NoSQL(document) ex) MongoDB
# 3. RDBMS(채팅: UUID, TimeStamp: 대화시간 -> 채팅ID와 TimeStamp로 Index 설정)

import uuid
import os
from typing import Annotated
from langchain_openai import ChatOpenAI
from typing_extensions import TypedDict
from langchain_core.messages import HumanMessage, SystemMessage, RemoveMessage, AIMessage
from langgraph.graph.message import add_messages
from langchain_core.runnables import RunnableConfig
from langgraph.graph import START, END, StateGraph
from dotenv import load_dotenv, find_dotenv
from langgraph.checkpoint.memory import MemorySaver
_ = load_dotenv(find_dotenv())
        
llm = ChatOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    model = "gpt-4o-mini",
    temperature=0,
)
memory = MemorySaver()

class State(TypedDict):
    query: str                                  # 최신 Human Query
    messages: Annotated[list, add_messages]     # 대화 기록
    summary: str                                # 대화 기록 요약

# 답변 생성 노드
def ask_llm(state: State):
    # 최신 Human query
    human = HumanMessage(content=state["query"])
    # 요약 가져오기, 없으면 ""
    summary = state.get("summary","")
    if summary:
        system_message = f"Summary of conversation earlier: {summary}"
        #대화 13  =     요약(1~10)                            대화기록(11,12)        질문(13)
        messages = [SystemMessage(content=system_message)] + state["messages"] + [human]
    else:
        messages = state["messages"] + [human]
    # 답변 생성성
    response = llm.invoke(messages)
    return{
        "query": state["query"],        # 현재 질문
        "messages": [human, response]   # 이전 기록 유지한채로, 이번 대화(질문, 답변) 추가
    }
    # state["messages"] -> 11, 12, 13, 14
    
# Threshold(임계값)을 확인하고 요약을 할지 결정하는 노드
def should_continue(state: State):
    messages = state["messages"]
    if len(messages) > 4:
        return "summarize_conversation"
    return END
    
def summarize_conversation(state: State):
    messages = state["messages"]
    pairs = []
    for i in range(0, len(messages), 2):
        q = messages[i]
        a = messages[i+1] if i+1 < len(messages) else None
        if isinstance(q, HumanMessage) and isinstance(a, AIMessage):
            pairs.append((q.content, a.content))
    prompt_lines = []
    for idx, (q_text, a_text) in enumerate(pairs, start=1):
        prompt_lines.append(f"질문{idx}: {q_text}")
        prompt_lines.append(f"답변변{idx}: {a_text}")
    prompt_body = "\n".join(prompt_lines)
    instruction = (

        "\n\n위 대화에서 질문은 그대로 두고, "

        "각 질문에 대응하는 ‘답변’만 한두 문장으로 요약하여 "

        "아래 형식으로 작성해주세요:\n\n"

        "질문: …\n"

        "답변: …\n"

        "질문: …\n"

        "답변: …\n"

        "…"

    )
    full_prompt = prompt_body + instruction
    old_summary = state.get("summary", "").strip()
    # 3) 요약 요청
    response = llm.invoke([HumanMessage(content=full_prompt)])
    new_summary = response.content.strip()
    # 4) 원래 메시지 전부 삭제(RemoveMessage) → 요약만 남김
    delete_messages = [RemoveMessage(id=m.id) for m in messages]
    if old_summary:
        combined_summary = f"{old_summary}\n\n{new_summary}"
    else:
        combined_summary = new_summary
    return {
        "summary": combined_summary,
        "messages": delete_messages
    }

def build_graph(checkpointer):
    workflow = StateGraph(state_schema=State)
    workflow.add_node("conversation", ask_llm)
    workflow.add_node(summarize_conversation)
    workflow.add_edge(START, "conversation")
    workflow.add_conditional_edges(
        "conversation",
        should_continue
    )
    workflow.add_edge("summarize_conversation", END)
    return workflow.compile(checkpointer=checkpointer)

thread_id = uuid.uuid4()
config = RunnableConfig(
    recursion_limit=10,  
    configurable={"thread_id": thread_id}  
)

def print_update(update):
    for k, v in update.items():
        for m in v["messages"]:
            m.pretty_print()
        if "summary" in v:
            print(v["summary"])

while True:
    query = input("Prompt: ").strip()
    if query == "exit":
        break
    human_msg = HumanMessage(content=query)
    graph = build_graph(memory)
    for event in graph.stream({"query": query}, config=config, stream_mode="updates"):
        print_update(event)