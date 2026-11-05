# 📝 Full-Stack Node.js Message Board

A modern, production-grade message board application built from scratch to demonstrate robust backend architecture, serverless deployment, database connection pooling, secure server-side validation, and containerization.

---

## 🚀 Live Demo & Architecture
* **Live Application:** https://messageboard-dm6fek45r-rex-7e9e.vercel.app/
* **Architecture:** Node.js/Express MVC pattern, serverless edge routing (`@vercel/node`), cloud-hosted PostgreSQL via Supabase, and isolated Docker containerization.

---

## ✨ Features
* **Full CRUD Operations:** Create, Read, Update, and Delete messages seamlessly.
* **Persistent Cloud Database:** Relational data storage backed by Supabase PostgreSQL.
* **Server-Side Validation:** Form inputs are strictly sanitized and validated using `express-validator`.
* **Containerized Environment:** Fully isolated using Docker to eliminate environment discrepancies ("it works on my machine").
* **Serverless Compatibility:** Custom routing configuration optimized for Vercel's serverless ecosystem.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Templating Engine:** EJS (Embedded JavaScript)
* **Database & Driver:** Supabase PostgreSQL (`pg` connection pooler)
* **Containerization:** Docker (Alpine Linux base)
* **Validation & Security:** `express-validator`
* **Deployment:** Vercel & Docker local runtime

---

## ⚙️ Engineering Highlights & Challenges Overcome

During the development and deployment lifecycle, several low-level infrastructure hurdles were successfully diagnosed and resolved:
1. **IPv4/IPv6 Network Translation:** Resolved Vercel serverless DNS resolution failures (`ENOTFOUND`) by switching from Supabase's direct IPv6 connection strings to the **Transaction Pooler (Port 6543)**, which proxies IPv4 traffic.
2. **Serverless Routing Configuration:** Bypassed default static file handling on Vercel by implementing an explicit `vercel.json` build mapping (`@vercel/node`) and route rewrites to route all HTTP traffic through the Express core.
3. **Environment Isolation via Docker:** Packaged the Node.js application into a lightweight Alpine Linux container image (`message-board`), standardizing runtime dependencies and ensuring portable, secure deployment across environments.

---


## 📦 Getting Started & Running Locally with Docker

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

FOR DOCKER
2. Build the Docker Image

In your project root folder, build the container image:
Bash

docker build -t message-board .

3. Run the Container

Run the container in detached mode, passing your live Supabase connection string securely as an environment variable:
Bash

docker run -d --name my-message-board -p 3000:3000 -e DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?sslmode=no-verify" message-board

4. Access the App

Open your browser and navigate to:
Plaintext

http://localhost:3000

Open your browser and navigate to http://localhost:3000.
📄 License

This project is open-source and available under the MIT License.
