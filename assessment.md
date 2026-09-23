# MGMT6110 Assessment

Name: Beichao Wang

# Problem Set 1

---

# assessment.md - MMA Deal Hub
**Student:** [Beichao Wang] · **Course:** MGMT 6110 · **Problem Set 1**
**Live App:** [[你的 Vercel 链接](https://my-projectmmadealhub.vercel.app/)]
**GitHub Repository:** [[你的 GitHub 仓库链接](https://github.com/becketown720-lab/MMA-Deal-Hub-Week-2-assignment-.git)]

### Q1: Who are your users, and what changes for them?
User category: External
Job title and situation: office workers, usually work in Singapore CBD area
Where: Central and South Region
How many people are interested in combat sports like MMA in Singapore: Regarding the question of "how many office workers in Singapore are interested in competitive sports like MMA," no publicly available surveys from Sport Singapore, SingStat, or other government sources directly provide the "interest rate rate of MMA/Boxing/Muay Thai/BJJ among office workers," so a definitive percentage cannot be given. A conservative estimate can be made using publicly available data: Sport Singapore's 2025 National Sport & Exercise Participation Survey shows that 76% of Singapore residents exercise at least once a week; meanwhile, in 2024, there were 522 Martial Arts sports interest groups in the community, accounting for approximately 10.8% of all 4,834 sports & fitness interest groups. However, this 10.8% figure represents the "percentage of interest groups," not the population interest rate. Furthermore, Martial Arts is not equivalent to MMA. Therefore, a more reasonable approach is to use it as a proxy. Considering the high sports participation rate among young working professionals, it is estimated that approximately 5–10% of Singapore office workers have some interest in combat sports such as MMA, boxing, Muay Thai, and BJJ; the proportion of those actually willing to train regularly and pay for such training would be lower than this. (Data source: Sport Singapore / data.gov.sg, National Sport & Exercise Participation Survey 2025; Singapore Department of Statistics, Sports and Performing Arts Interest Groups 2024.)
How many of them would prefer lower prices, more flexible contracts, and less loss from early exit for gym membership: Currently, there is no publicly available survey that can directly answer this percentage, so a precise figure should not be fabricated. What can be confirmed is that this is indeed a real pain point for consumers of fitness memberships in Singapore: Singapore's Ministry of Trade and Industry disclosed in 2026 that CASE received 49 recurring-subscription cancellation complaints in 2024 and 44 in 2025, and gym and fitness memberships consistently ranked among the top three industries generating such complaints. Therefore, based on existing data, the most rigorous conclusion is that it is impossible to reliably give a figure for "X% who want more flexible contracts," but there is clear evidence that gym/fitness membership cancellation/lock-in is a real point of consumer friction. To obtain a specific percentage, one needs to conduct their own customer survey or choice experiment, rather than extrapolating from existing official data. (Data source: Singapore Ministry of Trade and Industry / CASE; Sport Singapore National Sport & Exercise Participation Survey.)
In brief conclusion, according to CASE's annual complaint statistics, complaints about refunds/cancellations of contracts in the fitness and boxing gym industry remain high. Lack of contract flexibility and excessive penalties for cancellation are the core pain points commonly faced by fitness and combat sports consumers.
The philosophy behind my product design is to solve the pain point of the problem above, through finding the transferable gym contracts (although they are in small numbers among the gyms in Singapore) and make good use of it as the original holders can not fulfill the contracts due to various reasons. The process is designed to ease the difficulty to enter MMA gym for customers due to afraid of high penalty of cancelling gym contract and stubborn contract term.

Q2:Augmented capacity and constrained capacity
As a zero-code/non-professional front-end developer, I was able to build a complete and working React interactive page using natural language within 30 minutes, freeing up my energy to focus on product logic design.
The Constraint: Inability to evaluate unread code while creating and relying on tool defaults. Because the AI ​​generated over a dozen React components and configuration files in seconds, I could only evaluate the product by inspecting its surface-level preview (UI) rather than auditing the underlying codebase.

Exact timing:
When importing the codebase into Vercel, Vercel automatically flagged "Environment variable 2 detected," revealing that Google AI Studio had quietly injected the server-side Gemini API key handler into the vite.config.ts file. I didn't realize the existence of this hidden backend scaffolding code until Vercel exposed it during deployment; masterprompt still cannot replace manual verification.

Q3: In, on, or out of the loop: where was your judgment actually needed? 

Q3-part 1：
In modern digital marketplaces, the allocation of transaction serial numbers and queue positions must be fully automated, with no human intervention. For example, in MMA Deal Hub, the generation of transaction serial numbers and queue numbers occurs after a user clicks the application button. Introducing human intervention at this step would create a fatal bottleneck, resulting in extremely low operational efficiency and wasted human resources. If manual verification or approval of each reference ID by a human operator is required, order processing delays can skyrocket from milliseconds to minutes, severely impacting the user experience for CBD office workers attempting to complete tasks during their lunch breaks.

Q3-part 2：
What would have to be true:
Serial Number Generation: The ID generation algorithm for each order on MMA Deal Hub must be strictly defined to ensure that each reference number (e.g., #MMA-2026-889) is unique and completely impossible to duplicate.
System Security: Strict front-end input validation and anti-bot measures must be enabled to prevent malicious scripts from abusing the system and hindering genuine user transactions.
Metrics to be Measured (What has to be measured):
Collision Rate: A measured 0.00% reference ID collision rate across different ID's sessions.  
Queue Consistency Rate: 100% audit accuracy verifying that queue timestamps are strictly match transaction submission order without mistakes.  

Q3-part 3
Verification of the authenticity of the secondhand contract and the seller's ownership. 

Core Reasons and Risk Allocation:
This step involves complex legal contract issues, potential fraud, and the contract enforcement rules established by MMA gyms. These cannot be completely entrusted to automated visual models or AI. It is best to contact Singapore government departments and request facial ID verification of the buyer and seller's authenticity. If the fitness membership listed on the platform is unauthorized, stolen, or expired, or if the original gym strictly prohibits contract transfers, the resulting economic losses and legal liabilities will be directly borne by the platform and the unsuspecting buyer. The risks are significant and legally binding; once payment or transfer is completed, it is irreversible. Forged PDF contracts or fake screenshots can easily deceive automated AI verification. Therefore, regardless of operating costs or scale limitations, before any secondhand contract is listed, the original contract documents and the user's true identity must be reviewed by trained compliance personnel, and the gym transfer terms must be verified.


Q4: What did it build that you never sketched? 

When pushing the code to GitHub and importing it into Vercel for deployment, I discovered that Vercel automatically detected two environment variables. This is because the Google AI Studio automatically generated configuration files for the Gemini API Key. Although my Master Prompt explicitly required not to call external APIs, the toolchain silently set up a preparatory architecture for connecting to the AI ​​backend. 
Discovery time: Found in the configuration preview interface of Vercel Deploy. 
Improvement plan: In the future, the Code tab should be opened immediately (After gaining more code knowledge from class) after AI code generation to check the package.json dependencies and configuration files, rather than simply relying on the Preview's runtime effect.Also, review interface of Vercel Deploy is always necessary.


Q5: Learning pointers for the organisational context

Point 1: Schedule more budget and hire AI sanction professionals on AI governance, especially on underlying code generating status sanctions, authorization has to be made before deployment.
Point 2: A sound accountability mechanism must be established, with clear records of who operates and generates the AI. This will allow for accountability if problems occur. Accountability can be achieved in two steps: first, the AI ​​operator conducts a self-inspection to identify problems; second, the AI ​​review team investigates. If problems occur in the second step, the operator will face severe penalties.
Point 3: Before deploying any AI-assisted generated application, business units must mandate the archiving of a complete PROMPTS.md file containing the full R&D and GOC codes in their GitHub repository. This allows for future traceability by those taking over (avoiding situations where the person who wrote the code leaves, leaving the code unattended). The professor's requirement for detailed documentation of every prompt is essential. This corresponds to my use of PROMPTS.md to record the process from the Master Prompt during development.

---

# Assessment — MGMT6110 Problem Set 2

**Student:** Beichao Wang  
**Project:** MMA Deal Hub  
**Live site:** https://my-projectmmadealhub.vercel.app/  
**GitHub repository:** https://github.com/becketown720-lab/MMA-Deal-Hub-Week-2-assignment-

## What was missing from the Problem Set 1 prototype

My original prototype made several claims that its code could not support with real evidence.

1. The screen presented gym names, prices, discounts and availability as real deals, but those values were fictional data created for the prototype. I could not identify a reliable public source for second-hand MMA membership contracts, so I kept the examples but labelled them clearly as fictional and illustrative.
2. The screen used phrases such as “verified,” “transfer approved” and “save up to 40%,” although there was no verification service or live listing database behind those claims. I removed or replaced those phrases instead of pretending that an API could validate them.
3. The confirmation flow claimed that an order was placed, a queue position was assigned and a coordinator would contact the user. The form only changed local browser state and sent nothing to a server, so I relabelled the entire flow as a browser-only demonstration.

Because the core contract data could not be sourced truthfully, I chose one smaller claim that could be supported by a real external source: current weather for central Singapore. This is relevant to a user deciding whether to travel to a CBD gym. The browser now calls my own `/api/weather` function, which calls Open-Meteo and returns current temperature, precipitation and observation time. The fictional contract examples remain clearly disclosed as prototype data.

## Front-end criteria and self-assessment

| Criterion | Why it matters to this user | How another person can test it | Mark and evidence |
|---|---|---|---|
| **1. A first-time visitor understands the product and its limits.** | A CBD office worker should quickly understand that this is a contract-transfer prototype and should not mistake example listings for real offers. | Open the home page without prior explanation and read the main heading, introductory copy, listing status and footer. | **Met.** The page describes the contracts as examples and fictional prototype data. Cards say “Illustrative listing,” and the footer states that no real order is submitted. |
| **2. The main demonstration flow can be completed without instruction.** | The product exists to let a user explore an example, enter test details and preview a result. | Select a contract example, enter a test name and phone number, submit the form, view the demo result and return to the examples. | **Met.** I completed this flow on the deployed site. The form labels, result screen and return controls all describe a demonstration rather than a real transaction. |
| **3. Live weather is understandable and traceable.** | A user should be able to distinguish the live value from the fictional listings and know when and where it came from. | Compare the header with `/api/weather`, check the observation time and follow the source link in the footer. | **Met.** The header shows current CBD temperature, precipitation and observation time. The footer credits and links to Open-Meteo. |
| **4. The screen explains different data states in useful language.** | If an external provider is slow, empty, refusing requests or unreachable, the user should not see a permanent spinner or blank area. | Reproduce the loading, empty, refused and unreachable conditions and compare the visible messages. | **Met.** I deliberately tested all four states. Each produced a different sentence that described what was happening. |
| **5. The interface remains usable at narrow widths.** | A user may open the product on a phone while travelling to or from work. | Open the deployed site at a phone-sized width and complete the discovery and demo reservation flow without horizontal scrolling or hidden controls. | **Partly met.** The components use responsive layouts and long status messages wrap, but my recorded final checks were mainly on a desktop browser. I did not complete a full final test on a physical phone. |
| **6. The live weather materially changes the user’s gym decision.** | Live data is most valuable when it helps the user choose an action rather than acting as decoration. | Compare recommendations or interface behavior under different weather values and check whether the product explains how weather affects a gym choice. | **Not met.** Weather is current and visible, but it does not filter, rank or change the contract examples. It provides context only. A later version could use rain conditions to suggest nearer MRT options without pretending the fictional listings are real. |

## Back-end criteria and self-assessment

| Criterion | Why it matters to this user | How another person can test it | Mark and evidence |
|---|---|---|---|
| **1. The browser reaches the external source only through my back end.** | The server boundary makes the data flow easier to control and prevents provider details or future credentials from being placed in browser code. | Inspect the Network panel and search `src` for `api.open-meteo.com`; the browser should request `/api/weather` only. | **Met.** `Header.tsx` fetches the relative `/api/weather` route, and the Open-Meteo URL exists only in the server functions. |
| **2. The function maps the real response shape without inventing values.** | Incorrect field names or treating zero as missing would silently show false weather information. | Call Open-Meteo manually, compare its fields with `/api/weather`, and test a valid precipitation value of zero. | **Met.** I called Open-Meteo before prompting and supplied the observed `current` and `current_units` fields to Gemini. The function checks `null` and `undefined`, so `0` remains valid. |
| **3. Empty, refused and unreachable conditions remain distinct.** | These conditions have different causes and should support different user responses and debugging actions. | Temporarily remove the current fields, use an invalid latitude, and use a nonexistent hostname; inspect both endpoint JSON and the page each time. | **Met.** The empty test returned HTTP 200 with `data: null`; the refused test returned the provider’s non-2xx status with `kind: "refused"`; the unreachable test returned HTTP 502 with `kind: "unreachable"`. |
| **4. The health endpoint reports useful status without exposing unnecessary details.** | Someone maintaining the product should be able to separate an app problem from an upstream problem quickly. | Open `/api/health` and confirm that it reports service status, credential requirement, upstream status and check time without returning the upstream body or URL. | **Met.** The deployed endpoint returned `status: "ok"`, `service: "Open-Meteo"`, `credentialRequired: false`, `upstreamStatus: 200` and a runtime timestamp. It uses `Cache-Control: no-store`. |
| **5. No secret is exposed or invented.** | A public repository must not leak credentials, and a no-key provider should not lead to unnecessary secret handling. | Search the repository and browser bundle for API keys or invented environment variables, and check the health response. | **Met.** Open-Meteo requires no key. The project introduces no weather credential or environment variable, and the health endpoint explicitly reports `credentialRequired: false`. |
| **6. External calls have bounded waiting and appropriate caching.** | A slow provider should not leave the function waiting indefinitely, and repeated page loads should not call a relatively stable source unnecessarily. | Inspect `api/weather.js` for the timeout and cache policy, then inspect deployed response headers and test an actual timeout. | **Partly met.** The code uses an eight-second `AbortController` timeout and `s-maxage=900, stale-while-revalidate=1800`. I tested a network failure with a nonexistent hostname, but I did not independently time an eight-second timeout or record the deployed cache header in the browser. |

## Four-state test record

| State | Test method | Evidence observed | Final action |
|---|---|---|---|
| **Loading** | Enabled `3G` throttling in Chrome DevTools, disabled cache and refreshed. | The header displayed “Getting the latest Singapore CBD weather…” while the request was pending. | Restored `No throttling`. |
| **Empty** | Temporarily removed `current=temperature_2m,precipitation` from the Open-Meteo request. | `/api/weather` returned `data: null`, and the page said that no current reading was available. | Continued to the next controlled test. |
| **Refused** | Restored the current fields and temporarily set latitude to `999`. | Open-Meteo returned a non-2xx response; my endpoint classified it as `refused`, and the page said the provider refused the request. | Continued to the next controlled test. |
| **Unreachable** | Temporarily changed the provider host to `weather-service-test.invalid`. | My endpoint returned HTTP 502 with `kind: "unreachable"`, and the page said that the service could not be reached. | Restored the correct production endpoint. |

After the tests, I restored the exact production URL with latitude `1.29`, removed the `.invalid` hostname, pushed the final version and checked the deployment again. The home page returned to the live success state, `/api/weather` returned current Open-Meteo data, and `/api/health` reported an upstream status of 200.

## Human–AI collaboration assessment

# Assessment — MGMT6110 Problem Set 2

**Student:** Beichao Wang  
**Project:** MMA Deal Hub  
**Live site:** https://my-projectmmadealhub.vercel.app/  
**GitHub repository:** https://github.com/becketown720-lab/MMA-Deal-Hub-Week-2-assignment-

## What was missing from the Problem Set 1 prototype

My original prototype made several claims that its code could not support with real evidence.

1. The screen presented gym names, prices, discounts and availability as real deals, but those values were fictional data created for the prototype. I could not identify a reliable public source for second-hand MMA membership contracts, so I kept the examples but labelled them clearly as fictional and illustrative.
2. The screen used phrases such as “verified,” “transfer approved” and “save up to 40%,” although there was no verification service or live listing database behind those claims. I removed or replaced those phrases instead of pretending that an API could validate them.
3. The confirmation flow claimed that an order was placed, a queue position was assigned and a coordinator would contact the user. The form only changed local browser state and sent nothing to a server, so I relabelled the entire flow as a browser-only demonstration.

Because the core contract data could not be sourced truthfully, I chose one smaller claim that could be supported by a real external source: current weather for central Singapore. This is relevant to a user deciding whether to travel to a CBD gym. The browser now calls my own `/api/weather` function, which calls Open-Meteo and returns current temperature, precipitation and observation time. The fictional contract examples remain clearly disclosed as prototype data.

## Front-end criteria and self-assessment

| Criterion | Why it matters to this user | How another person can test it | Mark and evidence |
|---|---|---|---|
| **1. A first-time visitor understands the product and its limits.** | A CBD office worker should quickly understand that this is a contract-transfer prototype and should not mistake example listings for real offers. | Open the home page without prior explanation and read the main heading, introductory copy, listing status and footer. | **Met.** The page describes the contracts as examples and fictional prototype data. Cards say “Illustrative listing,” and the footer states that no real order is submitted. |
| **2. The main demonstration flow can be completed without instruction.** | The product exists to let a user explore an example, enter test details and preview a result. | Select a contract example, enter a test name and phone number, submit the form, view the demo result and return to the examples. | **Met.** I completed this flow on the deployed site. The form labels, result screen and return controls all describe a demonstration rather than a real transaction. |
| **3. Live weather is understandable and traceable.** | A user should be able to distinguish the live value from the fictional listings and know when and where it came from. | Compare the header with `/api/weather`, check the observation time and follow the source link in the footer. | **Met.** The header shows current CBD temperature, precipitation and observation time. The footer credits and links to Open-Meteo. |
| **4. The screen explains different data states in useful language.** | If an external provider is slow, empty, refusing requests or unreachable, the user should not see a permanent spinner or blank area. | Reproduce the loading, empty, refused and unreachable conditions and compare the visible messages. | **Met.** I deliberately tested all four states. Each produced a different sentence that described what was happening. |
| **5. The interface remains usable at narrow widths.** | A user may open the product on a phone while travelling to or from work. | Open the deployed site at a phone-sized width and complete the discovery and demo reservation flow without horizontal scrolling or hidden controls. | **Partly met.** The components use responsive layouts and long status messages wrap, but my recorded final checks were mainly on a desktop browser. I did not complete a full final test on a physical phone. |
| **6. The live weather materially changes the user’s gym decision.** | Live data is most valuable when it helps the user choose an action rather than acting as decoration. | Compare recommendations or interface behavior under different weather values and check whether the product explains how weather affects a gym choice. | **Not met.** Weather is current and visible, but it does not filter, rank or change the contract examples. It provides context only. A later version could use rain conditions to suggest nearer MRT options without pretending the fictional listings are real. |

## Back-end criteria and self-assessment

| Criterion | Why it matters to this user | How another person can test it | Mark and evidence |
|---|---|---|---|
| **1. The browser reaches the external source only through my back end.** | The server boundary makes the data flow easier to control and prevents provider details or future credentials from being placed in browser code. | Inspect the Network panel and search `src` for `api.open-meteo.com`; the browser should request `/api/weather` only. | **Met.** `Header.tsx` fetches the relative `/api/weather` route, and the Open-Meteo URL exists only in the server functions. |
| **2. The function maps the real response shape without inventing values.** | Incorrect field names or treating zero as missing would silently show false weather information. | Call Open-Meteo manually, compare its fields with `/api/weather`, and test a valid precipitation value of zero. | **Met.** I called Open-Meteo before prompting and supplied the observed `current` and `current_units` fields to Gemini. The function checks `null` and `undefined`, so `0` remains valid. |
| **3. Empty, refused and unreachable conditions remain distinct.** | These conditions have different causes and should support different user responses and debugging actions. | Temporarily remove the current fields, use an invalid latitude, and use a nonexistent hostname; inspect both endpoint JSON and the page each time. | **Met.** The empty test returned HTTP 200 with `data: null`; the refused test returned the provider’s non-2xx status with `kind: "refused"`; the unreachable test returned HTTP 502 with `kind: "unreachable"`. |
| **4. The health endpoint reports useful status without exposing unnecessary details.** | Someone maintaining the product should be able to separate an app problem from an upstream problem quickly. | Open `/api/health` and confirm that it reports service status, credential requirement, upstream status and check time without returning the upstream body or URL. | **Met.** The deployed endpoint returned `status: "ok"`, `service: "Open-Meteo"`, `credentialRequired: false`, `upstreamStatus: 200` and a runtime timestamp. It uses `Cache-Control: no-store`. |
| **5. No secret is exposed or invented.** | A public repository must not leak credentials, and a no-key provider should not lead to unnecessary secret handling. | Search the repository and browser bundle for API keys or invented environment variables, and check the health response. | **Met.** Open-Meteo requires no key. The project introduces no weather credential or environment variable, and the health endpoint explicitly reports `credentialRequired: false`. |
| **6. External calls have bounded waiting and appropriate caching.** | A slow provider should not leave the function waiting indefinitely, and repeated page loads should not call a relatively stable source unnecessarily. | Inspect `api/weather.js` for the timeout and cache policy, then inspect deployed response headers and test an actual timeout. | **Partly met.** The code uses an eight-second `AbortController` timeout and `s-maxage=900, stale-while-revalidate=1800`. I tested a network failure with a nonexistent hostname, but I did not independently time an eight-second timeout or record the deployed cache header in the browser. |

## Four-state test record

| State | Test method | Evidence observed | Final action |
|---|---|---|---|
| **Loading** | Enabled `3G` throttling in Chrome DevTools, disabled cache and refreshed. | The header displayed “Getting the latest Singapore CBD weather…” while the request was pending. | Restored `No throttling`. |
| **Empty** | Temporarily removed `current=temperature_2m,precipitation` from the Open-Meteo request. | `/api/weather` returned `data: null`, and the page said that no current reading was available. | Continued to the next controlled test. |
| **Refused** | Restored the current fields and temporarily set latitude to `999`. | Open-Meteo returned a non-2xx response; my endpoint classified it as `refused`, and the page said the provider refused the request. | Continued to the next controlled test. |
| **Unreachable** | Temporarily changed the provider host to `weather-service-test.invalid`. | My endpoint returned HTTP 502 with `kind: "unreachable"`, and the page said that the service could not be reached. | Restored the correct production endpoint. |

After the tests, I restored the exact production URL with latitude `1.29`, removed the `.invalid` hostname, pushed the final version and checked the deployment again. The home page returned to the live success state, `/api/weather` returned current Open-Meteo data, and `/api/health` reported an upstream status of 200.

## Human–AI collaboration assessment

### Q1. Where did the agent make you faster, and by how much?

Google AI Studio made the whole development process much faster for me. It did more than generate another front-end page: with focused prompts, it produced the weather function, the health endpoint and the React connection between the back end and the existing interface. For example, it created `api/weather.js`, including the fetch, timeout, response mapping and error branches, in a few minutes. Writing this from scratch would first have required me to learn the Vercel function format and then debug JavaScript response handling, which I estimate would have taken me at least several hours. The agent also guided me through deliberately testing loading, empty, refused and unreachable situations. This allowed me to experience a more complete development process than simply building a visual front end. I used the time saved to inspect the generated code, compare the deployed JSON with the real source and observe what users would see when the service failed.

### Q2. Where did it cost you time, and whose fault was that?

The clearest avoidable loss of time occurred when I asked AI Studio to revise the prototype wording. The interface froze, and after I refreshed it showed a checkpoint for three documentation files even though the requested strings in `GymDiscoveryScreen.tsx` had not changed. I lost roughly fifteen minutes checking the screen, locating the component and confirming that the old text was still present. The tool failed to complete or clearly report the requested edit, while my first wording instruction also left room for interpretation. I fixed this by inspecting the target file and sending a shorter prompt with exact before-and-after replacements.

There was also a slower part of the workflow that I would not describe as useless waste: I sent a separate prompt for almost every small change. This created more rounds of prompting, checking, pushing and redeploying, but it limited the amount that could go wrong in each round and made the AI’s output easier to inspect. At the current reliability level, I think that cost was worthwhile. If programming hallucinations become much less common in the future, it may become reasonable to combine more changes into one request. However, I would increase the size of each step only after evidence showed that the lower error rate was real, because speed gained by removing review would not be useful if errors became harder to locate.

### Q3. Did it ever hand you something that looked right and was not?

Yes. Gemini’s first `api/health.js` response said that `Cache-Control: no-store` was applied to every health response. The explanation sounded complete and the build passed. However, the code defined `responseHeaders` after the request-method check, so the early HTTP 405 response returned before that header could be applied. I found this while reading the file before moving to frontend integration. I rejected the claim that every path was covered and sent a correction prompt that moved the header definition before the method check and passed it to the 405 response. The second version preserved the other behavior and met the stated requirement.

### Q4. What did you have to know in order to supervise it?

To catch the health-endpoint mistake, I had to understand that an early `return` ends the function and that headers set later cannot affect a response that has already been sent. A successful build only proved that the syntax was valid; it did not prove that every runtime path satisfied the requirement. I also needed to understand the real Open-Meteo response shape and that precipitation of `0` is valid data. That is why I called the API manually and gave Gemini the exact `current` and `current_units` fields before it wrote the parser. One weakness in my supervision is that I did not independently inspect the deployed cache header or force the full eight-second timeout. Catching those gaps would require checking response headers and timing behavior, not only reading the source and viewing the page.

### Q5. Which decisions did you keep, and should you have kept more or fewer?

I kept the decisions about product scope, source selection and user-facing truthfulness. I chose Open-Meteo because it was public, required no credential and supplied a current fact relevant to travel in central Singapore. I decided that unsourced gym listings should be labelled fictional rather than presented as verified deals. I also specified the separate loading, empty, refused and unreachable messages, the 15-minute cache period, the health information that could be returned safely, and the browser-only wording for the reservation demonstration. I delegated production work such as JavaScript syntax, TypeScript types, component markup and build checks. At first, I had allowed the earlier AI-generated interface to settle a decision I should have kept: it presented fictional listings and local state changes as verified contracts and a real order. I corrected that boundary after deployment by rewriting the visible claims. I would keep product claims and failure messages under human approval in future, while continuing to delegate implementation details.

### Q6. What would this mean for a team of thirty?

The most important governance rule I would take from this project is: execute one clearly defined step at a time and repeatedly cross-check the result. For a team of thirty, each AI-generated change should therefore be small enough for a named owner to understand, test and explain. It should then be reviewed by a second person before being merged. Automated checks should cover types, builds, secret scanning and the success, empty, refused and unreachable response contracts, while a staging deployment and its health endpoint should be checked before production. Decisions about the data source, unsupported business claims, privacy, cache policy and user-facing failure messages would require explicit human approval. The prompt log and a short decision record would stay with each change. This process is slower than allowing the agent to change many files at once, but the repeated cross-checks reduce the chance that one confident AI error spreads through a larger system. If models become more reliable, the size of each step could grow, but the ownership and verification points should remain.

## Current limitations I would address next

The production weather integration works, but it remains contextual rather than central to the gym-selection task. I would next connect weather to a modest, explainable user action, such as highlighting examples closest to an MRT station when rain is present. Before doing that, I would test the complete flow on a physical phone, inspect the deployed cache headers and add repeatable endpoint tests so future changes do not require temporarily changing the production URL.

