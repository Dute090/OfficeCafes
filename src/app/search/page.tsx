"use client";
import { useState } from "react";
import { demoCafes } from "@/lib/data";
import CafeCard from "@/components/CafeCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = query ? demoCafes.filter(c => c.name.toLowerCase().includes(query.toLowerCase())) : [];
  return (
    <div style={{ padding: "20px" }}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." style={{ width: "100%" }} />
      {results.map(cafe => <CafeCard key={cafe.id} cafe={cafe} isPro={false} />)}
    </div>
  );
}
