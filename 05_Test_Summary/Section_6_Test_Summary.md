# Section 6: Test Summary

### 1. Testing Performed
During this testing cycle on **AbleSpace** (`staging.ablespace.io`), testing focused on the core pedagogical and caseload workflows: user authentication/onboarding, student profile management, measurable IEP goal creation, progress tracking charts, search/filter capabilities, and session persistence. 

Testing was executed across three primary desktop browser engines—**Google Chrome 129**, **Mozilla Firefox 131**, and **Microsoft Edge 129** on Windows 11 (1920 × 1080)—alongside **Mobile Viewport emulation (390 × 844)** and **Tablet emulation (iPad Mini & iPad Pro)**. Both positive happy paths, edge cases (character encoding, long strings, rapid actions, hard reloads), and negative validation boundary scenarios were executed.

### 2. Issues Found & Prioritization
A total of **3 significant defects** and **4 minor usability/accessibility enhancements** were documented:
- **BUG-01 (High Severity / High Priority):** Goal creation allows setting a Target Completion Date prior to the IEP Start Date without validation, distorting progress timelines.
- **BUG-02 (Medium Severity / High Priority):** Accidental backdrop clicks dismiss the "Add Student" drawer, discarding all entered form data without confirmation.
- **BUG-03 (Medium Severity / Medium Priority):** Caseload search fails to return student records whose names contain apostrophes or hyphens (`O'Connor`, `José`).

**Defect to Fix First:**  
I would prioritize **BUG-01** as the first fix. AbleSpace is an IEP tracking tool governed by special education legal and district compliance standards. Allowing inverted date ranges compromises the fundamental integrity of student progress timelines and generated compliance reports. Fixing this requires adding a simple form-level validation rule (`targetDate > startDate`) before submission, preventing corrupt data downstream.

### 3. Areas Not Tested (And Why)
The following areas were intentionally omitted from this test cycle:
- **Billing & Subscription Upgrades:** Skipped to prevent initiating real payment transactions or invalid test card charges on staging.
- **Bulk Data Import / Integrations (e.g., Google Classroom, SEIS):** Requires administrative district credentials and external sandbox API keys outside the assignment scope.
- **Destructive Account Deletion:** Skipped per the assignment's rule of engagement to maintain a single manual user account without running destructive account cycles.
- **Load, Security, and Penetration Testing:** Explicitly avoided in strict adherence to the assignment's rules of testing.

### 4. What I Would Test Next
If allotted an additional 1–2 hours, I would focus on:
1. **Live Session Data Tracking in Group Mode:** Testing real-time trial recording when tracking multiple students simultaneously during group therapy sessions. This involves rapid concurrent clicks and verifying that trial tallies don't race or drop.
2. **Offline Mode & Data Synchronization:** Testing offline behavior by simulating network dropouts (`DevTools Network Offline`) during active data logging to confirm whether session data is queued in IndexedDB/LocalStorage and syncs smoothly upon reconnection.
3. **Report Generation & PDF Export:** Verifying that progress graphs, trial percentages, and goal mastery summaries render accurately when exported to PDF or printed for IEP parent meetings.
