"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CallbackClient() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;

    console.log("Cognito authorization code:", code);

    // TODO: Exchange code -> tokens (see options below), then navigate:
    // router.push("/dashboard");
  }, [code, router]);

  return (
    <div style={{ padding: 24 }}>
      Processing login... {code ? <span>(code received)</span> : <span>(waiting for code)</span>}
    </div>
  );
}