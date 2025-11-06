import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

const Skills = () => {
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
      ]
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
        { name: 'PostgreSQL', icon: faDatabase, color: 'text-blue-600' },
        { name: 'MongoDB', icon: faDatabase, color: 'text-green-500' },
        { name: 'Firebase', icon: faFire, color: 'text-orange-400' },
        { name: 'Supabase', icon: faDatabase, color: 'text-emerald-400' }
      ]
    },
    { 
      name: 'Development Tools',
      icon: faMobile,
      iconColor: 'text-green-400',
      items: [
        { name: 'Git/GitHub', icon: faGitAlt, color: 'text-orange-500' },
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
        { name: 'GitHub', icon: faGithub, color: 'text-white' },
        { name: 'GitLab', icon: faGitlab, color: 'text-orange-500' },
        { name: 'Trello', icon: faTrello, color: 'text-blue-500' },
        { name: 'Microsoft Project', icon: faTasks, color: 'text-blue-600' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-800/30" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          Technical Skills
        </h2>
        
        <div className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            {skills.map((skillGroup, groupIndex) => (
              <div key={groupIndex} className="bg-gray-800/50 rounded-lg p-6 border border-cyan-800/30 hover:border-cyan-600/30 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center mr-3`}>
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
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <FontAwesomeIcon 
                          icon={skill.icon} 
                          className={`text-lg ${skill.color}`}
                        />
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-in animation-delay-700' : 'opacity-0'}`}>
          <p className="text-xl text-gray-400 mb-8">
            Excited about the future of technology and constantly expanding my skillset. 
            Here are some areas I'm currently diving into:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Machine Learning', 'AI Frameworks', 'Mobile Development', 'Cloud Computing', 'DevOps Practices', 'Project Management'].map((topic, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
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
