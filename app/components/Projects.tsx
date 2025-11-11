import { useState, useEffect, useRef } from 'react';

interface ProjectProps {
  darkMode: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

const Projects = ({ darkMode }: ProjectProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard for product management.',
      image: '/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop interface, and team collaboration features.',
      image: '/projects/taskmanager.jpg',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and comprehensive weather data visualization.',
      image: '/projects/weather.jpg',
      technologies: ['React', 'JavaScript', 'OpenWeather API', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Blog Platform',
      description: 'Headless CMS-powered blog platform with rich text editor, SEO optimization, and responsive design.',
      image: '/projects/blog.jpg',
      technologies: ['Next.js', 'Tailwind CSS', 'Strapi', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      description: 'A dashboard for managing multiple social media accounts with scheduling, analytics, and content management.',
      image: '/projects/dashboard.jpg',
      technologies: ['Vue.js', 'Node.js', 'Express', 'Twitter API', 'Instagram API'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website with dark mode, smooth animations, and optimized performance.',
      image: '/projects/portfolio.jpg',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
      ? projects.filter(p => p.featured)
      : projects; // In a real app, you'd have more categories

  const filteredProjectsCount = filteredProjects.length;

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          Featured Projects
        </h2>
        
        <p className={`text-center text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-12 max-w-3xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
          Here are some of my recent projects. Each one represents a different challenge and learning experience.
        </p>
        
        <div className={`flex justify-center gap-4 mb-12 ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              filter === 'featured' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Featured ({projects.filter(p => p.featured).length})
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`${darkMode ? 'bg-gray-800/50 border-cyan-800/30 hover:border-cyan-600/50' : 'bg-white/70 border-gray-200/50 hover:border-cyan-400/50'} rounded-xl overflow-hidden border backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-md ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${500 + (index * 100)}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 flex items-center justify-center">
                <span className="text-6xl opacity-50">
                  {project.featured ? '⭐' : '📦'}
                </span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors`}>
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`px-2 py-1 ${darkMode ? 'bg-gray-700/50 text-cyan-400 border-cyan-800/30' : 'bg-gray-100/70 text-cyan-600 border-cyan-200/50'} text-xs rounded border`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={`px-2 py-1 ${darkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100/70 text-gray-500'} text-xs rounded`}>
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-md font-medium hover:scale-105 transition-all duration-300">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  </button>
                  <button className={`flex-1 px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'} rounded-md font-medium transition-all duration-300`}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjectsCount === 0 && (
          <div className="text-center py-12">
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No projects found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
