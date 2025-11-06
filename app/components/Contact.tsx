import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../../lib/emailjs-config';

export const Contact = () => {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form before sending
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setSubmitMessage('❌ Please fill in all fields correctly.');
        setIsSubmitting(false);
        setTimeout(() => setSubmitMessage(''), 3000);
        return;
      }
      
      // Validate email format
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(formData.email)) {
        setSubmitMessage('❌ Please enter a valid email address.');
        setIsSubmitting(false);
        setTimeout(() => setSubmitMessage(''), 3000);
        return;
      }
      
      // Send email using EmailJS with service_4fxm8vl
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: `From: ${formData.name} (${formData.email})\n\n${formData.message}`,
        to_name: 'Trung Anh',
        reply_to: formData.email,
        user_email: formData.email,
      };
      
      const response = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );
      
      if (response.status === 200) {
        setSubmitMessage('✅ Email sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitMessage('❌ Failed to send message. Please try again later.');
      }
      
    } catch (error) {
      // Development only show console errors
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        console.error('EmailJS error:', error);
      }
      
      // Production error handling
      try {
        const errorMsg = error instanceof Error ? error.message : String(error);
        if (errorMsg && (errorMsg.includes('User does not exist') || 
            errorMsg.includes('insufficient scopes') ||
            errorMsg.includes('Authentication error'))) {
          setSubmitMessage('❌ Configuration error. Try again later.');
        } else {
          setSubmitMessage('❌ Failed to send message. Please try again later.');
        }
      } catch (fallbackError) {
        setSubmitMessage('❌ Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const contactMethods = [
    {
      icon: faEnvelope,
      iconColor: 'text-red-500',
      title: 'Email',
      info: 'trungkun103@gmail.com',
      link: 'mailto:trungkun103@gmail.com'
    },
    {
      icon: faLinkedin,
      iconColor: 'text-blue-500',
      title: 'LinkedIn',
      info: 'linkedin.com/in/TrungAnhx',
      link: 'https://www.linkedin.com/in/TrungAnhx'
    },
    {
      icon: faGithub,
      iconColor: 'text-gray-300',
      title: 'GitHub',
      info: 'github.com/TrungAnhx',
      link: 'https://github.com/TrungAnhx?tab=repositories'
    },
    {
      icon: faDiscord,
      iconColor: 'text-purple-500',
      title: 'Discord',
      info: 'discord.gg/Savagers',
      link: 'https://discord.gg/Savagers'
    }
  ];

  return (
    <section id="contact" className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          Get In Touch
        </h2>
        
        <p className={`text-center text-lg text-gray-400 mb-12 max-w-3xl mx-auto ${isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`}>
          I'm always interested in hearing about new projects and opportunities. 
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="bg-gray-800/50 rounded-xl p-8 border border-cyan-800/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 8 8 8 8-8z" />
                      </svg>
                      <span className="pl-600 text-white">Sending...</span>
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
                
                {submitMessage && (
                  <div className={`p-4 rounded-lg text-center mt-4 ${submitMessage.includes('✅') ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
          
          <div className={`${isVisible ? 'animate-slide-in-right animation-delay-200' : 'opacity-0'}`}>
            <div className="bg-gray-800/50 rounded-xl p-8 border border-cyan-800/30">
              <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Let's Connect</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Feel free to reach out through any of these channels. I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              </p>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center gap-4 mb-3 group">
                      <div className={`w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <FontAwesomeIcon 
                          icon={method.icon} 
                          className={`text-xl ${method.iconColor}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors duration-300">{method.title}</h4>
                      </div>
                    </div>
                    <a 
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 ml-auto text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-300 group-hover:translate-x-1"
                    >
                      {method.info}
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-lg font-medium text-white mb-4">Available for</h4>
                <div className="flex flex-wrap gap-2">
                  {['Freelance Projects', 'Full-time Positions', 'Consulting', 'Collaborations'].map((item, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
