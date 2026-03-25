"use client";



interface PlanFeature {
  label: string;
  free: boolean;
  pro: boolean;
}

const FEATURES: PlanFeature[] = [
  { label: "Nearby cafés list", free: true, pro: true },
  { label: "Office-friendly tags (icons)", free: true, pro: true },
  { label: "Google Maps navigation", free: true, pro: true },
  { label: "Basic search", free: true, pro: true },
  { label: "Full tag details", free: false, pro: true },
  { label: "Save favorite spots", free: false, pro: true },
  { label: "Citywide brand search", free: false, pro: true },
  { label: "Saved locations", free: false, pro: true },
];

function ProModal({ onClose, onUpgrade }: { onClose: () => void; onUpgrade: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          width: "100%",
          maxWidth: 430,
          padding: "24px 20px 40px",
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: 36,
            height: 4,
            background: "#E5E7EB",
            borderRadius: 2,
            margin: "0 auto 20px",
          }}
        />

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
          OfficeCafes Pro
        </h2>
        <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>
          Find your perfect workspace, every day.
        </p>

        {/* Feature comparison */}
        <div
          style={{
            border: "1px solid #E5E7EB",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 60px 60px",
              background: "#F9FAFB",
              padding: "10px 16px",
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280" }}>Feature</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textAlign: "center" }}>Free</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#2563EB", textAlign: "center" }}>Pro</span>
          </div>

          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 60px 60px",
                padding: "11px 16px",
                borderBottom: i < FEATURES.length - 1 ? "1px solid #F3F4F6" : "none",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: "#374151" }}>{f.label}</span>
              <span style={{ textAlign: "center", fontSize: 14 }}>
                {f.free ? "✓" : <span style={{ color: "#D1D5DB" }}>—</span>}
              </span>
              <span style={{ textAlign: "center", fontSize: 14, color: "#2563EB", fontWeight: 600 }}>
                {f.pro ? "✓" : "—"}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onUpgrade}
          style={{
            width: "100%",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: 16,
            padding: "16px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          Start Pro — $2.99/month
        </button>
        <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF" }}>
          Cancel anytime · Secure payment via PayPal
        </p>
      </div>
    </div>
  );
}

export { ProModal, FEATURES };
