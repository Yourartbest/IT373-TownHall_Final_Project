# GitHub Pages Deployment Guide

**Project:** Newark AI Town Hall  
**Hosting:** GitHub Pages  
**Status:** ✅ Configured

---

## 🚀 Quick Start

Your site is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Prerequisites
1. ✅ GitHub repository created
2. ✅ Code pushed to GitHub
3. ⚠️ GitHub Pages enabled in repository settings

---

## ⚙️ Enable GitHub Pages

### Step 1: Repository Settings
1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)

### Step 2: Configure Source
1. Under **Build and deployment**:
   - **Source:** Select `GitHub Actions`
   - This allows the CI/CD workflow to deploy

### Step 3: First Deployment
1. Push code to `main` branch:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - ✅ Run quality gates (linting, formatting)
   - ✅ Build the site
   - ✅ Run Playwright tests
   - ✅ Run Lighthouse audits
   - ✅ Check bundle sizes
   - ✅ Deploy to GitHub Pages

3. Your site will be live at:
   ```
   https://[your-username].github.io/[repository-name]/
   ```

---

## 📋 Deployment Workflow

### Automatic Deployment
The site deploys automatically when:
- ✅ Code is pushed to `main` branch
- ✅ All quality gates pass
- ✅ Build succeeds
- ✅ Tests pass

### Workflow Steps
```yaml
1. Quality Gates
   - Format check
   - JavaScript linting
   - CSS linting
   - Markdown linting

2. Build
   - Install dependencies
   - Build Eleventy site
   - Verify output

3. Test
   - Run Playwright tests
   - Upload test reports

4. Lighthouse
   - Performance audit
   - Accessibility audit
   - SEO audit

5. Bundle Size
   - Check CSS size
   - Check JS size
   - Warn if too large

6. Deploy (main branch only)
   - Upload to GitHub Pages
   - Deploy site
```

---

## 🔧 Configuration Files

### `.github/workflows/ci.yml`
Main CI/CD pipeline with GitHub Pages deployment:
```yaml
deploy:
  name: Deploy to GitHub Pages
  permissions:
    pages: write
    id-token: write
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
```

### `.nojekyll`
Empty file that tells GitHub Pages not to process files with Jekyll.
This is important for Eleventy sites.

### `package.json`
Build scripts:
```json
{
  "scripts": {
    "build": "eleventy",
    "dev": "eleventy --serve --port=8080"
  }
}
```

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain
1. In repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Click **Save**

### DNS Configuration
Add these DNS records at your domain provider:

**For apex domain (example.com):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**For subdomain (www.example.com):**
```
Type: CNAME
Name: www
Value: [your-username].github.io
```

### HTTPS
- ✅ GitHub Pages provides free HTTPS
- ✅ Automatically enabled for custom domains
- ⏱️ May take up to 24 hours to provision certificate

---

## 📊 Monitoring Deployments

### View Deployment Status
1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. View each job's status and logs

### Deployment URL
After successful deployment, find your URL:
1. **Actions** tab → Latest workflow
2. Click **deploy** job
3. See deployment URL in the summary

Or check:
1. **Settings** → **Pages**
2. URL shown at the top

---

## 🐛 Troubleshooting

### Deployment Fails
**Check workflow logs:**
1. Go to **Actions** tab
2. Click failed workflow
3. Review error messages

**Common issues:**
- ❌ Tests failing → Fix test errors
- ❌ Build errors → Check Eleventy config
- ❌ Permissions → Ensure Pages is enabled

### Site Not Loading
**Check:**
1. ✅ Deployment succeeded in Actions
2. ✅ GitHub Pages is enabled
3. ✅ Source is set to "GitHub Actions"
4. ⏱️ Wait 1-2 minutes after deployment

### 404 Errors
**Possible causes:**
1. Missing `.nojekyll` file → Already added ✅
2. Wrong base path → Check Eleventy config
3. Case-sensitive URLs → Use lowercase

---

## 📝 Deployment Checklist

### Before First Deployment
- [x] GitHub repository created
- [x] Code pushed to GitHub
- [x] CI/CD workflow configured
- [x] `.nojekyll` file added
- [ ] GitHub Pages enabled in settings
- [ ] Source set to "GitHub Actions"

### For Each Deployment
- [ ] All tests passing locally
- [ ] Code committed and pushed
- [ ] Workflow runs successfully
- [ ] Site loads at GitHub Pages URL
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] No console errors

---

## 🔄 Updating the Site

### Standard Workflow
```bash
# 1. Make changes locally
npm run dev  # Test locally

# 2. Run quality checks
npm run lint
npm run format
npm test

# 3. Commit and push
git add .
git commit -m "Update content"
git push origin main

# 4. GitHub Actions automatically deploys
# Check Actions tab for status
```

### Rollback
If deployment has issues:
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

---

## 📈 Performance

### Build Time
- **Expected:** 1-3 seconds locally
- **GitHub Actions:** 30-60 seconds total
- **Deployment:** Additional 30-60 seconds

### Optimizations
- ✅ Eleventy builds only changed files
- ✅ GitHub Actions caches npm dependencies
- ✅ Minimal build output (6 pages)
- ✅ No external API calls during build

---

## 🔒 Security

### Secrets (Not Required)
GitHub Pages deployment doesn't require secrets:
- ✅ No API tokens needed
- ✅ No authentication required
- ✅ Built-in GitHub permissions

### Branch Protection (Recommended)
Protect `main` branch:
1. **Settings** → **Branches**
2. Add rule for `main`
3. Enable:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

---

## 📚 Resources

### Documentation
- **GitHub Pages:** https://docs.github.com/en/pages
- **GitHub Actions:** https://docs.github.com/en/actions
- **Eleventy:** https://www.11ty.dev/docs/

### Support
- **GitHub Community:** https://github.community/
- **Eleventy Discord:** https://www.11ty.dev/blog/discord/

---

## ✅ Summary

**Your site is configured for:**
- ✅ Automatic deployment on push to `main`
- ✅ Quality gates (linting, formatting)
- ✅ Automated testing (Playwright)
- ✅ Performance audits (Lighthouse)
- ✅ Bundle size monitoring
- ✅ GitHub Pages hosting

**Next steps:**
1. Enable GitHub Pages in repository settings
2. Push code to `main` branch
3. Wait for deployment to complete
4. Visit your site at the GitHub Pages URL

**Your site will be live at:**
```
https://[your-username].github.io/IT373-TownHall_Final_Project/
```

---

**Last Updated:** December 11, 2024  
**Deployment Platform:** GitHub Pages  
**CI/CD:** GitHub Actions  
**Status:** ✅ Ready to deploy
