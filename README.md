# Vansh Gandhi — Portfolio

## How to go live (takes ~10 minutes, all free)

### Step 1 — Get a Gmail App Password
1. Go to **myaccount.google.com** → Security
2. Turn on **2-Step Verification**
3. Search **"App passwords"** at the top
4. Create one → name it "Portfolio" → copy the 16-character code

### Step 2 — Upload to GitHub
1. Go to **github.com** → sign up / log in
2. Click **"New repository"** → name it `vansh-portfolio` → click Create
3. Upload all these files to the repo

### Step 3 — Deploy on Vercel (free)
1. Go to **vercel.com** → sign in with GitHub
2. Click **"Add New Project"** → import your `vansh-portfolio` repo
3. Before clicking Deploy, go to **Environment Variables** and add:
   - Name: `GMAIL_USER` → Value: `vanshgandhi24@gmail.com`
   - Name: `GMAIL_APP_PASSWORD` → Value: the 16-char code from Step 1
4. Click **Deploy** → your site will be live at `vansh-portfolio.vercel.app` 🎉

### Step 4 — Add your resume
- Put your resume PDF in the `public/` folder
- Name it exactly: `resume.pdf`
- Redeploy on Vercel (it redeploys automatically when you push to GitHub)

### Step 5 — Update your real links
In `app/page.js`, find these lines and update them:
- `href="https://github.com/"` → your GitHub profile URL
- `href="https://linkedin.com/in/"` → your LinkedIn URL

---

That's it! Your portfolio is live.
