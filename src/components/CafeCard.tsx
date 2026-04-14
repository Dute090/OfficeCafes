"use client";

import { useState } from "react";
import { Cafe } from "@/lib/data";

interface CafeCardProps {
  cafe: Cafe;
  isPro: boolean;
  isLoggedIn?: boolean;
  isSaved?: boolean;
  tagLimit?: number; // max visible tags before locking (free users)
  onProRequired?: () => void;
  onLoginRequired?: () => void;
  onToggleSave?: () => void;
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

function TagChip({ label, locked, onLocked }: { label: string; locked?: boolean; onLocked?: () => void }) {
  if (locked) {
    return (
      <button onClick={e => { e.stopPropagation(); onLocked?.(); }}
        style={{ fontSize: 11.5, fontWeight: 500, borderRadius: 7, padding: "5px 8px", background: "#F5F2EE", color: "#B0A498", border: "1px solid #E0DBD5", whiteSpace: "nowrap", cursor: "pointer", filter: "blur(3px)", userSelect: "none" }}>
        {label}
      </button>
    );
  }
  return (
    <span style={{ fontSize: 11.5, fontWeight: 500, borderRadius: 7, padding: "5px 8px", background: "#F0FAF4", color: "#3A7A52", border: "1px solid #C3E6CC", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

export default function CafeCard({ cafe, isPro, isLoggedIn, isSaved, tagLimit, onProRequired, onLoginRequired, onToggleSave }: CafeCardProps) {
  const allTags: { label: string }[] = (cafe as unknown as { tags?: { label: string }[] }).tags || (isPro
    ? [...cafe.freeTags, ...cafe.proTags]
    : cafe.freeTags);

  const visibleTags = (isLoggedIn && !isPro && tagLimit != null)
    ? allTags.slice(0, tagLimit)
    : allTags;
  const lockedTags = (isLoggedIn && !isPro && tagLimit != null)
    ? allTags.slice(tagLimit)
    : [];

  const hasTags = allTags.length > 0;

  return (
    <div style={{ background: "#fff", borderRadius: 16, marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: "1px solid #EDE9E3", overflow: "hidden" }}>
      <div style={{ padding: "13px 16px 14px" }}>
        {/* Top row: avatar + info + nav */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 13, marginBottom: hasTags && isLoggedIn ? 10 : 0 }}>

          {/* Avatar */}
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
                onToggleSave?.();
              }} />
              <ShareBtn cafe={cafe} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
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
              <span style={{ fontSize: 12.5, color: "#7A6E65" }}>{cafe.address.split(",")[0]}</span>
              <span style={{ color: "#DDD8D2", fontSize: 10 }}>|</span>
              <span style={{ fontSize: 12.5, color: "#7A6E65" }}>{cafe.distance}</span>
            </div>
          </div>

          <button onClick={e => { e.stopPropagation(); window.open(`https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}`, "_blank"); }}
            style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 3 }}>
            <span style={{ fontSize: 13, color: "#C8956C", fontWeight: 500 }}>→ Go</span>
          </button>
        </div>

        {/* Tags — logged-in users */}
        {isLoggedIn && hasTags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {visibleTags.map((tag, i) => <TagChip key={i} label={tag.label} />)}
            {lockedTags.map((tag, i) => (
              <TagChip key={`locked-${i}`} label={tag.label} locked onLocked={onProRequired} />
            ))}
            {lockedTags.length > 0 && (
              <button onClick={e => { e.stopPropagation(); onProRequired?.(); }}
                style={{ fontSize: 11, color: "#C8956C", background: "none", border: "none", cursor: "pointer", padding: "5px 4px", fontWeight: 600 }}>
                +{lockedTags.length} more · Unlock Pro →
              </button>
            )}
          </div>
        )}

        {/* Guest: prompt to sign in */}
        {!isLoggedIn && (
          <button onClick={e => { e.stopPropagation(); onLoginRequired?.(); }}
            style={{ marginTop: 8, fontSize: 12, color: "#C8956C", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}>
            Sign in to see office tags →
          </button>
        )}
      </div>
    </div>
  );
}
