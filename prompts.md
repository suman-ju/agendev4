# Coding agent prompt library

## New feature

**Context:** [Describe the relevant app behavior, files, and constraints.]  
**Goal:** [Describe the user-visible feature.]  
**Constraints:** [List stack, scope, compatibility, and files that must not change.]  
**Acceptance criteria:** [List observable outcomes, each verifiable with a test.]  
**Examples:** [Give representative inputs and expected results.]  

First provide a short implementation plan and wait for approval. After approval, implement the smallest complete change, add or update meaningful tests, run the focused tests, and summarize the result.

## Bug fix

**Context:** [Describe the affected behavior and relevant files.]  
**Goal:** Fix [specific incorrect behavior] without changing unrelated behavior.  
**Constraints:** Preserve [existing APIs, styling, or compatibility requirements].  
**Acceptance criteria:** Add a regression test that fails before the fix and passes after it; existing related tests must continue to pass.  
**Examples:** Given [input/state], when [action], expect [correct result].  

Explain the root cause before editing, then implement the fix and report verification.

## Refactor

**Context:** [Describe the current implementation and why it should change.]  
**Goal:** Improve [specific quality] while preserving behavior.  
**Constraints:** Do not change public behavior, add dependencies, or modify unrelated files.  
**Acceptance criteria:** Existing tests pass; add focused tests only where behavior is not already covered.  
**Examples:** [Show before/after structure if helpful.]  

List the planned files and wait for approval before refactoring.

## Generate tests

**Context:** [Describe the component/helper and its expected behavior.]  
**Goal:** Add tests for [named cases].  
**Constraints:** Use the existing test stack, test observable behavior, and do not change production code.  
**Acceptance criteria:** Each test asserts a meaningful result and fails if its behavior is broken.  
**Examples:** [Input/action] should produce [assertion].  

Run the new tests and explain what each one protects.

## Review diff

**Context:** Review the diff against [feature/bug request].  
**Goal:** Identify correctness, regression, accessibility, and test-coverage issues.  
**Constraints:** Review only; do not modify files. Prioritize actionable findings and cite file/line locations.  
**Acceptance criteria:** Every finding describes impact and a concrete reproduction or reason.  
**Examples:** [Optional known risk or expected behavior.]  

Return findings first, ordered by severity. If there are no findings, say so and note any test gaps.

## Commit message

**Context:** The staged diff implements [short purpose].  
**Goal:** Write one concise commit message matching the repository's history and conventions.  
**Constraints:** Do not claim behavior or tests that are not in the diff. Do not commit.  
**Acceptance criteria:** Use an imperative subject under 72 characters and mention the meaningful scope.  
**Examples:** `Add category filtering to expense list`  

Return only the suggested commit message.

## Five-part prompt: add expense

**Context:** This is a Vite + React expense tracker. The app state lives in `app/src/App.jsx`; presentational components live in `app/src/components/`; pure validation and total logic live in `app/src/expenseUtils.js`. Tests use Vitest and React Testing Library.

**Goal:** Let a user add an expense with a title, amount, and one of Food, Travel, Bills, or Other.

**Constraints:** Keep state in `App`. Do not add dependencies. Reject whitespace-only titles, non-numeric amounts, amounts at or below zero, and amounts greater than 100000. Keep accessible form labels and stable Cypress selectors. Do not allow invalid expenses to enter the list.

**Acceptance criteria (each must be covered by an automated test):**
1. Submitting a non-empty title, a numeric amount from 0.01 through 100000, and a valid category adds exactly one expense showing the submitted title, amount, and category.
2. Submitting an empty or whitespace-only title shows a validation message and leaves the expense count unchanged.
3. Submitting a non-numeric, zero, or negative amount shows an amount validation message and leaves the expense count unchanged.
4. Submitting an amount greater than 100000 shows a maximum-amount validation message and leaves the expense count unchanged.
5. After a successful add, the form clears its title and amount fields and the running total increases by the submitted amount, formatted to two decimal places.

**Examples:** `("Lunch", "250", "Food")` creates one Food expense and changes an empty-list total to `$250.00`. `(" ", "250", "Food")`, `("Taxi", "-1", "Travel")`, and `("Laptop", "100000.01", "Other")` create no expense and show validation feedback.

Provide a plan and wait for approval before coding. After approval, implement the feature, add tests for all acceptance criteria, run the focused tests and build, then summarize the changes and verification for a pull request.
