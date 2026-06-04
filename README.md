# Decision Intelligence Platform

A modern, frontend-only web application for making better decisions using 14+ proven decision-making frameworks and tools.

## Features

✨ **14+ Decision Tools**
- Eisenhower Matrix - Prioritize by urgency & importance
- MoSCoW Method - Must/Should/Could/Won't classification
- RICE Scoring - Reach, Impact, Confidence, Effort prioritization
- SWOT Analysis - Strengths, Weaknesses, Opportunities, Threats
- PESTLE Analysis - Political, Economic, Social, Technological, Legal, Environmental factors
- Porter's Five Forces - Industry competitive analysis
- Risk Matrix - Likelihood vs Impact assessment
- 5 Whys - Root cause analysis
- Fishbone Diagram - Ishikawa cause-effect diagram
- Decision Matrix - Compare alternatives by weighted criteria
- Cost-Benefit Analysis - Financial impact evaluation
- Mind Mapping - Hierarchical idea organization
- Six Thinking Hats - Multi-perspective decision analysis
- Brainstorming - Idea generation and categorization

💾 **Save & Manage**
- Store all your analyses in browser local storage
- Organize projects and track analysis history
- Export analyses as professional PDF reports

👥 **Real-Time Collaboration**
- Share session links with team members
- Collaborate on same analysis in real-time
- Board-style editing for teams

🎨 **Modern UI**
- Beautiful, responsive design
- Dark/Light theme toggle
- Professional gradient effects
- Intuitive navigation

📊 **No Backend Required**
- 100% client-side application
- Works completely offline
- All data stored locally
- PDF export functionality

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **PDF Export**: jsPDF + html2canvas
- **Collaboration**: Real-time sync ready
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd decision-intelligence-platform
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Usage

### Creating an Analysis

1. **Go to Dashboard** - Select a tool from the available decision frameworks
2. **Start Analysis** - Click on any tool to begin a new analysis
3. **Add Data** - Input your data according to the tool's requirements
4. **Save Project** - Your analysis is automatically saved to browser storage
5. **Export** - Download your analysis as a PDF report

### Collaboration (Same Session)

1. **Get Session ID** - Copy the session ID from the tool header
2. **Share Link** - Share the session ID with team members
3. **Real-Time Sync** - All changes sync in real-time within the session
4. **Board Mode** - Multiple users can edit simultaneously

### Keyboard Shortcuts

- `Enter` - Add items in input fields
- `Ctrl/Cmd + S` - Save current analysis
- `Ctrl/Cmd + E` - Export to PDF

## Project Structure

```
src/
├── components/        # Reusable UI components
│   └── Navigation.tsx
├── pages/            # Page-level components
│   ├── Dashboard.tsx
│   ├── ToolPage.tsx
│   └── ProjectPage.tsx
├── tools/            # All decision-making tools
│   ├── EisenhowerMatrix.tsx
│   ├── MoSCoW.tsx
│   ├── RICE.tsx
│   ├── SWOT.tsx
│   ├── PESTLE.tsx
│   ├── RiskMatrix.tsx
│   ├── FiveWhys.tsx
│   ├── FishboneDiagram.tsx
│   ├── DecisionMatrix.tsx
│   ├── CostBenefitAnalysis.tsx
│   ├── MindMapping.tsx
│   ├── SixThinkingHats.tsx
│   ├── Brainstorming.tsx
│   └── PortersFiveForces.tsx
├── store/            # State management
│   └── index.ts      # Zustand store
├── utils/            # Utility functions
│   └── pdfExport.ts
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Configuration

### Tailwind CSS

Customize colors and theme in `tailwind.config.js`

### Vite

Adjust build settings in `vite.config.ts`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Data Privacy

✅ All data stays on your device
✅ No data sent to servers
✅ No tracking or analytics
✅ 100% private and secure

## Performance

- ⚡ Instant load times
- 📱 Works on mobile/tablet
- 🔄 Real-time updates
- 📊 Handles large analyses

## Future Enhancements

- [ ] Firebase real-time collaboration
- [ ] User accounts and cloud sync
- [ ] Advanced analytics dashboard
- [ ] Team management features
- [ ] Custom tool builder
- [ ] Mobile apps
- [ ] API integrations
- [ ] ML-powered recommendations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use for personal and commercial projects

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for better decision-making**

Version 1.0.0 © 2026 Decision Intelligence Platform
