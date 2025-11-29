# Deployment Guide - ZenMentor

This guide covers deploying the ZenMentor Mental Health Support Application to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] Install all dependencies: `yarn install`
- [ ] Configure Firebase credentials in `/app/frontend/src/firebase/config.js`
- [ ] Download face-api.js models to `/app/frontend/public/models/`
- [ ] Test locally: `yarn start`
- [ ] Build production bundle: `yarn build`

## 🌐 Deployment Options

### Option 1: Netlify (Recommended for beginners)

#### Step 1: Prepare Your Build

```bash
cd /app/frontend
yarn build
```

#### Step 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=build
```

#### Step 3: Configure Netlify

Create a `netlify.toml` file in `/app/frontend/`:

```toml
[build]
  command = "yarn build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Step 4: Environment Variables (if needed)

In Netlify dashboard:
- Go to Site Settings → Build & Deploy → Environment
- Add any required environment variables

---

### Option 2: Vercel

#### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

#### Step 2: Login and Deploy

```bash
cd /app/frontend
vercel login
vercel
```

#### Step 3: Configure Build Settings

Vercel will auto-detect React. Ensure:
- **Build Command:** `yarn build`
- **Output Directory:** `build`
- **Install Command:** `yarn install`

#### Step 4: Set Environment Variables

```bash
vercel env add REACT_APP_FIREBASE_API_KEY
# Add other Firebase config variables
```

---

### Option 3: GitHub Pages

#### Step 1: Install gh-pages

```bash
cd /app/frontend
yarn add --dev gh-pages
```

#### Step 2: Update package.json

Add these fields:

```json
{
  "homepage": "https://yourusername.github.io/zenmentor",
  "scripts": {
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
  }
}
```

#### Step 3: Deploy

```bash
yarn deploy
```

---

### Option 4: Firebase Hosting

#### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### Step 2: Login and Initialize

```bash
cd /app/frontend
firebase login
firebase init hosting
```

Select:
- Public directory: `build`
- Configure as single-page app: `Yes`
- Automatic builds with GitHub: `No` (optional)

#### Step 3: Build and Deploy

```bash
yarn build
firebase deploy
```

---

## 🔥 Firebase Configuration

### Setting Up Firebase Realtime Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Navigate to **Realtime Database** → Create Database
4. Start in **Test Mode** (for development)
5. Copy your database URL

### Update Security Rules

For production, update database rules:

```json
{
  "rules": {
    "chat": {
      ".read": true,
      ".write": true
    }
  }
}
```

⚠️ **Important:** These rules allow public access. For production, implement proper authentication.

### Get Your Firebase Config

1. Go to Project Settings → General
2. Scroll to "Your apps" → Select Web
3. Copy the configuration object
4. Update `/app/frontend/src/firebase/config.js`

---

## 📦 Face-API Models Setup

The Face Emotion Tracker requires face-api.js models. These must be included in your deployment.

### Download Models

```bash
cd /app/frontend/public
mkdir models
cd models

# Download required models
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-shard1
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_expression_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_expression_model-shard1
```

### Verify Models

Ensure these files exist in `/app/frontend/public/models/`:
- `tiny_face_detector_model-weights_manifest.json`
- `tiny_face_detector_model-shard1`
- `face_expression_model-weights_manifest.json`
- `face_expression_model-shard1`

---

## 🔒 Production Considerations

### Security

1. **Firebase Rules:** Update rules to require authentication
2. **Environment Variables:** Never commit sensitive keys to Git
3. **HTTPS:** Ensure your deployment uses HTTPS (most platforms do by default)

### Performance

1. **Code Splitting:** Already configured with React lazy loading
2. **Image Optimization:** Use next-gen formats (WebP, AVIF)
3. **CDN:** Most hosting platforms provide CDN automatically

### Monitoring

1. **Firebase Analytics:** Enable in Firebase console
2. **Error Tracking:** Consider adding Sentry or similar
3. **Performance Monitoring:** Use Lighthouse CI

---

## 🧪 Testing Production Build Locally

```bash
cd /app/frontend
yarn build

# Serve the build folder
npx serve -s build -l 3000
```

Visit `http://localhost:3000` to test the production build.

---

## 🐛 Common Issues

### Issue: Face detection not working

**Solution:** Ensure face-api.js models are in `/public/models/` and accessible at `/models/` URL.

### Issue: Firebase connection errors

**Solution:** 
1. Check Firebase configuration in `config.js`
2. Verify Realtime Database is enabled
3. Check database rules allow read/write

### Issue: Routes return 404

**Solution:** Configure your hosting platform to redirect all routes to `index.html`:

**Netlify:** Add `_redirects` file:
```
/*    /index.html   200
```

**Vercel:** Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 📊 Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Light/Dark mode toggle works
- [ ] Face emotion tracker can access webcam
- [ ] Chat sends/receives messages (Firebase)
- [ ] LocalStorage features persist (Mood, Habits)
- [ ] Mobile responsive
- [ ] Performance score > 90 (Lighthouse)

---

## 🚀 Quick Deploy Commands

### Netlify
```bash
cd /app/frontend && yarn build && netlify deploy --prod
```

### Vercel
```bash
cd /app/frontend && vercel --prod
```

### Firebase
```bash
cd /app/frontend && yarn build && firebase deploy
```

---

## 📞 Support Resources

- **React Documentation:** https://react.dev/
- **Firebase Documentation:** https://firebase.google.com/docs
- **Netlify Support:** https://docs.netlify.com/
- **Vercel Documentation:** https://vercel.com/docs

---

**Happy Deploying! 🎉**

Remember: This is a mental health application. Handle user data with care and comply with relevant privacy regulations (HIPAA, GDPR, etc.) if collecting personal information.
