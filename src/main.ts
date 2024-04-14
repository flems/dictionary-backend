import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule)

  
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    origin: process.env.ORIGIN.split(',') || ['http://localhost:3000'],
		credentials: true,
		exposedHeaders: 'set-cookie'
  })

  await app.listen(process.env.PORT || 4200)
}

bootstrap();
