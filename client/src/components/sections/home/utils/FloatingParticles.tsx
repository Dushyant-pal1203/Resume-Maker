import { motion } from "framer-motion";

interface FloatingParticlesProps {
  count: number;
  color: string;
}

export function FloatingParticles({ count, color }: FloatingParticlesProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 ${color} rounded-full`}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            x: [null, `calc(${Math.random() * 100}% + ${Math.sin(i) * 20}px)`],
            y: [null, `calc(${Math.random() * 100}% + ${Math.cos(i) * 20}px)`],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
