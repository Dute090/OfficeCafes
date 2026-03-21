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
    <button onClick={onClick} title={isSaved ? "Remove from saved" : "Save café"}
      style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", fontSize: 16, color: isSaved ? "#C8956C" : "#B0A498", lineHeight: 1 }}>
      {isSaved ? "♥" : "♡"}
    </button>
  );
}

function TagChip({ label, positive }: { label: string; positive?: boolean }) {
  const isUnknown = label.includes("unknown");
  const bg = isUnknown ? "#F5F2EE" : positive === false ? "#FFF5F5" : "#F0FAF4";
  const color = isUnknown ? "#A09488" : positive === false ? "#C05A4A" : "#3A7A52";
  const border = isUnknown ? "none" : positive === false ? "1px solid #FADADD" : "1px solid #C3E6CC";
  return (
    <span style={{ fontSize: 11.5, fontWeight: 500, borderRadius: 7, padding: "5px 8px", background: bg, color, border, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

export default function CafeCard({ cafe, isPro, isLoggedIn, isSaved, onProRequired, onLoginRequired, onToggleSave }: CafeCardProps) {
  const [expanded, setExpanded] = useState(false);

  // New API returns tags/previewTags; fallback to old freeTags/proTags
  const allTags: { icon?: string; label: string }[] = (cafe as any).tags || [
    ...cafe.freeTags,
    ...(isPro ? cafe.proTags : []),
  ];
  const previewTags: { icon?: string; label: string }[] = (cafe as any).previewTags || cafe.freeTags.slice(0, 3);

  const shownTags = (isLoggedIn && expanded) ? allTags : previewTags;
  const canExpand = isLoggedIn && allTags.length > previewTags.length;

  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "15px 16px", marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: "1px solid #EDE9E3" }}>

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 13, marginBottom: 11 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F0EDE8", color: "#5C4F44", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
          {getInitials(cafe.name)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <p style={{ fontWeight: 600, fontSize: 15, color: "#1C1C1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
              {cafe.name}
            </p>
            <SaveBtn isSaved={!!isSaved} onClick={e => {
              e.stopPropagation();
              if (!isLoggedIn) { onLoginRequired?.(); return; }
              if (!isPro) { onProRequired?.(); return; }
              onToggleSave?.(cafe.id);
            }} />
            <ShareBtn cafe={cafe} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: cafe.isOpen ? "#5A9E6F" : "#C0917A" }} />
            <span style={{ fontSize: 12.5, fontWeight: 500, color: cafe.isOpen ? "#5A9E6F" : "#C0917A" }}>{cafe.isOpen ? "Open" : "Closed"}</span>
            <span style={{ fontSize: 12.5, color: "#7A6E65" }}>· {cafe.hours}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {cafe.rating && <>
              <span style={{ fontSize: 12, color: "#C8956C" }}>★</span>
              <span style={{ fontSize: 13, color: "#4A3F36", fontWeight: 500 }}>{cafe.rating}</span>
              <span style={{ color: "#DDD8D2", fontSize: 10 }}>|</span>
            </>}
            <span style={{ fontSize: 12.5, color: "#7A6E65" }}>{cafe.distance} away</span>
          </div>
        </div>

        <button onClick={e => { e.stopPropagation(); window.open(`https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}`, "_blank"); }}
          style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 3, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
          <span style={{ fontSize: 13, color: "#C8956C", fontWeight: 500 }}>→ Maps</span>
          <span style={{ fontSize: 10.5, color: "#B0A498", maxWidth: 72, textAlign: "right", lineHeight: 1.3 }}>
            {cafe.address.split(",")[0]}
          </span>
        </button>
      </div>

      {/* Tag strip */}
      {isLoggedIn ? (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: canExpand ? 6 : 0 }}>
            {shownTags.map((tag, i) => {
              const rule = (tag as any).positive;
              return <TagChip key={i} label={tag.label} positive={rule} />;
            })}
          </div>
          {canExpand && (
            <button onClick={() => setExpanded(e => !e)}
              style={{ background: "none", border: "none", fontSize: 11.5, color: "#C8956C", cursor: "pointer", padding: 0, fontWeight: 500 }}>
              {expanded ? "Show less ↑" : `+${allTags.length - previewTags.length} more tags ↓`}
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", gap: 5 }}>
          {previewTags.slice(0, 2).map((tag, i) => <TagChip key={i} label={tag.label} />)}
          <button onClick={e => { e.stopPropagation(); onLoginRequired?.(); }}
            style={{ fontSize: 11.5, fontWeight: 500, borderRadius: 7, padding: "5px 8px", background: "#FEF3E8", border: "1px solid #F5DFC0", color: "#C8956C", cursor: "pointer", whiteSpace: "nowrap" }}>
            Sign in to see more
          </button>
        </div>
      )}
    </div>
  );
}
