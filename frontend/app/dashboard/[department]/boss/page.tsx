"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function BossMonitor() {
  const [isScreenActive, setIsScreenActive] = useState(false);
  const [socket, setSocket] = useState(null);
  const screenViewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // Listen for screen share start/stop events
    newSocket.on("screen-share-started", (streamId) => {
      setIsScreenActive(true);
      watchScreen(streamId);
    });

    newSocket.on("screen-share-stopped", () => {
      setIsScreenActive(false);
      if (screenViewRef.current?.srcObject) {
        const tracks = (screenViewRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    });

    return () => newSocket.disconnect();
  }, []);

  const watchScreen = async (streamId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: streamId ? { exact: streamId } : undefined }
      });
      if (screenViewRef.current) {
        screenViewRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Failed to get screen share stream:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold">Boss Monitoring</h1>
      <div className="flex items-center gap-2 mt-2">
        <span className={`w-4 h-4 rounded-full ${isScreenActive ? "bg-green-500" : "bg-red-500"}`} />
        <span>{isScreenActive ? "Employee Active" : "No Active Screen Sharing"}</span>
      </div>

      {isScreenActive && (
        <div className="mt-6">
          <video ref={screenViewRef} autoPlay className="w-full max-w-3xl border-2 border-purple-500 rounded-lg" />
        </div>
      )}
    </div>
  );
}
