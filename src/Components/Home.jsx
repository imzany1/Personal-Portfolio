import React, { useEffect, useRef, useState, useCallback } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Optimized resize handler with debouncing
    let resizeTimeout;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Only update if size actually changed
        if (width !== canvasSize.width || height !== canvasSize.height) {
          canvas.width = width;
          canvas.height = height;
          setCanvasSize({ width, height });
        }
      }, 100);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Visibility API to pause animation when tab is hidden
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const particles = [];
    const particleCount = 30; // Reduced from 60

    class Particle {
      constructor() {
        this.x = Math.random() * canvasSize.width;
        this.y = Math.random() * canvasSize.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.6; // Slightly slower
        this.speedY = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.originalSize = this.size;
      }

      update() {
        // Mouse interaction with optimized distance calculation
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distanceSquared = dx * dx + dy * dy;
        const maxDistanceSquared = 10000; // 100px squared

        if (distanceSquared < maxDistanceSquared) {
          const distance = Math.sqrt(distanceSquared); // Only calculate sqrt when needed
          const force = (100 - distance) / 100;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.2; // Reduced force
          this.y -= Math.sin(angle) * force * 1.2;
          this.size = this.originalSize + force * 1.5; // Reduced effect
          this.opacity = Math.min(0.8, this.opacity + force * 0.2);
        } else {
          this.size = this.originalSize;
          this.opacity = Math.max(0.2, this.opacity - 0.005); // Slower fade
        }

        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges using cached canvas size
        if (this.x > canvasSize.width) this.x = 0;
        if (this.x < 0) this.x = canvasSize.width;
        if (this.y > canvasSize.height) this.y = 0;
        if (this.y < 0) this.y = canvasSize.height;
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

    // Optimized mouse tracking with throttling
    let lastMouseUpdate = 0;
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 16) {
        // Throttle to ~60fps
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        lastMouseUpdate = now;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Optimized connection drawing
    const drawConnections = () => {
      const connectionDistance = 60; // Reduced from 80
      const connectionDistanceSquared = connectionDistance * connectionDistance;

      for (let i = 0; i < particles.length - 1; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < connectionDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = 0.1 * (1 - distance / connectionDistance);
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

    // Optimized animation loop with frame skipping on mobile
    let frameCount = 0;
    // const isMobile = window.innerWidth < 768;
    const frameSkip = isMobile ? 2 : 1; // Skip every other frame on mobile

    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      frameCount++;
      if (frameCount % frameSkip !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // Draw connections first (behind particles)
      drawConnections();

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [canvasSize.width, canvasSize.height, isVisible]);

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
