# AbleSpace Playwright Automation Suite (Section 7)

This directory contains the automated end-to-end (E2E) testing suite for **AbleSpace** (`staging.ablespace.io`), written in **TypeScript** using **@playwright/test**.

---

## 1. Automated Workflow Overview

The test suite automates the core user journey:
- **Authentication:** Reads credentials securely from `.env` and logs into the staging portal.
- **Caseload Verification:** Validates successful arrival at the dashboard/caseload screen.
- **Search & Filter:** Executes dynamic search queries to locate existing student records in the caseload roster.
- **Validation Guardrails:** Opens the "Add Student" drawer and asserts that form submission without mandatory values triggers validation errors.

---

## 2. Prerequisites

- **Node.js:** v18.0.0 or higher (Tested on Node v22)
- **npm:** v9.0.0 or higher
- An existing AbleSpace staging account created manually at [staging.ablespace.io](https://staging.ablespace.io).

---

## 3. Installation & Setup

1. **Navigate to the automation directory:**
   ```bash
   cd 06_Playwright_Automation
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browser binaries:**
   ```bash
   npx playwright install chromium
   ```
   *(Optional: run `npx playwright install` to install all browsers including Firefox and WebKit).*

---

## 4. Configuring Login Credentials

Per the assignment rules:
> *Do not put your email or password in the code. Read them from environment variables or a .env file, and add that file to .gitignore.*

1. Create a local `.env` file by copying the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *(On Windows Command Prompt / PowerShell):*
   ```powershell
   Copy-Item .env.example .env
   ```

2. Open `.env` and fill in your staging account credentials:
   ```env
   BASE_URL=https://staging.ablespace.io
   ABLESPACE_USER_EMAIL=your_email@example.com
   ABLESPACE_USER_PASSWORD=YourSecurePassword123!
   ```

> **Note:** The `.env` file is excluded from Git tracking via `.gitignore`.

---

## 5. Running the Tests

### Run all tests in headless mode (default):
```bash
npm test
```
*or directly:*
```bash
npx playwright test
```

### Run tests in headed browser mode (visible browser window):
```bash
npm run test:headed
```

### Run tests with interactive Playwright UI mode:
```bash
npm run test:ui
```

### Run on a specific browser (e.g., Chromium only):
```bash
npx playwright test --project=chromium
```

### View the HTML Test Report:
```bash
npm run test:report
```

---

## 6. Code Design Highlights

- **Resilient Semantic Locators:** Utilizes `getByRole`, `getByPlaceholder`, and `getByLabel` rather than brittle CSS or XPath selectors.
- **Web-First Assertions:** Utilizes `expect(...).toBeVisible()` with automatic retries and polling to prevent flaky timing failures in Single Page Applications.
- **Safe Fallbacks:** Multi-attribute `.or()` selectors accommodate responsive variations and staging DOM updates.
