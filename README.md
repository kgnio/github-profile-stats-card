# GitHub Profile Stats Card

A customizable **GitHub profile stats card generator** for GitHub Profile READMEs.

Generate dynamic SVG stats cards for your GitHub profile, choose from multiple themes, and embed the result directly into your README with a single line of Markdown.

No installation, image uploads, or manual updates required.

**Live Generator & Theme Gallery:**  
https://kgnio-profile-card.vercel.app/

---

## Quick Start

Add this line to your **GitHub Profile README**:

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=YOUR_USERNAME&theme=midnight)
```

Replace `YOUR_USERNAME` with your GitHub username.

For example:

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=midnight)
```

That's it. Your GitHub stats card will be generated dynamically and displayed directly inside your profile README.

---

## What Is GitHub Profile Stats Card?

GitHub Profile Stats Card is a dynamic **GitHub README widget** that generates an SVG statistics card for any public GitHub profile.

It is designed for developers who want to customize or improve their **GitHub Profile README** with a clean and automatically generated stats card.

Features include:

- Dynamic GitHub profile statistics
- Multiple customizable themes
- SVG output for crisp rendering
- One-line Markdown embed
- No image hosting required
- No installation required
- Works in GitHub Profile READMEs
- Works in repository READMEs
- Hosted version available
- Self-hosting with GitHub Actions supported

---

## Generate a Card

The card URL follows this format:

```text
https://kgnio-profile-card.vercel.app/api/card?user=YOUR_USERNAME&theme=THEME
```

For example:

```text
https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=midnight
```

To embed it in Markdown:

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=midnight)
```

You only need to change:

- `user` — your GitHub username
- `theme` — the theme you want to use

---

## Available Themes

Preview all themes using the live gallery:

https://kgnio-profile-card.vercel.app/

### Midnight

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=midnight)
```

![Midnight](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=midnight)

### Azure Noir

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=azure-noir)
```

![Azure Noir](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=azure-noir)

### Cyber City

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=cyber-city)
```

![Cyber City](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=cyber-city)

### Darker Than Black

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=darker-than-black)
```

![Darker Than Black](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=darker-than-black)

### Cupcake

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=cupcake)
```

![Cupcake](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=cupcake)

### Ice

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=ice)
```

![Ice](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=ice)

### Sunset

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=sunset)
```

![Sunset](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=sunset)

### Pine Tree

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=pine-tree)
```

![Pine Tree](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=pine-tree)

---

## GitHub Profile README Example

You can add the card anywhere inside your GitHub profile `README.md`.

For example:

```md
# Hi, I'm Kağan

Full-stack developer working with React, Next.js, Node.js and TypeScript.

## GitHub Stats

![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=kgnio&theme=midnight)
```

To create a GitHub Profile README, create a public repository whose name exactly matches your GitHub username and add a `README.md` file to it.

---

## Using the Card With AI Assistants and README Generators

If you are creating or customizing a GitHub profile with ChatGPT, another AI assistant, or a GitHub README generator, the card can be generated using the same URL pattern:

```text
https://kgnio-profile-card.vercel.app/api/card?user=GITHUB_USERNAME&theme=THEME
```

For example, for the GitHub user `octocat` using the `midnight` theme:

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=octocat&theme=midnight)
```

This makes the project suitable for:

- GitHub profile customization
- GitHub Profile README generation
- Developer portfolio READMEs
- GitHub stats sections
- README widgets
- Profile card generators
- Automated README builders

---

## How Often Does It Update?

The card itself is generated dynamically.

GitHub caches externally hosted images, so changes to your statistics may not appear immediately.

In practice:

- Most changes appear within a few minutes
- Some updates may take longer because of GitHub's image/CDN caching

If you need more control over updates, you can use the GitHub Actions method below.

---

# Option A — Use the Hosted Version

This is the **recommended and simplest option**.

You do not need to clone, deploy, or configure anything.

### Step 1 — Create Your GitHub Profile Repository

Create a repository whose name is exactly the same as your GitHub username.

For example:

```text
Username: octocat
Repository: octocat/octocat
```

Add a `README.md` file to that repository.

GitHub will display it automatically on your profile.

### Step 2 — Add the Card

Copy this Markdown:

```md
![GitHub Profile Stats](https://kgnio-profile-card.vercel.app/api/card?user=YOUR_USERNAME&theme=midnight)
```

Replace `YOUR_USERNAME` with your GitHub username.

You can also change `midnight` to any supported theme:

```text
midnight
azure-noir
cyber-city
darker-than-black
cupcake
ice
sunset
pine-tree
```

### Step 3 — Commit Your README

Commit the change.

Your GitHub Profile Stats Card will now appear on your profile.

---

# Option B — Run It in Your Own Repository With GitHub Actions

This option is for users who want the SVG to be generated inside their own GitHub repository and embedded using a raw GitHub URL.

The generated card will be stored at:

```text
public/card.svg
```

You can then display it with:

```md
![GitHub Profile Card](https://raw.githubusercontent.com/YOUR_USERNAME/github-profile-stats-card/main/public/card.svg)
```

---

## Step 1 — Fork the Repository

Fork:

```text
kgnio/github-profile-stats-card
```

After forking, you should have:

```text
https://github.com/YOUR_USERNAME/github-profile-stats-card
```

---

## Step 2 — Enable GitHub Actions

Open your fork and go to:

```text
Actions
```

If GitHub asks you to enable workflows, click:

```text
Enable workflows
```

---

## Step 3 — Create a Token for the Workflow

The workflow needs a token to:

1. Read GitHub profile and repository statistics through the GitHub GraphQL API
2. Write the generated SVG back to your repository
3. Update your profile README if you enable the cache-buster workflow

### Recommended — Fine-Grained Personal Access Token

Open:

```text
GitHub Settings
→ Developer settings
→ Personal access tokens
→ Fine-grained tokens
→ Generate new token
```

Recommended token configuration:

**Token name**

```text
profile-card-automation
```

**Repository access**

Choose either:

- All repositories
- Only selected repositories

If you select specific repositories, include:

```text
github-profile-stats-card
YOUR_USERNAME
```

The second repository is your GitHub Profile README repository.

### Repository Permissions

Set:

```text
Contents: Read and write
```

GitHub automatically provides the required Metadata permission.

Generate the token and copy it.

---

## Step 4 — Add the Token as a Repository Secret

Open your fork:

```text
Settings
→ Secrets and variables
→ Actions
→ Secrets
→ New repository secret
```

Create:

```text
Name: PROFILE_REPO_TOKEN
Value: YOUR_TOKEN
```

Do not commit the token to your repository.

---

## Step 5 — Add Repository Variables

Go to:

```text
Settings
→ Secrets and variables
→ Actions
→ Variables
```

Create:

| Name | Example Value |
| --- | --- |
| `CARD_USERNAME` | `kgnio` |
| `CARD_THEME` | `midnight` |

Supported themes:

```text
midnight
azure-noir
cyber-city
darker-than-black
cupcake
ice
sunset
pine-tree
```

These values must be added under **Variables**, not Secrets.

---

## Step 6 — Ensure Dependencies Are Committed

Make sure your repository contains:

```text
package-lock.json
```

If it does not, run:

```bash
npm install
git add package-lock.json
git commit -m "chore: add lock file"
git push
```

---

## Step 7 — Run the Workflow

Open:

```text
Actions
→ Generate Profile Card
→ Run workflow
```

Wait for the workflow to complete successfully.

---

## Step 8 — Verify the Generated SVG

After the workflow finishes, verify that this file exists:

```text
public/card.svg
```

Open it to make sure the card renders correctly.

---

## Step 9 — Add the Generated Card to Your Profile

Open your GitHub Profile README repository:

```text
https://github.com/YOUR_USERNAME/YOUR_USERNAME
```

Add:

```md
![GitHub Profile Card](https://raw.githubusercontent.com/YOUR_USERNAME/github-profile-stats-card/main/public/card.svg)
```

Commit the README.

---

## How Self-Hosted Updates Work

The GitHub Actions workflow:

1. Fetches your latest GitHub statistics
2. Generates `public/card.svg`
3. Commits the updated SVG
4. Keeps the card available through your repository

GitHub may still cache the image for a short period.

---

## Common Problems

### Missing `PROFILE_REPO_TOKEN`

Make sure the token exists under:

```text
Settings
→ Secrets and variables
→ Actions
→ Secrets
```

The name must be exactly:

```text
PROFILE_REPO_TOKEN
```

### Missing `CARD_USERNAME`

Make sure `CARD_USERNAME` exists under:

```text
Settings
→ Secrets and variables
→ Actions
→ Variables
```

Do not add it as a Secret.

### Lock File Not Found

Run:

```bash
npm install
git add package-lock.json
git commit -m "chore: add lock file"
git push
```

Then run the workflow again.

---

## Who Is This For?

GitHub Profile Stats Card is useful for developers who want to:

- Customize their GitHub profile
- Improve their GitHub Profile README
- Add GitHub statistics to a developer portfolio
- Add a dynamic GitHub stats widget
- Generate a GitHub profile card
- Build an automated developer README
- Add profile statistics without maintaining images manually

---

## Contributing

Contributions, feature requests, new themes, and bug reports are welcome.

If you find the project useful, consider giving the repository a star.

---

## License

MIT
