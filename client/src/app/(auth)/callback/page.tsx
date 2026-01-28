"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// 🚫 Tell Next.js this page must NOT be prerendered (SSG/SSR)
// It should render purely on the client at runtime.
export const dynamic = "force-dynamic";
export const revalidate = 0;
// If you have a default export of metadata, ensure no static-only APIs are used.

// Wrap the hook in a child component so Suspense can be applied cleanly.
function CallbackInner() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");

  // TODO: Implement your code-exchange logic here:
  // 1) Send `code` to your backend endpoint to exchange for tokens.
  // 2) Store tokens in cookie/localStorage/state.
  // 3) Redirect the user to the app (e.g., dashboard).

  if (!code) {
    // Optionally handle missing code (e.g., show error or redirect home)
    return <div style={{ padding: 24 }}>Missing authorization code.</div>;
  }

  // Example placeholder: you can replace with real exchange logic.
  // router.push("/dashboard"); // Uncomment after you implement token exchange.

  return (
    <div style={{ padding: 24 }}>
      Processing login... (code: <code>{code}</code>)
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Processing login...</div>}>
      <CallbackInner />
    </Suspense>
  );
}
