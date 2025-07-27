# 🌤️ OpenAI Weather Agent Demo

A demonstration CLI application showcasing the OpenAI SDK with agentic capabilities using UnJS tools.

## Features

- 🤖 **AI-Powered Weather Assistant** - Uses GPT-4.1-mini to understand natural language weather queries
- 🌍 **Global Weather Data** - Get current weather for any city worldwide via OpenWeatherMap API
- 🛠️ **Smart Tool Usage** - AI automatically decides when to call the weather API based on user questions
- ⚡ **Modern Stack** - Built with UnJS ecosystem tools (citty, consola, ofetch, unbuild)
- 📦 **TypeScript** - Fully typed for better development experience

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- OpenAI API key
- OpenWeatherMap API key

### Installation

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
   ```

3. **Run the demo:**
   ```bash
   pnpm start
   ```

## Usage

Once started, the CLI will prompt you for a question. Try asking about weather in different cities:

- "What's the weather like in Tokyo?"
- "Is it raining in London right now?"
- "How warm is it in Miami today?"
- "Tell me about the weather in Paris"

The AI agent will:
1. Understand your natural language query
2. Determine if weather data is needed
3. Call the OpenWeatherMap API if necessary
4. Provide a conversational response with weather information

## Development

```bash
# Development with hot reload
pnpm dev

# Type checking
pnpm typecheck

# Build for production
pnpm build
```

## Tech Stack

- **OpenAI SDK** - GPT-4.1-mini with Responses API
- **citty** - Elegant CLI builder (UnJS)
- **consola** - Beautiful console output (UnJS)
- **ofetch** - HTTP client for API calls (UnJS)
- **unbuild** - TypeScript build tool (UnJS)
- **OpenWeatherMap API** - Weather data source

## Architecture

The demo showcases:
- **Agentic behavior** - AI decides when tools are needed
- **Function calling** - Weather API integration as an OpenAI tool
- **Natural language processing** - Conversational interface
- **Error handling** - Graceful API failure management
- **Modern tooling** - UnJS ecosystem demonstration

## API Keys

### OpenAI API Key
Get your API key from: https://platform.openai.com/api-keys

### OpenWeatherMap API Key
Get your free API key from: https://openweathermap.org/api

## License

MIT
