type Testimonial = {
  name: string
  title: string
  quote: string
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-sm">
      <p className="mb-5 text-[0.95rem] leading-relaxed text-ink/80">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div>
        <p className="font-semibold text-ink">{testimonial.name}</p>
        <p className="mt-0.5 text-sm text-slate-body">{testimonial.title}</p>
      </div>
    </div>
  )
}
