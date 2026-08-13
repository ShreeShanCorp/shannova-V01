import { useAuth } from "@clerk/clerk-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSocket } from "@/lib/socket-client";

/** Mount once per page that shows upcoming classes. Refetches the upcoming-classes query
 * the moment the server emits the 5-minutes-before reminder, so the countdown/join UI
 * reflects it immediately instead of waiting for the next poll. */
export function useClassStartingSoon() {
  const { getToken, isSignedIn } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isSignedIn) return;

    const socket = getSocket(getToken);
    const onStartingSoon = () => {
      void queryClient.invalidateQueries({ queryKey: ["classes", "upcoming"] });
    };

    socket.on("class:starting_soon", onStartingSoon);
    return () => {
      socket.off("class:starting_soon", onStartingSoon);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);
}
