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

function PhotoStrip({ photos, isPro, onProRequired }: { photos: string[]; isPro: boolean; onProRequired?: () => void }) {
  const [idx, setIdx] = useState(0);
  const freePhotos = photos.slice(0, 3);
  const hasMore = photos.length > 3 && !isPro;
  const shown = isPro ? photos : freePhotos;

  if (shown.length === 0) return null;

  return (
    <div style={{ position: "relative", marginBottom: 10, borderRadius: 10, overflow: "hidden" }}>
      {/* Main photo */}
      <div style={{ position: "relative", height: 140, background: "#F0EDE8" }}>
        <img
          src={shown[idx]}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* Prev/Next arrows */}
        {shown.length > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + shown.length) % shown.length); }}
              style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.35)", border: "none", borderRadius: "50%", width: 28, height: 28, color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              ‹
            </button>
            <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % shown.length); }}
              style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.35)", border: "none", borderRadius: "50%", width: 28, height: 28, color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              ›
            </button>
          </>
        )}
        {/* Dot indicators */}
        <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4 }}>
          {shown.map((_, i) => (
            <span key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: i === idx ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer" }} />
          ))}
        </div>
        {/* Photo count badge */}
        <span style={{ position: "absolute", top: 6, right: 8, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: 10.5, borderRadius: 5, padding: "2px 6px" }}>
          {idx + 1}/{shown.length}
        </span>
      </div>
      {/* Pro unlock banner */}
      {hasMore && (
        <button onClick={e => { e.stopPropagation(); onProRequired?.(); }}
          style={{ width: "100%", background: "#FFF6F0", border: "none", borderTop: "1px solid #F5DFC0", padding: "7px", fontSize: 12, color: "#C8956C", fontWeight: 600, cursor: "pointer", textAlign: "center" }}>
          +{photos.length - 3} more photos — Unlock with Pro
        </button>
      )}
    </div>
  );
}

function TagChip({ label }: { label: string }) {
  return (
    <span style={{ fontSize: 11.5, fontWeight: 500, borderRadius: 7, padding: "5px 8px", background: "#F0FAF4", color: "#3A7A52", border: "1px solid #C3E6CC", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

export default function CafeCard({ cafe, isPro, isLoggedIn, isSaved, onProRequired, onLoginRequired, onToggleSave }: CafeCardProps) {
  // New API: tags (positive only, 5-7), photos; fallback to legacy freeTags/proTags
  const tags: { label: string }[] = (cafe as any).tags || (isPro
    ? [...cafe.freeTags, ...cafe.proTags]
    : cafe.freeTags);
  const photos: string[] = (cafe as any).photos || [];

  return (
    <div style={{ background: "#fff", borderRadius: 16, marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: "1px solid #EDE9E3", overflow: "hidden" }}>

      {/* Photo strip (if available) */}
      {photos.length > 0 && (
        <PhotoStrip photos={photos} isPro={isPro} onProRequired={onProRequired} />
      )}

      <div style={{ padding: "13px 16px 14px" }}>
        {/* Top row: avatar + info + nav */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 13, marginBottom: tags.length > 0 && isLoggedIn ? 10 : 0 }}>

          {/* Avatar (only if no photo) */}
          {photos.length === 0 && (
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F0EDE8", color: "#5C4F44", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
              {getInitials(cafe.name)}
            </div>
          )}

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

        {/* Tags — only for logged-in users, positive only */}
        {isLoggedIn && tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {tags.map((tag, i) => <TagChip key={i} label={tag.label} />)}
          </div>
        )}

        {/* Unlogged: prompt to sign in */}
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
