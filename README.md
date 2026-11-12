# Pagekeeper

Pagekeeper is a personal reading tracker. Search books from Open Library, open a book to see its details, and organize your reading on five shelves: **Reading Now**, **Up Next**, **Finished**, **Wishlist** and **Not for Me**.

**Live demo:** https://kossu22.github.io/pagekeeper/

## Features

- Search books by title or author
- Book details page with cover, authors, description and subjects
- Five shelves with book counts, moving books between shelves and removing them
- Library overview chart and a count of books finished this year
- Library saved in the browser's localStorage, so no account is needed
- Responsive layout for phones, tablets and desktops

## Tech stack

| Purpose | Library |
| --- | --- |
| UI framework | React (Vite) |
| Routing | React Router (HashRouter) |
| Styling and UI components | Bootstrap, React Bootstrap, React Bootstrap Icons |
| Charts | Recharts |
| Notifications | react-hot-toast |
| Book data | [Open Library API](https://openlibrary.org/developers/api) |

## Getting started

Requirements: [Node.js](https://nodejs.org/) (current LTS version) and npm.

```bash
git clone https://github.com/Kossu22/pagekeeper.git
cd pagekeeper
npm install
npm run dev
```

If you downloaded the project as a ZIP file, skip `git clone` and run the commands from the project folder.

Open the URL shown in the terminal (by default http://localhost:5173/pagekeeper/).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the app into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and publish the app to GitHub Pages |

## Project structure

```
src/
├── api/          # Open Library API calls
├── components/   # Reusable UI components (BookCard, ShelfSelect, Loader, ...)
├── context/      # Shelf state and localStorage persistence
├── data/         # Shelf definitions
├── hooks/        # useShelves hook
└── pages/        # Discover, BookDetails, MyShelves, NotFound
```

## Data source

Book data and cover images are provided by [Open Library](https://openlibrary.org/), a project of the Internet Archive.
