import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      draw() {
        const isLightMode = document.documentElement.classList.contains('light-mode');
        const color = isLightMode ? '0, 166, 186' : '0, 229, 255';
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${this.alpha})`;
        
        // Add subtle shadow glow to larger particles
        if (this.size > 2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${color}, 0.5)`;
        }
        
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Mouse interactive reaction (push particles slightly)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.5;
            this.y += Math.sin(angle) * force * 1.5;
            this.size = this.baseSize * (1 + force * 1.2);
          } else {
            if (this.size > this.baseSize) {
              this.size -= 0.1;
            }
          }
        } else {
          if (this.size > this.baseSize) {
            this.size -= 0.1;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const density = Math.floor((canvas.width * canvas.height) / 9000);
      const limit = Math.min(density, 120); // Cap particles to maintain high performance
      for (let i = 0; i < limit; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const connectParticles = () => {
      const isLightMode = document.documentElement.classList.contains('light-mode');
      const lineColor = isLightMode ? '0, 166, 186' : '0, 229, 255';
      const maxDistance = 120;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a subtle radial glow around the mouse in dark mode
      const isLightMode = document.documentElement.classList.contains('light-mode');
      if (mouse.x !== null && mouse.y !== null && !isLightMode) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 10,
          mouse.x, mouse.y, mouse.radius
        );
        gradient.addColorStop(0, 'rgba(0, 229, 255, 0.04)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchStart);
    window.addEventListener('touchend', handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchStart);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="canvas-container opacity-60 dark:opacity-80"
      style={{ display: 'block' }}
    />
  );
}
