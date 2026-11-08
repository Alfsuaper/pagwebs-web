"use client";

import { useState, useEffect } from "react";

export interface TelemetryData {
  latency: number;
  uptime: string;
  status: "ONLINE" | "OPTIMAL" | "STANDBY";
  activeNodes: number;
}

export function useTelemetry(): TelemetryData {
  const [data, setData] = useState<TelemetryData>({
    latency: 18,
    uptime: "99.98%",
    status: "ONLINE",
    activeNodes: 12,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        latency: Math.floor(15 + Math.random() * 8),
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return data;
}
