# Quick Start Guide - Decision Intelligence Platform

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

This will automatically open the platform at `http://localhost:5173`

### Step 3: Create Your First Analysis

1. Go to **Dashboard**
2. Choose any of the 14 decision tools (e.g., "Eisenhower Matrix")
3. Click **"Start Analysis"**
4. Add your data
5. Your analysis is automatically saved to browser storage

### Step 4: Export as PDF

Click **"Export PDF"** to download your analysis as a professional report.

---

## 📋 Available Tools

### Prioritization
- **Eisenhower Matrix** - Classify by urgency & importance
- **MoSCoW Method** - Must/Should/Could/Won't categories
- **RICE Scoring** - Reach, Impact, Confidence, Effort

### Analysis
- **SWOT Analysis** - Strengths, Weaknesses, Opportunities, Threats
- **PESTLE Analysis** - 6 external factor categories
- **Porter's Five Forces** - Industry competitive forces
- **Cost-Benefit Analysis** - Financial evaluation

### Problem Solving
- **Risk Matrix** - Likelihood vs Impact
- **5 Whys** - Root cause discovery
- **Fishbone Diagram** - Cause-effect mapping

### Decision Making
- **Decision Matrix** - Compare alternatives
- **Mind Mapping** - Hierarchical ideation
- **Six Thinking Hats** - Multi-perspective analysis
- **Brainstorming** - Idea capture & organization

---

## 💾 Data Storage

- **Local Storage**: All analyses saved to browser
- **Offline**: Works completely offline
- **Private**: No data sent to any server
- **Persistent**: Data survives browser refresh

---

## 👥 Collaboration

### Team Mode (Same Session)
1. Create an analysis
2. Share the **Session ID** with team members
3. Team members access same analysis in real-time
4. Changes sync instantly across all browsers

---

## 🏗️ Building for Production

```bash
npm run build
```

Output goes to `dist/` folder.

### Deployment Options
- **Vercel**: `vercel deploy dist/`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Push `dist/` to gh-pages branch
- **Firebase**: `firebase deploy`

---

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: "#your-color",
      secondary: "#your-color",
    }
  }
}
```

### Add Custom Tools
1. Create new component in `src/tools/`
2. Add to tools array in `Dashboard.tsx`
3. Create corresponding ToolPage logic

---

## ⚙️ System Requirements

- Node.js 16+
- npm 8+
- Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
npm run dev -- --port 5174
```

### Build errors?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript errors?
```bash
npx tsc --noEmit
```

---

## 📚 Documentation

- **Main Docs**: See [README.md](README.md)
- **Architecture**: Check `src/` folder structure
- **Components**: See `src/components/Navigation.tsx`
- **Tools**: See `src/tools/` for all decision tools

---

## 🎯 Next Steps

1. ✅ Start dev server (`npm run dev`)
2. ✅ Create your first analysis
3. ✅ Export to PDF
4. ✅ Share session with team
5. ✅ Deploy to production

---

## 💡 Tips & Tricks

- **Save Often**: Ctrl/Cmd + S to save
- **Export Regular**: Keep PDF backups of analyses
- **Dark Mode**: Toggle for better accessibility
- **Mobile**: Works on phones and tablets
- **Keyboard Shortcuts**: Enter to add, Tab to navigate

---

## 🚀 Ready to Make Better Decisions?

Start the development server now:
```bash
npm run dev
```

**Happy deciding! 🎯**
