import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getService, saveService } from '@/features/admin/serviceStore'

export default function ServiceEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '',
    description: '',
    icon: '',
    image: '',
    features: '',
    price: '',
    isActive: true,
  })

  useEffect(() => {
    if (id) {
      getService(id).then((service) => {
        if (service) {
          setForm({
            name: service.name,
            description: service.description,
            icon: service.icon || '',
            image: service.image || '',
            features: service.features?.join(', ') || '',
            price: service.price ? String(service.price) : '',
            isActive: service.isActive ?? true,
          })
        }
      })
    }
  }, [id])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setForm((prev) => ({ ...prev, [name]: checked }))
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await saveService({
        id: id || undefined,
        name: form.name,
        description: form.description,
        icon: form.icon || undefined,
        image: form.image || undefined,
        features: form.features
          .split(',')
          .map((x) => x.trim())
          .filter(Boolean),
        price: form.price ? Number(form.price) : undefined,
        isActive: form.isActive,
      })
      navigate('/admin/services')
    } catch (err) {
      console.error('Failed to save service:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">{isEdit ? 'Edit Service' : 'New Service'}</h1>

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
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="icon">
              Icon
            </label>
            <input
              id="icon"
              name="icon"
              value={form.icon}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="price">
              Price (optional)
            </label>
            <input
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              min="0"
              step="0.01"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="image">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="features">
            Features (comma-separated)
          </label>
          <textarea
            id="features"
            name="features"
            value={form.features}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Brand Strategy, Logo Design, Rebranding"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent/30"
          />
          Active service
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-body transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
