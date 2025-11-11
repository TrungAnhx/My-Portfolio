import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SkillsProps {
  darkMode: boolean;
}
import { 
  faPython, 
  faJava, 
  faJsSquare,
  faReact,
  faGitAlt,
  faAndroid,
  faApple,
  faDocker,
  faGithub,
  faGitlab,
  faTrello
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faMobile, faCode, faFire, faRobot, faBrain, faCloud, faShieldAlt, faTasks, faComments } from '@fortawesome/free-solid-svg-icons';

const Skills = ({ darkMode }: SkillsProps) => {
  const [isVisible, setIsVisible] = useState(false);
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

  const skills = [
    { 
      name: 'Core Language Skills',
      icon: faCode,
      iconColor: 'text-cyan-400',
      items: [
        { name: 'Python', icon: faPython, color: 'text-blue-400' },
        { name: 'Java', icon: faJava, color: 'text-orange-500' },
        { name: 'JavaScript', icon: faJsSquare, color: 'text-yellow-400' },
        { name: 'Swift (iOS)', icon: faApple, color: 'text-gray-300' }
      ] as Array<{name: string, icon?: any, color?: string, lightModeColor?: string, image?: string}>
    },
    { 
      name: 'Frameworks & Libraries',
      icon: faBrain,
      iconColor: 'text-purple-400',
      items: [
        { name: 'TensorFlow/Keras', icon: faBrain, color: 'text-orange-400' },
        { name: 'PyTorch', icon: faRobot, color: 'text-red-400' },
        { name: 'React.js', icon: faReact, color: 'text-cyan-400' },
        { name: 'SwiftUI', icon: faApple, color: 'text-gray-300' },
        { name: 'Spring Boot', icon: faJava, color: 'text-green-400' }
      ]
    },
    { 
      name: 'Databases',
      icon: faDatabase,
      iconColor: 'text-blue-500',
      items: [
        { name: 'MySQL', icon: faDatabase, color: 'text-blue-500' },
        { name: 'PostgreSQL', icon: faDatabase, color: 'text-blue-600', image: '/postgresql.png' },
        { name: 'MongoDB', icon: faDatabase, color: 'text-green-500', image: '/mongodb.png' },
        { name: 'Firebase', icon: faFire, color: 'text-orange-400' },
        { name: 'Supabase', icon: faDatabase, color: 'text-emerald-400' }
      ]
    },
    { 
      name: 'Development Tools',
      icon: faMobile,
      iconColor: 'text-green-400',
      items: [
        { name: 'Git/GitHub', icon: faGitAlt, color: 'text-orange-500', lightModeColor: 'text-gray-900' },
        { name: '.Android Studio', icon: faAndroid, color: 'text-green-400' },
        { name: 'Xcode', icon: faApple, color: 'text-gray-300' },
        { name: 'Visual Studio Code', icon: faCode, color: 'text-blue-400' }
      ]
    },
    { 
      name: 'Cloud & Platforms',
      icon: faCloud,
      iconColor: 'text-purple-400',
      items: [
        { name: 'Docker', icon: faDocker, color: 'text-blue-500' },
        { name: 'Firebase Console', icon: faFire, color: 'text-orange-400' },
        { name: 'Vercel', icon: faCode, color: 'text-white' },
        { name: 'Cybrancee', icon: faCloud, color: 'text-purple-400' }
      ]
    },
    { 
      name: 'Project Management & Collaboration',
      icon: faTasks,
      iconColor: 'text-blue-600',
      items: [
        { name: 'Jira', icon: faTasks, color: 'text-blue-600' },
        { name: 'GitHub', icon: faGithub, color: 'text-white', lightModeColor: 'text-gray-900' },
        { name: 'GitLab', icon: faGitlab, color: 'text-orange-500' },
        { name: 'Trello', icon: faTrello, color: 'text-blue-500' },
        { name: 'Microsoft Project', icon: faTasks, color: 'text-blue-600' }
      ]
    }
  ];

  return (
    <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-100/50'} backdrop-blur-sm`} ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          Technical Skills
        </h2>
        
        <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            {skills.map((skillGroup, groupIndex) => (
              <div key={groupIndex} className={`${darkMode ? 'bg-gray-800/50 border-cyan-800/30 hover:border-cyan-600/30' : 'bg-white/70 border-gray-200/50 hover:border-cyan-400/30'} rounded-lg p-6 border backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md`}>
                <div className="flex items-center mb-6">
                  <div className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100/70'} flex items-center justify-center mr-3`}>
                    <FontAwesomeIcon 
                      icon={skillGroup.icon} 
                      className={`text-2xl ${skillGroup.iconColor}`}
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-cyan-400">{skillGroup.name}</h4>
                </div>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50/50 hover:bg-gray-100/70'} transition-all duration-300 group`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100/70'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {skill.image ? (
                          <img 
                            src={skill.image} 
                            alt={skill.name}
                            className="w-5 h-5 object-contain"
                          />
                        ) : (
                          <FontAwesomeIcon 
                            icon={skill.icon} 
                            className={`text-lg ${skill.lightModeColor && !darkMode ? skill.lightModeColor : skill.color}`}
                          />
                        )}
                      </div>
                      <span className={`${darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'} transition-colors duration-300`}>
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-in animation-delay-700' : 'opacity-0'}`}>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
            Excited about the future of technology and constantly expanding my skillset. 
            Here are some areas I'm currently diving into:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Machine Learning', 'AI Frameworks', 'Mobile Development', 'Cloud Computing', 'DevOps Practices', 'Project Management'].map((topic, index) => (
              <span 
                key={index}
                className={`px-4 py-2 bg-gradient-to-r ${darkMode ? 'from-cyan-500/10 to-blue-500/10 text-cyan-400 border-cyan-500/20 hover:border-cyan-400/40' : 'from-cyan-100/50 to-blue-100/50 text-cyan-600 border-cyan-200/50 hover:border-cyan-300/70'} rounded-full text-sm border transition-all duration-300`}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
