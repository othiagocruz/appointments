import { useNavigate } from "@remix-run/react";
import { useCallback } from "react";

export function useRevalidate() {
  let navigate = useNavigate();
  return useCallback(
    function revalidate() {
      navigate(".", { replace: true });
    },
    [navigate]
  );
}
