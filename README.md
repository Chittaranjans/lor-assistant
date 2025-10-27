# LOR Writing Assistant

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://lor-assistant.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)](https://tailwindcss.com/)

An AI-powered application that helps create professional Letters of Recommendation (LOR) with context-aware feedback. Generate personalized recommendation letters using either a structured form or direct prompts, with instant PDF/DOC downloads.

## 🌐 Live Demo

**Production URL**: [lor-assistant.vercel.app](https://lor-assistant.vercel.app)

## ✨ Features

- **Dual Input Methods**: Choose between detailed form-based input or simple prompt-based generation
- **AI-Powered Generation**: Uses Groq API (Llama 3.1) for intelligent, context-aware letter creation
- **Multiple Formats**: Download letters as PDF or DOC files
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Real-time Preview**: Instant letter generation and preview
- **Professional Templates**: Structured letter formats suitable for academic and professional recommendations
- **Database Integration**: Store and manage generated letters with Supabase
- **Usage Analytics**: Track API usage and generation statistics

## 🧠 How It Works

### Logic Flow

1. **Input Processing**:
   - **Form Mode**: Collects structured data (applicant details, relationship, achievements, target program)
   - **Prompt Mode**: Accepts natural language prompts with built-in restrictions

2. **AI Generation**:
   - Uses Groq API with Llama 3.1 model for content generation
   - Applies prompt engineering to ensure professional, recommendation-focused output
   - Enforces word count limits (300-400 words) for optimal letter length

3. **Content Validation**:
   - Filters out non-recommendation content
   - Ensures professional tone and structure
   - Validates against common LOR requirements

4. **Output Formatting**:
   - Generates clean, printable letter format
   - Supports both PDF and DOC export formats
   - Maintains proper letter structure and formatting

### Technical Architecture

```
Frontend (Next.js + TypeScript)
    ↓
API Routes (/api/generate)
    ↓
AI Processing (Groq API)
    ↓
Database Storage (Supabase)
    ↓
File Generation (jsPDF + docx)
```

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Groq API (Llama 3.1)
- **Database**: Supabase (PostgreSQL)
- **File Generation**: jsPDF, docx
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (local or Supabase)
- Groq API key

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Chittaranjans/lor-assistant
cd lor-assistant
```

### 2. Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# AI API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Database Configuration (Supabase)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://username:password@host:port/database

# Optional: For local PostgreSQL
# DATABASE_URL=postgresql://username:password@localhost:5432/lor_app
```

### 4. Get API Keys

#### Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for an account
3. Create a new API key
4. Add it to your `.env.local` file

#### Supabase Setup
1. Visit [Supabase](https://supabase.com/)
2. Create a new project
3. Go to Settings → API → Service Role Key
4. Copy the service role key to your `.env.local`
5. Create the required tables (see Database Schema below)

### 5. Database Initialization

The application will automatically create tables on first run, or you can manually initialize:

```bash
# Visit this URL after starting the app
http://localhost:3000/api/init-db
```

### 6. Run the Application

```bash
# Development
bun run dev

# Production build
bun run build
bun run start
```

### 7. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Usage

### Form-Based Generation
1. Navigate to the main page
2. Select "Form" mode
3. Fill in applicant details, your relationship, achievements, and target program
4. Click "Generate Letter"
5. Preview and download as PDF or DOC

### Prompt-Based Generation
1. Select "Prompt" mode
2. Enter a natural language description
3. Click "Generate Letter"
4. Preview and download the result

### Features
- **Copy to Clipboard**: Copy generated text instantly
- **Download Options**: PDF for printing, DOC for editing
- **Responsive Design**: Works on all device sizes

## 🔌 API Reference

### POST `/api/generate`

Generates a Letter of Recommendation based on input data.

**Request Body**:
```json
{
  "mode": "form" | "prompt",
  "formData": {
    "applicantName": "string",
    "relationship": "string",
    "achievements": "string",
    "targetProgram": "string"
  } | "prompt": "string"
}
```

**Response**:
```json
{
  "success": true,
  "letter": "Generated letter content...",
  "wordCount": 350
}
```

## 🗄 Database Schema

### Core Tables

```sql
-- Generated letters storage
CREATE TABLE letters (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  mode VARCHAR(10) NOT NULL, -- 'form' or 'prompt'
  word_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

-- API usage tracking
CREATE TABLE api_usage (
  id SERIAL PRIMARY KEY,
  endpoint VARCHAR(100),
  tokens_used INTEGER,
  cost DECIMAL(10,4),
  created_at TIMESTAMP DEFAULT NOW()
);
```


**Created by Chittaranjan** | [LinkedIn](https://www.linkedin.com/in/chittaranjan18/) | [GitHub](https://github.com/chittaranjans)
