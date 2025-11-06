import { useState, useEffect, useRef } from 'react';

const About = () => {
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
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              I'm a passionate software developer with expertise in multiple programming languages and database systems. 
              I love creating efficient solutions to complex problems and constantly expanding my technical skills across different platforms.
            </p>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              My journey spans from mobile development with Android and iOS to backend systems and modern database technologies. 
              I enjoy working on diverse applications that solve real-world problems.
            </p>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              When I'm not coding, you'll find me exploring emerging technologies, contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
            
            <div className="flex gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">3+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">20+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">4+</div>
                <div className="text-gray-400">Programming Languages</div>
              </div>
            </div>
          </div>
          
          </div>
      </div>
    </section>
  );
};

export default About;
