'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import BustShaderCard from './BustShaderCard';

const traits = [
  {
    id: '01',
    category: 'THE PRIME ORIGINS',
    title: 'GENESIS NODE',
    description: 'THE 11 FOUNDATIONAL ANCHORS. THESE ULTRA-RARE CONSTRUCTS HOLD ROOT-LEVEL SYSTEM AUTHORITY, MASTER KEYWAYS, AND RAW ELEMENTAL FINISHES.',
    tag: '11 UNIQUE TYPES',
    imageUrl: '/assets/767.png',
  },
  {
    id: '02',
    category: 'SOVEREIGN OVERSEERS',
    title: 'ARCHON CORE',
    description: 'HIGH-CAPACITY COMMAND UNITS BUILT TO ENFORCE INTEGRITY, FEATURING VOLATILE HEAD MODIFIERS AND OVERCLOCKED OPTICS.',
    tag: '55 UNITS',
    imageUrl: '/assets/936.png',
  },
  {
    id: '03',
    category: 'TACTICAL FIELD ENFORCERS',
    title: 'SECTOR PRIME',
    description: 'HARDENED CONSTRUCTS EQUIPPED WITH SPECIALIZED TACTICAL GEAR, BUILT TO SURVIVE THE GRID AND SECURE DATA.',
    tag: '155 UNITS',
    imageUrl: '/assets/935.png',
  },
  {
    id: '04',
    category: 'ENCRYPTED SIGNAL CONDUITS',
    title: 'NETWORK RELAY',
    description: 'THE ACTIVE DATA ROUTERS OF THE NETWORK, CARRYING THE CRITICAL CRYPTOGRAPHIC CIPHER STAMPS EMBEDDED IN THEIR APPAREL.',
    tag: '300 UNITS',
    imageUrl: '/assets/1110.png',
  },
  {
    id: '05',
    category: 'THE STRUCTURAL BEDROCK',
    title: 'STANDARD FACET',
    description: 'THE ESSENTIAL GEOMETRIC UNITS FORMING THE PHYSICAL MASS AND VISUAL FOUNDATION OF THE ENTIRE ARCHITECTURE.',
    tag: '590 UNITS',
    imageUrl: '/assets/1109.png',
  },
];

export default function TraitGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null); // New ref to measure the scrolling track
  const [scrollRange, setScrollRange] = useState(0);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the exact pixel distance the track needs to move
  useEffect(() => {
    const updateRange = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(trackWidth - viewportWidth);
      }
    };

    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  // Map progress to the exact calculated pixel range
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const toggleCard = (id: string) => {
    setActiveCardId(activeCardId === id ? null : id);
  };

  return (
    <section ref={targetRef} className="relative h-[300vh] text-white bg-transparent touch-pan-y">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
        
        {/* Section Header */}
        <div className="absolute top-10 left-6 z-20 md:top-14 md:left-14 pointer-events-none">
          <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-neutral-500 uppercase">
            LAYER GENERATION PROTOCOL
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold uppercase tracking-wider text-white md:text-4xl">
            5 RARITY CATEGORIES
          </h2>
        </div>

        {/* Horizontal Sliding Cards Track */}
        <motion.div 
          ref={trackRef} 
          style={{ x }} 
          // Replaced pr-[20vw] with symmetrical padding (px-...) and added w-max to ensure correct measurement
          className="flex w-max gap-6 px-6 sm:gap-8 sm:px-8 md:gap-12 md:px-14 mt-24 md:mt-32 will-change-transform"
        >
          {traits.map((trait) => {
            const isExpanded = activeCardId === trait.id;

            return (
              <div
                key={trait.id}
                onClick={() => toggleCard(trait.id)}
                className="group relative flex aspect-square w-[85vw] sm:w-[45vw] md:w-[40vw] lg:w-[30vw] max-w-[420px] flex-col justify-between border border-neutral-800 bg-neutral-950 p-6 sm:p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:border-white/50 shrink-0 shadow-2xl"
              >
                
                {/* 1. WEBGL SHADER BACKGROUND ART */}
                <div className="absolute inset-0 z-0 opacity-50 transition-opacity duration-500 group-hover:opacity-90">
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={1} />
                    <BustShaderCard imageUrl={trait.imageUrl} />
                  </Canvas>
                </div>

                {/* 2. TOP SECTION: ID, TAG, CATEGORY, & TITLE */}
                <div className="relative z-10 space-y-1 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] sm:text-xs text-neutral-400">{trait.id} // 05</span>
                    <span className="border border-neutral-800 bg-neutral-900/90 px-2 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-neutral-300">
                      {trait.tag}
                    </span>
                  </div>

                  <div className="pt-2">
                    <p className="font-mono text-[8px] sm:text-[9px] tracking-widest text-neutral-400 uppercase">
                      {trait.category}
                    </p>
                    <h3 className="text-lg sm:text-2xl font-bold uppercase tracking-wide text-white">
                      {trait.title}
                    </h3>
                  </div>
                </div>

                {/* 3. CLICK-TO-REVEAL LORE OVERLAY */}
                <div 
                  className={`absolute inset-0 bg-black/95 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between z-30 transition-all duration-300 ease-out ${
                    isExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full pointer-events-none'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <span className="font-mono text-[10px] sm:text-xs text-white uppercase tracking-widest">{trait.title}</span>
                    <span className="font-mono text-xs text-neutral-500">[ CLOSE ✕ ]</span>
                  </div>

                  <div className="my-auto space-y-3">
                    <p className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-wider uppercase">{trait.category}</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-neutral-200 font-mono">
                      {trait.description}
                    </p>
                  </div>

                  <div className="border-t border-neutral-800 pt-4 flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-neutral-500">
                    <span>VOID BUSTS PROTOCOL</span>
                    <span className="text-white">ACTIVE</span>
                  </div>
                </div>

                {/* 4. BOTTOM FOOTER LINE */}
                <div className="absolute bottom-0 left-0 w-full z-10 flex items-center justify-between border-t border-neutral-800/90 py-4 px-6 sm:px-8 font-mono text-[10px] text-neutral-400 pointer-events-none bg-black/40 backdrop-blur-xs">
                  <span className="text-neutral-300 uppercase tracking-wider">
                    {isExpanded ? '[ CLOSE SPECS ]' : '[ CLICK TO VIEW SPECS ]'}
                  </span>
                  <span className="text-white transition-transform group-hover:translate-x-1">→</span>
                </div>

              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}