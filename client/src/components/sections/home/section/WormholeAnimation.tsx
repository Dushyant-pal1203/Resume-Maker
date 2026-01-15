import { motion } from "framer-motion";

export function WormholeAnimation() {
  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: `
          conic-gradient(
            from 0deg,
            transparent,
            rgba(147, 51, 234, 0.3),
            rgba(236, 72, 153, 0.3),
            rgba(59, 130, 246, 0.3),
            transparent
          )
        `,
      }}
    />
  );
}
