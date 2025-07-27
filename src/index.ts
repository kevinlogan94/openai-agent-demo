#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { consola } from 'consola'
import { config } from 'dotenv'
import { WeatherAgent } from './agent.js'

// Load environment variables
config()

const main = defineCommand({
  meta: {
    name: 'weather-agent',
    version: '1.0.0',
    description: '🌤️  OpenAI Weather Agent Demo - Ask me about the weather anywhere!'
  },
  async run() {
    // Check for required environment variables
    const openaiApiKey = process.env.OPENAI_API_KEY
    const weatherApiKey = process.env.OPENWEATHERMAP_API_KEY

    if (!openaiApiKey) {
      consola.error('Missing OPENAI_API_KEY environment variable')
      consola.info('Please create a .env file with your OpenAI API key')
      process.exit(1)
    }

    if (!weatherApiKey) {
      consola.error('Missing OPENWEATHERMAP_API_KEY environment variable')
      consola.info('Please create a .env file with your OpenWeatherMap API key')
      process.exit(1)
    }

    // Initialize the weather agent
    const agent = new WeatherAgent(openaiApiKey, weatherApiKey)

    // Welcome message
    consola.box('🌤️  Welcome to the OpenAI Weather Agent Demo!')
    consola.info('Ask me about the weather in any city around the world!')
    consola.info('Examples:')
    consola.info('  • "What\'s the weather like in Tokyo?"')
    consola.info('  • "Is it raining in London right now?"')
    consola.info('  • "How warm is it in Miami today?"')
    console.log()

    // Get user input
    const userInput = await consola.prompt('🤔 What would you like to know?', {
      type: 'text',
      placeholder: 'Type your question here...'
    })

    if (!userInput || typeof userInput !== 'string') {
      consola.warn('No input provided. Goodbye!')
      return
    }

    // Process the query with the AI agent
    console.log()
    const response = await agent.processQuery(userInput)
    
    console.log()
    consola.success('🤖 Agent Response:')
    console.log(response)
    console.log()
    
    consola.info('Thanks for trying the OpenAI Weather Agent Demo! 👋')
  }
})

runMain(main)
