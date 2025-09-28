import React, { useEffect, useRef, useState } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  // FIX 1: Use a ref for size instead of state to prevent re-renders on resize.
  const sizeRef = useRef({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const particlesRef = useRef([]); // Use a ref to hold the particles array

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particleCount = 30;

    class Particle {
      constructor() {
        // Read size from the ref
        this.x = Math.random() * sizeRef.current.width;
        this.y = Math.random() * sizeRef.current.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.originalSize = this.size;
      }

      update() {
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distanceSquared = dx * dx + dy * dy;
        const maxDistanceSquared = 10000;

        if (distanceSquared < maxDistanceSquared) {
          const distance = Math.sqrt(distanceSquared);
          const force = (100 - distance) / 100;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.2;
          this.y -= Math.sin(angle) * force * 1.2;
          this.size = this.originalSize + force * 1.5;
          this.opacity = Math.min(0.8, this.opacity + force * 0.2);
        } else {
          this.size = this.originalSize;
          this.opacity = Math.max(0.2, this.opacity - 0.005);
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges using the size from the ref
        if (this.x > sizeRef.current.width) this.x = 0;
        if (this.x < 0) this.x = sizeRef.current.width;
        if (this.y > sizeRef.current.height) this.y = 0;
        if (this.y < 0) this.y = sizeRef.current.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(156, 163, 175, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Function to initialize or re-initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    let resizeTimeout;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        const { width, height } = rect;

        if (
          width !== sizeRef.current.width ||
          height !== sizeRef.current.height
        ) {
          // FIX 2: Directly update canvas and ref. No more setCanvasSize().
          canvas.width = width;
          canvas.height = height;
          sizeRef.current = { width, height };
          initParticles(); // Re-create particles for the new size
        }
      }, 100);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastMouseUpdate = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 16) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        lastMouseUpdate = now;
      }
    };
    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });

    const drawConnections = () => {
      const particles = particlesRef.current;
      const connectionDistanceSquared = 60 * 60;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < connectionDistanceSquared) {
            const opacity = 0.1 * (1 - Math.sqrt(distanceSquared) / 60);
            ctx.strokeStyle = `rgba(156, 163, 175, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    let frameCount = 0;
    const isMobile = window.innerWidth < 768;
    const frameSkip = isMobile ? 2 : 1;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisible) return;

      frameCount++;
      if (frameCount % frameSkip !== 0) return;

      // Read size from the ref for clearing
      ctx.clearRect(0, 0, sizeRef.current.width, sizeRef.current.height);
      drawConnections();
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationRef.current);
      clearTimeout(resizeTimeout);
    };
    // FIX 3: Use an empty dependency array. The effect should only run once.
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
    <div
      id="home"
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-5 relative overflow-hidden">
      <ParticleBackground />

      <main className="relative z-10 flex flex-col items-center text-center py-20">
        <div className="container mx-auto px-4 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Hi, I'm Hussain Abbas
            </h1>
            <p className="max-w-2xl text-lg mb-8 text-gray-300">
              Full Stack Developer specializing in MERN stack applications. I
              create modern, scalable web solutions that deliver exceptional
              user experiences.
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
              <a
                href="#projects"
                className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-200 hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-white/30 rounded-full font-medium hover:bg-white/10 hover:border-white/50 hover:transform hover:-translate-y-1 transition-all duration-300">
                Get In Touch
              </a>
            </div>
          </div>

          <div className="md:w-1/3 max-w-lg">
            <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/10 hover:border-white/20 transition-colors duration-300">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div
                  className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"
                  style={{ animationDelay: "0.5s" }}></div>
                <div
                  className="w-3 h-3 rounded-full bg-green-500 animate-pulse"
                  style={{ animationDelay: "1s" }}></div>
              </div>
              <div className="text-left">
                <div className="font-mono text-sm text-gray-300 space-y-2">
                  <div>
                    <span className="text-pink-400">const</span>{" "}
                    <span className="text-blue-300">developer</span>{" "}
                    <span className="text-white">=</span>{" "}
                    <span className="text-yellow-300">{"{"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">name</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-orange-300">'Hussain Abbas'</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">skills</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-yellow-300">[</span>
                    <span className="text-orange-300">'MERN'</span>
                    <span className="text-white">,</span>{" "}
                    <span className="text-orange-300">'JavaScript'</span>
                    <span className="text-yellow-300">]</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-green-300">passion</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-orange-300">
                      'Building amazing apps'
                    </span>
                  </div>
                  <div>
                    <span className="text-yellow-300">{"};"}</span>
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
