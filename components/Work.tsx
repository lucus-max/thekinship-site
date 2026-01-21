'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface WorkItem {
  id: number;
  title: string;
  category: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
}

const workItems: WorkItem[] = [
  {
    id: 1,
    title: "AI Launch Film",
    category: "Generative AI",
    description: "Generated locally at 2K resolution using open source, ethical AI models. A showcase of what's possible with responsible AI technology.",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/68a343e42faf804f2e61c144/0a7f2c80-4c6e-4e08-8d15-6c46e231f207/E1_win_00041_psd_inp2_00020_gem_00035_psd_gem_psd_qwen_00032_psd_painting_v5.png",
  },
  {
    id: 2,
    title: "VFX Showreel",
    category: "Visual Effects",
    description: "Our house VFX reel spanning over 20 years in the industry. From major campaigns to cutting-edge compositing work.",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/68a343e42faf804f2e61c144/bbf2b546-dc38-4a53-bf26-c7ab19d288bf/Showreel_2025_90511.png",
  },
  {
    id: 3,
    title: "Nissan Campaign",
    category: "AI + VFX Hybrid",
    description: "Complete breakdown showing the journey from a single product image through to full video delivery using latest AI and ML tools.",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/68a343e42faf804f2e61c144/7b41562f-3a52-4600-8898-b846b8e4dbdb/15_grain_glow.jpg",
  },
];

export default function Work() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="work" className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-6xl md:text-7xl font-light text-accent mb-6">
            Selected Work
          </h2>
          <p className="font-sans text-xl text-white/60 max-w-2xl">
            A curated collection of our latest projects, blending traditional VFX craftsmanship 
            with innovative AI-driven solutions.
          </p>
        </motion.div>

        {/* Work Grid */}
        <div className="space-y-32">
          {workItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              {/* Image */}
              <motion.div
                className={`relative z-20 aspect-video overflow-hidden group ${
                  index % 2 === 1 ? 'md:col-start-2' : ''
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                animate={
                  visibleItems.includes(index)
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -60 : 60 }
                }
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}
                initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
                animate={
                  visibleItems.includes(index)
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? 60 : -60 }
                }
                transition={{ duration: 1, delay: 0.4 }}
              >
                <div className="inline-block px-4 py-1 bg-accent/10 border border-accent/30 mb-6">
                  <span className="font-sans text-sm text-accent uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="font-display text-4xl md:text-5xl font-light text-white mb-6">
                  {item.title}
                </h3>
                
                <p className="font-sans text-lg text-white/60 leading-relaxed mb-8">
                  {item.description}
                </p>

                <button className="group font-sans text-accent font-medium tracking-wide flex items-center gap-3 hover:gap-5 transition-all duration-300">
                  View Project
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
