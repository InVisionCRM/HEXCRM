# HEX AI Bot Setup Guide

This guide will help you set up the HEX AI Assistant powered by Google Gemini 2.0.

## Prerequisites

1. **Google AI Studio Account**: You need a Google account to access Gemini API
2. **API Key**: You'll need to generate a Gemini API key

## Step-by-Step Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

1. Create a `.env.local` file in your project root:
```bash
touch .env.local
```

2. Add your Gemini API key:
```bash
GEMINI_API_KEY=your_actual_api_key_here
```

**Important**: Never commit your `.env.local` file to version control!

### 3. Test the Setup

1. Start the development server:
```bash
pnpm dev
```

2. Navigate to the HEX AI Bot:
```
http://localhost:3000/hex_ai_bot
```

3. Try asking a question like "What is HEX?" to test the AI integration

## Features

### AI Knowledge Base
The HEX AI Bot includes comprehensive knowledge about:
- HEX whitepaper mechanics
- Staking rewards and penalties
- Transform lobbies
- PulseChain benefits
- Smart contract functions
- Risk considerations

### Quick Questions
Pre-built questions help users get started:
- "What is HEX and how does it work?"
- "How do HEX staking rewards work?"
- "What are the benefits of HEX on PulseChain?"
- "What are Transform Lobbies?"
- And more...

### Safety Features
- Educational focus (no financial advice)
- Risk warnings included in responses
- References to official documentation
- Transparent about limitations

## API Usage

The HEX AI Bot uses the following API endpoint:
```
POST /api/hex-ai
Content-Type: application/json

{
  "message": "Your question about HEX"
}
```

Response format:
```json
{
  "response": "AI-generated response with HEX knowledge"
}
```

## Troubleshooting

### Common Issues

1. **"API key not configured" error**
   - Ensure `GEMINI_API_KEY` is set in `.env.local`
   - Restart the development server after adding the key

2. **"Technical difficulties" message**
   - Check your internet connection
   - Verify your API key is valid
   - Check the browser console for error details

3. **Slow responses**
   - Gemini API response times vary
   - This is normal for complex questions

### API Limits

- Gemini API has rate limits
- Free tier has usage quotas
- Monitor your usage in Google AI Studio

## Production Deployment

When deploying to production:

1. Set the `GEMINI_API_KEY` environment variable in your hosting platform
2. Consider implementing rate limiting
3. Monitor API usage and costs
4. Add proper error handling and logging

## Security Considerations

- Never expose your API key in client-side code
- Use environment variables for sensitive data
- Consider implementing user authentication
- Monitor for unusual usage patterns

## Support

For issues related to:
- **HEX AI Bot functionality**: Check this repository's issues
- **Gemini API**: Visit [Google AI Studio documentation](https://ai.google.dev/docs)
- **HEX information**: Refer to the [official HEX whitepaper](https://hex.com/_assets/docs/HEX_whitepaper.pdf)

---

*The HEX AI Bot is for educational purposes only and does not provide financial advice.* 