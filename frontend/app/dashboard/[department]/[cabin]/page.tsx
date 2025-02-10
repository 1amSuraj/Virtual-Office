"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function CabinPage() {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [socket, setSocket] = useState(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (screenShareRef.current) {
        screenShareRef.current.srcObject = stream;
      }
      setIsScreenSharing(true);

      // Send stream to the boss via socket
      socket?.emit("start-screen-share", stream.id);
    } catch (error) {
      console.error("Screen share failed:", error);
    }
  };

  const stopScreenShare = () => {
    if (screenShareRef.current?.srcObject) {
      const tracks = (screenShareRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsScreenSharing(false);
    socket?.emit("stop-screen-share"); // Notify others
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-white p-6">
      <div className="flex items-center gap-2">
        <span className={`w-4 h-4 rounded-full ${isScreenSharing ? "bg-green-500" : "bg-red-500"}`} />
        <span>{isScreenSharing ? "Active" : "Inactive"}</span>
      </div>

      <div className="mt-6">
        <video ref={screenShareRef} autoPlay className="w-full max-w-3xl border-2 border-purple-500 rounded-lg" />
      </div>

      <div className="mt-4">
        {isScreenSharing ? (
          <button onClick={stopScreenShare} className="px-6 py-2 bg-red-600 rounded-lg">Stop Sharing</button>
        ) : (
          <button onClick={startScreenShare} className="px-6 py-2 bg-purple-700 rounded-lg">Start Sharing</button>
        )}
      </div>
    </div>
  );
}
