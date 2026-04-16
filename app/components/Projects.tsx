import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub, 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faExternalLinkAlt,
  faArrowRight, 
  faRobot, 
  faEnvelope, 
  faDatabase,
  faServer,
  faCloudSun,
  faRss,
  faClock,
  faTimes,
  faCodeBranch,
  faChartLine,
  faSearch,
  faFileAlt,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons';

interface ProjectProps {
  darkMode: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  hasDocumentation?: boolean;
}

const WorkflowDiagram = ({ darkMode }: { darkMode: boolean }) => (
  <div className="mt-8 mb-8">
    <h3 className={`text-xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      Data Pipeline Architecture
    </h3>
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl mx-auto gap-4">
      {/* Step 1 */}
      <div className={`flex flex-col items-center p-6 rounded-xl border ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'} shadow-lg w-full md:w-1/3 relative z-10 transition-transform hover:-translate-y-1`}>
        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-500 shadow-inner">
          <FontAwesomeIcon icon={faRss} size="2x" />
        </div>
        <h4 className={`font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>WIPO RSS Feed</h4>
        <p className={`text-sm text-center mt-2 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Continuously monitors and scrapes raw patent data and new filings from WIPO.
        </p>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex text-cyan-500">
        <FontAwesomeIcon icon={faArrowRight} size="2x" className="animate-pulse opacity-70" />
      </div>
      <div className="md:hidden text-cyan-500 my-2">
        <FontAwesomeIcon icon={faArrowRight} size="2x" className="rotate-90 animate-pulse opacity-70" />
      </div>

      {/* Step 2 */}
      <div className={`flex flex-col items-center p-6 rounded-xl border ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'} shadow-lg w-full md:w-1/3 relative z-10 transition-transform hover:-translate-y-1`}>
        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-500 shadow-inner">
          <FontAwesomeIcon icon={faRobot} size="2x" />
        </div>
        <h4 className={`font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Processing Agent</h4>
        <p className={`text-sm text-center mt-2 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Filters noise, translates, categorizes, and summarizes the patent technical details.
        </p>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex text-cyan-500">
        <FontAwesomeIcon icon={faArrowRight} size="2x" className="animate-pulse opacity-70" />
      </div>
      <div className="md:hidden text-cyan-500 my-2">
        <FontAwesomeIcon icon={faArrowRight} size="2x" className="rotate-90 animate-pulse opacity-70" />
      </div>

      {/* Step 3 */}
      <div className={`flex flex-col items-center p-6 rounded-xl border ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-gray-200'} shadow-lg w-full md:w-1/3 relative z-10 transition-transform hover:-translate-y-1`}>
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500 relative shadow-inner">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
          <div className="absolute -top-3 -right-6 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md transform rotate-12 whitespace-nowrap">
            <FontAwesomeIcon icon={faClock} /> 9AM Mon
          </div>
        </div>
        <h4 className={`font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Scheduled Delivery</h4>
        <p className={`text-sm text-center mt-2 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Dispatches structured, insightful reports to stakeholders via Gmail every Monday.
        </p>
      </div>
    </div>
  </div>
);

const Projects = ({ darkMode }: ProjectProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  const projects: Project[] = [
    {
      id: 0,
      title: 'AI Patent Search',
      description: 'An intelligent platform that combines traditional patent search with advanced AI capabilities for faster and more accurate discovery.',
      technologies: ['Next.js', 'AI', 'API', 'Tailwind CSS'],
      liveUrl: 'https://patents-view-search-ov4s.vercel.app',
      githubUrl: '#',
      featured: true
    },
    {
      id: 7,
      title: 'Patent Automation Workflow',
      description: 'An automated workflow that scrapes patent data from WIPO via RSS Feed, uses an AI Agent to process the data, and sends reports via Gmail every Monday at 9 AM.',
      technologies: ['n8n', 'AI Agent', 'RSS', 'Automation'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      hasDocumentation: true
    },
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard for product management.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop interface, and team collaboration features.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and comprehensive weather data visualization.',
      technologies: ['React', 'JavaScript', 'OpenWeather API'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Blog Platform',
      description: 'Headless CMS-powered blog platform with rich text editor, SEO optimization, and responsive design.',
      technologies: ['Next.js', 'Tailwind CSS', 'Strapi', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
      ? projects.filter(p => p.featured)
      : projects;

  const getGradient = (id: number) => {
    const gradients = [
      'from-blue-600 to-cyan-500',
      'from-purple-600 to-indigo-500',
      'from-emerald-500 to-teal-400',
      'from-orange-500 to-red-500',
      'from-pink-500 to-rose-400',
      'from-amber-400 to-orange-500',
      'from-indigo-500 to-blue-500'
    ];
    return gradients[id % gradients.length];
  };

  const getIcon = (id: number) => {
    const icons = [faSearch, faCodeBranch, faChartLine, faDatabase, faCloudSun, faFileAlt, faServer, faRobot];
    return icons[id % icons.length];
  };

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      {/* Decorative background element */}
      <div className={`absolute top-0 left-0 w-full h-full overflow-hidden -z-10 ${darkMode ? 'opacity-10' : 'opacity-5'}`}>
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-[30%] right-[10%] w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-200"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`inline-block text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Featured Projects
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full mb-8 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}></div>
          <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
            Explore a collection of my recent work, showcasing robust engineering and seamless user experiences.
          </p>
        </div>
        
        <div className={`flex justify-center gap-4 mb-16 ${isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
          {['all', 'featured'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md ${
                filter === f 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white transform hover:-translate-y-0.5' 
                  : darkMode 
                    ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {f === 'all' ? `All Projects (${projects.length})` : `Featured (${projects.filter(p => p.featured).length})`}
            </button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              onClick={() => project.hasDocumentation && setSelectedProject(project)}
              className={`group flex flex-col ${darkMode ? 'bg-gray-800/60 border-gray-700/50 hover:border-cyan-500/50' : 'bg-white border-gray-200 hover:border-cyan-400/50'} rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 ${project.hasDocumentation ? 'cursor-pointer' : ''} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${200 + (index * 100)}ms` }}
            >
              {/* Card Header Illustration */}
              <div className={`h-52 relative overflow-hidden bg-gradient-to-br ${getGradient(project.id)} flex items-center justify-center`}>
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                
                <FontAwesomeIcon 
                  icon={getIcon(project.id)} 
                  className="text-white opacity-90 text-6xl transform group-hover:scale-110 transition-transform duration-500" 
                />
                
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30 shadow-sm">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white group-hover:text-cyan-400' : 'text-gray-900 group-hover:text-cyan-600'} transition-colors duration-300`}>
                  {project.title}
                </h3>
                
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 line-clamp-3 leading-relaxed flex-grow`}>
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`px-3 py-1 ${darkMode ? 'bg-gray-900/50 text-cyan-300 border-gray-700' : 'bg-gray-100 text-cyan-700 border-gray-200'} text-xs font-medium rounded-md border backdrop-blur-sm`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-auto">
                  {project.hasDocumentation ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FontAwesomeIcon icon={faBookOpen} />
                      View Docs
                    </button>
                  ) : (
                    <a
                      href={project.liveUrl !== '#' ? project.liveUrl : undefined}
                      target={project.liveUrl !== '#' ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex-1 px-4 py-2.5 ${project.liveUrl !== '#' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5' : darkMode ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                      {project.liveUrl !== '#' ? 'Live Demo' : 'Coming Soon'}
                    </a>
                  )}
                  
                  <a
                    href={project.githubUrl !== '#' ? project.githubUrl : undefined}
                    target={project.githubUrl !== '#' ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex-1 px-4 py-2.5 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 ${project.githubUrl === '#' ? 'opacity-50 cursor-not-allowed hover:translate-y-0' : ''}`}
                  >
                    <FontAwesomeIcon icon={faGithub} className="text-lg" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Documentation Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border rounded-2xl shadow-2xl animate-scale-in`}>
            {/* Modal Header */}
            <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b ${darkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-100'} backdrop-blur-md`}>
              <h2 className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent`}>
                {selectedProject.title}
              </h2>
              <button 
                onClick={() => setSelectedProject(null)}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-12 flex flex-wrap gap-3">
                {selectedProject.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className={`px-4 py-1.5 ${darkMode ? 'bg-gray-800 text-cyan-400 border-gray-700' : 'bg-blue-50 text-blue-700 border-blue-100'} font-semibold text-sm rounded-lg border`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Workflow Diagram rendering for the specific project */}
              {selectedProject.id === 7 && (
                <>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-8"></div>
                  <WorkflowDiagram darkMode={darkMode} />
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-8"></div>
                </>
              )}

              <div className="mt-8">
                <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Technical Details & Automation Logic
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <FontAwesomeIcon icon={faServer} className="text-cyan-500" />
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>n8n Self-hosted Instance</h4>
                    </div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      The backbone of the workflow runs on a robust self-hosted n8n environment, allowing for complex multi-step data transformations without traditional code overhead.
                    </p>
                  </div>
                  
                  <div className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <FontAwesomeIcon icon={faCodeBranch} className="text-blue-500" />
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>RSS XML Parsing</h4>
                    </div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Custom RSS parsers handle complex nested XML schemas from WIPO PatentScope, extracting relevant metadata such as filing dates, inventors, and abstracts.
                    </p>
                  </div>

                  <div className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <FontAwesomeIcon icon={faRobot} className="text-purple-500" />
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>LLM Summarization</h4>
                    </div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Integrates with a large language model to comprehend dense technical jargon. The AI translates and summarizes patents into clear, concise bullet points.
                    </p>
                  </div>

                  <div className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <FontAwesomeIcon icon={faDatabase} className="text-green-500" />
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Google Sheets & Gmail</h4>
                    </div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Parsed data is stored historically in Google Sheets. Every Monday at 9:00 AM, a beautifully formatted HTML email digest is triggered via the Gmail API.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className={`p-6 border-t ${darkMode ? 'border-gray-800 bg-gray-900/95' : 'border-gray-100 bg-gray-50'} flex justify-end sticky bottom-0 z-10 backdrop-blur-md`}>
              <button 
                onClick={() => setSelectedProject(null)}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm'}`}
              >
                Close Documentation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
