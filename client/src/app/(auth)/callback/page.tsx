import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

// Prevent static pre-rendering for OAuth callback pages.
// Keep these *in the server page*, not in a client component.
export const dynamic = "force-dynamic"; // render on demand at runtime
export const revalidate = 0;            // no ISR for this page

export default function CallbackPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Processing login…</div>}>
      <CallbackClient />
    </Suspense>
  );
}