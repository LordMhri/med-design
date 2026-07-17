import { useState, useEffect } from 'react'
import {
  getMessages,
  markAsRead,
  markAsUnread,
  deleteMessage,
} from '@/features/admin/messageStore'
import type { ContactMessage } from '@/api/types'
import { Trash2, Eye, Mail } from '@/shared/components/Icon'

export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  useEffect(() => {
    getMessages().then(setMessages).catch(() => {})
  }, [])

  async function handleToggleRead(msg: ContactMessage) {
    if (msg.status === 'new') {
      await markAsRead(msg.id)
    } else {
      await markAsUnread(msg.id)
    }
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msg.id ? { ...m, status: (m.status === 'new' ? 'read' : 'new') as ContactMessage['status'] } : m,
      ),
    )
    if (selected?.id === msg.id) {
      setSelected((prev) =>
        prev ? { ...prev, status: (prev.status === 'new' ? 'read' : 'new') as ContactMessage['status'] } : null,
      )
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Delete this message?')) {
      await deleteMessage(id)
      setMessages((prev) => prev.filter((m) => m.id !== id))
      setSelected((prev) => (prev?.id === id ? null : prev))
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-ink">Messages</h1>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Mail className="mx-auto mb-3 h-10 w-10 text-slate-muted" />
          <p className="text-slate-body">No messages yet.</p>
          <p className="text-xs text-slate-muted">
            Messages from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="divide-y divide-slate-100">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`w-full px-5 py-4 text-left transition-colors hover:bg-slate-50 ${
                    selected?.id === msg.id ? 'bg-accent/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {msg.status === 'new' && (
                        <span className="h-2 w-2 rounded-full bg-accent" />
                      )}
                      <p className="text-sm font-medium text-ink">{msg.name || 'Anonymous'}</p>
                    </div>
                    <span className="shrink-0 text-xs text-slate-muted">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-body">{msg.email}</p>
                  <p className="mt-1 truncate text-sm text-slate-muted">
                    {msg.message}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-ink">{selected.name || 'Anonymous'}</h2>
                    <p className="text-sm text-slate-body">{selected.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(selected)}
                      className="rounded-lg p-2 text-slate-muted transition-colors hover:bg-slate-100 hover:text-ink"
                      title={selected.status === 'new' ? 'Mark as read' : 'Mark as unread'}
                    >
                      <Eye className={`h-4 w-4 ${selected.status !== 'new' ? 'opacity-40' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="rounded-lg p-2 text-slate-muted transition-colors hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm">
                  {selected.phone && (
                    <div>
                      <span className="text-xs text-slate-muted">Phone</span>
                      <p className="text-ink">{selected.phone}</p>
                    </div>
                  )}
                  {selected.referralSource && (
                    <div>
                      <span className="text-xs text-slate-muted">Source</span>
                      <p className="text-ink">{selected.referralSource}</p>
                    </div>
                  )}
                  {selected.interests && selected.interests.length > 0 && (
                    <div>
                      <span className="text-xs text-slate-muted">Interests</span>
                      <p className="text-ink">{selected.interests.join(', ')}</p>
                    </div>
                  )}
                  {selected.budget && (
                    <div>
                      <span className="text-xs text-slate-muted">Budget</span>
                      <p className="text-ink">${selected.budget.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-xs font-medium text-slate-muted">Message</span>
                  <p className="mt-1 text-sm leading-relaxed text-ink">
                    {selected.message}
                  </p>
                </div>

                {selected.createdAt && (
                  <p className="mt-4 text-xs text-slate-muted">
                    Received {new Date(selected.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
                <p className="text-sm text-slate-muted">Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
