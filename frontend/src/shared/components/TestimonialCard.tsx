type Testimonial = {
  name: string
  title: string
  quote: string
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <p className="text-ink/80 mb-4 italic">{testimonial.quote}</p>
      <div>
        <p className="font-semibold text-ink">{testimonial.name}</p>
        <p className="text-sm text-ink/60">{testimonial.title}</p>
      </div>
    </div>
  )
}
