# 🎂✨ Bestie's Magic Birthday Book

A dreamy, interactive birthday storybook built with React + Vite for celebrating someone special. This app includes a magical opening page, countdown, memory pages, love notes, mini quiz, music, and a final surprise to make the birthday experience feel personal and memorable.

## 🌟 Features

- Beautiful birthday-themed storybook layout
- Animated and magical background effects
- Countdown to the birthday celebration
- Personalized memory and love-message pages
- Photo gallery sections for special moments
- Background music and mute controls
- Final surprise page for the big celebration moment
- Fully static frontend with no backend required

## 📁 Project Structure

```bash
.
├── public/
│   └── assets/
│       ├── images/
│       └── music/
├── src/
│   ├── components/
│   ├── config/
│   ├── pages/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── metadata.json
```

## ✅ Prerequisites

Make sure you have the following installed on your machine:

- Node.js 18+
- npm or yarn

## 🚀 Run Locally

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal, usually:

```bash
http://localhost:3000
```

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🌐 Deploy

This project is a static Vite app, so it can be deployed easily on many platforms.

### Option 1: Vercel

1. Push the project to GitHub.
2. Go to https://vercel.com
3. Import the repository.
4. Vercel will detect the Vite app automatically.
5. Deploy.

### Option 2: Netlify

1. Push the project to GitHub.
2. Open https://netlify.com
3. Click "Add new site" → "Import project"
4. Select your repo.
5. Set the build command to:

```bash
npm run build
```

6. Set the publish directory to:

```bash
dist
```

7. Deploy.

### Option 3: GitHub Pages

You can also deploy the built static files using GitHub Pages or any static host.

```bash
npm run build
```

Then upload the generated `dist` folder to your hosting service.

## 🎨 Customize the Birthday Book

You can personalize the app by editing the config file at [src/config/assets.ts](src/config/assets.ts).

Update:

- the birthday person's name
- nicknames and messages
- anniversary/birthday date
- photo paths
- music file path

Example values to change:

```ts
bestieName: "Bestie",
birthdayDate: "2026-09-05T00:00:00",
```

You can replace the default assets in the [public/assets](public/assets) folder with your own images and music files.

## 📷 Assets

Place your own custom files here:

- [public/assets/images](public/assets/images)
- [public/assets/music](public/assets/music)

Make sure the file names match what is configured in [src/config/assets.ts](src/config/assets.ts).

## 🛠️ Common Scripts

```bash
npm run dev     # Start the dev server
npm run build   # Build the app for production
npm run preview # Preview the built app locally
npm run lint    # Type-check the project
```

## 💡 Notes

- This app is designed as a front-end experience and does not require a backend.
- No API key is required unless you later extend the app with external services.
- For best results, use high-quality images and a short, emotional audio track.

## ❤️ Credits

Made with love for a special birthday celebration. Feel free to customize it for your own bestie, partner, friend, or family member.

---

If you want, I can also turn this into a more premium README with:

- a project banner image
- badges
- screenshot section
- a full "How to personalize this app" guide
- one-click deployment instructions for Vercel/Netlify
