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

This option is for people who want the SVG to be generated **inside their own GitHub repo** and then embedded from a **raw GitHub URL**.

✅ You will end up with:

- A generated file at: `public/card.svg`
- A workflow that can run manually or on schedule
- A README embed line like:

```md
![GitHub Profile Card](https://raw.githubusercontent.com/<username>/github-profile-stats-card/main/public/card.svg)
```

---

## Step 1 — Fork (or clone) the repository to your account

### Option 1 (recommended): Fork on GitHub (easiest)

1. Open this repository on GitHub.
2. Click **Fork** (top-right).
3. Choose your account.
4. Keep the repository name as: **github-profile-stats-card**
5. Click **Create fork**.

Now you have your own copy at:

- `https://github.com/<username>/github-profile-stats-card`

---

## Step 2 — Enable GitHub Actions (if it asks)

1. Go to your forked repo.
2. Click the **Actions** tab.
3. If you see a message like “Workflows are disabled”, click **Enable workflows**.

---

## Step 3 — Create a GitHub Token (PAT)

1. Go to your GitHub **Settings**
2. **Developer settings** → **Personal access tokens**
3. Choose **Tokens (classic)**
4. Click **Generate new token (classic)**

Fill it like this:

- **Note:** `profile card generator`
- **Expiration:** 30–90 days
- **Scopes:**
  - ✅ `read:user`
  - ✅ `repo` (safe choice for committing SVG)

5. Click **Generate token**
6. Copy the token immediately.

---

## Step 4 — Add the token to your repo Secrets

1. Repo → **Settings**
2. **Secrets and variables** → **Actions**
3. **Secrets** tab → **New repository secret**
4. Add:

- **Name:** `GH_TOKEN`
- **Secret:** _(paste token)_

---

## Step 5 — Add username & theme as repo Variables

Repo → **Settings → Secrets and variables → Actions → Variables**

Add:

- `CARD_USERNAME` → your GitHub username
- `CARD_THEME` → `midnight` | `cupcake` | `ice`

(Optional)

- `CARD_OUTPUT` → `public/card.svg`

---

## Step 6 — Run the workflow manually

1. **Actions**
2. **Generate Profile Card**
3. **Run workflow**

Wait until it finishes.

---

## Step 7 — Verify output

Check:

```
public/card.svg
```

---

## Step 8 — Embed in your profile README

```md
![GitHub Profile Card](https://raw.githubusercontent.com/<username>/github-profile-stats-card/main/public/card.svg)
```

---

## Cache issues

Append a version query if needed:

```md
![GitHub Profile Card](https://raw.githubusercontent.com/<username>/github-profile-stats-card/main/public/card.svg?v=1)
```

---

## Common issues

### Missing CARD_USERNAME

- Ensure it exists under **Variables**, not Secrets

### Missing lock file

- Run `npm install`
- Commit `package-lock.json`

### SVG not updating

- Check workflow permissions:
  ```yml
  permissions:
    contents: write
  ```

---

## License

MIT
