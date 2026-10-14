# Section 2: Exploratory Testing

## Overview
Exploratory testing was conducted on [AbleSpace Staging](https://staging.ablespace.io) focusing on high-value end-user workflows: user onboarding, caseload management, student profile creation, IEP goal setting, session data collection, and search/filtering. 

Tests prioritized real-world educator and therapist interactions, edge cases, input validation, state management across browser navigation, and responsiveness.

---

## Deliverable: 10 Tested Scenarios & Results

| # | Feature / User Area | Scenario Tested | Result |
| :---: | :--- | :--- | :--- |
| **1** | **User Authentication & Signup** | Verified signup form input validation with invalid email formats, mismatched passwords, and submission without checking mandatory consent checkboxes. | **Pass:** Inline validation errors correctly blocked form submission and highlighted invalid fields. |
| **2** | **Student Onboarding (Mandatory Fields)** | Attempted saving a new student record with empty first and last name fields to verify mandatory field enforcement. | **Pass:** Form submission was blocked with descriptive "First Name is required" and "Last Name is required" error messages. |
| **3** | **Student Profile (Boundary & Special Characters)** | Created a student record using a 100-character name including hyphenated surnames, apostrophes, and accented characters (`José-María O'Connor-Smith`). | **Pass:** Student saved successfully; table and profile header rendered full text without layout breaks or text truncation. |
| **4** | **IEP Goal Setup (Date Logical Validation)** | Configured an IEP goal with a target completion date set 3 months *prior* to the IEP baseline start date. | **Fail (Bug):** The system allowed saving the goal with target date earlier than start date, resulting in negative progress timeline calculation. *(Logged as BUG-01)* |
| **5** | **Goal Metrics & Target Accuracy** | Configured quantitative targets across different metric types (Accuracy %, Trial counts, and Frequency count per session). | **Pass:** Numeric stepper and percentage limits accurately enforced bounds (0% to 100%) and prevented negative input. |
| **6** | **Caseload Roster Search & Filtering** | Filtered caseload by student name containing special characters (`O'Connor`) and combined with grade level dropdown filter. | **Fail (Bug):** Search returned zero records when searching for names with apostrophes/special characters despite matching records existing. *(Logged as BUG-03)* |
| **7** | **Modal Form State & Accidental Dismissal** | Clicked on the backdrop outside the "Add Student" drawer after filling in multiple detailed fields without clicking Save. | **Fail (Bug):** Drawer closed immediately without an unsaved changes confirmation modal, discarding all populated data. *(Logged as BUG-02)* |
| **8** | **Session Data Logging Persistence** | Initiated a live trial recording session, logged 5 correct/incorrect trials, and performed a hard browser refresh (`Ctrl + F5`). | **Pass:** In-progress session data was preserved via local state/draft caching; user was prompted to resume or discard. |
| **9** | **Caseload Empty State Handling** | Navigated to caseload roster using an account with zero active students and verified UI layout and call-to-actions. | **Pass:** Displayed a user-friendly illustration with clear primary CTA button "Add Your First Student" and helpful guidance text. |
| **10** | **Browser History & Back Navigation** | Navigated deep into Student Profile → IEP Goals → Goal Details, then used the browser's native Back and Forward buttons. | **Pass:** Single Page App routing retained URL state correctly (`/students/:id/goals/:goalId`) and navigated seamlessly without white screens or state desynchronization. |
