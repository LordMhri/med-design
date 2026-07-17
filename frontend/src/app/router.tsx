import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/shared/components/RootLayout'
import { AdminLayout } from '@/features/admin/components/AdminLayout'

const Home = lazy(() => import('@/features/home/pages/Home'))
const Services = lazy(() => import('@/features/services/pages/Services'))
const About = lazy(() => import('@/features/team/pages/About'))
const Work = lazy(() => import('@/features/projects/pages/Work'))
const WorkDetail = lazy(() => import('@/features/projects/pages/WorkDetail'))
const Contact = lazy(() => import('@/features/contact/pages/Contact'))
const Blog = lazy(() => import('@/features/blog/pages/Blog'))
const NotFound = lazy(() => import('@/shared/pages/NotFound'))

const AdminLogin = lazy(() => import('@/features/admin/pages/AdminLogin'))
const Dashboard = lazy(() => import('@/features/admin/pages/Dashboard'))
const BlogList = lazy(() => import('@/features/admin/pages/BlogList'))
const BlogEditor = lazy(() => import('@/features/admin/pages/BlogEditor'))
const ProjectList = lazy(() => import('@/features/admin/pages/ProjectList'))
const ProjectEditor = lazy(() => import('@/features/admin/pages/ProjectEditor'))
const Messages = lazy(() => import('@/features/admin/pages/Messages'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'work', element: <Work /> },
      { path: 'work/:slug', element: <WorkDetail /> },
      { path: 'contact', element: <Contact /> },
      { path: 'blog', element: <Blog /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'blog', element: <BlogList /> },
      { path: 'blog/new', element: <BlogEditor /> },
      { path: 'blog/:id/edit', element: <BlogEditor /> },
      { path: 'projects', element: <ProjectList /> },
      { path: 'projects/new', element: <ProjectEditor /> },
      { path: 'projects/:id/edit', element: <ProjectEditor /> },
      { path: 'messages', element: <Messages /> },
    ],
  },
])
