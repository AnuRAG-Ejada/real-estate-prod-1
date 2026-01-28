import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

// Tell Next this route must not be statically generated/prerendered.
// Keep these on the server page (not a client component).
export const dynamic = "force-dynamic"; // or: export const dynamic = "error"; (if you want SSR only)
export const revalidate = 0;

export default function CallbackPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Processing login...</div>}>
      <CallbackClient />
    </Suspense>
  );
}