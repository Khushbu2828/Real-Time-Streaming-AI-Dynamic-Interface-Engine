# ⚡ Real-Time Streaming AI Dynamic Interface Engine

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

An enterprise-grade, serverless AI frontend platform built to demonstrate mastery over modern **AI-Native UI architectures**. 

Unlike standard wrapper applications, this project handles asynchronous chunk streaming via Server-Sent Events (SSE) and intercepts specific AI tokens on-the-fly to **dynamically render interactive visual components (micro-frontends)** directly inside the streaming chat interface.

## 🚀 Live Demo
*(deployment link : `https://real-time-streaming-ai-dynamic-inte.vercel.app/`)*

---

## 🏗️ Architecture & Core Mechanics

The primary design principle of this application is **"Zero-Backend Overhead with Secure Client Execution"**. 

Instead of hosting a dedicated Express.js/Node server, this architecture leverages high-performance **Vercel Edge Functions** to securely proxy API calls to the Google Gemini model, keeping the frontend blazingly fast and the API keys completely hidden from the browser.

### The Component-Streaming Pipeline
1. **The Client Handshake:** React initiates an async payload to the Edge Route (`/api/chat`).
2. **Serverless Encapsulation:** The Edge Function injects strict System Instructions, appends the hidden `GEMINI_API_KEY`, and queries the LLM.
3. **The Token Stream:** As the model processes data, chunked tokens stream into the React `useChat` hook at 60 FPS.
4. **Dynamic Component Injection:** A custom token compiler parses the incoming stream via RegEx. When it detects a functional tag (e.g., `[RENDER_CHART: { ... }]`), it extracts the JSON, strips it from the text UI, and seamlessly mounts an interactive React chart component in its place.

---

## ✨ Enterprise Features

- **⚡ Asynchronous Streaming UI:** Text and UI components render token-by-token using the Vercel AI SDK, preventing UX blocking or loading spinners.
- **🛡️ Secure Edge Routing:** Absolute separation of concerns. Production keys are handled purely in Edge environment variables—zero hardcoded client secrets.
- **📊 Runtime Visual Injection:** Transforms raw unstructured LLM outputs into structured, pure-CSS data visualizations instantly.
- **🎨 High-Density Dark Mode UI:** Styled using Tailwind CSS and Lucide React, adhering to strict enterprise internal-tool design standards.

---

## 🛠️ Tech Stack

* **Core Framework:** React 18 + Vite
* **AI Orchestration:** Vercel AI SDK (`ai/react`)
* **LLM Engine:** Google Gemini 2.5 Flash API (`@google/genai`)
* **Styling & Animation:** Tailwind CSS
* **Markdown Parsing:** `react-markdown`
* **Icons:** `lucide-react`
* **Deployment & Serverless:** Vercel Edge Functions

---

## 🚀 Getting Started

Follow these instructions to run the AI engine locally.

### Prerequisites
* Node.js (v18+ recommended)
* A free [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/Khushbu2828/Real-Time-Streaming-AI-Dynamic-Interface-Engine.git
   cd ai-interface-engine
   ```
2. **Install dependencies:** 
```bash 
    npm install
    ```
3. **Configure Environment Variables:**

   Create a `.env.local` file in the root directory and add your Gemini API Key:
```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```
4. **Run the local development server:**
 ```bash
  npm run dev
```
