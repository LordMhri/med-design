import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  getTestimonials,
  deleteTestimonial,
} from '@/features/admin/testimonialStore'
import type { Testimonial } from '@/api/types'
import { Plus, Edit, Trash2, Search } from '@/shared/components/Icon'

export default function TestimonialList() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getTestimonials().then(setItems).catch(() => {})
  }, [])

  const filtered = items.filter((t) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      t.name.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.quote.toLowerCase().includes(q)
    )
  })

  async function handleDelete(id: string) {
    if (window.confirm('Delete this testimonial?')) {
      await deleteTestimonial(id)
      setItems((prev) => prev.filter((t) => t.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-ink">Testimonials</h1>
        <Link
          to="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover"
        >
          <Plus className="h-4 w-4" />
          New Testimonial
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-muted" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-body">No testimonials found.</p>
          <Link
            to="/admin/testimonials/new"
            className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
          >
            Add your first testimonial
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-semibold text-ink">Name</th>
                <th className="px-5 py-3 font-semibold text-ink">Title</th>
                <th className="px-5 py-3 font-semibold text-ink">Active</th>
                <th className="px-5 py-3 font-semibold text-ink">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="px-5 py-4 font-medium text-ink">{item.name}</td>
                  <td className="px-5 py-4 text-slate-body">{item.title}</td>
                  <td className="px-5 py-4 text-slate-body">
                    {item.isActive === false ? 'No' : 'Yes'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/testimonials/${item.id}/edit`}
                        className="rounded-lg p-2 text-slate-muted transition-colors hover:bg-slate-100 hover:text-ink"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg p-2 text-slate-muted transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
