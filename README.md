
---

### 🎨 2. Frontend README (`itelect4-project/README.md`)


```markdown
# ITELECT4 Project - Peer Tutoring Platform

[![CI](https://github.com/jeclique444/itelect4-project/actions/workflows/ci.yml/badge.svg)](https://github.com/jeclique444/itelect4-project/actions/workflows/ci.yml)

A modern, responsive web application where students can book tutoring sessions from peer tutors. Tutors can create sessions, students can book them, and users can leverage a built-in AI assistant to review and improve their session plans before publishing.

## 🔗 Live URLs

*   **Live Frontend App:** [https://itelect4-project-two.vercel.app](https://itelect4-project-two.vercel.app)
*   **Live Backend API:** [https://itelect4-backend-neon.vercel.app](https://itelect4-backend-neon.vercel.app)
*   **Backend Repository:** [https://github.com/jeclique444/itelect4-backend](https://github.com/jeclique444/itelect4-backend)

## 🏗️ Architecture

```mermaid
flowchart LR
  fe["itelect4-project<br/>React + Vite on Vercel"]
  be["itelect4-backend<br/>Express on Vercel"]
  db[("MongoDB Atlas")]
  ai["Gemini API"]
  
  fe -- "fetch + Bearer token" --> be
  be -- "Mongoose" --> db
  be -- "GEMINI_API_KEY" --> ai