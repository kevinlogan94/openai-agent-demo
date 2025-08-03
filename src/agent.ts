import OpenAI from 'openai'
import { consola } from 'consola'
import { WeatherService, weatherToolDefinition } from './weather.js'

export class WeatherAgent {
  private openai: OpenAI
  private weatherService: WeatherService

  constructor(openaiApiKey: string, weatherApiKey: string) {
    this.openai = new OpenAI({
      apiKey: openaiApiKey
    })
    this.weatherService = new WeatherService(weatherApiKey)
  }

  async processQuery(userInput: string): Promise<string> {
    try {
      consola.start('Starting Agentic Process...')

      consola.info(`Step 1: User Query -> LLM`)
      // Use the Responses API with weather tool
      const response = await this.openai.responses.create({
        model: 'gpt-4.1-mini',
        instructions: `You are a helpful weather assistant. You can provide weather information for any location when asked. 
        Be conversational and friendly. If the user asks about weather, use the weather tool to get current data.
        When calling the weather tool, use simple city names (e.g., "Cincinnati" instead of "Cincinnati, OH") for better results.
        If the user asks about something not weather-related, respond helpfully but mention you specialize in weather information.`,
        input: userInput,
        tools: [weatherToolDefinition]
      })

      // Check if the AI used the weather tool
      if (response.output && response.output.length > 0) {
        for (const toolCall of response.output) {
          if (toolCall.type === 'function_call' && toolCall.name === 'get_current_weather') {
            const args = JSON.parse(toolCall.arguments)
            
            try {
              consola.info(`Step 2: LLM -> Tool`)
              const weatherData = await this.weatherService.getCurrentWeather(args.location)

              consola.info(`Step 3: Tool -> LLM`)
              // Create a follow-up response with weather data
              const followUpResponse = await this.openai.responses.create({
                model: 'gpt-4.1-mini',
                instructions: `You received weather data. Format it in a natural, conversational way for the user.
                Include temperature, description, humidity, wind speed, and feels-like temperature.`,
                input: `The user asked: "${userInput}". Here's the weather data: ${JSON.stringify(weatherData)}`
              })
              
              consola.info(`Step 4: LLM -> Final Response`)
              return followUpResponse.output_text || 'I received the weather data but had trouble formatting the response.'
            } catch (error) {
              return `I'm sorry, I couldn't get the weather information for that location. Please check the location name and try again.`
            }
          }
        }
      }

      consola.info(`Step 2: LLM -> Final Response`)
      return response.output_text || 'I apologize, but I had trouble processing your request.'
      
    } catch (error) {
      consola.error('Error processing query:', error)
      return 'I encountered an error while processing your request. Please try again.'
    }
  }
}
