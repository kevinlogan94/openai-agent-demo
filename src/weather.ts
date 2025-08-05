import { ofetch } from 'ofetch'
import { consola } from 'consola'

export interface WeatherData {
  location: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  feelsLike: number
}

export class WeatherService {
  private apiKey: string
  private baseUrl = 'https://api.openweathermap.org/data/2.5'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getCurrentWeather(location: string): Promise<WeatherData> {
    try {
      consola.info(`Fetching weather data for: ${location}`)
      
      const response = await ofetch(`${this.baseUrl}/weather`, {
        query: {
          q: location,
          appid: this.apiKey,
          units: 'imperial'
        }
      })
      
      return {
        location: `${response.name}, ${response.sys.country}`,
        temperature: Math.round(response.main.temp),
        description: response.weather[0].description,
        humidity: response.main.humidity,
        windSpeed: Math.round(response.wind.speed * 3.6), // Convert m/s to km/h
        feelsLike: Math.round(response.main.feels_like)
      }
    } catch (error: any) {
      // Better error handling with specific messages
      if (error.status === 404) {
        consola.error(`Location not found: ${location}`)
        consola.info('Try using just the city name (e.g., "Cincinnati" instead of "Cincinnati, OH")')
        throw new Error(`Location "${location}" not found. Please try a different location name.`)
      } else if (error.status === 401) {
        consola.error('Invalid API key for OpenWeatherMap')
        throw new Error('Weather service authentication failed. Please check your API key.')
      } else {
        consola.error('Weather API error:', error)
        throw new Error(`Unable to get weather data for ${location}: ${error.message || 'Unknown error'}`)
      }
    }
  }
}

// OpenAI function definition for weather tool
export const weatherToolDefinition = {
  type: 'function' as const,
  name: 'get_current_weather',
  description: 'Get the current weather conditions for a specific location',
  parameters: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'Only the city name, e.g. "Cincinnati" instead of "Cincinnati, OH"'
      }
    },
    required: ['location'],
    additionalProperties: false
  },
  strict: false
}
