# 📝 Full-Stack Node.js Message Board

A modern, production-grade message board application built from scratch to demonstrate robust backend architecture, serverless deployment, database connection pooling, and secure server-side validation.

---

## 🚀 Live Demo & Architecture
* **Live Application:** (https://messageboard-dm6fek45r-rex-7e9e.vercel.app/)
* **Architecture:** Node.js/Express MVC pattern, serverless edge routing (`@vercel/node`), and cloud-hosted PostgreSQL via Supabase.

---

## ✨ Features
* **Full CRUD Operations:** Create, Read, Update, and Delete messages seamlessly.
* **Persistent Cloud Database:** Relational data storage backed by Supabase PostgreSQL.
* **Server-Side Validation:** Form inputs are strictly sanitized and validated using `express-validator` to prevent malformed entries.
* **Dynamic Timestamps:** Automated database-level record creation tracking (`DEFAULT NOW()`).
* **Serverless Compatibility:** Custom routing configuration optimized for Vercel's serverless ecosystem.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Templating Engine:** EJS (Embedded JavaScript)
* **Database & Driver:** Supabase PostgreSQL (`pg` connection pooler)
* **Validation & Security:** `express-validator`
* **Deployment:** Vercel

---

## ⚙️ Engineering Highlights & Challenges Overcome

During the development and deployment lifecycle, several low-level infrastructure hurdles were successfully diagnosed and resolved:
1. **IPv4/IPv6 Network Translation:** Resolved Vercel serverless DNS resolution failures (`ENOTFOUND`) by switching from Supabase's direct IPv6 connection strings to the **Transaction Pooler (Port 6543)**, which proxies IPv4 traffic.
2. **Serverless Routing Configuration:** Bypassed default static file handling on Vercel by implementing an explicit `vercel.json` build mapping (`@vercel/node`) and route rewrites (`/(.*)` $\rightarrow$ `/index.js`) to route all HTTP traffic through the Express core.
3. **SSL Handshake Management:** Aligned local and production database client drivers to safely handle cloud-managed certificate validation chains (`sslmode=no-verify`).

---

## 📦 Getting Started Locally

Follow these instructions to run the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/Mubarak77-C/EJS-View/  (https://github.com/Mubarak77-C/EJS-View.git)
cd EJS-View


2. Install Dependencies
Bash

npm install

3. Configure Environment Variables

Create a .env file in the root directory and add your Supabase Transaction Pooler connection string:
Code snippet

DATABASE_URL=postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?sslmode=no-verify
PORT=3000

4. Run the Application

For development with hot-reloading (using nodemon):
Bash

npm run dev

Or run directly via Node:
Bash

node index.js

Open your browser and navigate to http://localhost:3000.
📄 License

This project is open-source and available under the MIT License.
