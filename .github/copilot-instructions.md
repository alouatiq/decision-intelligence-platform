<!-- Decision Intelligence Platform - Copilot Instructions -->

This is a frontend-only Decision Intelligence Platform built with React, TypeScript, and Tailwind CSS.

## Quick Start

1. **Install dependencies**: `npm install`
2. **Start dev server**: `npm run dev` (opens at http://localhost:5173)
3. **Build for production**: `npm run build`
4. **Preview build**: `npm run preview`

## Key Features

✨ 14+ decision-making tools (Eisenhower Matrix, SWOT, RICE, PESTLE, etc.)
💾 Save analyses to browser localStorage
👥 Real-time collaboration with session sharing
📊 PDF export functionality
🎨 Dark/Light theme with professional UI
🚀 100% client-side, no backend needed

## Technology Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Zustand (state management)
- jsPDF + html2canvas (PDF export)

## Project Structure

```
src/
├── components/     # UI components
├── pages/         # Page-level components
├── tools/         # All 14 decision tools
├── store/         # State management
├── utils/         # Utilities (PDF export)
├── App.tsx        # Main app
└── main.tsx       # Entry point
```

## Available Tools

1. Eisenhower Matrix - Urgency/Importance prioritization
2. MoSCoW Method - Requirements classification
3. RICE Scoring - Prioritization framework
4. SWOT Analysis - Strategic analysis
5. PESTLE Analysis - External factors analysis
6. Porter's Five Forces - Industry competition
7. Risk Matrix - Risk assessment
8. 5 Whys - Root cause analysis
9. Fishbone Diagram - Cause-effect mapping
10. Decision Matrix - Multi-criteria comparison
11. Cost-Benefit Analysis - Financial evaluation
12. Mind Mapping - Idea organization
13. Six Thinking Hats - Perspective analysis
14. Brainstorming - Idea generation

## Deployment

The build output in `dist/` can be deployed to any static hosting:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## Development Notes

- All state persists to localStorage automatically
- Real-time collaboration ready (requires WebSocket backend for multi-user)
- PDF export works client-side with jsPDF
- Fully responsive, mobile-friendly UI
- Dark mode toggle available

## Performance

- Lightweight (~230KB minified gzipped)
- Fast load times
- Offline-capable
- Works on all modern browsers

---

For detailed information, see [README.md](../README.md)
