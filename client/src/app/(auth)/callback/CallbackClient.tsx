"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CallbackClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const code = params.get("code");

  useEffect(() => {
    if (!code) return;

    const exchangeOnBackend = async () => {
      try {
        const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/callback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            code,
            redirect_uri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI,
            client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
          }),
        });
        if (!resp.ok) throw new Error(await resp.text());
        router.replace("/dashboard"); // change if needed
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Login failed");
      }
    };

    exchangeOnBackend();

    // --- For demo-only (no backend), you can try frontend exchange:
    // const tokenUrl = `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`;
    // const form = new URLSearchParams({
    //   grant_type: "authorization_code",
    //   client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
    //   code,
    //   redirect_uri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!,
    // });
    // fetch(tokenUrl, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form.toString() })
    //   .then(async (r) => {
    //     if (!r.ok) throw new Error(await r.text());
    //     const t = await r.json();
    //     console.log("Tokens:", t);
    //     router.replace("/dashboard");
    //   })
    //   .catch((err) => setError(err.message));
  }, [code, router]);

  if (!code) return <div style={{ padding: 24 }}>Missing authorization code.</div>;
  if (error) return <div style={{ padding: 24, color: "crimson" }}>Login failed: {error}</div>;

  return <div style={{ padding: 24 }}>Signing you in…</div>;
}