# Section 3: Detailed Test Cases

## Selected Core Workflow
**Workflow:** Student Onboarding & IEP Goal Setup Workflow  
*(Create Student → Enter Demographic Details → Save Record → Search/View in Caseload → Add Measurable IEP Goal → Edit Student Profile)*

> **Why this workflow was chosen:**  
> This workflow was selected because student onboarding and IEP goal definition represent the foundational core of AbleSpace—all downstream progress tracking, session logs, and compliance reporting depend on valid student and goal data integrity.

---

### Test Case TC-01: Create Student with Valid Mandatory and Optional Details (Positive)

| Field | Description |
| :--- | :--- |
| **Test Case ID** | TC-01 |
| **Title** | Verify that a logged-in user can successfully create a new student with all valid mandatory and optional fields |
| **Preconditions** | User is authenticated with an active educator account and is on the Caseload dashboard (`/dashboard` or `/students`). |
| **Test Data** | First Name: `Alex`, Last Name: `Taylor`, DOB: `2016-04-12`, Grade: `3rd Grade`, Student ID: `STU-98421`, Primary Contact: `Jordan Taylor (Parent) - 555-0199` |
| **Steps** | 1. Click on the **"+ Add Student"** primary button on the top right.<br>2. In the "Add Student" modal/drawer, enter First Name: `Alex` and Last Name: `Taylor`.<br>3. Select Date of Birth `2016-04-12` using the date picker.<br>4. Select Grade `3rd Grade` from the dropdown.<br>5. Enter Student ID `STU-98421` and Primary Contact details.<br>6. Click the **"Save Student"** button. |
| **Expected Result** | Form closes, a success toast appears ("Student created successfully"), and the new student `Alex Taylor` is immediately visible in the active caseload table with accurate details. |
| **Actual Result** | As expected; student was created with success toast and displayed at the top of the caseload list. |
| **Status** | **Pass** |

---

### Test Case TC-02: Mandatory Field Validation on Student Creation (Negative)

| Field | Description |
| :--- | :--- |
| **Test Case ID** | TC-02 |
| **Title** | Verify that creating a student without mandatory fields (First Name and Last Name) is blocked with clear validation messages |
| **Preconditions** | User is logged in and the "Add Student" modal is open. |
| **Test Data** | First Name: `[Empty]`, Last Name: `[Empty]`, Grade: `5th Grade` |
| **Steps** | 1. Click on the **"+ Add Student"** button.<br>2. Leave First Name and Last Name fields completely empty.<br>3. Select Grade: `5th Grade`.<br>4. Click the **"Save Student"** button. |
| **Expected Result** | The form should NOT submit. Inline red validation error labels should appear under both fields (e.g., "First name is required" and "Last name is required"), with focus shifting to the first invalid field. |
| **Actual Result** | Inline error messages displayed as expected; form submission was prevented. |
| **Status** | **Pass** |

---

### Test Case TC-03: Boundary & Character Handling in Student Name (Edge Case)

| Field | Description |
| :--- | :--- |
| **Test Case ID** | TC-03 |
| **Title** | Verify system handling of max boundary length and diverse character sets in student names |
| **Preconditions** | User is logged in and the "Add Student" modal is open. |
| **Test Data** | First Name: `María-José (ESL)`, Last Name: `O'Connor-Vanderbilt-Longname-Extremelengthtest`, Grade: `2nd Grade` |
| **Steps** | 1. Open the "Add Student" form.<br>2. Input names containing hyphens, apostrophes, parentheses, and accented characters.<br>3. Fill in mandatory fields and click **"Save Student"**.<br>4. Inspect the caseload table, student profile header, and browser URL encoding. |
| **Expected Result** | Data saves cleanly without encoding corruption (`&amp;`, `&#39;`). Text renders properly with graceful wrapping or ellipsis in tight UI containers without breaking table borders. |
| **Actual Result** | Characters saved and displayed accurately in the table and header without layout distortion. |
| **Status** | **Pass** |

---

### Test Case TC-04: Add Measurable IEP Goal with Valid Target Metrics (Positive)

| Field | Description |
| :--- | :--- |
| **Test Case ID** | TC-04 |
| **Title** | Verify that a user can successfully create and attach a measurable IEP goal to a student profile |
| **Preconditions** | Student `Alex Taylor` exists in the caseload. User is on the student's "Goals" tab. |
| **Test Data** | Domain: `Speech & Language`, Goal Title: `Auditory Comprehension in Multi-Step Directions`, Metric Type: `Percentage Accuracy (%)`, Baseline: `40%`, Target: `80%`, Start Date: `2026-09-01`, Target Date: `2027-06-15` |
| **Steps** | 1. Navigate to student `Alex Taylor` → click **"Goals"** tab.<br>2. Click **"+ Add New Goal"**.<br>3. Enter Title, Domain, select Metric Type `Percentage (%)`.<br>4. Set Baseline `40` and Target `80`.<br>5. Set Start Date `2026-09-01` and Target Date `2027-06-15`.<br>6. Click **"Save Goal"**. |
| **Expected Result** | Goal is saved and displayed under the student's active goals list with a progress chart indicator initialized at 40% baseline toward 80% target. |
| **Actual Result** | Goal created successfully, displaying accurate baseline, target metric, and target date. |
| **Status** | **Pass** |

---

### Test Case TC-05: Logical Date Validation on Goal Target Date (Negative / Edge Case)

| Field | Description |
| :--- | :--- |
| **Test Case ID** | TC-05 |
| **Title** | Verify that setting a Goal Target Completion Date earlier than the Start Date is prohibited |
| **Preconditions** | User is inside the "Add Goal" form for an existing student. |
| **Test Data** | Start Date: `2026-09-01`, Target Completion Date: `2026-05-01` (4 months before start date) |
| **Steps** | 1. Open the "Add Goal" form.<br>2. Enter valid goal title and category.<br>3. Set IEP Start Date to `2026-09-01`.<br>4. Select Target Date to `2026-05-01` in the date picker.<br>5. Click **"Save Goal"**. |
| **Expected Result** | System should display a validation error: "Target completion date must be after start date" and disable form submission. |
| **Actual Result** | **Bug:** The system accepts the invalid date range and saves the goal. The progress chart shows a distorted/negative timeline. *(Logged as BUG-01)* |
| **Status** | **Fail** |

---

### Test Case TC-06: Caseload Search and Filter by Name and Grade (Positive / Usability)

| Field | Description |
| :--- | :--- |
| **Test Case ID** | TC-06 |
| **Title** | Verify caseload table search filter responds accurately to partial and full student name queries |
| **Preconditions** | Caseload has at least 5 students across various grades (including `Alex Taylor` in 3rd Grade). |
| **Test Data** | Search Query: `Alex`, Grade Filter: `3rd Grade` |
| **Steps** | 1. Navigate to the Caseload roster page (`/students`).<br>2. Type `Alex` in the search input field.<br>3. Observe real-time filtering or press Enter.<br>4. Apply Grade filter: `3rd Grade`.<br>5. Click on the resulting student row to view details. |
| **Expected Result** | Table filters down to matching student (`Alex Taylor`). Clicking the row opens the student's profile drawer/view without lag. |
| **Actual Result** | Matching student displayed; row click navigated to student profile view. |
| **Status** | **Pass** |

---

### Test Case TC-07: Edit Student Details and Verify Persistence After Hard Refresh (Positive / State Persistence)

| Field | Description |
| :--- | :--- |
| **Test Case ID** | TC-07 |
| **Title** | Verify that editing student profile data persists accurately in the database following a page refresh |
| **Preconditions** | Student `Alex Taylor` exists in caseload. |
| **Test Data** | Updated Grade: `4th Grade`, Updated Notes: `Receives 30 min speech therapy bi-weekly.` |
| **Steps** | 1. Open student `Alex Taylor` profile.<br>2. Click **"Edit Details"**.<br>3. Change Grade from `3rd Grade` to `4th Grade`.<br>4. Add note: `Receives 30 min speech therapy bi-weekly.`.<br>5. Click **"Save Changes"**.<br>6. Perform a browser hard refresh (`Ctrl + Shift + R` or `Ctrl + F5`).<br>7. Re-open student profile and check Grade and Notes. |
| **Expected Result** | After refresh, the student profile reflects `4th Grade` and displays the saved note accurately. |
| **Actual Result** | Changes persisted in backend database and reloaded accurately after hard refresh. |
| **Status** | **Pass** |
