"use client";

import { useState, useEffect } from "react";
import { demoCafes, fetchCafes, Cafe } from "@/lib/data";
import CafeCard from "@/components/CafeCard";

const PRO_FEATURES = [
  { title: "Office-friendly tags",         desc: "See noise level, outlets, seating, and more — extracted from real reviews." },
  { title: "Save favorite cafés",          desc: "Bookmark your go-to spots for quick access." },
  { title: "Browse up to 30 km",           desc: "Way more options, way less settling." },
  { title: "Unlimited location changes",   desc: "Switch neighborhoods and refresh as much as you need." },
  { title: "Citywide search",              desc: "Find any café by name, anywhere in the city." },
];

function Sheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#FAFAF8", borderRadius: "22px 22px 0 0", width: "100%", maxWidth: 560, padding: "20px 24px 52px", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ width: 32, height: 3, background: "#D0CBC4", borderRadius: 2, margin: "0 auto 22px" }} />
        {children}
      </div>
    </div>
  );
}

function GoogleBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#fff", border: "1.5px solid #E0DBD5", borderRadius: 13, padding: "14px", fontSize: 15, fontWeight: 600, color: "#1C1C1A", cursor: "pointer", marginBottom: 10 }}>
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </button>
  );
}

function LoginSheet({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  return (
    <Sheet onClose={onClose}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1C1C1A", marginBottom: 7 }}>Sign in to continue</h2>
      <p style={{ fontSize: 14, color: "#7A6E65", lineHeight: 1.65, marginBottom: 22 }}>Create a free account to see work-friendly cafés near you.</p>
      <GoogleBtn onClick={onLogin} />
      <p style={{ fontSize: 11.5, color: "#B0A498", textAlign: "center", marginTop: 10 }}>By continuing, you agree to our Terms & Privacy Policy.</p>
    </Sheet>
  );
}

const PRO_PLANS = [
  { id: "day",   label: "Day Pass",  price: "$0.99",  origPrice: "",      period: "one-time", badge: "",           desc: "Perfect for a one-off work session" },
  { id: "week",  label: "Weekly",    price: "$2.99",  origPrice: "",      period: "/week",    badge: "",           desc: "Great for short-term remote work" },
  { id: "month", label: "Monthly",   price: "$6.99",  origPrice: "$8.99", period: "/month",   badge: "Best Value", desc: "Save 60% — limited time offer" },
];

function Countdown() {
  const [secs, setSecs] = useState(() => {
    // 固定从 29:47 开始，不依赖 Date，纯视觉钩子
    return 29 * 60 + 47;
  });
  useEffect(() => {
    const id = setInterval(() => {
      setSecs(s => s <= 1 ? 29 * 60 + 59 : s - 1); // loop 回 29:59
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <div style={{ background: "#FFF3E8", border: "1px solid #F5DFC0", borderRadius: 10, padding: "8px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 14 }}>⏳</span>
      <span style={{ fontSize: 13, color: "#C8601A", fontWeight: 600 }}>
        Special offer ends in {m}:{s} — save 22% on Monthly
      </span>
    </div>
  );
}

function ProSheet({ onClose, onUpgrade }: { onClose: () => void; onUpgrade: () => void }) {
  const [selected, setSelected] = useState<"day" | "week" | "month">("month");
  const plan = PRO_PLANS.find(p => p.id === selected)!;
  return (
    <Sheet onClose={onClose}>
      <div style={{ background: "#2C2118", borderRadius: 14, padding: "16px 18px", marginBottom: 16 }}>
        <p style={{ color: "rgba(200,180,160,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Perch Pro</p>
        <p style={{ color: "#FAF6F2", fontSize: 19, fontWeight: 700, letterSpacing: -0.3, marginBottom: 4 }}>Work smarter, wherever you are.</p>
        <p style={{ color: "rgba(200,180,160,0.65)", fontSize: 13.5, lineHeight: 1.6 }}>See office tags, save spots, and search anywhere.</p>
      </div>

      <Countdown />

      {/* Plan selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {PRO_PLANS.map(p => (
          <button key={p.id} onClick={() => setSelected(p.id as any)}
            style={{ flex: 1, position: "relative", background: selected === p.id ? "#FFF6F0" : "#fff", border: `1.5px solid ${selected === p.id ? "#C8956C" : "#EDE9E3"}`, borderRadius: 12, padding: "12px 8px", cursor: "pointer", textAlign: "center" }}>
            {p.badge ? <span style={{ position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)", background: "#C8956C", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "2px 7px", whiteSpace: "nowrap" }}>{p.badge}</span> : null}
            <p style={{ fontSize: 12, fontWeight: 600, color: "#7A6E65", marginBottom: 4 }}>{p.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
              {p.origPrice ? <span style={{ fontSize: 12, color: "#B0A498", textDecoration: "line-through" }}>{p.origPrice}</span> : null}
              <p style={{ fontSize: 18, fontWeight: 700, color: p.id === "month" ? "#C8601A" : "#1C1C1A", letterSpacing: -0.5 }}>{p.price}</p>
            </div>
            <p style={{ fontSize: 11, color: "#B0A498" }}>{p.period}</p>
          </button>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "#7A6E65", textAlign: "center", marginBottom: 16 }}>{plan.desc}</p>

      <div style={{ marginBottom: 20 }}>
        {PRO_FEATURES.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < PRO_FEATURES.length - 1 ? "1px solid #EDE9E3" : "none" }}>
            <span style={{ color: "#5A9E6F", fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1A", marginBottom: 1 }}>{f.title}</p>
              <p style={{ fontSize: 12.5, color: "#7A6E65", lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onUpgrade} style={{ width: "100%", background: "#C8956C", color: "#fff", border: "none", borderRadius: 13, padding: "15px", fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
        Get {plan.label} — {plan.price}{plan.id !== "day" ? plan.period : ""}
      </button>
      <p style={{ textAlign: "center", fontSize: 12, color: "#B0A498" }}>Secure payment via PayPal{plan.id !== "day" ? " · Cancel anytime" : ""}</p>
    </Sheet>
  );
}

function AccountSection({ isLoggedIn, isPro, savedCafes, onLogin, onLogout, onShowPro, onUnsave }: { isLoggedIn: boolean; isPro: boolean; savedCafes: string[]; onLogin: () => void; onLogout: () => void; onShowPro: () => void; onUnsave: (id: string) => void }) {
  if (!isLoggedIn) return (
    <div style={{ padding: "36px 0" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1C1C1A", letterSpacing: -0.5, marginBottom: 8 }}>Account</h2>
      <p style={{ fontSize: 15, color: "#7A6E65", lineHeight: 1.65, marginBottom: 26 }}>Sign in to save your favorite spots and unlock Pro features.</p>
      <GoogleBtn onClick={onLogin} />
    </div>
  );
  return (
    <div style={{ padding: "36px 0" }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1C1C1A", letterSpacing: -0.5, marginBottom: 22 }}>Account</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 18, borderBottom: "1px solid #EDE9E3" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#EDE9E3", color: "#4A3F36", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>U</div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 15, color: "#1C1C1A", marginBottom: 2 }}>User</p>
          <p style={{ fontSize: 13, color: "#7A6E65" }}>user@gmail.com</p>
        </div>
      </div>
      {!isPro ? (
        <button onClick={onShowPro} style={{ width: "100%", background: "#fff", border: "1.5px solid #EDE9E3", borderRadius: 14, padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontWeight: 600, fontSize: 14.5, color: "#1C1C1A", marginBottom: 2 }}>Free Plan</p>
            <p style={{ fontSize: 13, color: "#7A6E65" }}>Browse nearby · limited location changes</p>
          </div>
          <span style={{ background: "#C8956C", color: "#fff", fontSize: 12.5, fontWeight: 600, borderRadius: 8, padding: "5px 12px" }}>Upgrade</span>
        </button>
      ) : (
        <div style={{ background: "#F4FAF6", border: "1.5px solid #C3E6CC", borderRadius: 14, padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#5A9E6F", fontSize: 17 }}>✓</span>
          <div>
            <p style={{ fontWeight: 600, fontSize: 14.5, color: "#3A7A52", marginBottom: 2 }}>Pro · Active</p>
            <p style={{ fontSize: 13, color: "#5A9E6F" }}>Renews Apr 20, 2026 · $6.99/mo</p>
          </div>
        </div>
      )}
      <div style={{ background: "#fff", border: "1.5px solid #EDE9E3", borderRadius: 14, padding: "14px 16px", marginBottom: 28 }}>
        <p style={{ fontWeight: 600, fontSize: 14.5, color: "#1C1C1A", marginBottom: 8 }}>Saved Spots</p>
        {isPro
          ? savedCafes.length > 0
            ? (() => {
                const saved = demoCafes.filter(c => savedCafes.includes(c.id));
                return (
                  <div>
                    {saved.map((cafe, i) => (
                      <div key={cafe.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < saved.length - 1 ? "1px solid #F0EDE8" : "none" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 600, fontSize: 14, color: "#1C1C1A", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cafe.name}</p>
                          <p style={{ fontSize: 12, color: "#7A6E65" }}>{cafe.distance} away · {cafe.isOpen ? "Open" : "Closed"}</p>
                        </div>
                        <button
                          onClick={() => onUnsave(cafe.id)}
                          title="Remove from saved"
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#C8956C", flexShrink: 0, marginLeft: 12, lineHeight: 1 }}
                        >♥</button>
                      </div>
                    ))}
                  </div>
                );
              })()
            : <p style={{ fontSize: 13.5, color: "#B0A498" }}>No saved spots yet. Tap ♡ on any café to save it.</p>
          : <button onClick={onShowPro} style={{ background: "none", border: "none", fontSize: 13.5, color: "#C8956C", cursor: "pointer", padding: 0 }}>Unlock with Pro →</button>}
      </div>
      <button onClick={onLogout} style={{ background: "none", border: "none", color: "#C0917A", fontSize: 14, cursor: "pointer", padding: 0 }}>Sign out</button>
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState<"home" | "search" | "account">("home");
  const [location, setLocation] = useState("New York, NY");
  const [locationInput, setLocationInput] = useState("New York, NY");
  const [editingLocation, setEditingLocation] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showPro, setShowPro] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [savedCafes, setSavedCafes] = useState<string[]>([]);
  const [cafes, setCafes] = useState<Cafe[]>(demoCafes);
  const [loadingCafes, setLoadingCafes] = useState(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Get real location + fetch real cafes after login
  const loadRealCafes = (lat: number, lng: number, radius = 2000) => {
    setLoadingCafes(true);
    fetchCafes(lat, lng, radius)
      .then(data => { if (data.length > 0) setCafes(data); })
      .catch(() => {})
      .finally(() => setLoadingCafes(false));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude: lat, longitude: lng } = pos.coords;
          setUserCoords({ lat, lng });
          setLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          setLocationInput(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          loadRealCafes(lat, lng);
        },
        () => loadRealCafes(40.758, -73.9855) // fallback NYC
      );
    } else {
      loadRealCafes(40.758, -73.9855);
    }
  };

  const handleToggleSave = (id: string) => {
    setSavedCafes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const FREE_REFRESH_LIMIT = 0; // any manual location change requires Pro

  const filtered = cafes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const HIDDEN_COUNT = 12;
  // Only block when user actively tries to refresh/change location again
  const limitReached = isLoggedIn && !isPro && refreshCount >= FREE_REFRESH_LIMIT;

  const handleLocationChange = async () => {
    if (!isLoggedIn) { setShowLogin(true); return; }
    if (!isPro) { setShowPro(true); return; }
    setLocation(locationInput);
    setEditingLocation(false);
    setSuggestions([]);
    // Geocode the typed address → fetch nearby cafés
    try {
      setLoadingCafes(true);
      const geo = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationInput)}&format=json&limit=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const geoData: { lat: string; lon: string }[] = await geo.json();
      if (geoData.length > 0) {
        const lat = parseFloat(geoData[0].lat);
        const lng = parseFloat(geoData[0].lon);
        setUserCoords({ lat, lng });
        loadRealCafes(lat, lng);
      }
    } catch {
      setLoadingCafes(false);
    }
  };

  const fetchSuggestions = async (q: string) => {
    if (q.length < 2) { setSuggestions([]); return; }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=0`,
        { headers: { "Accept-Language": "en" } }
      );
      const data: { display_name: string }[] = await res.json();
      setSuggestions(data.map(d => d.display_name.split(",").slice(0, 3).join(",")));
    } catch { setSuggestions([]); }
  };

  const handleRefresh = () => {
    if (!isLoggedIn) { setShowLogin(true); return; }
    if (!isPro) { setShowPro(true); return; }
    if (userCoords) loadRealCafes(userCoords.lat, userCoords.lng);
  };

  const NAV = [{ id: "home", label: "Home" }, { id: "search", label: "Search" }, { id: "account", label: "Account" }] as const;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", maxWidth: 560, margin: "0 auto" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,250,248,0.94)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid #EDE9E3", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
        <div>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#1C1C1A", letterSpacing: -0.3 }}>Perch</span>
        </div>
        <nav style={{ display: "flex", gap: 2 }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { setTab(n.id); setSearch(""); }}
              style={{ background: tab === n.id ? "#EDE9E3" : "none", border: "none", borderRadius: 8, padding: "5px 11px", fontSize: 13, fontWeight: tab === n.id ? 600 : 400, color: tab === n.id ? "#1C1C1A" : "#7A6E65", cursor: "pointer" }}
            >{n.label}</button>
          ))}
        </nav>
      </header>

      <main style={{ padding: "0 20px 60px" }}>
        {tab === "home" && (<>
          <div style={{ padding: "28px 0 18px" }}>
            {/* Editable location */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "#7A6E65" }}>📍</span>
              {editingLocation ? (
                <div style={{ flex: 1, position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input autoFocus value={locationInput}
                      onChange={e => { setLocationInput(e.target.value); fetchSuggestions(e.target.value); }}
                      onKeyDown={e => { if (e.key === "Enter") { handleLocationChange(); } if (e.key === "Escape") { setEditingLocation(false); setSuggestions([]); } }}
                      style={{ flex: 1, background: "none", border: "none", borderBottom: "1.5px solid #C8956C", fontSize: 13, color: "#1C1C1A", outline: "none", padding: "2px 0" }} />
                    <button onClick={handleLocationChange} style={{ background: "none", border: "none", color: "#C8956C", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Go</button>
                    <button onClick={() => { setEditingLocation(false); setSuggestions([]); }} style={{ background: "none", border: "none", color: "#B0A498", fontSize: 13, cursor: "pointer" }}>✕</button>
                  </div>
                  {suggestions.length > 0 && (
                    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #EDE9E3", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", zIndex: 100, marginTop: 4, overflow: "hidden" }}>
                      {suggestions.map((s, i) => (
                        <button key={i} onClick={() => { setLocationInput(s); setSuggestions([]); handleLocationChange(); }}
                          style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: i < suggestions.length - 1 ? "1px solid #F5F2EE" : "none", padding: "10px 14px", fontSize: 13, color: "#3A3028", cursor: "pointer" }}>
                          📍 {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => {
                  if (!isLoggedIn) { setShowLogin(true); return; }
                  if (!isPro) { setShowPro(true); return; }
                  setEditingLocation(true);
                }} style={{ background: "none", border: "none", fontSize: 13, color: "#7A6E65", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 5 }}>
                  {location} <span style={{ fontSize: 11, color: "#C8A898" }}>✎</span>
                </button>
              )}
            </div>

            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1C1C1A", letterSpacing: -0.8, lineHeight: 1.2, marginBottom: 10 }}>
              Find a café<br />worth working from.
            </h1>
            <p style={{ fontSize: 15, color: "#6B5E53", lineHeight: 1.7 }}>
              WiFi, outlets, noise level — know before you go.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1.5px solid #E0DBD5", borderRadius: 12, padding: "11px 15px", marginBottom: 18 }}>
            <span style={{ fontSize: 15, color: "#B0A498" }}>⌕</span>
            <input type="text" placeholder="Search cafés..." value={search}
              onClick={() => { if (!isLoggedIn) setShowLogin(true); }}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, background: "none", border: "none", fontSize: 15, color: "#1C1C1A", outline: "none" }} />
          </div>

          {!isPro && (
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#7A6E65", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>✦ Perch Pro</p>
              <div style={{ display: "flex", gap: 7, marginBottom: 10 }}>
                {PRO_PLANS.map(p => (
                  <button key={p.id} onClick={() => setShowPro(true)}
                    style={{ flex: 1, background: p.id === "month" ? "#FFF6F0" : "#fff", border: `1.5px solid ${p.id === "month" ? "#C8956C" : "#EDE9E3"}`, borderRadius: 12, padding: "10px 6px", cursor: "pointer", textAlign: "center", position: "relative" }}>
                    {p.badge ? <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#C8956C", color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 5, padding: "2px 6px", whiteSpace: "nowrap" }}>{p.badge}</span> : null}
                    <p style={{ fontSize: 11, fontWeight: 600, color: "#7A6E65", marginBottom: 3 }}>{p.label}</p>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 3 }}>
                      {p.origPrice ? <span style={{ fontSize: 10, color: "#B0A498", textDecoration: "line-through" }}>{p.origPrice}</span> : null}
                      <p style={{ fontSize: 16, fontWeight: 700, color: p.id === "month" ? "#C8601A" : "#1C1C1A", letterSpacing: -0.3 }}>{p.price}</p>
                    </div>
                    <p style={{ fontSize: 10, color: "#B0A498" }}>{p.period}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isPro && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4 }}>
                {["Office tags 🔒", "Save favorites 🔒", "30 km radius 🔒", "Citywide search 🔒"].map((f, i) => (
                  <button key={i} onClick={() => setShowPro(true)} style={{ flexShrink: 0, background: "#F0EDE8", border: "none", borderRadius: 9, padding: "6px 12px", fontSize: 12.5, fontWeight: 500, color: "#5C4F44", cursor: "pointer", whiteSpace: "nowrap" }}>{f}</button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#7A6E65", letterSpacing: 0.5, textTransform: "uppercase" }}>
              {search ? `Results for "${search}"` : "Nearby · Work-friendly"}
            </p>
            {isLoggedIn && (
              <button onClick={handleRefresh} style={{ background: "none", border: "none", fontSize: 12, color: "#C8956C", cursor: "pointer", fontWeight: 500 }}>↺ Refresh</button>
            )}
          </div>

          {!isLoggedIn && (
            <button onClick={() => setShowLogin(true)} style={{ width: "100%", background: "#fff", border: "1.5px solid #E0DBD5", borderRadius: 13, padding: "18px", textAlign: "center", cursor: "pointer" }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1A", marginBottom: 4 }}>Sign in to see nearby cafés</p>
              <p style={{ fontSize: 13, color: "#7A6E65" }}>Free to browse — no credit card needed</p>
            </button>
          )}

          {/* Refresh limit reached — only shows when user actively tries to refresh again */}
          {limitReached && (
            <button onClick={() => setShowPro(true)} style={{ width: "100%", background: "#fff", border: "1.5px solid #E0DBD5", borderRadius: 13, padding: "18px", textAlign: "center", cursor: "pointer" }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1A", marginBottom: 4 }}>Refresh limit reached</p>
              <p style={{ fontSize: 13, color: "#7A6E65" }}>Upgrade to change location & refresh anytime →</p>
            </button>
          )}

          {isLoggedIn && loadingCafes && (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#7A6E65", fontSize: 14 }}>
              ☕ Finding cafés near you...
            </div>
          )}

          {/* List: always visible after login, list stays until they hit refresh/location */}
          {isLoggedIn && !loadingCafes && (<>
            {filtered.map(cafe => <CafeCard key={cafe.id} cafe={cafe} isPro={isPro} isLoggedIn={isLoggedIn} isSaved={savedCafes.includes(cafe.id)} onProRequired={() => setShowPro(true)} onLoginRequired={() => setShowLogin(true)} onToggleSave={handleToggleSave} />)}
            {filtered.length === 0 && <p style={{ color: "#B0A498", fontSize: 14.5, textAlign: "center", paddingTop: 32 }}>No cafés found</p>}

            {!isPro && filtered.length > 0 && (
              <button onClick={() => setShowPro(true)} style={{ width: "100%", marginTop: 6, background: "#F5F2EE", border: "1.5px dashed #D0CBC4", borderRadius: 14, padding: "18px 20px", cursor: "pointer", textAlign: "center" }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#3A3028", marginBottom: 5 }}>More cafés in your area</p>
                <p style={{ fontSize: 13, color: "#7A6E65", lineHeight: 1.55, marginBottom: 12 }}>More cafés · office tags · save your favorites</p>
                <span style={{ display: "inline-block", background: "#C8956C", color: "#fff", fontWeight: 700, fontSize: 13.5, borderRadius: 9, padding: "8px 18px" }}>
                  Less than a latte — $2.99/mo
                </span>
              </button>
            )}
          </>)}
        </>)}

        {tab === "search" && (<>
          <div style={{ padding: "28px 0 16px" }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1C1C1A", letterSpacing: -0.5, marginBottom: 4 }}>Search cafés</h2>
            <p style={{ fontSize: 13.5, color: "#7A6E65", marginBottom: 14 }}>{isPro ? "Search any café citywide — no distance limit." : "Pro: search any café citywide, no distance limit."}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1.5px solid #E0DBD5", borderRadius: 12, padding: "11px 15px" }}>
              <span style={{ fontSize: 15, color: "#B0A498" }}>⌕</span>
              <input autoFocus type="text" placeholder="Café name or address..." value={search}
                onChange={e => { if (!isLoggedIn) { setShowLogin(true); return; } if (!isPro) { setShowPro(true); return; } setSearch(e.target.value); }}
                style={{ flex: 1, background: "none", border: "none", fontSize: 15, color: "#1C1C1A", outline: "none" }} />
            </div>
          </div>
          {!isLoggedIn && <button onClick={() => setShowLogin(true)} style={{ width: "100%", background: "#fff", border: "1.5px solid #E0DBD5", borderRadius: 13, padding: "16px", textAlign: "center", cursor: "pointer" }}><p style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1A" }}>Sign in to search</p></button>}
          {isLoggedIn && !isPro && (
            <button onClick={() => setShowPro(true)} style={{ width: "100%", background: "#fff", border: "1.5px solid #E0DBD5", borderRadius: 13, padding: "15px 16px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 14.5, fontWeight: 600, color: "#1C1C1A", marginBottom: 3 }}>Full search is Pro only 🔒</p>
                <p style={{ fontSize: 13, color: "#7A6E65" }}>Citywide · no distance limit · unlimited</p>
              </div>
              <span style={{ color: "#C8956C", fontSize: 13.5, fontWeight: 600, flexShrink: 0, marginLeft: 12 }}>Upgrade →</span>
            </button>
          )}
          {isPro && search === "" && <p style={{ color: "#B0A498", fontSize: 14.5, paddingTop: 8 }}>Type to search any café, citywide.</p>}
          {isPro && filtered.map(cafe => <CafeCard key={cafe.id} cafe={cafe} isPro={isPro} isLoggedIn={isLoggedIn} isSaved={savedCafes.includes(cafe.id)} onProRequired={() => setShowPro(true)} onLoginRequired={() => setShowLogin(true)} onToggleSave={handleToggleSave} />)}
          {isPro && search !== "" && filtered.length === 0 && <p style={{ color: "#B0A498", fontSize: 14.5, paddingTop: 8 }}>No results for "{search}"</p>}
        </>)}

        {tab === "account" && (
          <AccountSection isLoggedIn={isLoggedIn} isPro={isPro} savedCafes={savedCafes}
            onLogin={handleLogin}
            onLogout={() => { setIsLoggedIn(false); setIsPro(false); setRefreshCount(0); setSavedCafes([]); setCafes(demoCafes); setUserCoords(null); }}
            onShowPro={() => setShowPro(true)}
            onUnsave={handleToggleSave} />
        )}
      </main>

      {showLogin && <LoginSheet onClose={() => setShowLogin(false)} onLogin={() => { handleLogin(); setShowLogin(false); }} />}
      {showPro && <ProSheet onClose={() => setShowPro(false)} onUpgrade={() => { setIsPro(true); setShowPro(false); }} />}
    </div>
  );
}
