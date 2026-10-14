# Section 4: Bug Reports

## Overview
Below are 3 comprehensive defect reports discovered during testing of [AbleSpace Staging](https://staging.ablespace.io), prioritized by impact on special education compliance, data accuracy, and user workflows. A supplementary list of minor cosmetic and usability observations is included at the end.

---

### Bug Report BUG-01: Target Completion Date Accepts Dates Prior to Start Date

| Field | Description |
| :--- | :--- |
| **Bug ID** | BUG-01 |
| **Title** | Goal creation accepts Target Completion Date prior to IEP Start Date without validation, breaking timeline visualization |
| **Severity** | **High** *(Causes mathematical corruption in progress calculation and invalid special ed compliance records)* |
| **Priority** | **High** *(Core value proposition of the product relies on accurate goal progression)* |
| **Environment** | `https://staging.ablespace.io`, Tested on October 14, 2026 |
| **Browser / Device** | Google Chrome Version 129.0.6668.71 (Official Build) (64-bit) on Windows 11 Pro |
| **Reproducibility** | **Always** (100% reproducible on fresh or existing accounts) |
| **Steps to Reproduce** | 1. Log in to AbleSpace and navigate to any active student from the caseload.<br>2. Click on the **"Goals"** tab and click **"+ Add New Goal"**.<br>3. Fill in mandatory fields: Goal Title (`Expressive Vocabulary`), Domain (`Speech/Language`), and Metric (`Percentage %`).<br>4. In the date selection fields:<br>&nbsp;&nbsp;&nbsp;&nbsp;a. Set **Start Date** to `2026-10-01`.<br>&nbsp;&nbsp;&nbsp;&nbsp;b. Open the **Target Completion Date** picker and select `2026-06-01` (4 months before start date).<br>5. Click the **"Save Goal"** button.<br>6. Observe the goal card and progress timeline widget. |
| **Expected Result** | The form should validate that `Target Date > Start Date`. The date picker should disable dates preceding the start date, or display an inline error: *"Target date cannot be earlier than start date"*, preventing form submission. |
| **Actual Result** | The form successfully submits. The saved goal renders a corrupted progress graph displaying negative elapsed duration (-122 days) and distorted baseline trendlines. |
| **Evidence** | `[Screenshot: evidence/bug-01-negative-goal-dates.png]` |

---

### Bug Report BUG-02: Backdrop Click on "Add Student" Drawer Discards Unsaved Form Data

| Field | Description |
| :--- | :--- |
| **Bug ID** | BUG-02 |
| **Title** | Clicking outside the "Add Student" drawer immediately closes the modal and discards all populated data without a confirmation prompt |
| **Severity** | **Medium** *(High user frustration and loss of uncommitted work during detailed profile creation)* |
| **Priority** | **High** *(Educators frequently take notes and copy student info across tabs; accidental dismissal leads to repeated data entry)* |
| **Environment** | `https://staging.ablespace.io`, Tested on October 14, 2026 |
| **Browser / Device** | Mozilla Firefox 131.0 and Google Chrome 129 on Windows 11 |
| **Reproducibility** | **Always** |
| **Steps to Reproduce** | 1. Log in to AbleSpace and go to the Caseload roster page.<br>2. Click **"+ Add Student"** to open the slide-out drawer.<br>3. Fill out First Name, Last Name, DOB, Grade, Primary Contact, and multiple lines of notes in the Accommodations field.<br>4. Before clicking "Save", accidentally click anywhere on the dimmed background overlay (or press the `Escape` key).<br>5. Re-open the **"+ Add Student"** drawer. |
| **Expected Result** | When the form has uncommitted changes (`dirty state`), clicking the backdrop or pressing `Esc` should trigger an alert confirmation: *"You have unsaved changes. Are you sure you want to discard them? [Cancel] [Discard]"* or disable modal dismissal via backdrop click. |
| **Actual Result** | The drawer abruptly unmounts immediately. Upon re-opening the drawer, all previously typed data is completely wiped. |
| **Evidence** | `[Screen Recording: evidence/bug-02-backdrop-data-loss.mp4]` |

---

### Bug Report BUG-03: Caseload Search Filter Returns Zero Results for Surnames with Special Characters

| Field | Description |
| :--- | :--- |
| **Bug ID** | BUG-03 |
| **Title** | Search query fails to return student records whose names contain apostrophes, hyphens, or accented characters |
| **Severity** | **Medium** *(Impedes basic searchability and roster management for culturally diverse student names)* |
| **Priority** | **Medium** *(Workaround exists by scrolling, but search fails for legitimate common names)* |
| **Environment** | `https://staging.ablespace.io`, Tested on October 14, 2026 |
| **Browser / Device** | Microsoft Edge 129.0.2792.79 on Windows 11 (64-bit) |
| **Reproducibility** | **Always** |
| **Steps to Reproduce** | 1. Create a student with the name `Liam O'Connor` or `José Smith`.<br>2. Confirm the student is listed in the main Caseload roster table.<br>3. In the Caseload search bar, type `O'Connor` (or `José`).<br>4. Observe the filtered roster table. |
| **Expected Result** | The search filter should sanitize special characters and return `Liam O'Connor` in the table. |
| **Actual Result** | The table displays an empty state: *"No students found matching 'O'Connor'"*. Removing the apostrophe and searching `Connor` returns the student, indicating unhandled character escaping in client-side filtering / query params. |
| **Evidence** | `[Screenshot: evidence/bug-03-search-special-chars.png]` |

---

## List of Minor Issues Observed

1. **MINOR-01:** Lack of explanatory tooltip on "Metric Calculation Mode" (Cumulative vs. Average Trials) during IEP Goal setup, creating initial ambiguity for new users.
2. **MINOR-02:** Success toast notification dismisses automatically after 2.0 seconds, which is too brief for screen readers and users reading extended confirmation notices.
3. **MINOR-03:** Inconsistent action button text: labeled as **"Save Student"** on desktop drawer, but reads **"Submit"** on mobile viewports.
4. **MINOR-04:** Checkbox focus indicators in caseload multi-select lack adequate contrast against grey alternating row backgrounds, not meeting WCAG 2.1 AA accessibility guidelines.
