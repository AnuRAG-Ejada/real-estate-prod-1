"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;
    console.log("Cognito code:", code);

    // Optionally redirect after processing:
    // router.push("/dashboard");
  }, [code]);

  return (
    <div style={{ padding: 40, fontSize: 20 }}>
      Processing login...
    </div>
  );
}