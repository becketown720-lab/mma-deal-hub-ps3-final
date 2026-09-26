# predictions.md

## 1. My product
- Live address: https://mma-deal-hub-w5.vercel.app/
- Target audience & core purpose: CBD office workers who want to train MMA near work; 
  it lets them compare and buy discounted second-hand MMA gym contracts in Central and South Singapore.
- Health check status (Step 1, Saturday 26 September 2026, ~12:20 SGT):
  /api/health returned healthy [{"status":"ok","service":"Open-Meteo","credentialRequired":false,"upstreamStatus":200,"checkedAt":"2026-09-26T04:35:07.758Z"}]
- Devices and browsers used for evaluation: MacBook [BROWSER] and iPhone Safari

## 2. My findings
One finding per issue.

### 2a. My own heuristic evaluation

### Finding 1
- Where: [ADDRESS AND EXACT SCREEN]
- Action & Observed Result: [STEP-BY-STEP ACTIONS AND SYSTEM RESPONSE]
- Applied heuristic: [NUMBER AND NAME]
- Component/Scope: [SCREEN OR SYSTEM-LEVEL, WITH RATIONALE]
- Severity & Justification: [RATING 0–4, EXPLAINING CORE DRIVER]
- Proposed fix: [EXPECTED BEHAVIOR / POST-REPAIR STATE]

[DUPLICATE BLOCK FOR ADDITIONAL FINDINGS]

### 2b. AI-assisted findings (manually verified on live site)

### Finding A1
- Where: https://mma-deal-hub-w5.vercel.app/, main listing page, on all contract cards: 
  the "Illustrative listing" text under Remaining Duration, the summary line "Showing 6 illustrative contract examples", 
  and the "Featured Examples" sort option.
- Action & Observed Result: I checked the top two cards on laptop and phone as a CBD worker looking for a deal. 
  Each card shows a price, discount badge, and a "Select Contract" button like a real offer, but is labelled "Illustrative listing" 
  with a green checkmark next to it. Nothing says whether I can actually take over this contract, and the green checkmark looks like a verification badge.
- Applied heuristic: #2 Match Between System and the Real World.
- Component/Scope: Screen-level. The page already tags these as illustrative, so it should explicitly say whether each listing can actually be ordered.
- Severity & Justification: 3 (Major). Misleads users and damages trust. If a user clicks "Select Contract" thinking it's a real offer and then finds out it's just a sample, they won't trust any price on the site.
- Proposed fix: Before clicking "Select Contract", users can easily tell whether a listing is available or just an example, and sample tags shouldn't look like verification badges.

### Finding A2
- Where: https://mma-deal-hub-w5.vercel.app/, main listing page, Monthly Fee and Remaining Duration box on each card.
- Action & Observed Result: I tried to compare Apex Combat Studio ($135/mo, 8 months left) with Metropolis Strike & Grapple ($118/mo, 4 months left). 
  Because monthly fees and months are shown separately, I had to calculate in my head that the first costs $1,080 total and the second $472, plus how much each saves compared to retail price.
- Applied heuristic: #2 Match Between System and the Real World.
- Component/Scope: Screen-level. The card already has the monthly rate, regular rate, and remaining months needed to calculate this.
- Severity & Justification: 2 (Minor). Happens every time a user compares two contracts, though they can do the math themselves.
- Proposed fix: Show the total remaining cost and total savings on each card so users can compare two contracts at a glance.

### Finding A3
- Where: https://mma-deal-hub-w5.vercel.app/, main listing page, "Filter Duration" dropdown at the top.
- Action & Observed Result: I opened the page on phone and laptop without changing filters. On both screens, the collapsed dropdown reads "All Durations (3 - 14 m", cutting off the text so the full filter option isn't visible.
- Applied heuristic: #6 Recognition Rather than Recall.
- Component/Scope: Screen-level. The text is already there; the dropdown container is just too narrow or the label is too long.
- Severity & Justification: 1 (Cosmetic/Low). Low severity because users can work around it. Opening the dropdown reveals the full text, so no workflow is blocked.
- Proposed fix: Make sure the selected filter label is fully readable on both mobile and laptop without opening the dropdown.

### Finding A4
- Where: https://mma-deal-hub-w5.vercel.app/, header section, weather card widget ("CBD 28.8°C · Rain 0.2 mm, Observed ... SGT").
- Action & Observed Result: I opened the site on my phone. The weather widget takes up a large part of the header above the sort and filter controls, and nothing explains why weather matters when choosing a gym contract.
- Applied heuristic: #8 Aesthetic and Minimalist Design.
- Component/Scope: Screen-level. The design gives high priority to weather data without explaining why it's useful here.
- Severity & Justification: 2 (Minor). Affects every mobile user upon loading by pushing main content down, though it doesn't block them.
- Proposed fix: Either explain how weather helps the decision (e.g., highlighting gyms near sheltered MRT exits on rainy days) or make it take less space than the controls and listings.

### Finding A5
- Where: https://mma-deal-hub-w5.vercel.app/, header logo on mobile and laptop.
- Action & Observed Result: When loading the page, the "MMA" text inside the orange logo badge is wider than the badge and spills past the left edge.
- Applied heuristic: #8 Aesthetic and Minimalist Design.
- Component/Scope: Screen-level (CSS layout issue).
- Severity & Justification: 1 (Cosmetic). Doesn't affect any task, even though it's the first thing on the page.
- Proposed fix: Fix logo styling so the text stays fully inside the badge on all screen sizes.

### Finding A6
- Where: https://mma-deal-hub-w5.vercel.app/, main listing page, region tag on contract cards ("CENTRAL REGION DEAL").
- Action & Observed Result: Reading the first card showed repeated region tags: the top tag says "CENTRAL REGION DEAL" and the location line right below says "Tanjong Pagar (Central)".
- Applied heuristic: #8 Aesthetic and Minimalist Design.
- Component/Scope: Screen-level.
- Severity & Justification: 1 (Cosmetic). Redundant text wastes space, but nobody gets confused by it.
- Proposed fix: Keep region info concise so each card lists its region only once.

## 3. My predictions
1. Top three findings my groupmates will likely raise, and expected severity:
   - **A1 (Severity 3):** Putting "Illustrative listing" tags next to "Select Contract" buttons on every card will immediately make anyone ask if the deals are real.
   - **A3 (Severity 1):** The cut-off dropdown label is visible right away on every screen.
   - **A4 (Severity 2):** The weather widget takes over the mobile screen first without explaining its purpose.
2. The heuristic my product breaks worst:
   - **Heuristic #2 (Match Between System and the Real World):** Listing cards use internal terminology (*illustrative, featured, monthly fee*) instead of user-focused decision terms (*Can I get this now, and what's my total cost?*).
3. Finding that would prove my evaluation was wrong:
   - If my groupmates find Severity 3 or 4 issues under **Heuristic #5 (Error Prevention)** or **Heuristic #9 (Error Recovery)** in the mobile order flow (like double submissions or no confirmation screen), my evaluation was flawed because I focused mostly on the listing page and didn't stress-test the checkout flow.
  
   - ## 4. Findings I had already heard in the studio
   - N/A
