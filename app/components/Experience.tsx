
import { useState, useEffect, useRef } from 'react';

interface ExperienceProps {
  darkMode: boolean;
}

interface ExperienceItem {
  id: number;
  position: string;
  company: string;
  location: string;
  duration: string;
  description: string[];
  type: 'work' | 'education';
}

const Experience = ({ darkMode }: ExperienceProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
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

  const workExperience: ExperienceItem[] = [
    {
      id: 1,
      position: 'AI Developer Intern',
      company: '3G Telecommunication Joint Stock Company',
      location: 'Ha Noi, Vietnam',
      duration: 'Feb 2024 - Aug 2024',
      type: 'work',
      description: [
        'Developed and tested machine learning models to enhance telecommunications systems',
        'Collaborated with cross-functional teams to integrate AI solutions into existing products',
        'Served as technical support for model capabilities and deployment requirements',
        'Conducted data analysis to identify trends and improve system performance',
        'Assisted in creation of technical documentation for AI applications',
        'Participated in code reviews and leveraged internal resources for product development'
      ]
    },
    {
      id: 2,
      position: 'Software Developer Intern',
      company: 'FPT Software',
      location: 'Ha Noi, Vietnam',
      duration: 'Mar 2025 - Jul 2025',
      type: 'work',
      description: [
        'Collaborated directly with a Senior Mentor during initial phase to rapidly acquire core software development methodologies',
        'Developed robust and responsive user interfaces (UIs) for Android using Java and XML layouts, adhering to Material Design guidelines to enhance user experience (UX)',
        'Designed and managed data structures with Cloud Firestore and Realtime Database by Firebase to handle application state and synchronize data in real-time, reducing latency in feature updates',
        'Managed end-to-end testing of Android application by deploying release candidates to physical devices',
        'Learned and applied Git/GitHub to manage and share code with team, ensuring clean integration, avoiding conflicts and created Pull Requests (PRs) for code review by mentor',
        'Assisted in writing Technical Specification Documents (TSDs) for new features, clearly defining architectural decisions, data flow, and API contracts to ensure alignment between development and QA teams'
      ]
    }
  ];

  const education: ExperienceItem[] = [
    {
      id: 3,
      position: 'Bachelor of Computer Science',
      company: 'Thuyloi University',
      location: 'Hanoi, Vietnam',
      duration: '2016 - 2020',
      type: 'education',
      description: [
        'Graduated with honors (GPA: 3.7/4.0)',
        'Specialized in Software Engineering and Web Development',
        'Dean\'s List for 6 consecutive semesters',
        'Completed capstone project on Real-time Data Processing Systems'
      ]
    },
    {
      id: 4,
      position: 'Full Stack Web Development',
      company: 'Coding Bootcamp',
      location: 'Online',
      duration: '2020',
      type: 'education',
      description: [
        'Intensive 6-month program focusing on modern web technologies',
        'Built 10+ full-stack projects using MERN stack',
        'Learned agile methodologies and version control with Git',
        'Graduated with distinction and received \'Most Improved Developer\' award'
      ]
    }
  ];

  const activeData = activeTab === 'work' ? workExperience : education;


  return (
    <section 
      id='experience' 
      className={'py-20 ' + (darkMode ? 'bg-gray-800/30' : 'bg-gray-100/50') + ' backdrop-blur-sm'} 
      ref={ref}
    >
      <div className='container mx-auto px-6'>
        <h2 
          className={'text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ' + (isVisible ? 'animate-fade-in' : 'opacity-0')}
        >
          My Journey
        </h2>
        
        <p 
          className={'text-center text-lg ' + (darkMode ? 'text-gray-400' : 'text-gray-600') + ' mb-12 max-w-3xl mx-auto ' + (isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0')}
        >
          From academic excellence to professional growth, here's my path in software development.
        </p>
        
        <div 
          className={'flex justify-center mb-12 ' + (isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0')}
        >
          <div className={'inline-flex p-1 ' + (darkMode ? 'bg-gray-800' : 'bg-gray-200') + ' rounded-lg'}>
            <button
              onClick={() => setActiveTab('work')}
              className={'px-6 py-2 rounded-md font-medium transition-all duration-300 ' + (
                activeTab === 'work' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                  : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={'px-6 py-2 rounded-md font-medium transition-all duration-300 ' + (
                activeTab === 'education' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                  : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Education
            </button>
          </div>
        </div>
        
        <div className='relative'>
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 hidden md:block'></div>
          
          <div className='space-y-8'>
            {activeData.map((item, index) => (
              <div 
                key={item.id}
                className={'relative ' + (index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto md:w-1/2') + ' ' + (isVisible ? 'animate-slide-up' : 'opacity-0')}
                style={{ animationDelay: (600 + (index * 150)) + 'ms' }}
              >
                <div 
                  className={'absolute top-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 ' + (index % 2 === 0 ? 'md:left-auto md:right-0 md:transform md:translate-x-3' : 'md:left-0 md:transform md:-translate-x-3') + ' transform -translate-x-1/2 left-1/2'}
                ></div>
                
                <div 
                  className={(darkMode ? 'bg-gray-800/50 border-cyan-800/30 hover:border-cyan-600/50' : 'bg-white/70 border-gray-200/50 hover:border-cyan-400/50') + ' rounded-xl p-6 border backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md ' + (index % 2 === 0 ? 'md:mr-12' : 'md:ml-12')}
                >
                  <div className={'flex items-center gap-2 mb-2 ' + (index % 2 === 0 ? 'md:justify-end' : '')}>
                    <h3 className={'text-xl font-semibold ' + (darkMode ? 'text-white' : 'text-gray-900')}>{item.position}</h3>
                    <span className={'px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30'}>
                      {item.type === 'work' ? '💼' : '🎓'} {item.type === 'work' ? 'Work' : 'Education'}
                    </span>
                  </div>
                  
                  <div className={'mb-2 text-cyan-400 ' + (index % 2 === 0 ? 'md:justify-end md:flex' : '')}>
                    <p className={'font-medium ' + (darkMode ? 'text-white' : 'text-gray-800')}>{item.company}</p>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm flex items-center gap-4>
                      <span className='flex items-center gap-1'>
                        📍 {item.location}
                      </span>
                      <span className='flex items-center gap-1'>
                        📅 {item.duration}
                      </span>
                    </p>
                  </div>
                  
                  <ul className={'space-y-1'}>
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex} className={darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm flex items-start gap-1>
                        <span className='text-cyan-400 mt-0'>•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

