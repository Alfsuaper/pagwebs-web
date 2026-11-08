import gsap from "gsap";

/**
 * GSAP HUD Text Decode / Glitch Effect
 */
export function decodeText(element: HTMLElement, originalText: string, duration = 1.2) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const length = originalText.length;
  let frame = 0;
  const totalFrames = Math.floor(duration * 60);

  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    let result = "";

    for (let i = 0; i < length; i++) {
      if (originalText[i] === " ") {
        result += " ";
        continue;
      }
      if (progress * length > i) {
        result += originalText[i];
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.innerText = result;

    if (frame >= totalFrames) {
      clearInterval(timer);
      element.innerText = originalText;
    }
  }, 1000 / 60);

  return () => clearInterval(timer);
}

/**
 * GSAP Staggered Fade In for HUD cards
 */
export function staggerFadeIn(elements: string | HTMLElement[], delay = 0.1) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: delay,
      ease: "power3.out",
    }
  );
}

/**
 * Framer Motion Preset Variants
 */
export const hudFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const hudStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
