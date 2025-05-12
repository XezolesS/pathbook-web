export function parseCookies(cookie: string): Map<string, string> {
  const map = new Map<string, string>();

  if (!cookie) {
    return map;
  }

  cookie.split(";").forEach((c) => {
    const [key, value] = c.trim().split("=");
    if (key && value !== undefined) {
      map.set(key.trim(), value.trim());
    }
  });

  return map;
}
