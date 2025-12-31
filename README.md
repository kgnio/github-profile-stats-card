# GitHub Profile Stats Card (SVG)

A simple, themeable **SVG profile card** that you can embed directly into your GitHub README.
No image uploads, no manual updates — just a single URL.

👉 **Live demo & theme gallery:**  
https://kgnio-profile-card.vercel.app/

---

## What does this do?

This project generates a **dynamic SVG card** for GitHub profiles.

You embed it in your README like a normal image, but the image is generated on demand.
That means:

- Always crisp (SVG, not PNG)
- No assets to upload
- One line to embed anywhere
- Works in profile READMEs and repo READMEs

---

## How often does it update?

- The card itself is generated dynamically.
- GitHub **caches images**, so updates may not appear instantly.

In practice:

- Most updates appear within **a few minutes**
- Sometimes it can take longer due to GitHub CDN caching

If you need guaranteed refresh control, see **Option B (GitHub Actions)** below.

---

## Available themes

You can preview all themes here:  
👉 https://kgnio-profile-card.vercel.app/

### Midnight

![Midnight](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=midnight)

### Cupcake

![Cupcake](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=cupcake)

### Ice

![Ice](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=ice)

---

# Option A — Use my hosted deployment (recommended)

This is the **simplest way** to use the card.
You do **not** need to clone or run anything.

### Step-by-step

1. Create a new repository on GitHub

   - The repository name must be **exactly your GitHub username**
   - Example: username `octocat` → repo name `octocat`

2. Add a `README.md` file  
   GitHub will automatically display it on your profile page.

3. Copy and paste the following line into your README:

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=<YOUR_USERNAME>&theme=<THEME>)
```

4. Replace:

   - `<YOUR_USERNAME>` with your GitHub username
   - `<THEME>` with one of: `midnight`, `cupcake`, `ice`

5. Commit your changes. Done 🎉

Your profile will now display the card.

---

## Example

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=ice)
```

---

# Option B — Run it in your own repo (GitHub Actions)

This option is for people who want the SVG to be generated **inside their own GitHub repository**
and then embedded into their **GitHub profile README** using a raw GitHub URL.

This guide is **beginner‑friendly** and follows the **new token system** using
`PROFILE_REPO_TOKEN` (no `GH_TOKEN` anymore).

---

## What you will get

By the end of this guide, you will have:

- A generated SVG file at: `public/card.svg`
- A GitHub Actions workflow that runs automatically
- Your **profile README** always showing the latest card

```md
![GitHub Profile Card](https://raw.githubusercontent.com/<username>/github-profile-stats-card/main/public/card.svg)
```

---

## Step 1 — Fork the repository

1. Open the **github-profile-stats-card** repository on GitHub
2. Click **Fork** (top‑right)
3. Select your GitHub account
4. Keep the repository name as:

```
github-profile-stats-card
```

After forking, you should have:

```
https://github.com/<username>/github-profile-stats-card
```

---

## Step 2 — Enable GitHub Actions

1. Go to your forked repository
2. Click the **Actions** tab
3. If GitHub asks, click **Enable workflows**

---

## Step 3 — Create a token for the workflow

This workflow needs a token for **two jobs**:

1) **Read** your GitHub profile/repo stats via the GitHub **GraphQL** API  
2) **Write** commits back to:
   - `github-profile-stats-card` (to commit `public/card.svg`)
   - your profile repo (`<username>/<username>`) if you enabled the cache-buster step

### Recommended: Fine‑grained PAT (safer)

Fine‑grained tokens don’t use “scopes” like `repo` / `read:user`.
Instead, you choose **Repository access** + **Permissions**.

1. Go to **GitHub Settings**
2. Open **Developer settings**
3. Click **Personal access tokens**
4. Choose **Fine-grained tokens**
5. Click **Generate new token**

#### Token settings (recommended)

- **Token name:** `profile-card-automation`
- **Expiration:** 30–90 days
- **Resource owner:** your account
- **Repository access:**  
  - **All repositories** (recommended if you want *private repos included* in totals), or  
  - **Only select repositories** → choose:
    - `github-profile-stats-card`
    - `<username>` (your profile README repo)

#### Permissions

**Repository permissions**
- **Contents:** **Read and write** (required to commit SVG + update profile README)

**Account permissions**
- **Profile:** **Read-only** (recommended for user/profile reads)

> Note: GitHub marks **Metadata** as “Required” automatically for repo access. Keep it as-is.

Click **Generate token** and **copy it immediately**.

---

## Step 4 — Add the token as a repository Secret

1. Go to your forked repo  
   `github-profile-stats-card`
2. Open **Settings**
3. Go to **Secrets and variables → Actions**
4. Open the **Secrets** tab
5. Click **New repository secret**

Add:

- **Name:** `PROFILE_REPO_TOKEN`
- **Value:** *(paste the token you copied)*

Save it.

---

## Step 5 — Add required repository Variables

Go to:

```
Settings → Secrets and variables → Actions → Variables
```

Add the following variables:

| Name | Value |
|----|----|
| `CARD_USERNAME` | your GitHub username |
| `CARD_THEME` | `midnight` / `cupcake` / `ice` |

⚠️ **Important:**  
These must be added under **Variables**, NOT Secrets.

---

## Step 6 — Ensure dependencies are committed

Make sure your repository contains:

```
package-lock.json
```

If it does not:

```bash
npm install
git add package-lock.json
git commit -m "chore: add lock file"
git push
```

---

## Step 7 — Run the workflow manually (first run)

1. Go to the **Actions** tab
2. Select **Generate Profile Card**
3. Click **Run workflow**

Wait until the workflow finishes successfully.

---

## Step 8 — Verify the generated SVG

After the workflow completes, check that this file exists:

```
public/card.svg
```

Open it in the browser to confirm it renders correctly.

---

## Step 9 — Embed the card in your profile README

1. Go to your **profile repository**

```
https://github.com/<username>/<username>
```

2. Edit `README.md`
3. Add this line anywhere:

```md
![GitHub Profile Card](https://raw.githubusercontent.com/<username>/github-profile-stats-card/main/public/card.svg)
```

Commit the file.

---

## How updates work

- The workflow regenerates `card.svg`
- The profile README links to that file
- GitHub may cache images

If you don’t see updates immediately, wait a few minutes.

---

## Common problems & fixes

### ❌ Workflow fails with “Missing PROFILE_REPO_TOKEN”

- Check **Secrets**, not Variables
- Name must be exactly: `PROFILE_REPO_TOKEN`

---

### ❌ Workflow fails with “Missing CARD_USERNAME”

- Ensure `CARD_USERNAME` exists under **Variables**
- Do NOT put it in Secrets

---

### ❌ Build fails: lock file not found

- Run `npm install`
- Commit `package-lock.json`

---

## Summary

You now have:

- A fully automated SVG generator
- No manual updates
- A clean, secure token setup
- A profile README that always stays fresh

Enjoy your profile card 

---

## License

MIT
