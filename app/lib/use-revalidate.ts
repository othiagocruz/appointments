import { useLocation, useNavigate } from "@remix-run/react";
import { useCallback } from "react";

export function useRevalidate() {
  let navigate = useNavigate();
  let location = useLocation();
  return useCallback(
    function revalidate() {
      navigate("." + location.search, { replace: true });
    },
    [navigate, location]
  );
}
