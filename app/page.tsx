'use client';

import { Canvas } from '@react-three/fiber';
import LiquidLogo from './components/LiquidLogo';
import GridBackground from './components/GridBackground';
import TraitGallery from './components/TraitGallery';
import Documentation from './Documentation';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [logoScale, setLogoScale] = useState(1.0);

  useEffect(() => {
    setIsMounted(true);

    // Responsive scaling logic for the 3D Logo
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width > 1024) {
        // Desktop
        setLogoScale(1.0);
      } else if (width > 640 && width <= 1024) {
        // Tablet (Adjust this value if it's still cut off! Try 0.75 to 0.85)
        setLogoScale(0.75); 
      } else {
        // Mobile
        setLogoScale(0.5); 
      }
    };

    // Run once on mount to set initial scale
    handleResize(); 
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* 1. THE ART BACKGROUND: Locked to the back 
          FIX: Changed 100vw -> 100% and 100vh -> 100dvh to prevent scrollbars and cutoff */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh', zIndex: -1, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={1} />
          <GridBackground />
        </Canvas>
      </div>

      {/* 2. BAYC HERO FOREGROUND 
          FIX: Used 100dvh for true dynamic device height */}
      <div className="hero-section" style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden' }}>
        
        {/* LOGO CANVAS */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
             <ambientLight intensity={1} />
             {/* FIX: Applied dynamic scale state here */}
             <group scale={logoScale}>
               <LiquidLogo imageUrl="/assets/void-busts-logo.png" />
             </group>
          </Canvas>
        </div>

        {/* PROJECT LAW / MANIFESTO TEXT */}
        <div style={{ 
          position: 'absolute', 
          top: '65%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 5, 
          textAlign: 'center',
          width: '85%',
          maxWidth: '500px',
          pointerEvents: 'none'
        }}>
          <p style={{ 
            fontFamily: 'Helvetica Neue, sans-serif', 
            fontSize: '10px', 
            letterSpacing: '2px', 
            color: 'var(--bayc-gray)',
            textTransform: 'uppercase',
            lineHeight: '1.6'
          }}>
            1,111 cryptographic artifacts forged in absolute isolation. The 5 rarity tiers dictate the permanent weight of the void.
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="absolute top-0 w-full z-10 grid grid-cols-3 items-center px-4 sm:px-8 py-6 box-border">
          {/* Left balance column */}
          <div></div>

          {/* Center Logo Crest (True absolute grid centering, never covered) */}
          <div className="flex justify-center items-center">
            <img src="/assets/logo-crest.png" alt="Void Busts Crest" className="w-8 h-8 object-contain" />
          </div>

          {/* Top-Right Mint Button */}
          <div className="flex justify-end">
            <a href="#" className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-white border border-neutral-800 bg-black/60 px-3 sm:px-4 py-2 hover:border-white transition-colors block whitespace-nowrap">
              Mint A Bust
            </a>
          </div>
        </nav>

        {/* HERO FOOTER */}
        <footer style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', boxSizing: 'border-box' }}>
          <div className="font-mono text-xs text-neutral-400">© VOID BUSTS 2026</div>
          
          <div className="footer-links flex items-center gap-6 font-mono text-xs">
            <div className="flex items-center gap-5">
              {/* X (Twitter) Icon */}
              <a href="https://x.com/thevoidbusts" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="X (Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Discord Icon */}
              <a href="https://discord.gg/uVfu3Vg9Bf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Discord">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>

      </div>

      {/* 3. TRAIT GALLERY */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <TraitGallery />
      </div>

      {/* 4. DOCUMENTATION & WHITEPAPER */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Documentation />
      </div>

      {/* 5. MAIN SITE FOOTER */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </>
  );
}