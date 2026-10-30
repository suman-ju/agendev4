# Expense Tracker

React expense tracker built with Vite. Add expenses with a title, positive amount, and category; filter the list; and see the displayed count and running total update as expenses are added or deleted.

## Run locally

From the workspace root:

```powershell
npm install
npm install --prefix app
npm run dev
```

Open the URL Vite prints (normally `http://localhost:5173`).

## Tests and build

```powershell
npm test -- --run
npm run test:coverage
npm run build
```

For Cypress, leave the dev server running in one terminal and run `npm run cy:run` from another. Use `npm run cy:open` to open the Cypress UI.
