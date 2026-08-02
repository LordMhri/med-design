import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPartner, savePartner } from '@/features/admin/partnerStore'

export default function PartnerEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '',
    logoUrl: '',
    websiteUrl: '',
    sortOrder: '0',
    isActive: true,
  })

  useEffect(() => {
    if (id) {
      getPartner(id).then((partner) => {
        if (partner) {
          setForm({
            name: partner.name,
            logoUrl: partner.logoUrl || '',
            websiteUrl: partner.websiteUrl || '',
            sortOrder: String(partner.sortOrder ?? 0),
            isActive: partner.isActive !== false,
          })
        }
      })
    }
  }, [id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await savePartner({
        id: id || undefined,
        name: form.name,
        logoUrl: form.logoUrl || undefined,
        websiteUrl: form.websiteUrl || undefined,
        sortOrder: Number(form.sortOrder) || 0,
        isActive: form.isActive,
      })
      navigate('/admin/partners')
    } catch (err) {
      console.error('Failed to save partner:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">
        {isEdit ? 'Edit Partner' : 'New Partner'}
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
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="logoUrl">
            Logo URL
          </label>
          <input
            id="logoUrl"
            name="logoUrl"
            value={form.logoUrl}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="/partner-logo.svg or https://..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="websiteUrl">
            Website URL
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            value={form.websiteUrl}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="https://..."
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
            {saving ? 'Saving...' : isEdit ? 'Update Partner' : 'Create Partner'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/partners')}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-body transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
