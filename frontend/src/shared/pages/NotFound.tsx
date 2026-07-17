import { Container } from '@/shared/components/Container'
import { Button } from '@/shared/components/Button'

export default function NotFound() {
  return (
    <section className="bg-ink">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 py-32 text-center">
        <p className="font-display text-7xl font-extrabold text-accent">404</p>
        <h1 className="text-2xl font-bold text-white">Page not found</h1>
        <p className="max-w-sm text-sm text-white/60">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Button to="/">Back home</Button>
      </Container>
    </section>
  )
}
