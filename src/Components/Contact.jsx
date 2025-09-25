import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useInView } from 'react-intersection-observer';

// --- Particle Background Component ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: undefined, y: undefined });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 60;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        if(mouseRef.current.x !== undefined) {
            const dx = mouseRef.current.x - this.x;
            const dy = mouseRef.current.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;

            if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
            }
        }
        
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(156, 163, 175, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
        mouseRef.current.x = undefined;
        mouseRef.current.y = undefined;
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
};


// --- SVG Icons ---
const MailIcon = () => (
    <svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const LocationIcon = () => (
    <svg height="24" width="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);


const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('Send Message');

  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true, threshold: 0.1 });


  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,    
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,   
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY   
      )
      .then((result) => {
          console.log(result.text);
          setStatus('Message Sent!');
          form.current.reset(); // Reset form fields
          setTimeout(() => setStatus('Send Message'), 3000);
      }, (error) => {
          console.log(error.text);
          setStatus('Failed to Send');
          setTimeout(() => setStatus('Send Message'), 3000);
      });
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 container mx-auto px-4 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Get In <span className="text-green-400">Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column: Info */}
          <div ref={infoRef} className={`space-y-8 fade-in-up ${infoInView ? 'is-visible' : ''}`}>
            <h3 className="text-2xl font-bold">Let's Connect!</h3>
            <p className="text-gray-400 text-lg">
              Have a project in mind or just want to say hello? My inbox is always open.
              Whether you have a question or just want to connect, feel free to reach out.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-900/50 p-3 rounded-full">
                  <MailIcon />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email</h4>
                  <a href="mailto:hussainabbas7492@gmail.com" className="text-gray-300 hover:text-green-400 transition-colors">hussainabbas7492@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="bg-green-900/50 p-3 rounded-full">
                  <LocationIcon />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Location</h4>
                  <p className="text-gray-300">Lucknow, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <form ref={form} onSubmit={handleSubmit} className={`space-y-6 bg-gray-900/30 backdrop-blur-md p-8 rounded-lg border border-white/10 fade-in-up ${formInView ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
             <div ref={formRef}>
                <div>
                <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    required 
                    className="w-full px-4 py-3 bg-gray-800/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" 
                />
                </div>
                <div>
                <label htmlFor="email" className="block mb-2 font-medium">Your Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    required 
                    className="w-full px-4 py-3 bg-gray-800/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" 
                />
                </div>
                <div>
                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                <textarea 
                    name="message" 
                    id="message" 
                    rows="5"
                    required 
                    className="w-full px-4 py-3 bg-gray-800/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all resize-none"
                ></textarea>
                </div>
                <button 
                type="submit"
                className="w-full px-8 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg disabled:bg-gray-500"
                disabled={status !== 'Send Message'}
                >
                {status}
                </button>
             </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

