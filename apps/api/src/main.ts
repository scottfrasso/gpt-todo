import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { getLogger } from '@gpt-todo/logging'

import { AppModule } from './app.module'

const logger = getLogger('main')

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port)

  logger.info(`Application is running on Port ${port}`)
}
bootstrap()
