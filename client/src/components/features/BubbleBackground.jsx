
import React, { useEffect, useRef } from "react";

const BubbleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Bubble properties
    const bubbles = [];
    const bubbleCount = Math.floor(window.innerWidth / 50); // Responsive bubble count
    const maxRadius = 50;
    const minRadius = 10;

    class Bubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * (maxRadius - minRadius) + minRadius;
        this.speedX = (Math.random() * 1 - 0.5) * 0.5; // Slower, smoother movement
        this.speedY = (Math.random() * 1 - 0.5) * 0.5;
        this.opacity = Math.random() * 0.2 + 0.1; // Subtle transparency
        this.blur = Math.random() * 5 + 2; // For glow effect
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges with slight randomness
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
          this.speedX *= -1 * (0.9 + Math.random() * 0.2);
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
          this.speedY *= -1 * (0.9 + Math.random() * 0.2);
        }

        // Keep bubbles within bounds
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13, 148, 136, ${this.opacity})`; // Changed to teal-500
        ctx.shadowBlur = this.blur;
        ctx.shadowColor = `rgba(13, 148, 136, 0.5)`; // Glow effect with teal-500
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize bubbles
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble());
    }

    // Animation loop
    let lastTime = 0;
    const animate = (time) => {
      if (!ctx || !canvas) return;

      // Control frame rate
      if (time - lastTime < 1000 / 60) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw();
      });
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Handle resize
    window.addEventListener("resize", resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
    />
  );
};

export default BubbleBackground;