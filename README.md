# 🎂 Birthday Surprise Card

A dreamy, pastel, interactive digital birthday card built with **React + TypeScript + Vite**.  
Features a secret password gate, animated screens, a photo gallery, a personal letter, a gift box reveal, and floating petals throughout.

---

## ✨ Features

- 🔐 4-digit secret password gate
- 🌸 Floating animated petals on every screen
- 📸 Polaroid-style photo gallery
- 💌 Personal letter with scroll reveal
- 🎁 Interactive gift box surprise
- 🎂 Blow-out-the-candles interaction with confetti
- 🎵 Optional background music support

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Customize

All text, photos, password, and personal details live in one file:

```
src/config/birthdayConfig.ts
```

Edit that file to personalize everything — no other files need to change.

**To add photos:** place images in `public/images/` named `photo1.jpg`, `photo2.jpg`, etc.

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

> **GitHub Pages note:** If deploying under a sub-path (e.g. `https://you.github.io/repo-name/`),
> uncomment `base: '/repo-name/'` in `vite.config.ts`.

---

## 🙈 Privacy

`<meta name="robots" content="noindex">` is set so search engines won't index the page.  
Share the link privately — only the recipient sees it!
