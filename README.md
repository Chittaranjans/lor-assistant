# LOR Writing Assistant

An application to assist in creating standout Letters of Recommendation (LOR). It provides context-aware feedback aligned with target program expectations, trained on successful recommendation letters.

## Features

- **Form-based Generator**: Fill in details about the applicant, relationship, achievements, etc., to generate a customized LOR.
- **Prompt-based Generator**: Enter a direct prompt to generate an LOR, restricted to recommendation letter content.
- **Copy and Download**: Copy the generated letter to clipboard or download as PDF or DOC format.
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop.

## Database Schema

The application uses PostgreSQL with the following tables:

### Core Tables
- **users**: User accounts and profiles
- **letters**: Generated letters of recommendation with metadata
- **lor_templates**: Predefined LOR templates for different scenarios

### Supporting Tables
- **user_sessions**: Session management for authentication
- **letter_versions**: Version history and revisions of letters
- **user_preferences**: User settings and preferences
- **api_usage**: API usage tracking and analytics
- **user_feedback**: User feedback on generated letters

### Key Features
- **User Management**: Profile management and preferences
- **Content Storage**: Letters with full metadata and versioning
- **History Tracking**: Complete audit trail of changes
- **Usage Analytics**: API usage monitoring and cost tracking
- **Template System**: Reusable LOR templates
- **Feedback System**: User ratings and improvement suggestions

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Environment Variables**:
   Create a `.env.local` file in the root directory and add:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   DATABASE_URL=postgresql://username:password@localhost:5432/lor_app
   ```

3. **Get Groq API Key**:
   - Visit [https://console.groq.com/](https://console.groq.com/)
   - Sign up and create an API key
   - Copy the API key and add it to your `.env.local` file

4. **Database Setup**:
   - Install PostgreSQL on your system
   - Create a database named `lor_app`
   - Update the `DATABASE_URL` in `.env.local` with your database credentials
   - Initialize the database tables by visiting: `http://localhost:3000/api/init-db`

5. **Run the Application**:
   ```bash
   bun run dev
   ```

6. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- Choose between Form-based or Prompt-based generator.
- Fill in the required fields or enter a prompt.
- Click "Generate Letter" to create the LOR.
- Use the buttons to copy or download the letter.

## API

- `POST /api/generate`: Generates an LOR based on form data or prompt.

## Contributing

Feel free to contribute by opening issues or pull requests.
