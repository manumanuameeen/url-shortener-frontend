# 🔗 URL Shortener — Frontend

A modern, responsive, and highly scalable frontend for the URL Shortener application, built with **React**, **TypeScript**, and **Vite**.

## ✨ Features

- 🚀 **Lightning Fast** — Built on Vite for instant HMR and rapid cold starts.
- 📐 **Enterprise Architecture** — Highly modular structure separating UI Components, Layouts, API services, and centralized Constants.
- 🔐 **Secure Authentication** — Uses `httpOnly` cookies for refresh tokens and purely in-memory storage for access tokens to completely mitigate XSS vulnerabilities.
- 🔄 **Axios Interceptors** — Automatic, seamless token refreshing without interrupting the user experience.
- 📱 **Responsive Design** — Beautiful, fluid UI built with raw CSS, gracefully handling edge cases like ultra-long URLs.
- 🛡️ **Strict Type Safety** — Fully typed API responses and zero `any` types throughout the codebase.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Library |
| TypeScript | Strongly typed language |
| Vite | Build tool & Dev server |
| React Router | Client-side routing |
| Axios | API Client & Interceptors |
| Lucide React | SVG Icons |

## 🚀 Setup & Installation

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create a `.env` file in the root directory:
```bash
VITE_API_URL="http://localhost:3000"
```

### 3. Run the development server
```bash
npm run dev
```

## 🏗️ Architecture

```
src/
├── api/             # Axios instances and API services (auth, urls)
├── components/      # Reusable UI elements (Button, Input, Card) and logic (UrlCard)
├── constants/       # Centralized routes (Frontend + API) and Messages
├── context/         # React Context (AuthContext)
├── hooks/           # Custom React hooks (useUrls)
├── pages/           # Route-level views (Login, Register, Dashboard)
├── router/          # Centralized React Router configuration
└── types/           # Global TypeScript interfaces
```

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
