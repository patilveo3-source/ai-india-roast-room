# AI India Roast Room

Bring a hard business decision and a council of Indian AI advisors argues it out in Hinglish, then hands you a scored verdict in rupees and a one-click PDF. Twelve advisors ship with it, each built from that person's public work: their interviews, talks, podcasts, letters, and posts. For each question, the Chair recommends who should sit on the council and you confirm. The council runs in Claude Code, and a small local web app shows them around a table talking it through. Want someone else at the table? Type `/newroaster` and a name, and Claude builds that advisor the same way.

Seven sit on the **default board**:

| Seat | Pillar | The question they own |
|---|---|---|
| Nithin Kamath | Bootstrapping and staying profitable | Can you grow this without outside money, ads, or debt, and stay profitable while you do? |
| Sridhar Vembu | Long-term product and rural talent | Can you build this with your own people, for decades, without chasing valuation? |
| Kunal Shah | Consumer psychology and trust | What human behavior does this exploit or fix, and will the most trustworthy customers pay for it? |
| Falguni Nayar | D2C, retail, and patient brand building | Will customers trust you with this category, and can inventory and margins carry it? |
| Uday Kotak | Capital, risk, and compounding | What does this do to your balance sheet, and can you survive the worst case? |
| Aadit Palicha (Gen-Z) | Gen-Z speed and execution | How fast can you ship this, and what would you cut to move ten times faster? |
| Amitabh Bachchan | Comeback and reputation | If this fails in public, can you survive it, pay what you owe, and rebuild your name? |

Five more are on call, and the Chair brings them in when your question is in their lane:

| Seat | Pillar | The question they own |
|---|---|---|
| Narayana Murthy | Values, governance, and discipline | Would you be comfortable if every detail of this were on the front page tomorrow? |
| Aman Gupta | Brand, marketing, and D2C growth | Will Indian customers notice it, want it, and pay for it at your price? |
| Anupam Mittal | Deals, valuation, and founder grit | Is this deal fundable at this valuation, and is this the founder to back? |
| Raj Shamani (Gen-Z) | Creator economy and personal brand | Can you build an audience around this that buys from you, and what is the content engine? |
| Raghuram Rajan | Policy, regulation, and the economy | How will RBI, government policy, and the economy help or hurt this? |

## What you need

- [Claude Code](https://claude.com/claude-code). Your Claude plan covers it; no API key needed.
- [Node.js](https://nodejs.org) 20 or newer, for the room. There's nothing to install beyond that.

## Run a roast

1. Start the room: `npm start`, then open http://localhost:4730. Leave it open.
2. Open Claude Code in this folder: `claude`
3. Type `/roast-room` and your decision, in Hinglish or English.
4. Answer the Chair's questions, then watch the council argue it out in the room.
5. When the verdict lands, click **Download PDF**.

You also get a short verdict in Claude Code, and the full report lands in `sessions/<date>-<decision>/verdict.md`.

## What to put in your question

- **The decision** in one line, and your **options** (two or three; "jo abhi kar raha hoon wahi chalu rakhu" counts).
- **Your numbers** in rupees: revenue per month, cash in the bank, team size. Lakh and crore are fine.
- **Indian context** if it matters: GST, which cities you sell in (metro, Tier-2, Tier-3), family money or loans, any licence or regulator.
- **Your limits**: deadline, hours, budget. **What success looks like**, and by when.
- **Which way you're leaning**, and why. The council tests your lean instead of agreeing with it.

Example:

```
/roast-room Main Pune mein coaching business chalata hoon, ₹6 lakh per month, 30 students ₹20,000 each.
Fees ₹35,000 karu sab ke liye, sirf naye students ke liye, ya ₹20,000 hi rakhu? Close rate around 50% hai
aur bank mein ₹8 lakh hain. Main sab ke liye badhane ki taraf jhuk raha hoon kyunki underpaid feel hota hai.
```

More ways to run it:

- `/roast-room --quick ...` seats four advisors for two rounds. For smaller, reversible calls.
- `/roast-room --english ...` runs the whole council in plain English instead of Hinglish.
- `/roast-room --seats kamath,kotak,aman ...` seats only the advisors you name.
- `/roast-room ask kunal ...` gets one answer from one seat.
- `/roast-room board` shows who sits at the table by default and lets you change it.

## Choose who sits at the table

The Chair reads your question and recommends a council from every advisor, with one line on why each fits. You pick the recommended board, your default board, or type changes ("recommended, but add Rajan and drop Aadit"). Every council keeps a seat that guards your downside (usually Kotak) and one that's likely to disagree, so the room argues instead of nodding. Type `/roast-room board` to change the default board or to stop being asked.

## Add your own advisor

```
/newroaster Ratan Tata
```

Claude finds the person's public work, fetches it into `build/` (git ignores it), extracts how they think with verbatim quotes, writes their brain and agent, checks every quote word for word against its source, and registers the seat. YouTube transcripts work best with [yt-dlp](https://github.com/yt-dlp/yt-dlp) installed. Hindi-only videos usually have no English captions and get skipped, so advisors who mostly speak Hindi on record end up with thinner brains.

**Their face in the room:** portraits need a [kie.ai](https://kie.ai/api-key) key in `.env` (`KIE_AI_API_KEY=`). Without one, advisors show a placeholder face. Add a key later and run `/newroaster portrait <name>` for each.

## How it works

- **The council runs in Claude Code.** Each seat is a sub-agent (`.claude/agents/council-*.md`) that reads its own brain (`.claude/skills/roast-room/brains/<name>/`). Claude Code acts as the Chair: it runs the rounds, keeps score, and writes the verdict.
- **Hinglish, with English machine fields.** The Chair and the seats talk in Hinglish; card labels, verdict labels (GO, WAIT, and so on), and JSON keys stay in English so the room and the PDF can read them. Quotes from a brain always stay verbatim in their original language.
- **Each seat scores every option**, weighted by how much its pillar matters. The Chair caps the verdict when a seat flags ruin risk and forces a real argument when everyone agrees too fast.
- **The room only watches.** The Chair writes each step to `sessions/`, and the app plays the files back. Every council is saved, and Past sessions replays any of them.
- **Usage:** a full council is three sub-agent runs per seat (21 for seven). Use `--quick` for small calls.

## What's inside

| Path | What |
|---|---|
| `.claude/skills/roast-room/` | The council skill: protocol, prompts, scoring, report template, and one brain per advisor |
| `.claude/skills/roast-room/roster.json` | Every advisor, your default board, and how the board is picked |
| `.claude/skills/newroaster/` | The `/newroaster` skill and its scripts |
| `.claude/agents/` | One agent per advisor |
| `app/` | The room: a zero-dependency Node server, the web page, and the PDF builder |
| `sessions/` | Your councils |
| `archive/` | The original global edition's seats (Bezos, Buffett, Hormozi, and others) and example sessions, not in the roster |
| `build/` | Raw sources `/newroaster` fetched (kept out of git) |

## About the advisors

These are simulations built from each person's public work. They are not the people, they don't speak for them, and none of them is affiliated with or endorses this project. A seat only quotes a person verbatim when the line is in its brain with a source id, and `python .claude/skills/roast-room/scripts/check_quotes.py sessions/<session>` checks every quote in a council against the brains. Most brains are built from auto-generated YouTube captions, so quotes keep the captions' spelling. Each brain's `sources.md` lists what it was built from.

Based on the Roast Room by AI Automation Society. The code is MIT licensed; see `LICENSE`. The PDF builder bundles [jsPDF](https://github.com/parallax/jsPDF) (MIT) and [Montserrat](https://github.com/JulietaUla/Montserrat) (SIL Open Font License); their licenses sit next to them in `app/public/`.
