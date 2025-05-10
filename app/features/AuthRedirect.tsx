import { useEffect } from "react";
import { useNavigate } from "react-router";
import UserRequest from "../api/pathbook/requests/auth/UserRequest";

interface AuthRedirectProps {
  children: ReactNode;
  redirectPath?: string;
  onNotAuthenticated?: () => void;
}

export function AuthRedirect({
  children,
  redirectPath = "/main",
  onNotAuthenticated,
}: AuthRedirectProps) {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const request = new UserRequest();

      try {
        const user = await request.send();
        if (isMounted) {
          navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        if (isMounted) {
          onNotAuthenticated?.();
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate, redirectPath, onNotAuthenticated]);

  return <>{children}</>;
}
