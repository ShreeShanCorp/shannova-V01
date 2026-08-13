# Shan Nova LMS — Database & DBeaver Connection Guide 🗄️

**Shan Nova: From Campus to Career — Your journey from student to professional starts here.**  
*90-Day Full-Stack Web Development (PERN Stack with TypeScript)*

---

## 📍 1. Database Connection Parameters

### A. Local PostgreSQL Database (DBeaver Config)
| Parameter | Value |
| :--- | :--- |
| **Driver Name** | PostgreSQL |
| **Connect by** | Host |
| **Host** | `localhost` |
| **Port** | `5432` |
| **Database** | `kickstart` |
| **Authentication** | Database Native |
| **Username** | `postgres` |
| **Password** | `postgres` (or your local postgres password) |
| **Connection URL** | `postgresql://postgres:postgres@localhost:5432/kickstart?schema=public` |

### B. Production PostgreSQL Database (Google Cloud)
| Parameter | Value |
| :--- | :--- |
| **Driver Name** | PostgreSQL |
| **Connect by** | Host |
| **Host** | `34.134.174.129` |
| **Port** | `5432` |
| **Database** | `postgres` |
| **Authentication** | Database Native |
| **Username** | `postgres` |
| **Password** | `Dd*XxJ4Adrmeshal@2025` |
| **SSL Mode** | `prefer` (or `require`) |
| **Connection URL** | `postgresql://postgres:Dd*XxJ4Adrmeshal@2025@34.134.174.129:5432/postgres?schema=public&sslmode=prefer` |

---

## 🛠️ 2. How to Connect in DBeaver (Step-by-Step)

### Step 1: Open DBeaver
1. Launch **DBeaver** on your computer.
2. Click **Database** in the top menu bar ➔ **New Database Connection**.

### Step 2: Select PostgreSQL Driver
1. In the database list, select **PostgreSQL** and click **Next**.

### Step 3: Enter Connection Details
* **Connect by**: `Host`
* **Host**: `localhost`
* **Port**: `5432`
* **Database**: `kickstart`
* **Authentication**: `Database Native`
* **Username**: `postgres`
* **Password**: `postgres` (Check `Save password`)

### Step 4: Test & Finish
1. Click **Test Connection...** in the bottom left.
2. Once connected, click **Finish**.

### Step 5: Browse Tables in DBeaver
1. Expand `kickstart` ➔ `Schemas` ➔ `public` ➔ `Tables`.
2. You can view all live tables:
   - `users`: Student (`student@shannova.com`), Instructor (`instructor@shannova.com`), Admin (`admin@shannova.com`).
   - `cohorts`: 90-Day Full-Stack PERN Alpha Cohort.
   - `curricula`, `modules`, `weeks`, `topics`: Full 13-week syllabus.
   - `tasks`: Coding drills and 10 weekend projects.
   - `submissions`: Student code submissions and grades.
   - `classes`: Live masterclass schedules.

---

## 🖥️ 3. Alternative 1-Click Browser GUI (Prisma Studio)

If you want to view your database in your browser without opening DBeaver:

```powershell
cd "d:\SHAN PROJECTS\shannova_version01\apps\api"
npx prisma studio
```
Open **`http://localhost:5555`** in your browser.

---

## ⚡ 4. How to Reseed the Database

To refresh all 13 weeks of curriculum, 10 weekend projects, and test accounts:

```powershell
cd "d:\SHAN PROJECTS\shannova_version01\apps\api"
pnpm run db:seed
```
