import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

// Using emojis for icons is a great, lightweight approach!
const SKILL_ICONS = {
  React: "⚛️",
  NodeJS: "⚙️",
  MongoDB: "💾",
  ExpressJS: "🚀",
  JavaScript: "📜",
  HTML5: "📄",
  CSS3: "🎨",
  TailwindCSS: "💨",
  Git: "🌿",
  'REST APIs': '🔗',
  'VS Code': '💻',
};

const SkillCard = ({ title, skills, isDark }) => {
  // Each card needs its own observer to animate independently. This is correct.
  const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
  });

  return (
    // The className now correctly uses the `inView` state from this component's hook.
    <div ref={ref} className={`fade-in-up ${inView ? 'is-visible' : ''} ${isDark ? 'bg-gray-800/50 border-white/10' : 'bg-white/80 border-gray-200 shadow-lg'} border rounded-lg p-6 hover:border-green-400/50 transition-colors duration-300 h-full`}>
      <h3 className="text-xl font-bold text-green-500 mb-4">{title}</h3>
      <ul className="space-y-3">
        {skills.map((skill) => (
          <li key={skill} className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="text-lg">{SKILL_ICONS[skill] || "🔹"}</span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const About = () => {
  const { isDark } = useTheme();
  // We'll create a separate observer for the bio text.
  const { ref: bioRef, inView: bioInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    
  return (
    // The main section no longer has animation classes. It's always visible.
    <section id="about" className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} overflow-hidden transition-colors duration-300`}>
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          About <span className="text-green-500">Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column: Bio - This now has its own ref and animation classes. */}
          <div ref={bioRef} className={`space-y-6 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} fade-in-up ${bioInView ? 'is-visible' : ''}`}>
            <p>
              Hello! I'm Hussain Abbas, a passionate Full Stack Developer with a knack for building elegant and efficient web applications. With a foundation in the MERN stack, I enjoy bringing ideas to life, from the database architecture to the pixel-perfect user interface.
            </p>
            <p>
              My journey in software development is driven by a constant curiosity and a desire to solve complex problems. I'm committed to writing clean, maintainable code and am always eager to learn and adapt to new technologies.
            </p>
            <p>
              When I'm not coding, you can find me exploring open-source projects, learning about system design, or enjoying a good cup of coffee.
            </p>
          </div>

          {/* Right Column: Skills - The SkillCard components handle their own animation. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SkillCard 
              title="Frontend"
              skills={['React', 'JavaScript', 'HTML5', 'CSS3', 'TailwindCSS']}
              isDark={isDark}
            />
            <SkillCard 
              title="Backend"
              skills={['NodeJS', 'ExpressJS', 'MongoDB']}
              isDark={isDark}
            />
             <SkillCard 
              title="Tools & Platforms"
              skills={['Git', 'REST APIs', 'VS Code']}
              isDark={isDark}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

