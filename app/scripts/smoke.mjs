// Smoke test: one Chair setup call and one seat card, no full council.
import { SEATS, systemFor, parseCard, checkQuotes } from "../lib/seats.mjs";
import * as ai from "../lib/anthropic.mjs";
import { MODELS } from "../lib/council.mjs";

const sys = systemFor("bachchan");
console.log("bachchan system chars:", sys[0].text.length);

const t0 = Date.now();
const card = await ai.stream({
  model: MODELS.seat, system: sys, maxTokens: 900,
  messages: [{ role: "user", content: `ROAST ROOM COUNCIL, ROUND 1 OF 3: OPENING POSITION
You hold the BACHCHAN seat. THE BRIEF: Pune mein ₹6 lakh per month ka coaching business fees ₹20,000 se ₹35,000 karna chahta hai. Options: (A) sab ke liye abhi, (B) sirf naye students ke liye, (C) ₹20,000 hi rakho.
LANGUAGE: Hinglish, field labels in English.
Answer under 200 words in this shape:
SEAT: BACHCHAN
STANCE: ...
OPTION SCORES: A n/10 · B n/10 · C n/10
PILLAR SCORE: n/10
CONFIDENCE: n/5
RUIN RISK: none | possible | likely
DOOR: one-way | two-way
THE CALL: one sentence.
WHY: 1. with a framework and source id, e.g. (Repay every rupee, S008)` }],
});
console.log(`seat card in ${((Date.now() - t0) / 1000).toFixed(1)}s\n`, card);
console.log(parseCard(card, ["A", "B", "C"]));
console.log(checkQuotes("bachchan", card));
console.log(ai.usage);
