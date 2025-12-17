# AI Usage Documentation — Newark AI Town Hall (IT373)

## 1. AI Tools Used

- Cascade (IDE assistant)
- ChatGPT (OpenAI)

## 2. Where AI Was Used (And Why)

### 2.1 Code + Implementation Support

AI assistance was used to:

- Identify where features should be implemented in the Eleventy codebase (layouts, templates, data files)
- Draft and refine JavaScript for interactive UI components (e.g., cookie consent banner behavior)
- Validate that project configuration matched the deployment target (GitHub Pages path prefix)
- Suggest debugging steps for cross-browser issues in Playwright tests

### 2.2 Content + Documentation Support

AI assistance was used to:

- Draft technical documentation and checklists
- Summarize testing outcomes and help structure QA reporting
- Provide wording for user-facing UI text (plain-language tone)

### 2.3 QA + Verification Support

AI assistance was used to:

- Generate verification checklists based on the assignment requirements
- Suggest ways to verify integrations (e.g., Make.com webhook posts, GA4 runtime checks)
- Help interpret test outputs (Playwright, Lighthouse) and propose follow-up actions

## 3. How AI Was Used (Process)

AI was used as a paired assistant.

- I provided context (requirements + project goals) and asked for targeted help
- I reviewed suggestions and adapted them to the project structure
- I validated changes by running builds/tests and manually verifying behavior in the browser

AI was not used as an “auto-complete without review.” All generated or suggested changes were reviewed and tested before being considered final.

## 4. What Was Done Manually

The following work was done manually (without relying on AI to make final decisions):

- Project planning and final decision-making about features and priorities
- Manual QA in the browser (navigation, event pages, forms, cookie banner behavior)
- Running CI-related commands and reviewing test artifacts
- Configuring external services (Sanity, Make.com, HubSpot, GitHub Pages)

## 5. Example Prompts / Requests

Examples of AI prompts/requests used during development:

- “Analyze this project and verify all assignment requirements are met.”
- “Find where event registration is submitted and confirm it posts to the Make.com webhook.”
- “Implement/verify a GDPR cookie consent banner that blocks analytics until consent.”
- “Check how GitHub Pages pathPrefix affects internal links.”
- “Help update the QA report using the final Playwright test results.”

## 6. Risks, Limitations, and Verification

AI can produce incorrect assumptions (e.g., claiming something exists without verifying code).

To mitigate this:

- Requirements were only marked “met” when a concrete file/implementation or live behavior could be verified
- Integration claims (Make.com/HubSpot/Discord automations) were treated as “external proof required” unless documented with screenshots or directly observable behavior
- Browser-level checks were used for runtime behavior like Google Analytics event firing

## 7. Summary

AI was used to accelerate implementation, documentation, and verification, but final responsibility for correctness came from manual review, testing, and runtime validation.
