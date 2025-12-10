# Web Analytics Evaluation – Newark AI Town Hall

Project: **Town Hall – Newark AI Community Hub**  
Site stack: **Eleventy (11ty), Sanity CMS, Node.js 20+, CRM, Discord, Automations**

Goal: choose an analytics solution that:

- Respects **privacy** and is compatible with **GDPR**
- Integrates cleanly with **Eleventy**
- Works with a **GDPR-compliant cookie consent banner**
- Tracks **basic interactions**:
  - Page views
  - Key events (e.g., event registration, volunteer form submissions)
- Fits a **civic / nonprofit** project (limited budget, low complexity)

We evaluated:

1. **Google Analytics 4 (GA4)** – Traditional, free, widely used.
2. **Plausible Analytics** – Lightweight, paid, privacy-focused.

---

## 1. Comparison Overview

### 1.1 High-Level Comparison

| Criterion                        | **Google Analytics 4 (GA4)**                                        | **Plausible Analytics**                                                |
| -------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **GDPR compliance**             | Possible but complex: needs consent mode, IP anonymization, DPA, etc. | Built from the ground up as privacy-friendly and GDPR-focused.        |
| **Cookie requirements**         | Typically **requires opt-in consent** before tracking (for EU/GDPR). | Can run **cookie-less** in many setups; still good to pair with consent. |
| **Cost**                        | Free (financially) but high complexity.                             | Paid (small monthly fee), simple and transparent usage-based pricing. |
| **Setup complexity**            | Higher: tag manager, consent mode, event config.                     | Low: simple script, event tracking via JS or query params.            |
| **Eleventy integration**        | Easy to add script, but harder with consent + GTM steps.             | Very easy: small script injected in base layout.                      |
| **Consent banner integration**  | Needs wiring into Consent Mode (update tags by consent state).       | Just conditionally load the script if consent is granted.             |
| **Fit for Newark AI Town Hall** | Powerful but overkill and riskier for privacy expectations.          | Ideal: simple, transparent, privacy-forward for a civic project.      |

---

## 2. Google Analytics 4 (GA4)

### 2.1 GDPR Compliance

- GA4 **can** be used in GDPR contexts, but only with careful configuration:
  - Enable **IP anonymization**.
  - Use **Consent Mode** (or similar) so tracking only begins after consent.
  - Sign appropriate **Data Processing Agreement (DPA)** with Google (through your account).
- For a small civic site with non-technical stakeholders, this adds overhead and risk: misconfiguration can easily put you out of compliance.

### 2.2 Cookie Requirements

- GA4 normally sets cookies (for user/session tracking).
- Under GDPR-style regimes, that means:
  - You must **not** load GA4 until the user has **explicitly accepted** analytics cookies.
  - Your cookie banner must:
    - Explain analytics cookies clearly.
    - Allow “Accept” / “Reject” / “Preferences”.
- This fits the assignment, but increases implementation complexity.

### 2.3 Cost

- Financially **free**, which is attractive for a student / civic project.
- Hidden cost: time spent configuring consent, debugging, and maintaining correct settings.

### 2.4 Setup Complexity

To implement GA4 correctly you typically:

1. Create a GA4 property.
2. Optionally set up **Google Tag Manager (GTM)**.
3. Install the GA script or GTM container in your Eleventy layout.
4. Implement **Consent Mode** integration with your cookie banner.
5. Configure events for:
   - Page views (often automatic)
   - Form submissions (custom events)

For this class project, it’s doable but more moving parts than needed.

### 2.5 Integration with Eleventy

- Technically simple to add GA4 to Eleventy:
  - Put the GA script (or GTM snippet) in your base template.
- But once you add **GDPR consent**, you must:
  - Only inject or enable GA after user consent.
  - Update consent state if user changes their preferences.
- It’s easy to get 80% correct and still miss subtle privacy edges.

### 2.6 Integration with Consent Banner

- To be compliant, GA4 must:
  - Honor the “Reject” state by **not loading any tracking script**.
  - Honor “Accept” by enabling tracking.
- Implementation pattern:
  - Cookie banner stores a `analyticsConsent` flag.
  - Eleventy layout conditionally injects GA script only when `analyticsConsent === true`.
  - For GTM/Consent Mode, you might also have to set consent flags in `gtag()` or `dataLayer`.

### 2.7 Pros / Cons for Town Hall

**Pros**

- Free.
- Very powerful, widely documented.
- Easy to hand off to future teams who might already know GA.

**Cons**

- More complex to set up **correctly** with GDPR and cookies.
- Can feel heavy and “surveillance-y” for a **trust-focused civic project**.
- Dashboard is more complex than needed for simple metrics.

---

## 3. Plausible Analytics

### 3.1 GDPR Compliance

- Plausible is designed to be **privacy-friendly**:
  - No individual user-level tracking.
  - No cross-site tracking or ad/remarketing features.
  - Can operate **without cookies**, relying on anonymous data.
- This aligns well with:
  - Civic/nonprofit expectations.
  - The spirit of the assignment’s GDPR + privacy focus.

### 3.2 Cookie Requirements

- Because Plausible is cookie-less by default, in many jurisdictions:
  - You **may not need** a strict opt-in cookie banner just for Plausible.
  - However, your project’s assignment **requires** a GDPR-style cookie consent flow anyway.
- So in this project:
  - We can still respect the banner and only load Plausible after analytics consent, but:
    - We’re in a **better ethical + compliance position**, because even if something is misconfigured, we’re not collecting invasive data.

### 3.3 Cost

- Plausible is **paid**, with small site pricing (often a low monthly fee, sometimes with academic / nonprofit discounts).
- For the project context, we can:
  - Use a **trial** or **student account** if available.
  - Or treat Plausible as “the chosen solution” conceptually and emulate it with a free tier locally for the assignment.

### 3.4 Setup Complexity

Implementation is typically:

1. Create a site on Plausible.
2. Get the **tracking script snippet**.
3. Add snippet to your base Eleventy layout.
4. Optionally add custom events via JS, e.g.:
   ```js
   plausible("event_registration");
