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

![Cupcake](https://kgnio-profile-card.vercel.app/themes/cupcake.png)

### Ice

![Ice](https://kgnio-profile-card.vercel.app/themes/ice.png)

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

Use this option if you want:

- Full control over updates
- A generated SVG file in your own repository
- Scheduled updates via GitHub Actions

---

## How it works

- You fork or clone this repository
- A GitHub Actions workflow generates an SVG file (for example: `card.svg`)
- The SVG is committed to your repository
- You embed that SVG in your README using a raw GitHub URL

---

## Step-by-step

1. Fork or clone this repository into your GitHub account

2. Enable GitHub Actions  
   Repository → **Actions** → enable if prompted

3. Create a GitHub Personal Access Token (PAT) and save it as a repository secret

   - Create a token (PAT) on GitHub
   - Repository → **Settings → Secrets and variables → Actions → Secrets**
   - Add a new secret named: `GH_TOKEN`

4. Add repository variables  
   Repository → **Settings → Secrets and variables → Actions → Variables**

Add the following variables:

- `CARD_USERNAME` → your GitHub username
- `CARD_THEME` → one of the available themes

5. Run the workflow  
   Actions → Generate Profile Card → Run workflow

6. The workflow will generate and commit this file:

public/card.svg

7. Embed it in your README:

```md
![GitHub Profile Stats](https://raw.githubusercontent.com/<YOUR_USERNAME>/<YOUR_REPO>/main/public/card.svg)
```

---

## Which option should I choose?

| Option                 | When to use                        |
| ---------------------- | ---------------------------------- |
| **Option A — Hosted**  | Fastest, zero setup, recommended   |
| **Option B — Actions** | Maximum control, scheduled updates |

---

## Where can I see the cards?

- Live demo & theme previews  
  https://kgnio-profile-card.vercel.app/

- SVG endpoint format

```
/api/card?user=<username>&theme=<theme>
```

---

## Notes on caching

GitHub may cache images aggressively.

If you change themes or usernames and don’t see updates immediately:

- Wait a few minutes
- Or append a dummy query parameter like `&v=1`

---

## License

MIT
