import { useEffect, useRef } from "react";
import type { Position, Velocity } from "@/types";

export function randomNumberInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

type AnimationConfig = {
  getWidth: () => number;
  getHeight: () => number;
  maxParticlesCount: number;
};

const animation = (
  ctx: CanvasRenderingContext2D,
  cfg: AnimationConfig,
  particles: Array<Particle> = []
) => {
  const particlesDiff = cfg.maxParticlesCount - particles.length;

  ctx.fillStyle = "rgb(0 0 0 / 0.2)";
  ctx.fillRect(0, 0, cfg.getWidth(), cfg.getHeight());

  // Add particles when needed
  if (particlesDiff > 0 && Math.random() > 0.5)
    particles.push(new Particle(ctx, cfg));

  particles = particles.filter((particle) => particle.lifecycle());

  requestAnimationFrame(() => {
    animation(ctx, cfg, particles);
  });
};

export function BackgroundParticles({
  getWidth = () => document.documentElement.clientWidth,
  getHeight = () => document.documentElement.clientHeight,
  maxParticlesCount = 50,
}: Partial<AnimationConfig>) {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const resizeCanvas = () => {
    if (canvas.current) {
      canvas.current.width = getWidth();
      canvas.current.height = getHeight();
    }
  };

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current!.getContext("2d");

      if (ctx) {
        addEventListener("resize", resizeCanvas);

        requestAnimationFrame(() => {
          animation(ctx, { getWidth, getHeight, maxParticlesCount });
        });
      }

      resizeCanvas();
    }
  });

  return <canvas className="absolute t-0 l-0 size-full -z-50" ref={canvas} />;
}

type Borders = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

const DEFAULT_PARTICLE_FILL_COLOR: string = "hsl(220 60% 80% / 0.3)";
const DEFAULT_PARTICLE_STROKE_COLOR: string = "transparent";

class Particle {
  ctx: CanvasRenderingContext2D;
  cfg: AnimationConfig;
  position: Position;
  velocity: Velocity;
  radius: number;
  fillColor: string;
  strokeColor: string;

  constructor(
    ctx: CanvasRenderingContext2D,
    cfg: AnimationConfig,
    {
      initialPosition,
      initialRadius,
      initialVelocity,
      fillColor = DEFAULT_PARTICLE_FILL_COLOR,
      strokeColor = DEFAULT_PARTICLE_STROKE_COLOR,
    }: {
      initialVelocity?: Velocity;
      initialPosition?: Position;
      initialRadius?: number;
      fillColor?: string;
      strokeColor?: string;
    } = {}
  ) {
    this.ctx = ctx;
    this.cfg = cfg;
    this.radius = initialRadius ?? (cfg.getWidth() + cfg.getHeight()) / 2500;
    this.velocity = initialVelocity ?? this.randomVelocity();
    this.position = initialPosition ?? {
      x: cfg.getWidth() / 2,
      y: cfg.getHeight() / 2,
    };
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
  }

  particleBorders(this: Particle): Borders {
    return {
      left: 0,
      top: 0,
      right: this.cfg.getWidth(),
      bottom: this.cfg.getHeight(),
    };
  }

  minVelocity(this: Particle): Velocity {
    return {
      x: this.cfg.getWidth() / 1_000,
      y: this.cfg.getHeight() / 10_000,
    };
  }

  maxVelocity(this: Particle): Velocity {
    return {
      x: this.cfg.getWidth() / 150,
      y: this.cfg.getHeight() / 100,
    };
  }

  // Returns a boolean value that indicates the continuation of the particle's life cycle.
  lifecycle(this: Particle): boolean {
    this.draw();
    this.update();

    return this.canLive();
  }

  canLive(this: Particle): boolean {
    const {
      position: { x, y },
    } = this;
    const { left, top, right, bottom } = this.particleBorders();

    const horizontalBound = x >= left && x <= right;
    const verticalBound = y >= top && y <= bottom;

    return horizontalBound && verticalBound;
  }

  draw(this: Particle): void {
    const {
      ctx,
      position: { x, y },
      fillColor,
    } = this;

    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(this: Particle): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.radius += Math.sqrt(this.radius) / 500;
  }

  randomVelocity(this: Particle): Velocity {
    const minVelocity = this.minVelocity();
    const maxVelocity = this.maxVelocity();

    const absX = randomNumberInRange(minVelocity.x, maxVelocity.x);
    const absY = randomNumberInRange(minVelocity.y, maxVelocity.y);

    return {
      x: Math.random() > 0.5 ? -absX : absX,
      y: Math.random() > 0.5 ? -absY : absY,
    };
  }
}
