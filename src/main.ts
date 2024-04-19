import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule)

  // console.log(process.env.ORIGIN.split(','));
  
  
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:3000', 'http://31.129.45.72'],
		credentials: true,
		exposedHeaders: 'set-cookie'
  })

  await app.listen(process.env.PORT || 4200)
}

bootstrap();
