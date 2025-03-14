import { useEffect, useState } from "react";

const socketBaseUrl = "ws://127.0.0.1:8000/ws/notifications/";

export function useNotifyWebSocket(accessToken) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    const socketUrl = `${socketBaseUrl}?token=${accessToken}`;
    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => console.log("WebSocket Connected");
    newSocket.onclose = (event) =>
      console.log("WebSocket Closed:", event.code, event.reason);
    newSocket.onerror = (error) => console.error("WebSocket Error:", error);

    setSocket(newSocket);

    return () => newSocket.close();
  }, [accessToken]);

  return socket;
}

