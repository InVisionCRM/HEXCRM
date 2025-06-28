# HEX CRM - Client Relationship Management System

A modern, full-featured Customer Relationship Management (CRM) system built specifically for the HEX cryptocurrency ecosystem, designed to facilitate educational onboarding and client management for PulseChain and HEX-related services.

## 🌟 Overview

HEX CRM is a Next.js-based application that provides a comprehensive platform for managing client relationships in the HEX cryptocurrency space. The system focuses on educational onboarding, compliance management, and client portal functionality.

### Key Features

- **Educational Client Onboarding**: Streamlined process for introducing new clients to HEX and PulseChain
- **Onboard Portal**: Gamified learning experience with tasks, achievements, and rewards
- **HEX AI Assistant**: AI-powered chatbot with comprehensive HEX whitepaper knowledge using Gemini 2.0
- **Privacy Controls**: Built-in privacy masking for sensitive client information
- **Compliance Management**: Legal disclaimer and terms acceptance workflow
- **Lead Management**: Comprehensive tracking of client interactions and statuses
- **Wallet Integration**: Support for PulseChain wallet generation and management

## 🚀 Technology Stack

- **Framework**: Next.js 15.2.4 with React 19
- **Language**: TypeScript with strict mode enabled
- **Styling**: TailwindCSS with custom HEX brand colors
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **AI Integration**: Google Gemini 2.0 API for intelligent HEX assistance
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd hex-crm
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables for HEX AI Bot:
```bash
# Create a .env.local file
cp .env.example .env.local

# Get your Gemini API key from: https://aistudio.google.com/app/apikey
# Add it to .env.local:
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. Access the HEX AI Bot at [http://localhost:3000/hex_ai_bot](http://localhost:3000/hex_ai_bot)

## 🏗️ Project Structure

```
hex-crm/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── hex-ai/        # HEX AI Assistant API endpoint
│   ├── hex_ai_bot/        # HEX AI Assistant page
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   ├── loading.tsx        # Global loading component
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── client-portal.tsx # Client learning portal
│   ├── onboard-hexican-form.tsx # Client onboarding form
│   ├── terms-of-service.tsx # Legal terms component
│   └── theme-provider.tsx # Theme management
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── public/               # Static assets including HEX branding
└── styles/              # Additional stylesheets
```

## 🎨 Design System

The project uses a custom design system based on shadcn/ui with HEX-specific branding:

### HEX Brand Colors
- **Pink**: `#FE01FA`
- **Red**: `#FF0F6F` 
- **Orange**: `#FF3D3D`
- **Yellow**: `#FFDB01`

### Component Library
All UI components are built using Radix UI primitives and styled with TailwindCSS for consistency and accessibility.

## 📱 Features Deep Dive

### 1. Legal Compliance System
- Multi-step legal disclaimer and terms acceptance
- Persistent storage of user consent
- Educational disclaimers about cryptocurrency risks

### 2. Client Onboarding Flow
- **Step 1**: Personal information collection
- **Step 2**: Investment experience and wallet setup
- **Step 3**: Educational agreement and completion
- Automated PulseChain wallet generation (mock implementation)

### 3. Onboard Portal
- **Gamified Learning**: Tasks, achievements, and progress tracking
- **Earnings Dashboard**: Mock earnings and reward system
- **Educational Content**: HEX and PulseChain learning modules
- **Progress Tracking**: Completion status and streak management

### 4. Lead Management
- Comprehensive lead tracking with multiple statuses
- Privacy controls for sensitive information
- Contact management and interaction history
- Advanced filtering and search capabilities

### 5. Privacy Features
- Toggle-based privacy masking for:
  - Names (partial masking)
  - Email addresses
  - Phone numbers
  - Physical addresses
  - Wallet addresses

### 6. HEX AI Assistant
- **Gemini 2.0 Integration**: Powered by Google's latest AI model
- **HEX Whitepaper Knowledge**: Comprehensive understanding of HEX mechanics
- **Smart Contract Expertise**: Detailed knowledge of staking, penalties, and rewards
- **Interactive Chat**: Real-time Q&A about HEX, PulseChain, and crypto concepts
- **Quick Questions**: Pre-built common questions for fast answers
- **Educational Focus**: Emphasis on learning rather than financial advice

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Type Checking
npx tsc --noEmit  # Type check without emitting files
```

### Code Quality

The project follows strict TypeScript configuration and modern React patterns:

- **TypeScript**: Strict mode enabled with explicit typing
- **React**: Latest features including hooks and modern patterns
- **ESLint**: Standard Next.js linting configuration
- **TailwindCSS**: Utility-first styling with design consistency

### Component Structure

Components follow a modular architecture:
- **Presentational Components**: Focus on UI rendering
- **Business Logic**: Separated into custom hooks
- **Type Safety**: Full TypeScript coverage with proper interfaces

## 🔧 Configuration

### TailwindCSS Configuration
The project includes custom Tailwind configuration with:
- HEX brand color palette
- Custom CSS variables for theming
- Animation utilities
- Responsive design tokens

### Next.js Configuration
- App Router with TypeScript
- Optimized image handling
- CSS and PostCSS integration

## 🚦 Usage

### Starting the Application

1. **Legal Compliance**: Users must accept legal disclaimers and terms
2. **Main Dashboard**: Access to lead management and statistics
3. **Client Onboarding**: Process new clients through educational workflow
4. **Onboard Portal**: Existing clients can access learning materials and track progress

### Key Workflows

1. **New Lead Entry**: Capture and categorize potential clients
2. **Education Process**: Guide clients through HEX/PulseChain learning
3. **Wallet Setup**: Assist with PulseChain wallet creation
4. **Progress Tracking**: Monitor client engagement and completion

## 🧪 Testing

The project is set up for comprehensive testing:
- Unit tests for components and utilities
- Integration tests for user workflows
- Type checking with TypeScript

## 📝 Contributing

1. Follow the established code style and TypeScript patterns
2. Ensure all components are properly typed
3. Use the existing design system and UI components
4. Test thoroughly before submitting changes

## ⚠️ Important Notes

### Legal Compliance
This application includes comprehensive legal disclaimers and compliance features for cryptocurrency-related activities. Always ensure proper legal compliance in your jurisdiction.

### Mock Data
The current implementation uses mock data for demonstration purposes. Production deployment would require:
- Real database integration
- Proper wallet integration
- Secure authentication system
- Data encryption for sensitive information

### Security Considerations
- All sensitive data should be properly encrypted
- Implement proper authentication and authorization
- Follow best practices for cryptocurrency-related applications
- Ensure compliance with relevant financial regulations

## 📄 License

[Add your license information here]

## 🤝 Support

For questions, issues, or contributions, please [contact information or issue tracker].

---

*Built with ❤️ for the HEX and PulseChain community* # HEXCRM
