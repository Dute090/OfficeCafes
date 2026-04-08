var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
async function getPayPalToken(env) {
  const creds = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_SECRET}`);
  const res = await fetch(`${env.PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${creds}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials"
  });
  const data = await res.json();
  return data.access_token;
}
__name(getPayPalToken, "getPayPalToken");
var PLAN_CONFIG = {
  day: { amount: "0.99", days: 1, label: "Perch Day Pass" },
  week: { amount: "2.99", days: 7, label: "Perch Weekly" },
  month: { amount: "6.99", days: 30, label: "Perch Monthly" }
};
var CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
var TAG_RULES = [
  // === WORK-CRITICAL (priority 1) ===
  { label: "Fast WiFi", icon: "\u{1F4F6}", priority: 1, keywords: ["wifi fast", "wifi great", "wifi good", "wifi strong", "internet fast", "great wifi", "good wifi", "fast wifi", "strong wifi", "wifi speed", "fast internet"], positive: true, mutex: "wifi" },
  { label: "Slow WiFi", icon: "\u{1F40C}", priority: 1, keywords: ["wifi slow", "wifi bad", "wifi terrible", "wifi weak", "internet slow", "bad wifi", "slow wifi", "weak wifi", "no wifi", "wifi doesn't work"], positive: false, mutex: "wifi" },
  { label: "Outlets", icon: "\u{1F50C}", priority: 1, keywords: ["outlet", "outlets", "power outlet", "plug", "plugs", "charging", "charger", "power strip", "lots of outlets", "plenty of outlets"], positive: true, mutex: null },
  { label: "No outlets", icon: "\u{1FAAB}", priority: 1, keywords: ["no outlet", "no plug", "nowhere to charge", "no power"], positive: false, mutex: null },
  { label: "Good for work", icon: "\u{1F4BB}", priority: 1, keywords: ["good for working", "great for working", "work here", "working here", "laptop", "remote work", "digital nomad", "work friendly", "cowork", "study here"], positive: true, mutex: "work" },
  { label: "No laptops", icon: "\u{1F6AB}", priority: 1, keywords: ["no laptops", "laptops not allowed", "no computers", "can't work here", "not for working", "no working"], positive: false, mutex: "work" },
  // === ENVIRONMENT (priority 2) ===
  { label: "Quiet", icon: "\u{1F92B}", priority: 2, keywords: ["quiet", "peaceful", "calm", "not noisy", "silent", "tranquil", "serene", "relaxing"], positive: true, mutex: "noise" },
  { label: "Loud", icon: "\u{1F50A}", priority: 2, keywords: ["loud", "noisy", "busy", "chaotic", "too loud", "very noisy", "packed", "deafening"], positive: false, mutex: "noise" },
  { label: "Spacious", icon: "\u{1F3E0}", priority: 2, keywords: ["spacious", "plenty of space", "lots of space", "roomy", "big space", "large", "huge", "spread out"], positive: true, mutex: "space" },
  { label: "Crowded", icon: "\u{1F465}", priority: 2, keywords: ["crowded", "packed", "no space", "full", "always full", "standing room", "no seats", "no seating"], positive: false, mutex: "space" },
  { label: "Long stay OK", icon: "\u23F0", priority: 2, keywords: ["stay all day", "stay for hours", "work all day", "no time limit", "can stay", "allowed to stay", "no rush", "all day"], positive: true, mutex: "stay" },
  { label: "Time limit", icon: "\u23F1\uFE0F", priority: 2, keywords: ["time limit", "can't stay long", "only stay", "limited time", "asked to leave", "two hour limit", "1 hour", "one hour"], positive: false, mutex: "stay" },
  // === COFFEE & VIBE (priority 3) ===
  { label: "Great coffee", icon: "\u2615", priority: 3, keywords: ["great coffee", "excellent coffee", "best coffee", "amazing coffee", "good coffee", "love the coffee", "coffee is great", "coffee is amazing", "perfect espresso", "best espresso"], positive: true, mutex: "coffee" },
  { label: "Mediocre coffee", icon: "\u{1F610}", priority: 3, keywords: ["bad coffee", "mediocre coffee", "terrible coffee", "burnt coffee", "awful coffee", "coffee is bad", "not great coffee"], positive: false, mutex: "coffee" },
  { label: "Nice vibe", icon: "\u2728", priority: 3, keywords: ["great vibe", "nice vibe", "cozy", "cosy", "lovely atmosphere", "great atmosphere", "nice atmosphere", "charming", "beautiful", "aesthetic", "instagrammable"], positive: true, mutex: "vibe" },
  // === PRACTICAL (priority 4) ===
  { label: "Parking", icon: "\u{1F17F}\uFE0F", priority: 4, keywords: ["parking", "easy parking", "free parking", "parking nearby", "parking available", "lot parking", "street parking"], positive: true, mutex: "parking" },
  { label: "No parking", icon: "\u{1F697}", priority: 4, keywords: ["no parking", "hard to park", "difficult parking", "parking nightmare", "nowhere to park"], positive: false, mutex: "parking" },
  { label: "Affordable", icon: "\u{1F4B0}", priority: 4, keywords: ["affordable", "cheap", "inexpensive", "reasonable price", "good price", "good value", "value for money", "not expensive"], positive: true, mutex: "price" },
  { label: "Pricey", icon: "\u{1F4B8}", priority: 4, keywords: ["expensive", "overpriced", "pricey", "too expensive", "costly", "overcharge"], positive: false, mutex: "price" },
  { label: "Dog friendly", icon: "\u{1F415}", priority: 4, keywords: ["dog friendly", "dogs allowed", "pet friendly", "dogs welcome", "brought my dog"], positive: true, mutex: null }
];
function extractTags(reviews) {
  if (!reviews || reviews.length === 0) return [];
  const text = reviews.map((r) => (r.text?.text || r.originalText?.text || "").toLowerCase()).join(" ");
  const matched = [];
  const usedMutex = /* @__PURE__ */ new Set();
  const conflictMutex = /* @__PURE__ */ new Set();
  for (const rule of TAG_RULES) {
    if (rule.keywords.some((k) => text.includes(k))) {
      if (rule.mutex) {
        if (usedMutex.has(rule.mutex)) {
          conflictMutex.add(rule.mutex);
        } else {
          usedMutex.add(rule.mutex);
        }
      }
      matched.push(rule);
    }
  }
  return matched.filter((r) => !r.mutex || !conflictMutex.has(r.mutex)).sort((a, b) => a.priority - b.priority);
}
__name(extractTags, "extractTags");
function isCafe(name) {
  const excluded = ["\u9EA6\u5F53\u52B3", "\u80AF\u5FB7\u57FA", "McDonald", "KFC", "Burger King", "Pizza", "Subway", "Noodle", "\u9910\u5385", "\u5C0F\u5403", "\u70E4\u8089", "\u706B\u9505", "Sushi", "Ramen", "Taco Bell", "Chipotle", "Shake Shack", "Mart", "mart", "Supermarket", "supermarket", "Grocery", "grocery", "Convenience Store", "convenience store", "Walmart", "Target", "Costco", "7-Eleven"];
  return !excluded.some((k) => name.toLowerCase().includes(k.toLowerCase()));
}
__name(isCafe, "isCafe");

function isCoffeePlace(name, reviews) {
  const coffeeKeywords = ["coffee", "cafe", "café", "espresso", "latte", "cappuccino", "barista", "brew", "roast", "bakery", "patisserie", "pastry", "tea house", "teahouse", "boulangerie"];
  const nameLower = name.toLowerCase();
  if (coffeeKeywords.some(k => nameLower.includes(k))) return true;
  if (!reviews || reviews.length === 0) return false;
  const reviewText = reviews.map(r => (r.text?.text || r.originalText?.text || "").toLowerCase()).join(" ");
  const reviewCoffeeKeywords = ["coffee", "espresso", "latte", "cappuccino", "flat white", "americano", "cortado", "macchiato", "cold brew", "pour over", "barista", "cafe", "café"];
  return reviewCoffeeKeywords.some(k => reviewText.includes(k));
}

var index_default = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    const url = new URL(request.url);
    if (url.pathname === "/cafes") {
      const lat = url.searchParams.get("lat") || "40.7580";
      const lng = url.searchParams.get("lng") || "-73.9855";
      const radius = url.searchParams.get("radius") || "2000";
      const body = {
        includedPrimaryTypes: ["cafe", "coffee_shop"],
        excludedTypes: ["restaurant", "fast_food_restaurant", "meal_takeaway", "meal_delivery", "supermarket", "grocery_store", "convenience_store", "department_store", "shopping_mall"],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
            radius: parseFloat(radius)
          }
        },
        rankPreference: "DISTANCE"
      };
      const res = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": env.GOOGLE_PLACES_KEY,
          "X-Goog-FieldMask": "places.id,places.displayName,places.rating,places.userRatingCount,places.regularOpeningHours,places.currentOpeningHours,places.location,places.formattedAddress,places.reviews,places.photos,places.editorialSummary,places.goodForGroups,places.liveMusic,places.outdoorSeating,places.reservable,places.restroom,places.servesCoffee"
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) return new Response(JSON.stringify(data), { status: res.status, headers: CORS });
      const cafes = await Promise.all(
        (data.places || []).filter((p) => isCafe(p.displayName?.text || "") && isCoffeePlace(p.displayName?.text || "", p.reviews || [])).map(async (p) => {
          const isOpen = p.currentOpeningHours?.openNow ?? p.regularOpeningHours?.openNow ?? null;
          const todayIdx = (/* @__PURE__ */ new Date()).getDay();
          const weekday = p.regularOpeningHours?.weekdayDescriptions?.[todayIdx === 0 ? 6 : todayIdx - 1];
          const hours = weekday ? weekday.split(": ").slice(1).join(": ") : "Hours unavailable";
          const distKm = haversine(parseFloat(lat), parseFloat(lng), p.location.latitude, p.location.longitude);
          const distStr = distKm < 1 ? `${Math.round(distKm * 1e3)}m` : `${distKm.toFixed(1)}km`;
          const rating = typeof p.rating === "number" ? p.rating : 0;
          const name = p.displayName?.text || "Caf\xE9";
          const photos = (p.photos || []).slice(0, 5).map(
            (photo) => `https://places.googleapis.com/v1/${photo.name}/media?maxWidthPx=400&key=${env.GOOGLE_PLACES_KEY}`
          );
          const reviewTags = extractTags(p.reviews || []);
          const structuredTags = [];
          if (p.outdoorSeating === true) structuredTags.push({ icon: "\u{1F33F}", label: "Outdoor seating", positive: true });
          if (p.freeParking === true || p.freeParkingLot === true || p.freeStreetParking === true) structuredTags.push({ icon: "\u{1F17F}\uFE0F", label: "Free parking", positive: true });
          if (p.paidParkingLot === true || p.paidStreetParking === true || p.valetParking === true) structuredTags.push({ icon: "\u{1F17F}\uFE0F", label: "Parking available", positive: true });
          if (p.reservable === true) structuredTags.push({ icon: "\u{1F4C5}", label: "Reservations OK", positive: true });
          if (p.goodForGroups === true) structuredTags.push({ icon: "\u{1F465}", label: "Good for groups", positive: true });
          if (p.liveMusic === true) structuredTags.push({ icon: "\u{1F3B5}", label: "Live music", positive: true });
          if (p.restroom === true) structuredTags.push({ icon: "\u{1F6BB}", label: "Restroom", positive: true });
          const allTags = [
            ...reviewTags.map((t) => ({ icon: t.icon, label: t.label, positive: t.positive })),
            ...structuredTags.filter((t) => !reviewTags.some((r) => r.icon === t.icon))
          ];
          const displayTags = allTags.filter((t) => t.label && !t.label.includes("unknown")).slice(0, 7);
          return {
            id: p.id,
            name,
            rating: rating || null,
            reviewCount: p.userRatingCount || 0,
            distance: distStr,
            isOpen: isOpen ?? true,
            hours,
            address: p.formattedAddress || "",
            lat: p.location.latitude,
            lng: p.location.longitude,
            photos,
            // all photos; front-end shows 3 free, rest Pro
            tags: displayTags,
            // shown to logged-in users (5-7 positive tags)
            previewTags: []
            // unlogged users see nothing
          };
        })
      );
      return new Response(JSON.stringify({ cafes }), { headers: CORS });
    }
    if (url.pathname === "/geocode") {
      const q = url.searchParams.get("q") || "";
      if (!q) return new Response(JSON.stringify([]), { headers: CORS });
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=0`,
        { headers: { "Accept-Language": "en", "User-Agent": "OfficeCafes/1.0" } }
      );
      const data = await res.json();
      const suggestions = data.map((d) => d.display_name.split(",").slice(0, 3).join(",").trim());
      return new Response(JSON.stringify(suggestions), { headers: CORS });
    }
    if (url.pathname === "/create-order" && request.method === "POST") {
      const { plan, userId } = await request.json();
      const cfg = PLAN_CONFIG[plan];
      if (!cfg) return new Response(JSON.stringify({ error: "Invalid plan" }), { status: 400, headers: CORS });
      const token = await getPayPalToken(env);
      const res = await fetch(`${env.PAYPAL_BASE}/v2/checkout/orders`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [{
            amount: { currency_code: "USD", value: cfg.amount },
            description: cfg.label,
            custom_id: `${userId}|${plan}`
            // carry userId + plan through PayPal
          }],
          application_context: {
            return_url: `https://perchspaceco.online/payment/success`,
            cancel_url: `https://perchspaceco.online/payment/cancel`,
            brand_name: "Perch",
            user_action: "PAY_NOW"
          }
        })
      });
      const order = await res.json();
      if (!res.ok) return new Response(JSON.stringify(order), { status: res.status, headers: CORS });
      const approvalUrl = order.links?.find((l) => l.rel === "approve")?.href;
      return new Response(JSON.stringify({ orderId: order.id, approvalUrl }), { headers: CORS });
    }
    if (url.pathname === "/capture-order" && request.method === "POST") {
      const { orderId } = await request.json();
      const token = await getPayPalToken(env);
      const res = await fetch(`${env.PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      });
      const data = await res.json();
      // ORDER_ALREADY_CAPTURED means payment succeeded on a prior attempt — return success
      if (!res.ok) {
        const alreadyCaptured = Array.isArray(data.details) && data.details.some((d) => d.issue === "ORDER_ALREADY_CAPTURED");
        if (alreadyCaptured) {
          return new Response(JSON.stringify({ success: true, alreadyCaptured: true }), { headers: CORS });
        }
        return new Response(JSON.stringify({ success: false, error: data }), { status: 400, headers: CORS });
      }
      if (data.status !== "COMPLETED") {
        return new Response(JSON.stringify({ success: false, error: data }), { status: 400, headers: CORS });
      }
      const customId = data.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id || "";
      const [userId, plan] = customId.split("|");
      if (!userId || !plan) {
        return new Response(JSON.stringify({ success: false, error: "Missing custom_id" }), { status: 400, headers: CORS });
      }
      const cfg = PLAN_CONFIG[plan];
      const expiresAt = Date.now() + cfg.days * 86400 * 1e3;
      await env.PRO_USERS.put(`pro:${userId}`, JSON.stringify({ plan, expiresAt }), {
        expirationTtl: cfg.days * 86400
        // auto-expire from KV too
      });
      return new Response(JSON.stringify({ success: true, userId, plan, expiresAt }), { headers: CORS });
    }
    if (url.pathname === "/pro-status") {
      const userId = url.searchParams.get("userId");
      if (!userId) return new Response(JSON.stringify({ isPro: false }), { headers: CORS });
      const raw = await env.PRO_USERS.get(`pro:${userId}`);
      if (!raw) return new Response(JSON.stringify({ isPro: false }), { headers: CORS });
      const { plan, expiresAt } = JSON.parse(raw);
      const isPro = Date.now() < expiresAt;
      return new Response(JSON.stringify({ isPro, plan, expiresAt }), { headers: CORS });
    }
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: CORS });
  }
};
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
__name(haversine, "haversine");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
