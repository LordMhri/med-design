import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { runSeed } from './database/seed-database'

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule)
  await runSeed(app)
  await app.close()
  console.log('Seed complete')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
