"use client";

import { useRouter } from "next/navigation";

export const runtime = "edge";

export default function PaymentCancel() {
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <p style={{ fontSize: 40, marginBottom: 16 }}>↩️</p>
        <p style={{ fontSize: 18, fontWeight: 700, color: "#1C1C1A", marginBottom: 8 }}>Payment cancelled</p>
        <p style={{ fontSize: 14, color: "#7A6E65", marginBottom: 20 }}>No charge was made. You can upgrade anytime.</p>
        <button onClick={() => router.replace("/")} style={{ background: "#C8956C", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
