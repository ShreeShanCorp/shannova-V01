import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

/** Mount once per page that shows upcoming classes. Refetches the upcoming-classes query
 * the moment the server emits the 5-minutes-before reminder, so the countdown/join UI
 * reflects it immediately instead of waiting for the next poll. */
export function useClassStartingSoon() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("shannova_token") || localStorage.getItem("kickstart_token");
    if (!token) return;

    const socket = getSocket(async () => token);
    const onStartingSoon = () => {
      void queryClient.invalidateQueries({ queryKey: ["classes", "upcoming"] });
    };

    socket.on("class:starting_soon", onStartingSoon);
    return () => {
      socket.off("class:starting_soon", onStartingSoon);
    };
  }, [queryClient]);
}
