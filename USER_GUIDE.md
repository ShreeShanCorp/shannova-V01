# Shan Nova LMS — Comprehensive User Guide & Client Demo Reference 🎓

**From Campus to Career — Your journey from student to professional starts here.**  
*90-Day Full-Stack Web Development (PERN Stack with TypeScript)*

---

## 👥 1. Pre-Configured Test Accounts (Database Seed Data)

| Role | Email | Password | Dedicated Portal |
| :--- | :--- | :--- | :--- |
| **Student** | `student@shannova.com` | `password123` | **Student Portal** ([`/student`](file:///d:/SHAN%20PROJECTS/shannova_version01/apps/web/src/routes/student/index.tsx)) |
| **Instructor** | `instructor@shannova.com` | `password123` | **Instructor Workspace** ([`/instructor`](file:///d:/SHAN%20PROJECTS/shannova_version01/apps/web/src/routes/instructor/index.tsx)) |
| **Admin** | `admin@shannova.com` | `password123` | **Admin Console** ([`/admin`](file:///d:/SHAN%20PROJECTS/shannova_version01/apps/web/src/routes/admin/index.tsx)) |

---

## 🔑 2. Authentication: Sign-In & Sign-Up Portals

Shan Nova provides dedicated authentication pages that allow any user to sign up or log in and immediately enter their role-specific interface:

### A. **Sign-In Page ([`/sign-in`](file:///d:/SHAN%20PROJECTS/shannova_version01/apps/web/src/routes/sign-in.tsx))**:
- **⚡ 1-Click Fast Login**: Click any role card (**Student**, **Instructor**, **Admin**) for instant 1-click test login.
- **🔑 Password Login**: Select your role, enter email (`student@shannova.com`) & password (`password123`).
- **📧 Email OTP Login**: Receive real 6-digit verification codes sent directly to your inbox via Gmail (`shannovaotpsender@gmail.com`).
- **Automatic Routing**:
  - Student ➔ `/student`
  - Instructor ➔ `/instructor`
  - Admin ➔ `/admin`

### B. **Sign-Up Page ([`/sign-up`](file:///d:/SHAN%20PROJECTS/shannova_version01/apps/web/src/routes/sign-up.tsx))**:
- Create a new account with First Name, Last Name, Email, Password, and Role selection.
- Instantly creates the user in the PostgreSQL database, triggers a welcome email, and routes to their dedicated interface!

---

## 3. 🎓 Student Experience (Alex Rivera)

### 📌 Clean, Isolated Student Navigation
The Student portal navigation contains **ONLY** student tools:
- **Dashboard** (`/student`)
- **Curriculum** (`/student/curriculum`)
- **Drills & Tasks** (`/student/tasks`)

---

### Step-by-Step Student Workflow:
1. **Accessing the Student Portal**:
   - Open `http://localhost:5173`.
   - Click **Explore Student Portal** on the home page (or choose **Student** in `/sign-in`).
2. **Student Dashboard (`/student`)**:
   - View your Overall Grade (**95%**), Day Streak (**7 Days**), and Completed Tasks (**12 / 16**).
   - View the **Next Live Masterclass** card with a 1-click **Join Live Room** button (`https://meet.jit.si/shannova-pern-masterclass`).
3. **30% Theory / 70% Practical Learning Lab (`/student/curriculum`)**:
   - **📖 30% Theory Tab (27 min)**: Conceptual architecture, type constraints, memory models, mentor notes.
   - **⚡ 70% Practical Lab Tab (53 min)**: Live in-browser TypeScript Monaco code editor. Write code and click **Run Code (Test)** to see immediate terminal output.
   - **📝 Daily Assessment Tab (7 min)**: 5 Multiple Choice Questions. Select answers and click **Submit Assessment** to view instant scores and explanations.
   - **📁 Weekend Project Tab**: View briefs for Saturday (3h build) and Sunday (2h refactor & deploy). Enter your **GitHub Repo URL** and **Live Demo URL** to submit.

### 🧪 Student APIs to Test:
* `GET /api/v1/classes` — Fetch upcoming live masterclasses.
* `GET /api/v1/curricula` — Get 90-Day PERN curriculum tree.
* `GET /api/v1/tasks?cohortId=cohort-pern-90days-id` — Get coding drills and weekend projects.
* `POST /api/v1/execute` — Execute TypeScript code live:
  ```json
  { "source_code": "console.log('Testing Shan Nova IDE');", "language_id": 63 }
  ```
* `POST /api/v1/submissions` — Submit assignment code or GitHub URL.

---

## 4. 👩‍🏫 Instructor Experience (Sarah Jenkins)

### 📌 Clean, Isolated Instructor Navigation
- **Dashboard** (`/instructor`)
- **Live Classes** (`/instructor/classes`)
- **Grading Queue** (`/instructor/tasks`)

---

### Step-by-Step Instructor Workflow:
1. **Accessing the Workspace**:
   - In the top-right profile menu, click **Instructor Mode** (or sign in via `/sign-in`).
2. **Instructor Dashboard (`/instructor`)**:
   - View cohort roster (**28 Enrolled Students**).
   - View pending submissions grading queue (**1 Pending Review**).
3. **Live Class Management (`/instructor/classes`)**:
   - Click **Schedule Live Class**, set title, start/end time, and topic.
   - Click **Start Broadcast** to launch the live lecture room for students (automated email invites sent to students).
4. **Grading Queue (`/instructor/tasks`)**:
   - Inspect student code submissions and GitHub URLs, assign grades out of 100, add feedback notes, and save (automated grade notification emailed to student).

---

## 5. 🛡️ Admin Experience (David Chen)

### 📌 Clean, Isolated Admin Navigation
- **Dashboard** (`/admin`)
- **Cohorts** (`/admin/cohorts`)
- **Curriculum Builder** (`/admin/curriculum`)

---

### Step-by-Step Admin Workflow:
1. **Accessing the Admin Console**:
   - In the top-right profile menu, click **Admin Mode** (or sign in via `/sign-in`).
2. **Admin Dashboard (`/admin`)**:
   - Monitor system metrics: Active Cohorts, Curricula version (`2026.1`), API Health (Port 4001).
3. **Cohort & Curriculum Management (`/admin/cohorts` & `/admin/curriculum`)**:
   - Create new bootcamp cohorts and set start/end dates.
   - Build and restructure Modules, Weeks, and Topics.
4. **Direct Database GUI (DBeaver & Prisma Studio)**:
   - Connect via **DBeaver** on `localhost:5432` (`kickstart`) or run:
     ```powershell
     cd "d:\SHAN PROJECTS\shannova_version01\apps\api"
     npx prisma studio
     ```
   - Open **`http://localhost:5555`** to browse and edit all database tables.

---

## 6. 🚀 How to Run Locally for Client Demo

### Terminal 1: Backend API Server
```powershell
cd "d:\SHAN PROJECTS\shannova_version01\apps\api"
pnpm run dev
```
*API runs at `http://localhost:4001` (Swagger Docs: `http://localhost:4001/api/docs`)*

### Terminal 2: Frontend Web App
```powershell
cd "d:\SHAN PROJECTS\shannova_version01\apps\web"
pnpm run dev
```
*Web App runs at `http://localhost:5173`*

### Terminal 3: Database GUI (Prisma Studio)
```powershell
cd "d:\SHAN PROJECTS\shannova_version01\apps\api"
npx prisma studio
```
*Prisma Studio runs at `http://localhost:5555`*
