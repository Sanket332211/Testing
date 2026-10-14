# AbleSpace - Software Tester (QA) Assignment Submission

## Overview
This repository contains the comprehensive QA evaluation and test submission for **AbleSpace** (`staging.ablespace.io`), prepared according to the assignment requirements.

### Candidate & Submission Information
- **Role:** Software Tester (QA)
- **Target Application:** [AbleSpace Staging](https://staging.ablespace.io)
- **Submission Destination:** [Google Form](https://forms.gle/BGMAaXhXVPyZU7Sd9) / ZIP / GitHub
- **Submission Date:** October 2026

---

## Repository Structure & Deliverables

```
├── README.md                                    # Master documentation & evaluation overview
├── 01_Exploratory_Testing/
│   └── Section_2_Exploratory_Testing.md         # 10 Exploratory test scenarios & results
├── 02_Detailed_Test_Cases/
│   └── Section_3_Detailed_Test_Cases.md         # 7 Detailed test cases for core Student/IEP workflow
├── 03_Bug_Reports/
│   └── Section_4_Bug_Reports.md                 # 3 High-priority bug reports + minor defects list
├── 04_Cross_Browser_Responsive/
│   └── Section_5_Cross_Browser_Responsive.md    # Compatibility matrix (Chrome, Edge/Firefox, Mobile, iPad)
├── 05_Test_Summary/
│   └── Section_6_Test_Summary.md                # Executive half-page QA summary & next steps
└── 06_Playwright_Automation/
    ├── package.json                             # Playwright & dependency configuration
    ├── tsconfig.json                            # TypeScript configuration
    ├── playwright.config.ts                     # Cross-browser & environment setup
    ├── .env.example                             # Environment variable template for credentials
    ├── .gitignore                               # Git ignore for .env and test artifacts
    ├── README.md                                # Instructions to install & execute test suite
    └── tests/
        └── student-workflow.spec.ts             # Automated E2E test suite in TypeScript
```

---

## Summary of Completed Sections

| Section | Focus Area | Key Deliverable | Status |
| :--- | :--- | :--- | :---: |
| **Section 1** | Application Access & Compliance | Verified staging environment guidelines and rules of engagement (fictional data only, no pen-testing, single manual account). | **Complete** |
| **Section 2** | Exploratory Testing | 10 high-value scenarios evaluating authentication, student creation, IEP goals, caseload filtering, session logging, and data persistence. | **Complete** |
| **Section 3** | Detailed Test Cases | 7 structured test cases for the "Student Onboarding & IEP Goal Setup" workflow covering happy paths, boundary checks, and negative validations. | **Complete** |
| **Section 4** | Bug Reporting | 3 fully reproducible bug reports (with severity/priority, steps, expected vs. actual results, and evidence placeholders) + 4 minor usability notes. | **Complete** |
| **Section 5** | Cross-Browser & Responsive | Matrix testing across Chrome Desktop, Edge/Firefox Desktop, Mobile (390×844), and iPad Mini/Pro with explicit failure root-cause notes. | **Complete** |
| **Section 6** | Test Summary | Half-page executive QA assessment outlining scope, defect prioritization, skipped areas, and future test strategy. | **Complete** |
| **Section 7** | Playwright Automation (Bonus) | Automated TypeScript test suite utilizing resilient role-based locators, assertions, environment variable secret management, and cross-browser support. | **Complete** |

---

## How to Review and Run Automation

To run the automated tests in `06_Playwright_Automation/`:
```bash
cd 06_Playwright_Automation
npm install
cp .env.example .env
# Edit .env with your staging credentials
npx playwright test
```
See [`06_Playwright_Automation/README.md`](file:///c:/Users/KIIT/Downloads/New folder/06_Playwright_Automation/README.md) for full commands and options.
