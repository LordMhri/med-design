import { useState } from 'react'
import { FormField, Input, Textarea, Select, Chip, RangeSlider } from './form'
import { contactApi } from '@/api/services/contact'

const SERVICES_LIST = [
  'Logo Design',
  'Brand Identity Development',
  'Website Design & Management',
  'PPC (Pay-Per-Click) Advertising',
  'Professional Medical Photoshoot',
  'Content Creation',
  'Social Media Management',
  'Brochures & Flyers',
  'Content Marketing',
]

export function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [budget, setBudget] = useState(50000)
  const [goals, setGoals] = useState('')
  const [referral, setReferral] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    const messageParts = [
      goals.trim() || 'No goals provided.',
      company.trim() ? `Company: ${company.trim()}` : null,
      selectedServices.length ? `Interests: ${selectedServices.join(', ')}` : null,
    ].filter(Boolean)

    try {
      await contactApi.submit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        message: messageParts.join('\n'),
        interests: selectedServices,
        budget,
        referralSource: referral || undefined,
      })
      setStatus('success')
      setSelectedServices([])
      setName('')
      setCompany('')
      setPhone('')
      setEmail('')
      setBudget(50000)
      setGoals('')
      setReferral('')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to send message')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0b2b3a]/90 rounded-3xl sm:rounded-[2.5rem] border border-white/10 p-5 sm:p-8 lg:p-16 text-left max-w-5xl mx-auto shadow-2xl backdrop-blur-sm"
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Let&apos;s Create Radical.</h2>
        <p className="text-sm text-white/60 mt-2">
          Please fill in the form below. We&apos;ll aim to reply within 1 business day.
        </p>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold text-white mb-4">You&apos;re Interested In</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES_LIST.map((service) => (
            <Chip
              key={service}
              selected={selectedServices.includes(service)}
              onClick={() => toggleService(service)}
            >
              {service}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <FormField label="Name" required>
          <Input
            placeholder="Enter name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>
        <FormField label="Company Name">
          <Input
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </FormField>
        <FormField label="Phone">
          <Input
            placeholder="Enter number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormField>
        <FormField label="Email" required>
          <Input
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
      </div>

      <div className="mt-8">
        <RangeSlider
          label="Budget Estimate"
          min={15000}
          max={1000000}
          step={5000}
          value={budget}
          onChange={setBudget}
          format={(v) =>
            v === 1000000 ? 'ETB 1,000,000+' : `ETB ${v.toLocaleString()}`
          }
        />
      </div>

      <FormField label="Your preferred goals" className="mt-8">
        <Textarea
          placeholder="Tell us about your goals..."
          rows={4}
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Referral source (Optional)" className="mt-8 max-w-xs">
        <Select value={referral} onChange={(e) => setReferral(e.target.value)}>
          <option className="bg-ink" value="">
            Choose an option
          </option>
          <option className="bg-ink" value="google">
            Google Search
          </option>
          <option className="bg-ink" value="social">
            Social Media
          </option>
          <option className="bg-ink" value="recommendation">
            Recommendation
          </option>
          <option className="bg-ink" value="other">
            Other
          </option>
        </Select>
      </FormField>

      {status === 'success' ? (
        <p className="mt-6 text-sm font-medium text-accent">
          Thanks — your message was sent. We&apos;ll get back to you soon.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="mt-6 text-sm font-medium text-red-400">{error}</p>
      ) : null}

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-ink transition-colors duration-200 hover:bg-accent-hover shadow-sm disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending…' : 'Submit'}
        </button>
      </div>
    </form>
  )
}
