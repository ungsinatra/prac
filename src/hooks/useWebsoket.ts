import { useEffect, useRef } from 'react';

export const useWebSocket = (url: string, onMessage: (data: any) => void, deps: any[]) => {
    const ws = useRef<WebSocket>();
  
    useEffect(() => {
      // Set up the WebSocket connection when the hook is first used
      ws.current = new WebSocket(url);
  
      // Define the message handler for incoming messages
      const handleMessage = (event: MessageEvent) => {
        onMessage(JSON.parse(event.data));
      };
      ws.current.addEventListener('message', handleMessage);
  
      // Clean up the WebSocket connection when the hook is no longer used
      return () => {
        ws.current?.removeEventListener('message', handleMessage);
        ws.current?.close();
      };
    }, deps);
  
    // Return a function to send messages through the WebSocket connection
    const sendMessage = (data: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) { // type guard to ensure ws.current is defined
          ws.current.send(JSON.stringify(data));
        } else {
          console.error('WebSocket connection not open');
        }
      };
    return sendMessage;
  };