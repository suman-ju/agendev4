# Agent instructions

## Stack and layout

- Use Node.js 20+, Vite, React, Vitest, React Testing Library, and Cypress.
- `app/src/App.jsx` owns application state and coordinates the UI.
- `app/src/components/` contains one React component per file.
- `app/src/expenseUtils.js` contains pure expense validation and calculation helpers.
- `app/src/**/*.test.*` contains unit and component tests.
- `cypress/e2e/` contains browser end-to-end tests.

## Commands

- Install root Cypress dependencies: `npm install`
- Install app dependencies: `npm install --prefix app`
- Start Vite: `npm run dev`
- Build: `npm run build`
- Run tests once: `npm test -- --run`
- Run coverage: `npm run test:coverage`
- Run Cypress headlessly: start `npm run dev` in another terminal, then `npm run cy:run`
- Open Cypress: `npm run cy:open`
- Lint: not configured. Ask before adding lint dependencies or changing tooling.

## Conventions and workflow

- Keep application data and application state in `App`; child components receive values and callbacks through props.
- Keep one React component per file and add a short comment describing each component's props and state.
- Do not add dependencies without asking first.
- Work on a feature branch, not directly on `main`.
- Before implementation, ask for a plan and wait for approval.
- Summarize the changes, tests, and any follow-up items in the pull request.
- Use accessible labels and stable `data-cy` selectors for Cypress tests.
- Add or update tests for behavior changes; do not modify a test merely to make an implementation pass.
