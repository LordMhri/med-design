import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getTestimonial,
  saveTestimonial,
} from '@/features/admin/testimonialStore'

export default function TestimonialEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '',
    title: '',
    quote: '',
    avatarUrl: '',
    sortOrder: '0',
    isActive: true,
  })

  useEffect(() => {
    if (id) {
      getTestimonial(id).then((item) => {
        if (item) {
          setForm({
            name: item.name,
            title: item.title,
            quote: item.quote,
            avatarUrl: item.avatarUrl || '',
            sortOrder: String(item.sortOrder ?? 0),
            isActive: item.isActive !== false,
          })
        }
      })
    }
  }, [id])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await saveTestimonial({
        id: id || undefined,
        name: form.name,
        title: form.title,
        quote: form.quote,
        avatarUrl: form.avatarUrl || undefined,
        sortOrder: Number(form.sortOrder) || 0,
        isActive: form.isActive,
      })
      navigate('/admin/testimonials')
    } catch (err) {
      console.error('Failed to save testimonial:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">
        {isEdit ? 'Edit Testimonial' : 'New Testimonial'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="title">
            Title / role
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Medical Director, Clinic Name"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="quote">
            Quote
          </label>
          <textarea
            id="quote"
            name="quote"
            value={form.quote}
            onChange={handleChange}
            rows={5}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="avatarUrl">
            Avatar URL
          </label>
          <input
            id="avatarUrl"
            name="avatarUrl"
            value={form.avatarUrl}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Optional"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="sortOrder">
              Sort order
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              value={form.sortOrder}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="flex items-end pb-2">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent/30"
              />
              Active on site
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? 'Update Testimonial' : 'Create Testimonial'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/testimonials')}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-body transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
