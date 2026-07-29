import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Placeholder } from '@/shared/components/Placeholder'
import { ArrowCircleButton } from '@/shared/components/ArrowCircleButton'
import { fadeInUp } from '@/shared/lib/motion'
import type { Project } from '../data'

/** Portfolio card: dark thumbnail with a title row + green arrow (pages 1 & 4). */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article variants={fadeInUp} className="group">
      <Link to={`/work/${project.slug}`} className="block">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="overflow-hidden rounded-3xl bg-ink shadow-card transition-shadow duration-300 group-hover:shadow-card-hover"
        >
          <div className="overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <Placeholder
                tone="dark"
                label={project.category}
                className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
              <p className="mt-1 text-sm text-white/55">{project.excerpt}</p>
            </div>
            <ArrowCircleButton ariaLabel={`View ${project.category}`} />
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}
