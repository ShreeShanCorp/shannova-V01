import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Full 90-Day PERN Curriculum (Levels 1 to 6 / 13 Weeks / 10 Projects)...");

  // 1. Clean previous database records
  await prisma.submission.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.topic.deleteMany({});
  await prisma.week.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.cohort.deleteMany({});
  await prisma.curriculum.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Seed Dedicated Test Accounts (1 for each Role)
  const student = await prisma.user.create({
    data: {
      id: "user-student-1",
      clerkId: "user_student_1",
      email: "student@shannova.com",
      firstName: "Alex",
      lastName: "Rivera",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "STUDENT",
    },
  });

  const instructor = await prisma.user.create({
    data: {
      id: "user-instructor-1",
      clerkId: "user_instructor_1",
      email: "instructor@shannova.com",
      firstName: "Sarah",
      lastName: "Jenkins",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      role: "INSTRUCTOR",
    },
  });

  const admin = await prisma.user.create({
    data: {
      id: "user-admin-tech",
      clerkId: "user_admin_tech",
      email: "techadmin@shancorp.in",
      firstName: "Shan",
      lastName: "TechAdmin",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      id: "user-admin-1",
      clerkId: "user_admin_1",
      email: "admin@shannova.com",
      firstName: "David",
      lastName: "Chen",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      role: "ADMIN",
    },
  });

  // 3. Seed 90-Day PERN Curriculum (Finalized Syllabus)
  const curriculum = await prisma.curriculum.create({
    data: {
      id: "curriculum-pern-90days",
      name: "Full-Stack Web Development (PERN Stack with TypeScript)",
      description: "90-Day Professional Bootcamp: 30% Theory (27 min) / 70% Practical (63 min) with 10 Weekend Projects and Live Production Capstone",
      version: "2026.1",
    },
  });

  // Full 13-Week Syllabus from docx
  const modulesData = [
    {
      title: "Level 1: Web & Programming Foundations (Weeks 1-4)",
      description: "HTML5, CSS3, Responsive Design, JavaScript Core & Modern ES6+",
      weeks: [
        {
          title: "Week 1: HTML5 & Document Architecture",
          topics: [
            { title: "HTML Fundamentals & Document Structure", description: "30% Theory: Browsers & DOM | 70% Practical: Personal Profile Page Drill" },
            { title: "Links, Media, Forms & Semantic Tags", description: "30% Theory: Accessibility & SEO | 70% Practical: Student Registration Form" },
          ],
        },
        {
          title: "Week 2: CSS3, Flexbox & Responsive Grid",
          topics: [
            { title: "CSS Box Model, Colors & Typography", description: "30% Theory: Specificity & Layout Model | 70% Practical: Styled Card Components" },
            { title: "Flexbox, CSS Grid & Media Queries", description: "30% Theory: Mobile-First Strategy | 70% Practical: Responsive Product Grid" },
          ],
        },
        {
          title: "Week 3: JavaScript Core Programming",
          topics: [
            { title: "Variables, Data Types, Conditionals & Loops", description: "30% Theory: Execution Context | 70% Practical: Number Analysis Engine" },
            { title: "Functions, Scope, Closures & Array Methods", description: "30% Theory: Functional Patterns | 70% Practical: Map/Filter/Reduce Pipeline" },
          ],
        },
        {
          title: "Week 4: Modern JavaScript & Asynchronous Programming",
          topics: [
            { title: "Objects, Destructuring, Rest/Spread & Modules", description: "30% Theory: ES Modules vs CommonJS | 70% Practical: Modular Data Processor" },
            { title: "Promises, Async/Await, Fetch API & LocalStorage", description: "30% Theory: Event Loop & Microtasks | 70% Practical: JSON API Client" },
          ],
        },
      ],
    },
    {
      title: "Level 2: TypeScript Deep Dive (Week 5)",
      description: "Static Typing, Generics, Discriminated Unions and Type-Safe Architecture",
      weeks: [
        {
          title: "Week 5: TypeScript Mastery",
          topics: [
            { title: "Type Annotations, Interfaces & Custom Types", description: "30% Theory: Structural Typing | 70% Practical: Typed User Model" },
            { title: "Generics, Utility Types & Discriminated Unions", description: "30% Theory: Exhaustive Pattern Matching | 70% Practical: Type-Safe Store" },
          ],
        },
      ],
    },
    {
      title: "Level 3: Node.js & Express REST APIs (Weeks 6-7)",
      description: "V8 Engine, Event Loop, Streams, Express Routing, Middleware Pipeline & Zod",
      weeks: [
        {
          title: "Week 6: Node.js Core Runtime",
          topics: [
            { title: "Node.js Architecture, V8 & Non-Blocking I/O", description: "30% Theory: Call Stack & Worker Pool | 70% Practical: HTTP Server Drill" },
            { title: "File Streams, Buffers & EventEmitter", description: "30% Theory: Memory Efficient Streaming | 70% Practical: Log File Streamer" },
          ],
        },
        {
          title: "Week 7: Express REST API Architecture",
          topics: [
            { title: "Express Routing, Controllers & Middleware", description: "30% Theory: Request/Response Pipeline | 70% Practical: CRUD API Engine" },
            { title: "Zod Schema Validation & Centralized Error Handling", description: "30% Theory: Defensive Programming | 70% Practical: Safe API Validator" },
          ],
        },
      ],
    },
    {
      title: "Level 4: PostgreSQL & Database Engineering (Weeks 8-9)",
      description: "Relational Modeling, SQL, Indexing, ACID Transactions, Sequelize & Prisma ORM",
      weeks: [
        {
          title: "Week 8: PostgreSQL & SQL Fundamentals",
          topics: [
            { title: "Relational Schema, Constraints & SQL Queries", description: "30% Theory: Foreign Keys & Normalization | 70% Practical: SQL Schema Drill" },
            { title: "Joins, Aggregations, Indexing & Query Plans", description: "30% Theory: B-Tree Indexes & EXPLAIN | 70% Practical: Analytics Query Builder" },
          ],
        },
        {
          title: "Week 9: Sequelize & Prisma ORM with ACID Transactions",
          topics: [
            { title: "ORM Modeling, Migrations & Associations", description: "30% Theory: 1:1, 1:N, N:M Relations | 70% Practical: E-Commerce Data Layer" },
            { title: "Database Transactions & Optimistic Locking", description: "30% Theory: ACID Isolation Levels | 70% Practical: Bank Transfer Flow" },
          ],
        },
      ],
    },
    {
      title: "Level 5: React, Full-Stack Integration & Auth (Weeks 10-12)",
      description: "React 19, Custom Hooks, Zustand, TanStack Query, JWT Auth & WebSockets",
      weeks: [
        {
          title: "Week 10: React 19 & Component Architecture",
          topics: [
            { title: "JSX, Props, State, Component Lifecycles & Hooks", description: "30% Theory: Virtual DOM Reconciliation | 70% Practical: Interactive UI" },
            { title: "React Hook Form, Zod Validation & Tailwind CSS", description: "30% Theory: Controlled vs Uncontrolled | 70% Practical: Multi-Step Form" },
          ],
        },
        {
          title: "Week 11: State Management & Full-Stack API Integration",
          topics: [
            { title: "Client State with Zustand & Server State with TanStack Query", description: "30% Theory: Cache Invalidation | 70% Practical: Live Data Grid" },
            { title: "JWT Authentication, Bcrypt & Protected Routes", description: "30% Theory: Token Lifecycles & RBAC | 70% Practical: Auth Guard System" },
          ],
        },
        {
          title: "Week 12: Real-Time WebSockets & Backend Security",
          topics: [
            { title: "Socket.IO Real-Time Messaging & Broadcasts", description: "30% Theory: Full-Duplex WebSockets | 70% Practical: Live Classroom Chat" },
            { title: "Rate Limiting, CORS, Helmet & Redis Caching", description: "30% Theory: OWASP Top 10 | 70% Practical: Hardened API Gateway" },
          ],
        },
      ],
    },
    {
      title: "Level 6: Capstone SaaS & Career Readiness (Week 13)",
      description: "Docker, CI/CD with GitHub Actions, Google Cloud Deployment & Mock Interviews",
      weeks: [
        {
          title: "Week 13: Full-Stack Production Capstone & Cloud Deployment",
          topics: [
            { title: "Docker Containerization & GitHub Actions CI/CD", description: "30% Theory: Multi-Stage Builds | 70% Practical: Automated Deploy Pipeline" },
            { title: "Production Deployment on Google Cloud & Interview Prep", description: "30% Theory: System Design Review | 70% Practical: Live SaaS Launch" },
          ],
        },
      ],
    },
  ];

  // Insert all modules, weeks, and topics
  for (let mIdx = 0; mIdx < modulesData.length; mIdx++) {
    const mData = modulesData[mIdx];
    const mod = await prisma.module.create({
      data: {
        curriculumId: curriculum.id,
        title: mData.title,
        description: mData.description,
        order: mIdx + 1,
      },
    });

    for (let wIdx = 0; wIdx < mData.weeks.length; wIdx++) {
      const wData = mData.weeks[wIdx];
      const wk = await prisma.week.create({
        data: {
          moduleId: mod.id,
          title: wData.title,
          order: wIdx + 1,
        },
      });

      for (let tIdx = 0; tIdx < wData.topics.length; tIdx++) {
        const tData = wData.topics[tIdx];
        await prisma.topic.create({
          data: {
            weekId: wk.id,
            title: tData.title,
            description: tData.description,
            order: tIdx + 1,
          },
        });
      }
    }
  }

  // 4. Seed Cohort
  const cohort = await prisma.cohort.create({
    data: {
      id: "cohort-pern-90days-id",
      name: "90-Day Full-Stack PERN Alpha (30% Theory / 70% Practical)",
      slug: "cohort-pern-90days",
      status: "ACTIVE",
      startDate: new Date("2026-08-01"),
      endDate: new Date("2026-11-01"),
      curriculumId: curriculum.id,
    },
  });

  // Enroll Test Student
  await prisma.enrollment.create({
    data: {
      userId: student.id,
      cohortId: cohort.id,
      role: "STUDENT",
    },
  });

  // 5. Seed 10 Weekend Projects + Daily Drills
  const weekendProjects = [
    { id: "project-1", title: "Weekend Project 1: Personal Developer Portfolio", desc: "HTML5 + CSS3 semantic, responsive portfolio with dark mode and contact form.", pts: 100 },
    { id: "project-2", title: "Weekend Project 2: Responsive Business Website", desc: "Mobile-first responsive business website using CSS Flexbox, Grid, and animations.", pts: 100 },
    { id: "project-3", title: "Weekend Project 3: JavaScript Task Management App", desc: "Interactive task manager with CRUD, filtering, search, and LocalStorage persistence.", pts: 100 },
    { id: "project-4", title: "Weekend Project 4: Type-Safe CLI Inventory System", desc: "TypeScript CLI tool parsing arguments, managing product inventory, and strict error handling.", pts: 100 },
    { id: "project-5", title: "Weekend Project 5: Production REST API Engine", desc: "Express + TypeScript REST API with Zod validation, JWT authentication, and pagination.", pts: 100 },
    { id: "project-6", title: "Weekend Project 6: PostgreSQL E-Commerce Schema", desc: "Relational database schema with indexes, foreign keys, transactions, and analytics queries.", pts: 100 },
    { id: "project-7", title: "Weekend Project 7: Full-Stack React Product Dashboard", desc: "React 19 + TanStack Query dashboard consuming backend REST APIs with optimistic updates.", pts: 100 },
    { id: "project-8", title: "Weekend Project 8: Real-Time Collaborative Workspace", desc: "Real-time communication app using WebSockets, rooms, presence indicators, and Redis.", pts: 100 },
    { id: "project-9", title: "Weekend Project 9: Admin Management Dashboard", desc: "Multi-tenant admin console with role-based access control, analytics charts, and exports.", pts: 100 },
    { id: "project-10", title: "Weekend Project 10: Full-Stack Production SaaS Capstone", desc: "Complete production-ready full-stack application deployed live with CI/CD and Docker.", pts: 200 },
  ];

  for (const proj of weekendProjects) {
    await prisma.task.create({
      data: {
        id: proj.id,
        cohortId: cohort.id,
        title: proj.title,
        description: proj.desc,
        type: "PROJECT",
        points: proj.pts,
        dueDate: new Date(Date.now() + 86400000 * 7),
      },
    });
  }

  // Seed 1 active submission for grading queue
  await prisma.submission.create({
    data: {
      taskId: "project-1",
      userId: student.id,
      status: "GRADED",
      grade: 98,
      feedback: "Outstanding semantic markup, flawless responsive breakpoints, and clean code formatting!",
      submittedAt: new Date(),
    },
  });

  // 6. Seed Scheduled Live Masterclass
  await prisma.class.create({
    data: {
      cohortId: cohort.id,
      instructorId: instructor.id,
      title: "Live Practical Workshop: PostgreSQL Indexing & Query Tuning",
      description: "70% Hands-on session: Analyze execution plans with EXPLAIN ANALYZE, build composite indexes, and optimize query latency.",
      status: "SCHEDULED",
      startTime: new Date(Date.now() + 3600000 * 2),
      endTime: new Date(Date.now() + 3600000 * 4),
      meetingUrl: "https://meet.jit.si/shannova-pern-masterclass",
    },
  });

  console.log("✅ All 13 Weeks, 10 Weekend Projects & Clean Test Data Seeded Successfully!");
}

main()
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
