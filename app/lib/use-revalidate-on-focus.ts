import { useEffect } from "react";
import { useRevalidate } from "./use-revalidate";

interface Options {
  enabled?: boolean;
}
// Added this because I wasnt sure if the useEffect initially implemented
// was supposed to synchronize the data of the list, this works better for that purpose.
// Got the code online but this idea was initially conceptualized by SWR
// It fires an update on the interface whenever the user interacts with the window, although
// SWR implementation does with more features like decoupling and component focus update
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
