import React, { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
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
        this.originalSize = this.size;
      }

      update() {
        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
          this.size = this.originalSize + force * 2;
          this.opacity = Math.min(0.8, this.opacity + force * 0.3);
        } else {
          this.size = this.originalSize;
          this.opacity = Math.max(0.2, this.opacity - 0.01);
        }

        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
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

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            ctx.strokeStyle = `rgba(156, 163, 175, ${0.15 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (behind particles)
      drawConnections();
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-5 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      <main className="relative z-10 flex flex-col items-center text-center py-20">
        <div className="container mx-auto px-4 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Hi, I'm Hussain Abbas
            </h1>
            <p className="max-w-2xl text-lg mb-8 text-gray-300">
              Full Stack Developer specializing in MERN stack applications. I
              create modern, scalable web solutions that deliver exceptional user
              experiences.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300">
                MongoDB
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300">
                Express.js
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300">
                React
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300">
                Node.js
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-200 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                View My Work
              </button>
              <button className="px-8 py-3 border-2 border-white/30 rounded-full font-medium hover:bg-white/10 hover:border-white/50 hover:transform hover:-translate-y-1 transition-all duration-300">
                Get In Touch
              </button>
            </div>
          </div>

          <div className="md:w-1/3 max-w-lg">
            <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/10 hover:border-white/20 transition-colors duration-300">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              <div className="text-left">
                <div className="font-mono text-sm text-gray-300 space-y-2">
                  <div>
                    <span className="text-pink-400">const</span>{' '}
                    <span className="text-blue-300">developer</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-yellow-300">{'{'}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">name</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-orange-300">'Hussain Abbas'</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">skills</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-yellow-300">[</span>
                    <span className="text-orange-300">'MERN'</span>
                    <span className="text-white">,</span>{' '}
                    <span className="text-orange-300">'JavaScript'</span>
                    <span className="text-yellow-300">]</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">passion</span>
                    <span className="text-white">:</span>{' '}
                    <span className="text-orange-300">'Building amazing apps'</span>
                  </div>
                  <div>
                    <span className="text-yellow-300">{'};'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default Home;