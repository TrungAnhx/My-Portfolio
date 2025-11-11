import { useState, useEffect, useRef } from 'react';

interface AboutProps {
  darkMode: boolean;
}

const About = ({ darkMode }: AboutProps) => {
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

  

  return (
    <section id="about" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          About Me
        </h2>
        
        <div className="space-y-12">
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Passionate Software Developer</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
              My journey started with Artificial Intelligence. I was fascinated by how machines could learn, think, 
              and solve complex problems. Along the way, I discovered my passion for mobile development, 
              especially creating Android and iOS apps that could bring these AI capabilities to everyday users.
            </p>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
              My journey started with mobile development. For Android, I worked with Java and Kotlin to build responsive apps. 
              For iOS, I learned Swift and SwiftUI to create smooth user experiences. 
              Along the way, I discovered the power of AI and how it could make mobile apps much more intelligent.
            </p>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>
              What excites me most is how mobile development can be enhanced with AI. I've explored various AI models and algorithms 
              to solve practical problems - from image recognition and natural language processing to predictive analytics. 
              I believe the future belongs to apps that not only function but also think and learn from user behavior.
            </p>
            
            <div className="flex gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">1+</div>
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">20+</div>
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">5+</div>
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Programming Languages</div>
              </div>
            </div>
          </div>
          
          </div>
      </div>
    </section>
  );
};

export default About;
