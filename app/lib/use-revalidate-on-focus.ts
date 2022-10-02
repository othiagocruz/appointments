import { useEffect } from "react";
import { useRevalidate } from "./use-revalidate";

interface Options {
  enabled?: boolean;
}

export function useRevalidateOnFocus({ enabled = false }: Options) {
  let revalidate = useRevalidate();

  useEffect(
    function revalidateOnFocus() {
      if (!enabled) return;
      function onFocus() {
        revalidate();
      }
      window.addEventListener("focus", onFocus);
      return () => window.removeEventListener("focus", onFocus);
    },
    [revalidate, enabled]
  );

  useEffect(
    function revalidateOnVisibilityChange() {
      if (!enabled) return;
      function onVisibilityChange() {
        revalidate();
      }
      window.addEventListener("visibilitychange", onVisibilityChange);
      return () =>
        window.removeEventListener("visibilitychange", onVisibilityChange);
    },
    [revalidate, enabled]
  );
}
