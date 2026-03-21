"use client";

import { useState } from "react";
import { Cafe } from "@/lib/data";

interface CafeCardProps {
  cafe: Cafe;
  isPro: boolean;
  isLoggedIn?: boolean;
  isSaved?: boolean;
  onProRequired?: () => void;
  onLoginRequired?: () => void;
  onToggleSave?: (id: string) => void;
}

function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function ShareBtn({ cafe }: { cafe: Cafe }) {
  const [copied, setCopied] = useState(false);
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}`;
    const text = `☕ ${cafe.name} — great spot to work from`;
    if (navigator.share) {
      await navigator.share({ title: cafe.name, text, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button onClick={handleShare} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", fontSize: 13, color: "#B0A498", lineHeight: 1 }}>
      {copied ? "✓" : "↗"}
    </button>
  );
}

function SaveBtn({ isSaved, onClick }: { isSaved: boolean; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      title={isSaved ? "Remove from saved" : "Save café"}
      style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", fontSize: 16, color: isSaved ? "#C8956C" : "#B0A498", lineHeight: 1 }}
    >
      {isSaved ? "♥" : "♡"}
    </button>
  );
}

export default function CafeCard({ cafe, isPro, isLoggedIn, isSaved, onProRequired, onLoginRequired, onToggleSave }: CafeCardProps) {
  const allTags = [
    ...cafe.freeTags.slice(0, 3),
    ...(isPro ? cafe.proTags.slice(0, 3) : []),
  ];

  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "15px 16px", marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: "1px solid #EDE9E3" }}>

      {/* Top row: avatar + info + nav */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 13, marginBottom: 11 }}>

        {/* Avatar */}
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F0EDE8", color: "#5C4F44", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
          {getInitials(cafe.name)}
        </div>

        {/* Middle: name / status / rating */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <p style={{ fontWeight: 600, fontSize: 15, color: "#1C1C1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
              {cafe.name}
            </p>
            <SaveBtn
              isSaved={!!isSaved}
              onClick={e => {
                e.stopPropagation();
                if (!isLoggedIn) { onLoginRequired?.(); return; }
                if (!isPro) { onProRequired?.(); return; }
                onToggleSave?.(cafe.id);
              }}
            />
            <ShareBtn cafe={cafe} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: cafe.isOpen ? "#5A9E6F" : "#C0917A" }} />
            <span style={{ fontSize: 12.5, fontWeight: 500, color: cafe.isOpen ? "#5A9E6F" : "#C0917A" }}>{cafe.isOpen ? "Open" : "Closed"}</span>
            <span style={{ fontSize: 12.5, color: "#7A6E65" }}>· {cafe.hours}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, color: "#C8956C" }}>★</span>
            <span style={{ fontSize: 13, color: "#4A3F36", fontWeight: 500 }}>{cafe.rating}</span>
            <span style={{ color: "#DDD8D2", fontSize: 10 }}>|</span>
            <span style={{ fontSize: 12.5, color: "#7A6E65" }}>{cafe.distance} away</span>
          </div>
        </div>

        {/* Nav button */}
        <button
          onClick={e => { e.stopPropagation(); window.open(`https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}`, "_blank"); }}
          style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 3, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}
        >
          <span style={{ fontSize: 13, color: "#C8956C", fontWeight: 500 }}>→ Maps</span>
          <span style={{ fontSize: 10.5, color: "#B0A498", maxWidth: 72, textAlign: "right", lineHeight: 1.3 }}>
            {cafe.address.split(",")[0]}
          </span>
        </button>
      </div>

      {/* Tag strip — full card width, 2 rows max */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {allTags.map((tag, i) => (
          <span key={i} style={{
            flex: "1 1 calc(33% - 5px)", textAlign: "center",
            background: i < cafe.freeTags.length ? "#F5F2EE" : "#FEF3E8",
            color: i < cafe.freeTags.length ? "#5C4F44" : "#C8956C",
            border: i < cafe.freeTags.length ? "none" : "1px solid #F5DFC0",
            fontSize: 11.5, fontWeight: 500, borderRadius: 7, padding: "5px 6px",
          }}>
            {tag.label}
          </span>
        ))}
        {!isPro && (
          <button
            onClick={e => { e.stopPropagation(); onProRequired?.(); }}
            style={{
              flex: "1 1 calc(33% - 5px)", textAlign: "center",
              background: "#FEF3E8", border: "1px solid #F5DFC0",
              borderRadius: 7, padding: "5px 6px",
              fontSize: 11.5, fontWeight: 500, color: "#C8956C", cursor: "pointer",
            }}
          >
            WiFi & more 🔒
          </button>
        )}
      </div>
    </div>
  );
}
