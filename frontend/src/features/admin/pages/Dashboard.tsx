import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StatsCard } from '@/features/admin/components/StatsCard'
import { getBlogPosts } from '@/features/admin/blogStore'
import { getProjects } from '@/features/admin/projectStore'
import { getMessages, getUnreadCount } from '@/features/admin/messageStore'
import type { BlogPost } from '@/api/types'
import type { Project } from '@/api/types'
import type { ContactMessage } from '@/api/types'
import { FileText, Briefcase, MessageSquare, Eye } from '@/shared/components/Icon'

export default function Dashboard() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    getBlogPosts().then(setBlogPosts).catch(() => {})
    getProjects().then(setProjects).catch(() => {})
    getMessages().then(setMessages).catch(() => {})
    getUnreadCount().then(setUnreadCount).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">Dashboard</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Blog Posts" value={blogPosts.length} icon={<FileText className="h-6 w-6" />} />
        <StatsCard label="Projects" value={projects.length} icon={<Briefcase className="h-6 w-6" />} />
        <StatsCard label="Messages" value={messages.length} icon={<MessageSquare className="h-6 w-6" />} />
        <StatsCard
          label="Unread"
          value={unreadCount}
          icon={<Eye className="h-6 w-6" />}
          accent
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Recent Messages</h2>
            <Link to="/admin/messages" className="text-sm font-medium text-accent hover:underline">
              View all
            </Link>
          </div>
          {messages.length === 0 ? (
            <p className="text-sm text-slate-body">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 5).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-center justify-between rounded-xl border p-3 ${
                    msg.status === 'new' ? 'border-accent/30 bg-accent/5' : 'border-slate-100'
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{msg.name}</p>
                    <p className="text-xs text-slate-body">{msg.email}</p>
                  </div>
                  <span className="text-xs text-slate-muted">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Recent Blog Posts</h2>
            <Link to="/admin/blog" className="text-sm font-medium text-accent hover:underline">
              View all
            </Link>
          </div>
          {blogPosts.length === 0 ? (
            <p className="text-sm text-slate-body">No blog posts yet.</p>
          ) : (
            <div className="space-y-3">
              {blogPosts.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{post.title}</p>
                    <p className="text-xs text-slate-body">{post.status}</p>
                  </div>
                  <span className="text-xs text-slate-muted">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
