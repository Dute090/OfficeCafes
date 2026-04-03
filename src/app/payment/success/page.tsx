"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const runtime = "edge";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const orderId = searchParams.get("token"); // PayPal passes order id as ?token=
    if (!orderId) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setStatus("error");
      return;
    }

    fetch("https://perch-api.ygtc090.workers.dev/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    })
      .then(r => r.json())
      .then((d: { success: boolean }) => {
        setStatus(d.success ? "success" : "error");
        if (d.success) {
          setTimeout(() => router.replace("/"), 3000);
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams, router]);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        {status === "loading" && (
          <>
            <p style={{ fontSize: 40, marginBottom: 16 }}>⏳</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1C1C1A" }}>Confirming your payment…</p>
          </>
        )}
        {status === "success" && (
          <>
            <p style={{ fontSize: 40, marginBottom: 16 }}>🎉</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#1C1C1A", marginBottom: 8 }}>You&apos;re now a Perch Pro!</p>
            <p style={{ fontSize: 14, color: "#7A6E65" }}>Redirecting you back…</p>
          </>
        )}
        {status === "error" && (
          <>
            <p style={{ fontSize: 40, marginBottom: 16 }}>❌</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1C1C1A", marginBottom: 8 }}>Something went wrong</p>
            <p style={{ fontSize: 14, color: "#7A6E65", marginBottom: 20 }}>Please contact support if your payment was charged.</p>
            <button onClick={() => router.replace("/")} style={{ background: "#C8956C", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
