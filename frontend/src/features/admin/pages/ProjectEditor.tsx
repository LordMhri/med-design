import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { slugify } from '@/features/admin/blogStore'
import { getProject, saveProject } from '@/features/admin/projectStore'

export default function ProjectEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: '',
    image: '',
    tags: '',
    description: '',
    featured: false,
    sortOrder: '0',
  })

  useEffect(() => {
    if (id) {
      getProject(id).then((project) => {
        if (project) {
          setForm({
            title: project.title,
            slug: project.slug || slugify(project.title),
            excerpt: project.excerpt || '',
            category: project.category || '',
            image: project.image || '',
            tags: project.tags?.join(', ') || '',
            description: project.description,
            featured: Boolean(project.featured),
            sortOrder: String(project.sortOrder ?? 0),
          })
        }
      })
    }
  }, [id])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }
      if (name === 'title' && !isEdit) {
        updated.slug = slugify(value)
      }
      return updated
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await saveProject({
        id: id || undefined,
        title: form.title,
        slug: form.slug || slugify(form.title),
        excerpt: form.excerpt,
        category: form.category || undefined,
        image: form.image || undefined,
        description: form.description,
        featured: form.featured,
        sortOrder: Number(form.sortOrder) || 0,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      })
      navigate('/admin/projects')
    } catch (err) {
      console.error('Failed to save:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">
        {isEdit ? 'Edit Project' : 'New Project'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Project title"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={2}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Short description"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="Branding & Identity"
            />
          </div>
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
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="image">
            Cover image URL
          </label>
          <input
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="/project-cover.jpg or https://..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="tags">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Branding, Design System"
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
            rows={8}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Full project description..."
          />
        </div>

        <label className="inline-flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent/30"
          />
          Featured on home (Selected work)
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-body transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
