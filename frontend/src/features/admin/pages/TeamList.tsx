import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTeamMembers, deleteTeamMember } from '@/features/admin/teamStore'
import type { TeamMember } from '@/api/types'
import { Plus, Edit, Trash2, Search } from '@/shared/components/Icon'

export default function TeamList() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getTeamMembers().then(setMembers).catch(() => {})
  }, [])

  const filtered = members.filter((m) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      m.name.toLowerCase().includes(q) ||
      m.position.toLowerCase().includes(q) ||
      (m.bio && m.bio.toLowerCase().includes(q))
    )
  })

  async function handleDelete(id: string) {
    if (window.confirm('Delete this team member?')) {
      await deleteTeamMember(id)
      setMembers((prev) => prev.filter((m) => m.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-ink">Team Members</h1>
        <Link
          to="/admin/team/new"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover"
        >
          <Plus className="h-4 w-4" />
          New Member
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-muted" />
          <input
            type="text"
            placeholder="Search team members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-slate-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-body">No team members found.</p>
          <Link
            to="/admin/team/new"
            className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
          >
            Add your first team member
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-semibold text-ink">Name</th>
                <th className="px-5 py-3 font-semibold text-ink">Position</th>
                <th className="px-5 py-3 font-semibold text-ink">Image URL</th>
                <th className="px-5 py-3 font-semibold text-ink">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50">
                  <td className="px-5 py-4 font-medium text-ink">{member.name}</td>
                  <td className="px-5 py-4 text-slate-body">{member.position}</td>
                  <td className="px-5 py-4 text-xs text-slate-muted">{member.image || '-'}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/team/${member.id}/edit`}
                        className="rounded-lg p-2 text-slate-muted transition-colors hover:bg-slate-100 hover:text-ink"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(member.id)}
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
