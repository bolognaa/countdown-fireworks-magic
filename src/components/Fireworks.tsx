import { useEffect, useRef } from "react";

interface FireworksProps {
  isActive: boolean;
  speed: number;
}

const Fireworks = ({ isActive, speed }: FireworksProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      alpha: number;
    }> = [];

    const colors = ["#D946EF", "#F97316", "#0EA5E9", "#FFFFFF"];

    const createFirework = (x: number, y: number) => {
      const particleCount = 50;
      const color = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity * (speed / 50),
          vy: Math.sin(angle) * velocity * (speed / 50),
          color,
          size: 2,
          alpha: 1,
        });
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(26, 31, 44, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.03;
        particle.alpha -= 0.01;

        if (particle.alpha <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (Math.random() < 0.05 && isActive) {
        createFirework(
          Math.random() * canvas.width,
          Math.random() * (canvas.height / 2)
        );
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default Fireworks;