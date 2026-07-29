'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What is Void Busts?",
    answer: "Void Busts is a 1,111-piece digital art collection on Solana. Built natively in Adobe Illustrator using high-poly vector geometry, every construct features a custom cryptographic cipher language stamped onto the apparel layers and mapped directly into the smart contract metadata."
  },
  {
    question: "When is the mint and where?",
    answer: "Mint dates, mint price, and supply metrics will be announced across our official X account (@TheVoidBusts) and Discord. The collection will mint officially on LaunchMyNFT (LMNFT)."
  },
  {
    question: "How do I get an Operator (Whitelist) spot?",
    answer: "We do not run generic whitelist lotteries. Operator spots are vetted directly through active community involvement, cipher decoding challenges on X, and high-signal Discord intake."
  },
  {
    question: "What chain is Void Busts deployed on?",
    answer: "Void Busts is deployed natively on the Solana blockchain for instant finality, low transaction costs, and seamless marketplace integration."
  },
  {
    question: "What is the Cipher & Vault utility?",
    answer: "Every construct carries a unique geometric rune from our custom alphabet. Holders receive full commercial IP rights, access to raw scalable vector files, and the ability to decode their apparel glyphs to unlock staking multipliers inside the Vault ecosystem."
  }
];

export default function RoadmapFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="bg-transparent text-white w-full py-24 px-6 sm:px-12 lg:px-24 border-t border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: THE PLAN & TEAM */}
        <div className="lg:col-span-7 space-y-20">
          
          {/* THE PLAN / ROADMAP */}
          <div>
            <h2 className="font-serif italic text-3xl mb-8 tracking-wide text-white">the plan</h2>
            
            <div className="space-y-12">
              {/* Phase 01 */}
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-6 border-b border-white/10 pb-2">
                  PHASE 01 — Protocol Initialization
                </h3>
                <ul className="space-y-4 font-mono text-xs sm:text-sm tracking-wide">
                  <li className="flex justify-between items-center border-l-2 border-white/20 pl-4">
                    <span className="text-white">Vector Art Stack & Layer Generation</span>
                    <span className="text-white bg-white/10 backdrop-blur-sm px-2 py-1 text-[10px] sm:text-xs">[DONE]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/20 pl-4">
                    <span className="text-white">Smart Contract & JSON Cipher Mapping</span>
                    <span className="text-white bg-white/10 backdrop-blur-sm px-2 py-1 text-[10px] sm:text-xs">[DONE]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-[#b084ff] pl-4">
                    <span className="text-white">Operator Vetting & Terminal Whitelist</span>
                    <span className="text-[#b084ff] bg-[#b084ff]/20 backdrop-blur-sm px-2 py-1 text-[10px] sm:text-xs">[LIVE]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4 text-neutral-400">
                    <span>Featured Launchpad Deployment (LMNFT)</span>
                    <span className="text-[10px] sm:text-xs">[SOON]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4 text-neutral-400">
                    <span>1,111 Construct Mint</span>
                    <span className="text-[10px] sm:text-xs">[TBA]</span>
                  </li>
                </ul>
              </div>

              {/* Phase 02 */}
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-neutral-400 mb-6 border-b border-white/10 pb-2">
                  PHASE 02 — The Vault & Cipher Matrix
                </h3>
                <ul className="space-y-4 font-mono text-xs sm:text-sm tracking-wide text-neutral-400">
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>Master Key Release & Cipher Matrix</span>
                    <span className="text-[10px] sm:text-xs">[SOON]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>Vault Activation & Staking Multipliers</span>
                    <span className="text-[10px] sm:text-xs">[SOON]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>Holder Access: Raw High-Res Vector Assets</span>
                    <span className="text-[10px] sm:text-xs">[SOON]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>Commercial IP Rights Unlocked</span>
                    <span className="text-[10px] sm:text-xs">[SOON]</span>
                  </li>
                  <li className="flex justify-between items-center border-l-2 border-white/10 pl-4">
                    <span>Grid Expansion & Sub-Terminal Artifacts</span>
                    <span className="text-[10px] sm:text-xs">[TBA]</span>
                  </li>
                </ul>
                <p className="font-mono text-[10px] text-neutral-500 mt-6 lowercase tracking-widest">
                  operators find out first_
                </p>
              </div>
            </div>
          </div>

          {/* THE TEAM */}
          <div>
            <h2 className="font-serif italic text-3xl mb-4 tracking-wide text-white">the team</h2>
            <p className="text-neutral-300 text-sm leading-relaxed mb-8 max-w-lg">
              Built by Void Architects. Void Busts is engineered solely by Nuele bringing 1,111 high-poly vector constructs and on-chain cryptographic mechanics natively to the Solana network.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 hover:border-white/30 transition-colors flex items-center gap-5">
                {/* Image Placeholder - Update src path */}
                <div className="flex-shrink-0">
                  <img src="/assets/Promo_Bust_006.png" alt="Nuele" className="w-14 h-14 rounded-full object-cover border border-white/20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div>
                  <p className="font-serif text-2xl mb-1 text-white">Nuele</p>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2">Founder & Lead Architect</p>
                  <a href="https://x.com/Nue1e" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#b084ff] hover:text-white transition-colors block">
                    𝕏 @Nuele
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 hover:border-white/30 transition-colors flex items-center gap-5">
                {/* Image Placeholder for Mystery Partner */}
                <div className="flex-shrink-0">
                  <img src="/assets/Promo_Bust_008.png" alt="?" className="w-14 h-14 rounded-full object-cover border border-white/20 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div>
                  <p className="font-serif text-2xl mb-1 text-white">?</p>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2">Operations & Community</p>
                  <a href="#" className="font-mono text-xs text-[#b084ff] hover:text-white transition-colors block cursor-default">
                    𝕏 @?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQ ACCORDION */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <h2 className="font-serif italic text-3xl mb-8 tracking-wide text-white">intel</h2>
            
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10">
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                  >
                    <span className={`font-mono text-sm tracking-wide transition-colors ${openFAQ === index ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                      {index + 1}. {faq.question}
                    </span>
                    <span className="font-mono text-lg text-neutral-500 ml-4 group-hover:text-white transition-colors">
                      {openFAQ === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  {/* Expandable Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQ === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-neutral-300 text-sm leading-relaxed pr-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}