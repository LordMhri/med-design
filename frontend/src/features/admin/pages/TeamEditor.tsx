import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTeamMember, saveTeamMember } from '@/features/admin/teamStore'

export default function TeamEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '',
    position: '',
    bio: '',
    image: '',
    email: '',
    expertise: '',
    linkedinUrl: '',
    twitterUrl: '',
    portfolioUrl: '',
  })

  useEffect(() => {
    if (id) {
      getTeamMember(id).then((member) => {
        if (member) {
          setForm({
            name: member.name,
            position: member.position,
            bio: member.bio,
            image: member.image || '',
            email: member.email || '',
            expertise: member.expertise?.join(', ') || '',
            linkedinUrl: member.linkedinUrl || '',
            twitterUrl: member.twitterUrl || '',
            portfolioUrl: member.portfolioUrl || '',
          })
        }
      })
    }
  }, [id])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await saveTeamMember({
        id: id || undefined,
        name: form.name,
        position: form.position,
        bio: form.bio,
        image: form.image || undefined,
        email: form.email || undefined,
        expertise: form.expertise
          .split(',')
          .map((x) => x.trim())
          .filter(Boolean),
        linkedinUrl: form.linkedinUrl || undefined,
        twitterUrl: form.twitterUrl || undefined,
        portfolioUrl: form.portfolioUrl || undefined,
      })
      navigate('/admin/team')
    } catch (err) {
      console.error('Failed to save team member:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">{isEdit ? 'Edit Team Member' : 'New Team Member'}</h1>

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
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="position">
            Position
          </label>
          <input
            id="position"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={6}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
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
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="expertise">
            Expertise (comma-separated)
          </label>
          <input
            id="expertise"
            name="expertise"
            value={form.expertise}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="UI/UX, Branding, SEO"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="linkedinUrl">
              LinkedIn URL
            </label>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              value={form.linkedinUrl}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="twitterUrl">
              Twitter/X URL
            </label>
            <input
              id="twitterUrl"
              name="twitterUrl"
              value={form.twitterUrl}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="portfolioUrl">
              Portfolio URL
            </label>
            <input
              id="portfolioUrl"
              name="portfolioUrl"
              value={form.portfolioUrl}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? 'Update Member' : 'Create Member'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/team')}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-body transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
