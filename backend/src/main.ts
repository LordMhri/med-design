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
      const allowed =
        !origin ||
        allowedOrigins.includes(origin) ||
        (allowVercelPreviews && origin.endsWith('.vercel.app'))

      // Reject without throwing — a thrown Error often omits CORS headers on preflight
      callback(null, allowed)
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
