# Testing Guide - Newark AI Town Hall

## ⚠️ Important: Working Directory

All QA/CI commands must be run from the **root project directory**, not from `townhall/`.

```bash
# ✅ Correct - run from root
cd c:\Users\Nurja\Projects\IT373-TownHall_Final_Project
npm test

# ❌ Wrong - don't run from townhall/
cd townhall
npm test  # This won't work!
```

---

## 📁 Project Structure

```
IT373-TownHall_Final_Project/
├── src/                    # Eleventy site source
├── townhall/              # Sanity Studio (separate project)
├── tests/                 # Playwright tests
├── .github/workflows/     # CI/CD pipeline
├── package.json           # Root dependencies (Eleventy, tests, linting)
└── townhall/package.json  # Sanity dependencies (separate)
```

**Two separate Node projects:**
- **Root:** Eleventy site + QA/CI tools
- **townhall/:** Sanity Studio

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies (Eleventy, Playwright, linting tools)
npm install

# Install Sanity dependencies (separate)
cd townhall
npm install
cd ..
```

### 2. Run Development Servers

**Terminal 1 - Eleventy Site:**
```bash
npm run dev
# → http://localhost:8080
```

**Terminal 2 - Sanity Studio:**
```bash
cd townhall
npm run dev
# → http://localhost:3333
```

---

## 🧪 Running Tests

### All tests run from ROOT directory

### Linting

```bash
# Run all linting
npm run lint

# Individual linters
npm run lint:js       # ESLint
npm run lint:css      # Stylelint
npm run lint:md       # Markdownlint

# Check formatting
npm run format:check

# Auto-fix formatting
npm run format
```

### Playwright Tests

```bash
# Run all tests (headless)
npm test

# Run with browser UI visible
npm run test:headed

# Run with Playwright UI (interactive)
npm run test:ui
```

**What gets tested:**
- ✅ Homepage loads and displays correctly
- ✅ Mission section with 3 cards
- ✅ Events section (grid or empty state)
- ✅ Mobile menu opens/closes
- ✅ Keyboard navigation
- ✅ ARIA landmarks and accessibility
- ✅ Focus management
- ✅ Meta tags and SEO

### Lighthouse Audit

```bash
# Build site first
npm run build

# Run Lighthouse
npm run lighthouse
```

**Checks:**
- Performance ≥90%
- Accessibility ≥90%
- Best Practices ≥90%
- SEO ≥90%

---

## 📊 Understanding Test Results

### Playwright Test Output

```
Running 23 tests using 5 workers

  ✓ homepage.spec.js:5:3 › Homepage › should load successfully (1.2s)
  ✓ homepage.spec.js:10:3 › Homepage › should display hero section (0.8s)
  ...
  
23 passed (45s)
```

**If tests fail:**
1. Check that Eleventy site builds: `npm run build`
2. Check `_site/index.html` exists
3. Review error messages in terminal
4. Run `npm run test:headed` to see browser

### Lighthouse Results

```
Performance: 95/100 ✅
Accessibility: 98/100 ✅
Best Practices: 100/100 ✅
SEO: 100/100 ✅
```

Results saved to `.lighthouseci/` folder.

---

## 🔧 Troubleshooting

### "Missing script" errors

**Problem:** Running commands in wrong directory

```bash
# ❌ Wrong
cd townhall
npm test  # Error: Missing script "test"

# ✅ Correct
cd ..  # Go back to root
npm test
```

### Playwright can't find browsers

```bash
# Install Playwright browsers
npx playwright install
```

### Port 8080 already in use

```bash
# Kill existing process or change port in .eleventy.js
# Change: setServerOptions({ port: 8080 })
# To: setServerOptions({ port: 8081 })
```

### Tests fail: "page.goto: net::ERR_CONNECTION_REFUSED"

**Cause:** Eleventy site not built or server not running

**Fix:**
```bash
npm run build
# Check that _site/ folder exists with index.html
```

### Lighthouse fails

**Cause:** Need to build site first

**Fix:**
```bash
npm run build
npm run lighthouse
```

---

## 📝 Updating QA Report

After running tests, update `docs/qa-report.md`:

### 1. Run all tests and capture results

```bash
# Linting
npm run lint > lint-results.txt

# Tests
npm test

# Lighthouse
npm run build
npm run lighthouse
```

### 2. Fill in the template

Open `docs/qa-report.md` and add:
- ✅ Test pass/fail counts
- ✅ Lighthouse scores
- ✅ Bundle sizes (from build output)
- ✅ Screenshots of test results

### 3. Check bundle sizes

```bash
npm run build

# Check CSS size
ls -lh _site/css/

# Check JS size
ls -lh _site/js/

# Total site size
du -sh _site/
```

---

## 🤖 GitHub Actions CI/CD

### Automatic on Push

When you push to GitHub, the CI pipeline automatically:

1. **Quality Gates** - Runs all linting
2. **Build** - Builds Eleventy site
3. **Test** - Runs Playwright tests on 5 browsers
4. **Lighthouse** - Runs performance audits
5. **Bundle Size** - Checks CSS/JS sizes
6. **Deploy** - Deploys to Netlify (main branch only)

### View Results

1. Go to your GitHub repo
2. Click "Actions" tab
3. Click on latest workflow run
4. See results for each job

### Setting Up Netlify Deploy

Add these secrets in GitHub repo → Settings → Secrets:

- `NETLIFY_AUTH_TOKEN` - Get from Netlify → User Settings → Applications → Personal access tokens
- `NETLIFY_SITE_ID` - Get from Netlify → Site Settings → General → Site details → API ID

**Note:** Deploy step will be skipped if secrets aren't set (won't fail the build).

---

## 🎯 Pre-Submission Checklist

Before submitting your project:

```bash
# 1. Run all quality checks
npm run lint
npm run format:check

# 2. Build site
npm run build

# 3. Run all tests
npm test

# 4. Run Lighthouse
npm run lighthouse

# 5. Update QA report
# Edit docs/qa-report.md with results

# 6. Commit and push
git add .
git commit -m "Complete QA/CI setup with test results"
git push
```

### Expected Results

✅ All linting passes (or only minor warnings)  
✅ 23+ Playwright tests pass  
✅ Lighthouse scores ≥90% for all categories  
✅ Bundle sizes reasonable (<100KB CSS, <50KB JS)  
✅ GitHub Actions workflow succeeds  
✅ QA report filled out with actual results

---

## 📚 Additional Resources

- **Playwright Docs:** https://playwright.dev
- **Lighthouse CI:** https://github.com/GoogleChrome/lighthouse-ci
- **ESLint:** https://eslint.org
- **Stylelint:** https://stylelint.io
- **Prettier:** https://prettier.io

---

## 🆘 Need Help?

1. Check this guide first
2. Review error messages carefully
3. Ensure you're in the **root directory**
4. Check that dependencies are installed: `npm install`
5. Verify build succeeds: `npm run build`

**Common mistake:** Running test commands from `townhall/` instead of root!
