# Headless CMS Evaluation – Newark AI Town Hall

Project: **Town Hall – Newark AI Community Hub**  
Stack: **Eleventy (11ty), Node.js 20+, Headless CMS, CRM, Discord, Automations**

We evaluated **Sanity**, **Contentful**, and **Strapi** as potential headless CMS options for the Newark AI Town Hall site. The goal is to support:

- Structured content (events, resources, volunteer roles, blog/vlog)
- Easy editing for non-technical organizers
- Low-cost / free for a civic/nonprofit project
- Smooth integration with **Eleventy**, CRM (HubSpot/Airtable/Notion), and Discord
- Future flexibility for multi-channel content (site + email + social + Discord)

Sanity is required by the assignment; the question is whether it is also the **best fit** for this specific project.

---

## 1. Comparison Table

### 1.1 Summary Comparison

| Criteria                          | **Sanity**                                                                 | **Contentful**                                                           | **Strapi**                                                                 |
| --------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| **Data modeling**                | Very flexible schemas (documents, references, arrays); “structured content” approach. Great for complex, relational content. :contentReference[oaicite:0]{index=0} | Strong content type system with entries & fields, visual modeler. Very polished, more opinionated. :contentReference[oaicite:1]{index=1} | Content types + components + dynamic zones; highly customizable and code-level schemas. Great for developers. :contentReference[oaicite:2]{index=2} |
| **API / querying**               | GROQ query language + REST/HTTP APIs, real-time content APIs; usage-based quotas. :contentReference[oaicite:3]{index=3} | REST & GraphQL APIs, strong CDN, good tooling; some rate limits and model limits on free tier. :contentReference[oaicite:4]{index=4} | Auto-generated REST + optional GraphQL endpoints for all content types. Very powerful but self/Cloud-hosted. :contentReference[oaicite:5]{index=5} |
| **Developer experience**         | Developer-first, customizable Studio (React app), strong 11ty examples and integrations. Fits JS/Node workflows. :contentReference[oaicite:6]{index=6} | Mature SaaS, great docs and tooling, lots of tutorials for SSGs including Eleventy. Slightly heavier enterprise feel. :contentReference[oaicite:7]{index=7} | Open-source Node app, code-driven customization, plugin ecosystem. Requires more DevOps (hosting, security, upgrades), especially if self-hosted. :contentReference[oaicite:8]{index=8} |
| **Editorial workflow**           | Fully customizable Studio UI, real-time collaboration, custom input components. Can tailor exactly to organizers’ needs. :contentReference[oaicite:9]{index=9} | Very polished editorial UI out of the box; workflows, roles, localization. Less customizable at free tier. :contentReference[oaicite:10]{index=10} | Admin panel is good but more “technical”; best when devs can support editors. Workflows less polished than big SaaS players unless you extend it. :contentReference[oaicite:11]{index=11} |
| **Pricing & limits (free tiers)** | Generous free plan aimed at devs and small orgs; quotas around documents, API requests, bandwidth; 1 dataset, ~20 users. :contentReference[oaicite:12]{index=12} | Free plan with 1 space, ~10 users, ~100k+ API calls/month and bandwidth caps; content models now limited (e.g. 25 models). :contentReference[oaicite:13]{index=13} | Self-hosted Community is free but requires your own infrastructure; Strapi Cloud recently added a free plan with modest API/storage limits. :contentReference[oaicite:14]{index=14} |
| **Integration with Eleventy**    | Sanity has official positioning & guides for Eleventy, “zero-config” style integration; works great with 11ty data cascade. :contentReference[oaicite:15]{index=15} | Good Eleventy tutorials and general SSG guidance; integration is straightforward with REST/GraphQL but more generic. :contentReference[oaicite:16]{index=16} | Can be used with Eleventy via REST/GraphQL, but requires running a Strapi backend somewhere (Node server or Strapi Cloud). More moving parts. :contentReference[oaicite:17]{index=17} |
| **Fit for Newark AI Town Hall**  | Excellent: structured events/resources/volunteer models, real-time editing, generous free tier, no server to manage, strong 11ty fit. | Good but possibly overkill and more constrained by free plan limits; better suited to commercial/multi-team setups. | Powerful, but DevOps + hosting overhead is high for a small civic/nonprofit site on a student timeline. Best if we needed full custom backend. |

---

## 2. Individual CMS Evaluations

### 2.1 Sanity

**Data modeling**

- Uses a **schema-driven, structured content** approach: documents, references, arrays, and custom types. Great for modeling **Events**, **Resources**, **Volunteer Roles**, **Blog Posts**, and **People/Partners** with relationships. :contentReference[oaicite:18]{index=18}  
- Very flexible: you can represent Town Hall’s flows like `event -> venue -> host organization` or `resource -> audience tags (parents, educators, youth)` without hacks.

**API / querying**

- Offers **GROQ**, a powerful query language that lets us filter, project and join content in one query; combined with real-time APIs and HTTP/REST endpoints. :contentReference[oaicite:19]{index=19}  
- Works well with SSGs because Eleventy can pull data at build time via Sanity’s JavaScript client or direct HTTP.

**Developer experience**

- Developer-first tooling, with a React-based **Sanity Studio** that lives as a separate app (or can be embedded). :contentReference[oaicite:20]{index=20}  
- Multiple Eleventy-specific articles and “Content Operating System for 11ty” positioning show a clear, supported path: using JavaScript data files (`_data` directory) to pull from Sanity. :contentReference[oaicite:21]{index=21}  
- Fits the course stack: Node.js, modern JS tooling, flexible integration via scripts and webhooks.

**Editorial workflow**

- Sanity Studio is **fully customizable**: we can hide advanced fields, create simple forms for non-technical Newark organizers, and add validation like “event date is required” or “plain-language description required”. :contentReference[oaicite:22]{index=22}  
- Real-time collaboration: multiple editors can work on content at once, which is helpful if students and community partners are editing at the same time.

**Pricing & limits**

- **Free plan**: designed for learning and smaller projects, with quotas for documents, API requests, and bandwidth that are usually enough for early-stage or civic sites. Recent info mentions limits like one dataset, ~10k documents, ~1M API CDN requests, and ~20 users, depending on version of the free plan. :contentReference[oaicite:23]{index=23}  
- **Growth plan**: ~\$15/seat/month if the project ever needs more roles, private datasets, or higher quotas. :contentReference[oaicite:24]{index=24}  

**Eleventy integration**

- Sanity explicitly markets itself as an **Eleventy-friendly CMS**, with “zero-config” style snippets and examples that hook into Eleventy’s data cascade. :contentReference[oaicite:25]{index=25}  
- Good fit for static generation with **11ty + CI/CD**: we can trigger rebuilds on Sanity webhooks when content changes.

**Fit for Newark AI Town Hall**

- Nonprofit/civic context + student team → we want **no self-hosted backend**, a generous free tier, and a CMS that plays nicely with Eleventy.
- Flexible enough to handle **Events**, **Resources**, **Volunteer workflows**, and **blog/vlog content** in one structured schema.
- Customizable Studio allows us to design a very **simple interface** for Newark community staff: they don’t need to see every advanced field.

---

### 2.2 Contentful

**Data modeling**

- Uses **spaces, content types, entries, and assets**. Editors create entries based on content types, with strong tooling for modeling and visualizing relationships. :contentReference[oaicite:26]{index=26}  
- Good for Town Hall’s needs (Events, pages, resources) but content models may feel more constrained than Sanity’s fully code-defined schemas.

**API / querying**

- Mature **REST and GraphQL APIs** with strong CDN backing and analytics; widely used in production. :contentReference[oaicite:27]{index=27}  
- Great for multi-channel content (web, app, etc.), but our project is primarily a single Eleventy site + automations.

**Developer experience**

- Very good docs, SDKs, and tutorials, including **“integrating Contentful with Eleventy / static site generators”** guides. :contentReference[oaicite:28]{index=28}  
- More enterprise-oriented: lots of features we won’t use in a small civic project, which adds complexity.

**Editorial workflow**

- Polished editorial UI with content forms, inline validation, versioning, and collaboration tools. :contentReference[oaicite:29]{index=29}  
- Good UX for editors out of the box, but less customizable than Sanity Studio at the free tier.

**Pricing & limits**

- **Free plan** includes ~10 users, a single space, and capped API calls and bandwidth (e.g. ~100k API calls & ~50GB CDN per month), plus limits like **max 25 content models** after 2025 changes. :contentReference[oaicite:30]{index=30}  
- Works for small sites, but if Town Hall later grows (more content types, more environments, multiple locales), we would hit these limits sooner than with Sanity’s usage-based approach.

**Eleventy integration**

- Official docs and blog posts show how to consume Contentful content in Eleventy builds via REST or GraphQL, so technical feasibility is fine. :contentReference[oaicite:31]{index=31}  

**Fit for Newark AI Town Hall**

- Technically a good option: well-known, stable, easy editor experience.
- **Downside:** the combination of content model limits and a more enterprise-oriented pricing structure makes it less ideal for a low-budget, evolving civic project that may need flexible schemas and cheap experimentation over many semesters.

---

### 2.3 Strapi

**Data modeling**

- Strapi uses **content types, components, and dynamic zones** to build a composable content model. This is powerful for complex apps and APIs. :contentReference[oaicite:32]{index=32}  
- Great for modeling anything from events to multi-tenant content–but the configuration is more code-centric and backend-oriented than Sanity/Contentful.

**API / querying**

- Auto-generates **REST APIs** for every content type, plus optional **GraphQL** support via a plugin. :contentReference[oaicite:33]{index=33}  
- This is fantastic for app-like backends, but for a static Eleventy site, we’d mostly just consume these APIs at build time.

**Developer experience**

- Open-source, Node-based, highly customizable; fits a backend-oriented dev who wants full control over logic, lifecycle hooks, and plugins. :contentReference[oaicite:34]{index=34}  
- However, it requires spinning up and maintaining a **Strapi server**, whether self-hosted or via Strapi Cloud. That means more DevOps (upgrades, security, backups) than Sanity/Contentful.

**Editorial workflow**

- Admin panel is solid, and content editors can manage entries comfortably, but it feels closer to a developer tool than a “no-ops” SaaS CMS. :contentReference[oaicite:35]{index=35}  
- For Newark organizers with low tech literacy, we’d likely need to strongly constrain and clean up the interface.

**Pricing & limits**

- **Self-hosted Community edition** is free, but we must host it (server, database, backups, security). :contentReference[oaicite:36]{index=36}  
- **Strapi Cloud** offers a **Free plan** with moderate limits (API requests, storage, bandwidth) and paid tiers starting around \$15–29+/project/month depending on plan/version. :contentReference[oaicite:37]{index=37}  
- For a small, low-budget civic site, this extra hosting/plan complexity is a drawback vs. pure SaaS CMSes.

**Eleventy integration**

- Technically straightforward: Eleventy can call the Strapi REST/GraphQL APIs in data files at build time.
- But we’d again be responsible for **running and securing** that Strapi backend somewhere, which goes beyond the needs of a static informational site.

**Fit for Newark AI Town Hall**

- Strapi is best when Town Hall also needs a **full custom backend** (e.g., complex dashboards, real-time APIs, integrations beyond Zapier/CRM).
- For this class project and this specific site (static informational with workflows offloaded to CRM/Discord/Zapier), Strapi feels **too heavy** and high-maintenance.

---

## 3. Fit for THIS Project: Newark AI Town Hall

### Project requirements recap

- Multi-page **Eleventy** site with:
  - Events listing & registration flows
  - Resources (guides, PDFs, videos)
  - Volunteer roles & onboarding steps
  - Basic blog/vlog content
- Integrations:
  - CRM (HubSpot/Airtable/Notion)
  - Discord
  - Zapier/Make automation
- Context:
  - Civic/nonprofit project
  - Low budget / free hosting
  - Student teams that will hand the project off over time
  - Non-technical community organizers adding and editing content

### Evaluation based on Town Hall needs

**Data modeling for events & workflows**

- All three can model events, resources, and volunteer roles.
- **Sanity** stands out because it lets us structure content deeply and still keep editors in a custom, simple UI. For example:  
  `event` → `audience tags (parents, educators, youth)` → `location (library vs NJIT)` → `follow-up content (email template, Discord announcement copy)`.

**Developer experience with Eleventy**

- **Sanity** has the clearest story for Eleventy integration (official docs and examples focused specifically on 11ty). :contentReference[oaicite:38]{index=38}  
- **Contentful** has good Eleventy tutorials, but its free plan constraints and enterprise focus feel mismatched to a small civic site.
- **Strapi** requires us to run a Node backend; more moving parts than necessary for a static site.

**Editorial experience for Newark community organizers**

- **Contentful** has a very nice out-of-the-box UI; **Sanity** lets us go a step further by **designing the Studio** around our personas (Angela the parent, James the educator, Aisha the student volunteer).
- With Sanity Studio, we can implement:
  - Plain-language field labels
  - Helper text like “This description should be easy to read out loud”
  - Required fields like “Audience tags” and “Beginner-friendly / Family-friendly flags”

**Pricing & sustainability**

- All three have free options, but:
  - **Sanity**’s free plan is built for developers and small projects with **generous usage-based limits** and no content-model caps. :contentReference[oaicite:39]{index=39}  
  - **Contentful** has stricter limits on models and resources in the free plan, which increases the risk of hitting a ceiling if Town Hall evolves. :contentReference[oaicite:40]{index=40}  
  - **Strapi** may be free to run as code, but we pay in hosting/maintenance time and complexity. :contentReference[oaicite:41]{index=41}  

---

## 4. Final Selection & Justification

### Recommended CMS: **Sanity**

We recommend **Sanity** as the primary CMS for the Newark AI Town Hall project.

**Why Sanity is the best fit:**

1. **Strong alignment with Eleventy**  
   Sanity explicitly supports Eleventy as a first-class static site use case, with guides and examples on querying Sanity content from Eleventy’s data layer. This makes it easier to meet the course requirement of **Eleventy + headless CMS** with a clean architecture. :contentReference[oaicite:42]{index=42}  

2. **Flexible structured content for civic workflows**  
   Sanity’s structured content model (documents, references, arrays, custom types) is ideal for representing **events, audiences, resources, volunteer roles, and follow-up content** in a way that can grow over time as the Town Hall adds more programs. :contentReference[oaicite:43]{index=43}  

3. **Customizable editor experience for non-technical users**  
   We can configure the **Sanity Studio** specifically for:
   - Parents with low tech literacy (show only a few fields, use plain language)  
   - Teachers who need to filter events by age group and topic  
   - Student volunteers who need to log and tag content or events  
   This gives Newark organizers a **tailored console**, not a generic SaaS dashboard. :contentReference[oaicite:44]{index=44}  

4. **Generous free tier & sustainable pricing**  
   Sanity’s free plan provides enough quota (documents, API calls, bandwidth, users) for a small civic site, with the option to upgrade later if the Town Hall scales up. This fits the **nonprofit/educational** context better than enterprise-tier tools. :contentReference[oaicite:45]{index=45}  

5. **Lower operational overhead than Strapi**  
   Unlike Strapi, we do not need to host or maintain a Node backend; Sanity’s platform handles availability, security, and scaling, which is crucial for a student project that needs to remain online after the semester ends. :contentReference[oaicite:46]{index=46}  

6. **Good match for the learning goals of the course**  
   Sanity’s developer-centric design, flexible schema, and usage in modern static site setups (including Eleventy) make it the best teaching tool as well as the best production choice for this project. :contentReference[oaicite:47]{index=47}  

### Why not Contentful?

Contentful is an excellent, production-ready SaaS CMS with a polished UI and strong APIs, but for **Newark AI Town Hall**:

- Free plan limits on **content models** and usage could become a constraint as the project evolves over multiple semesters. :contentReference[oaicite:48]{index=48}  
- The system is more aligned with **commercial / enterprise setups**, whereas we want a more flexible, developer-owned content model and a very customized editor.

### Why not Strapi?

Strapi is powerful and attractive for **custom backend applications**, but:

- It requires **self-hosting or Strapi Cloud**, adding ongoing costs and maintenance overhead that don’t match a simple static Eleventy site. :contentReference[oaicite:49]{index=49}  
- Editor experience is good, but care and feeding of the backend is beyond the scope of this class project and the long-term needs of a civic Town Hall website.

---

## 5. Conclusion

For the **Newark AI Town Hall**, we select **Sanity** as the headless CMS because it:

- Integrates cleanly with **Eleventy** and the required Node.js stack  
- Supports rich **structured content** for events, resources, volunteers, and content hub features  
- Provides a **customizable, accessible Studio** for Newark community partners  
- Offers a **generous free tier** and a path to scale without major architectural changes  
- Minimizes operational overhead vs. self-hosted options like Strapi

Contentful and Strapi were evaluated and are viable in other contexts, but **Sanity best balances developer flexibility, editor experience, cost, and long-term sustainability** for this specific civic project.

```---