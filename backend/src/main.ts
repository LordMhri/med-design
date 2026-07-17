import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { runSeed } from './database/seed-database'

function getAllowedOrigins(): string[] {
  return (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const allowedOrigins = getAllowedOrigins()
  const allowVercelPreviews = process.env.ALLOW_VERCEL_PREVIEWS === 'true'

  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        (allowVercelPreviews && origin.endsWith('.vercel.app'))
      ) {
        callback(null, true)
        return
      }

      callback(new Error(`Origin ${origin} not allowed by CORS`))
    },
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  const port = process.env.PORT || 3001
  await app.listen(port)

  if (process.env.SEED_ON_START === 'true') {
    await runSeed(app)
  }

  console.log(`🚀 Application is running on: http://localhost:${port}/api`)
}

bootstrap().catch((err) => {
  console.error('Application bootstrap error:', err)
  process.exit(1)
})
