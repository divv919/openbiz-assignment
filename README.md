# Udhyam Registration Portal Clone

This is a [Next.js](https://nextjs.org) project that clones the Udhyam registration portal, built with TypeScript and Tailwind CSS. The project includes both frontend and backend functionality with comprehensive form validation and API integration. (TESTS ARE NOT COMPLETE)

## Features

- Complete Udhyam registration form clone
- Frontend and backend implementation using Next.js
- TypeScript for type safety
- Tailwind CSS for styling
- Form validation using regex patterns and JavaScript
- Aadhaar and PAN verification APIs
- OTP verification system (Hardcoded for now)
- Being stored in Database hence if someone tries to re-register they will be redirected to the step they were previously on

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Validation**: regex patterns
- **Database & ORM**: PostgreSQL from Supabase and Prisma ORM

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd udhyam-registration-portal-clone
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:

   - Copy the `.env.example` file to `.env`
   - Update the environment variables as needed
   - Make sure you have a Supabase PostgreSQL database.
   - Update the `DATABASE_URL` in `.env` with your Supabase connection string.
   - Run the following command to apply Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```
   - To view or manage data visually:
     ```bash
     npx prisma studio
     ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

The project includes the following API endpoints:

- `/api/aadhaar` - Aadhaar verification endpoint
- `/api/pan` - PAN verification endpoint

## Configuration

### Environment Variables

The project uses environment variables for configuration. An `.env.example` file is provided with all necessary variables. Copy this file to `.env` and update the values accordingly.

### OTP Configuration

For testing purposes, the OTP verification uses a fixed value: `123123`

## Validation

The project implements comprehensive validation including:

- Regex pattern validation for various input fields
- JavaScript-based form validation
- Real-time validation feedback
- Error handling and user feedback

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── aadhaar/
│   │   └── pan/
│   └── page.tsx
├── components/
├── lib/
├── public/
├── styles/
└── types/
```

### Live Link

https://openbiz-assignment-ten.vercel.app/
