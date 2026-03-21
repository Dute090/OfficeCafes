# OfficeCafes (Perch) — Product Requirements Document

## Overview

A mobile-first web app that helps remote workers find work-friendly cafés nearby. Users can browse, filter, and save cafés based on practical working criteria (WiFi, outlets, noise level, hours).

**Live URL:** https://has-society-late-bytes.trycloudflare.com  
**Stack:** Next.js 16, TypeScript, deployed on Cloudflare

---

## Current Status

✅ Completed  
🔲 Pending

---

## Features

### Core

| # | Feature | Status |
|---|---------|--------|
| 1 | Café list with name, rating, distance, open/closed status | ✅ |
| 2 | Tag strip per card (free tags + Pro-only tags) | ✅ |
| 3 | Share button (↗) — native share or clipboard copy | ✅ |
| 4 | Save / Unsave button (♡/♥) per café card | ✅ |
| 5 | Location display + editable location input | ✅ |
| 6 | Search bar (filters café list by name) | ✅ |
| 7 | Refresh button | ✅ |
| 8 | Bottom navigation: Home / Search / Account | ✅ |

### Auth & Gating

| # | Feature | Status |
|---|---------|--------|
| 9 | Guest state — shows sign-in prompt, hides café list | ✅ |
| 10 | Login sheet — "Continue with Google" (simulated) | ✅ |
| 11 | Free user — can browse cafés, 1 location refresh limit | ✅ |
| 12 | Pro upgrade sheet — features list + $2.99/mo CTA | ✅ |
| 13 | Pro user — unlocks all features | ✅ |

### Account Page

| # | Feature | Status |
|---|---------|--------|
| 14 | User profile display (name + email) | ✅ |
| 15 | Plan status (Free / Pro) | ✅ |
| 16 | Saved Spots section — expandable list with café name, distance, open status | ✅ |
| 17 | Unsave button (♥) in Saved Spots list | ✅ |
| 18 | Sign out | ✅ |

### Pro Features (Gated)

| # | Feature | Status |
|---|---------|--------|
| 19 | WiFi & workspace details (via Foursquare API) | 🔲 |
| 20 | Save favorite cafés | ✅ |
| 21 | Browse up to 30 km radius | 🔲 |
| 22 | Unlimited location changes | ✅ (logic) |
| 23 | Citywide search | ✅ (UI gated) |

---

## Next Steps

### Phase 1 — Deploy
- [ ] Deploy to Cloudflare Pages (replace tunnel with permanent URL)

### Phase 2 — Real Data
- [ ] Integrate Foursquare Places API for real café data
- [ ] Use geolocation API to detect user's actual location
- [ ] Populate WiFi / noise / outlet tags from Foursquare

### Phase 3 — Auth & Payments
- [ ] Real Google OAuth
- [ ] PayPal / Stripe payment for Pro subscription
- [ ] Persist saved cafés (backend or localStorage)

---

## Design Tokens

- Background: `#FAFAF8`
- Primary text: `#1C1C1A`
- Secondary text: `#7A6E65`
- Accent (orange): `#C8956C`
- Border: `#EDE9E3`
- Open indicator: `#5A9E6F`
- Closed indicator: `#C0917A`
