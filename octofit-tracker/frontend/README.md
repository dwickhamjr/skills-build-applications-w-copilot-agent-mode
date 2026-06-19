# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit Tracker multi-tier application.

## API URL Configuration

For Codespaces API access, `VITE_CODESPACE_NAME` must be defined before starting Vite. Add it to `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the frontend calls backend endpoints with this pattern:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to local development:

```text
http://localhost:8000/api/[component]/
```

The app reads this value through `import.meta.env` and avoids building `https://undefined-8000...` URLs.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
