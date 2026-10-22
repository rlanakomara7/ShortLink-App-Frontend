# SHORTLINK FRONTEND

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-JSX-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A web application for creating and managing shortened URLs. Built with React, Vite, and Tailwind CSS, and connected to the [ShortLink Backend API](https://github.com/rlanakomara7/ShortLink-App-Backend).

## Technologies

- **React 19** — Frontend UI.
- **Vite 8** — Development server and build tool.
- **Tailwind CSS 4** — Styling.
- **React Router** — Page navigation.
- **React Icons / Lucide** — Interface icons.

## Features

- User registration and login.
- Dashboard showing active links, search, and pagination.
- Create shortlinks with optional custom slugs.
- Copy and delete shortlinks.
- Profile information and browser-stored profile photo.
- Responsive landing page and custom 404 page.

> **Note:** In the checked repository version, Logout clears the browser's local session. Calling the backend `/api/logout` endpoint is a separate integration step. The Analytics menu is visible, but its page is not yet registered in `src/App.jsx`.

## Getting Started

### Prerequisites

- **Node.js** and **npm** (versions compatible with Vite 8).
- The **ShortLink Backend API** running at `http://localhost:8080`.

### Clone the repository

```bash
git clone https://github.com/rlanakomara7/ShortLink-App-Frontend.git
cd ShortLink-App-Frontend
```

### Install and run

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

### Backend connection

The existing `vite.config.js` forwards requests beginning with `/api` to the local backend:

```js
server: {
  proxy: {
    "/api": "http://localhost:8080",
  },
},
```

No frontend `.env` file is required for this local setup. Run the backend separately; see its [README](https://github.com/rlanakomara7/ShortLink-App-Backend).

## Available Commands

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start local development server      |
| `npm run build`   | Build production files into `dist/` |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Check code with ESLint              |

## Main Pages

| Path            | Page               |
| --------------- | ------------------ |
| `/`             | Landing page       |
| `/register`     | Register           |
| `/login`        | Login              |
| `/dashboard`    | Manage shortlinks  |
| `/links/create` | Create a shortlink |
| `/profile`      | User profile       |
| `*`             | Not Found          |

## Related Project

- **Backend:** [ShortLink-App-Backend](https://github.com/rlanakomara7/ShortLink-App-Backend)

## License

No license is declared here until a `LICENSE` file is added to the repository. If MIT is chosen, add the MIT license file first.
