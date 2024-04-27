import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule)

  console.log(process.env.ORIGIN.split(','));
  console.log(process.env.PORT);
  
  
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    origin: process.env.ORIGIN.split(','),
		credentials: true,
		exposedHeaders: 'set-cookie'
  })

  await app.listen(process.env.PORT)
}

bootstrap();