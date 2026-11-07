# Seats

`roster.json` (one folder up) is the source of truth: every seat, its key, pillar, question, and scorecard dimension, plus the default board and how the board is picked. The twelve seats of the AI India Roast Room:

**Default board (seven)**

| Seat | Agent | Pillar | Owns the question | Brain |
|---|---|---|---|---|
| Kamath | `council-kamath` | Bootstrapping and staying profitable | Can you grow this without outside money, ads, or debt, and stay profitable while you do? | `brains/nithin-kamath/` |
| Vembu | `council-vembu` | Long-term product and rural talent | Can you build this with your own people, for decades, without chasing valuation? | `brains/sridhar-vembu/` |
| Kunal | `council-kunal` | Consumer psychology and trust | What human behavior does this exploit or fix, and will the most trustworthy customers pay for it? | `brains/kunal-shah/` |
| Falguni | `council-nayar` | D2C, retail, and patient brand building | Will customers trust you with this category, and can inventory and margins carry it? | `brains/falguni-nayar/` |
| Kotak | `council-kotak` | Capital, risk, and compounding | What does this do to your balance sheet, and can you survive the worst case? | `brains/uday-kotak/` |
| Aadit | `council-palicha` | Gen-Z speed and execution | How fast can you ship this, and what would you cut to move ten times faster? | `brains/aadit-palicha/` |
| Bachchan | `council-bachchan` | Comeback and reputation | If this fails in public, can you survive it, pay what you owe, and rebuild your name? | `brains/amitabh-bachchan/` |

**On call (five)**

| Seat | Agent | Pillar | Owns the question | Brain |
|---|---|---|---|---|
| Murthy | `council-murthy` | Values, governance, and discipline | Would you be comfortable if every detail of this were on the front page tomorrow? | `brains/narayana-murthy/` |
| Aman | `council-aman` | Brand, marketing, and D2C growth | Will Indian customers notice it, want it, and pay for it at your price? | `brains/aman-gupta/` |
| Mittal | `council-mittal` | Deals, valuation, and founder grit | Is this deal fundable at this valuation, and is this the founder to back? | `brains/anupam-mittal/` |
| Raj | `council-shamani` | Creator economy and personal brand | Can you build an audience around this that buys from you, and what is the content engine? | `brains/raj-shamani/` |
| Rajan | `council-rajan` | Policy, regulation, and the economy | How will RBI, government policy, and the economy help or hurt this? | `brains/raghuram-rajan/` |

Brain paths are relative to `.claude/skills/roast-room/`. Seats added with `/newroaster` follow the same pattern: `council-<key>` and `brains/<slug>/`, listed in `roster.json`. The original global seats are in `archive/global-seats/` and are not in the roster.

## Relevance weights

The Chair sets a weight per seat for each decision, before Round 1, and writes the reason in one line. Weights make the final score honest: a pricing call should lean on Aman or Kunal, a fundraising call on Mittal and Kamath, a loan on Kotak.

| Weight | Meaning |
|---|---|
| 3 | This decision lives in the seat's pillar |
| 2 | The pillar is materially affected |
| 1 | The pillar is touched at the edges |

Every seat is at least 1. Exactly one or two seats get a 3.

## Quick council

`--quick` seats four (recommended per SKILL.md "Pick the board", then confirmed): the two highest-weight seats, the seat that guards the downside (Kotak by default; Kamath when the risk is burn rather than debt), and the seat most likely to disagree with the others (the Chair names why). Use quick for reversible, low-stakes calls. Full council for anything a founder cannot easily undo.

## Natural tensions to expect

- **Burn versus bootstrap.** Aadit and Kunal (raise, move fast, win the market) against Kamath, Vembu, and Kotak (no outside money or debt you cannot survive, stay profitable). Mittal sits between: raise when the deal is good and the founder is backable.
- **Brand spend versus product.** Aman and Raj (aspiration, celebrities, content, distribution as the asset) against Kamath and Vembu (a good product sells itself; no ads). Falguni splits: brand matters, but not on discounts or inventory you cannot carry.
- **Discounts and cashback.** Kunal and Falguni (discounts train the wrong customers and damage trust) against Aman and Aadit (price to win share in a price-sensitive market).
- **Who the customer is.** Kunal (build for the top 25 million who pay) against Vembu (build for Bharat, Tier-2, Tier-3, and rural India).
- **Speed versus governance.** Aadit (ship fast, fix later) against Murthy (disclose everything, governance before growth) and Bachchan (what a public failure does to the name).
- **Founder as the brand.** Raj (best known beats best; the founder must make content) against Murthy and Vembu (let the work speak; avoid publicity).
- **Deals and dilution.** Mittal (power-law bets, back the founder) against Kotak (bank-style downside first: can you survive the worst case?).
- **Policy and the economy.** Rajan brings what RBI, interest rates, regulation, and government policy do to the plan. He agrees with Kotak on macro risk and pushes Aadit and Aman on whether demand survives a downturn.
- Bachchan and Kotak agree on downside and split on settling: Kotak takes the deal that protects the balance sheet, Bachchan repays in full and pays in work.

If Round 1 comes back unanimous, the Chair should be suspicious and press the seat whose pillar is most at risk in Round 2.
