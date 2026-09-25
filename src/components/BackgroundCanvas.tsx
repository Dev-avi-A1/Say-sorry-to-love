import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  targetOpacity: number;
  pulseSpeed: number;
  color: string;
  isHeart: boolean;
  angle: number;
  spin: number;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle particles: mostly dust embers, rarely a tiny soft glowing heart
    const colors = [
      'rgba(244, 63, 94, ',   // rose-500
      'rgba(251, 113, 133, ', // rose-400
      'rgba(244, 114, 182, ', // pink-400
      'rgba(225, 29, 72, ',   // rose-600
      'rgba(255, 255, 255, ', // faint white star
    ];

    const particleCount = Math.min(Math.floor((width * height) / 28000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isHeart = Math.random() < 0.22;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isHeart ? Math.random() * 5 + 6 : Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -Math.random() * 0.35 - 0.1, // gently rising
        opacity: Math.random() * 0.5 + 0.1,
        targetOpacity: Math.random() * 0.6 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHeart,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.01,
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      // top left curve
      c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      // bottom left curve
      c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
      // bottom right curve
      c.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      // top right curve
      c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      c.closePath();
    };

    let lastTime = performance.now();
    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric glow gradients at corners
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        100,
        width * 0.5,
        height * 0.4,
        width * 0.8
      );
      bgGrad.addColorStop(0, 'rgba(225, 29, 72, 0.04)');
      bgGrad.addColorStop(0.5, 'rgba(15, 12, 22, 0.01)');
      bgGrad.addColorStop(1, 'rgba(9, 9, 12, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render floating particles
      for (const p of particles) {
        p.x += p.speedX * (delta * 60);
        p.y += p.speedY * (delta * 60);
        p.angle += p.spin;

        // Opacity oscillation
        p.opacity += p.pulseSpeed;
        if (p.opacity > 0.7 || p.opacity < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Wrap around boundaries smoothly
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.fillStyle = `${p.color}${Math.max(0.02, Math.min(0.7, p.opacity))})`;
        ctx.shadowColor = 'rgba(244, 63, 94, 0.5)';
        ctx.shadowBlur = p.isHeart ? 10 : 4;

        if (p.isHeart) {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          drawHeart(ctx, -p.size / 2, -p.size / 2, p.size);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
