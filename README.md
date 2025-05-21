 # Inreal JobMatch – AI-Powered Job Recommendation Platform

Inreal JobMatch is a modern web application designed to help users find jobs tailored to their skills and preferences. Built with React and Tailwind CSS, the platform presents job listings and aims to offer AI-powered job suggestions using OpenAI’s GPT API.

---

## 🚀 Live Demo

- **Frontend**: [Deployment](https://jobmatchinreal-k177utvu2-rajs-projects-42ea4883.vercel.app/login)  
- **Repository**: [https://github.com/rajsoni77/jobmatchinreal](https://github.com/rajsoni77/jobmatchinreal)  
---

## 🛠️ Tech Stack

### Frontend
- React.js (with Vite)
- TypeScript
- Tailwind CSS
- React Router
- Hosted on Vercel

### Backend 
- Node.js + Express
- JWT Authentication
- REST API for user & job data

### AI Integration 
- OpenAI GPT-3.5 for job recommendations
- Prompt engineering to align user profiles with relevant job roles

---

## 📁 Project Setup

### 📦 Frontend

1. Clone the repo:
```bash
git clone https://github.com/rajsoni77/Inreal_JobMatch.git
cd Inreal_JobMatch
```
```bash
npm install
```
```bash
npm run dev
```
```bash
npm run build
```
---

## AI Prompt Design 

When a user clicks “Find My Matches”, their profile (skills, experience, location, job preference) is sent to the backend. The backend formats a prompt like this:

"Suggest jobs roles for a candidate with 2 years of experience in React and Node.js, located in Pune, looking for remote jobs."

This prompt is sent to OpenAI's GPT-3.5 API, and the top 3 job suggestions are returned, parsed, and shown on the frontend in card format.

---

## 🗂️ Code Architecture

```bash
Inreal_JobMatch/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/           # Static images and icons
│   ├── components/       # Reusable UI components (e.g., Navbar, JobCard)
│   ├── pages/            # Route-level pages (Home, Jobs, About)
│   ├── data/             # Static/mock job data
│   ├── App.tsx           # Main app with router
│   ├── main.tsx          # ReactDOM entry point
├── tailwind.config.js    # Tailwind customization
├── index.html            # HTML shell
├── vite.config.ts        # Vite build config
└── README.md
```
---
## 🙋‍♂️ Author
RAJ SONI
Developed as part of a Full-Stack Developer Assignment.
