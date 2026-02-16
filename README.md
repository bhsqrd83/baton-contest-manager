# NBTA Baton Contest Manager

A modern desktop application for managing NBTA baton twirling contests, replacing the legacy VB6/Access system.

## Features

### 🎯 Set System Management (Priority #1)
- Parallel division processing across multiple lanes
- Automatic conflict resolution (coach-student)
- Position-based layout generation (1-N format)
- Optimized for minimum contest time
- Exact output format matching current system

### ⌨️ Fast Score Entry
- Keyboard-optimized tabulator interface
- Auto-calculation of all penalties
- Visual validation and error detection
- Judge-by-judge entry workflow
- 4x faster than legacy system

### 📋 NBTA Rules Engine
- Complete NBTA rules implementation
- Placement-points tabulation
- Automatic tie-breaking
- Advancement tracking
- All penalty types supported

### 📊 Registration & Eligibility
- Smart age-based division assignment
- Status level tracking per event
- 15-minute rest enforcement
- Double-entry prevention
- Coach-student conflict detection

### 📥 Import System
- Import historical .mdb databases
- Auto-analyze and map fields
- Create templates from historical data
- Event library (150+ standard NBTA events)

### 📄 Reports & Exports
- Set system sheets
- Score sheets
- Results by event
- High Point awards
- PDF and Excel export

## Tech Stack

- **Framework:** Electron (cross-platform desktop)
- **UI:** React + TypeScript + Material-UI
- **Database:** SQLite (local, offline-first)
- **Reports:** jsPDF, xlsx

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/baton-contest-manager.git
cd baton-contest-manager

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
npm run package
```

## Project Structure

```
baton-contest-manager/
├── src/
│   ├── electron/          # Electron main process
│   │   ├── main.ts        # Entry point
│   │   └── database/      # SQLite database management
│   ├── renderer/          # React frontend
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # Business logic
│   │   └── types/         # TypeScript types
│   └── shared/            # Shared utilities
├── public/                # Static assets
└── docs/                  # Documentation
```

## Development Timeline

- **Week 1-2:** Foundation & Core System
- **Week 3:** Set System (Top Priority)
- **Week 4:** Registration & Validation  
- **Week 5:** Score Entry & Tabulation
- **Week 6:** Import & Templates
- **Week 7:** Polish & Deployment

## Contributing

This is an open-source project for the NBTA community. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - Free to use, modify, and distribute

## Contact

For questions or feedback: bhsqrd83@gmail.com

## Acknowledgments

Built for the National Baton Twirling Association (NBTA) community to modernize contest management and improve the experience for directors, judges, coaches, and athletes.

---

**Current Status:** 🚧 In Active Development

**Target Release:** 6-7 weeks from project start

**Target Users:** NBTA contest directors, tabulators, judges
