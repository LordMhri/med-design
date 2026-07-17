import type { Project } from '../data'
import { ArrowCircleButton } from '@/shared/components/ArrowCircleButton'

export function CaseStudyRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <div className={`flex flex-col md:flex-row ${flip ? 'md:flex-row-reverse' : ''} gap-8 bg-ink rounded-[2.5rem] p-8 sm:p-10 text-left`}>
      <div className="w-full md:w-[45%] aspect-[4/3] bg-white rounded-3xl shrink-0 overflow-hidden" />
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{project.title}</h3>
          <ArrowCircleButton size="md" className="shrink-0" />
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag, idx) => (
            <span key={idx} className="bg-accent/15 text-accent rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-white/70 mt-2">{project.description}</p>
      </div>
    </div>
  )
}

