"use client";

import React, { useState } from 'react';
import JsonLd from './JsonLd';
import { howToSchema } from '@/lib/schemas';
import { motion, AnimatePresence } from 'framer-motion';

interface HowToStep {
  name: string;
  text: string;
}

interface HowToSeoProps {
  name: string;
  description: string;
  steps: HowToStep[];
  className?: string;
}

export default function HowToSeo({ name, description, steps, className = "" }: HowToSeoProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const schema = howToSchema({
    name,
    description,
    steps,
  });

  return (
    <>
      <JsonLd data={[schema]} />
      <div className={`flex flex-col gap-8 ${className}`}>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">{name}</h2>
          <p className="text-[var(--color-secondary)] font-light leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Timeline UI */}
          <div className="flex flex-col gap-4 relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[var(--color-outline)]/60 z-0 hidden sm:block" />
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`relative z-10 flex items-start gap-4 p-4 rounded-2xl transition-all text-left cursor-pointer ${
                    isActive 
                      ? 'bg-[var(--color-primary)] shadow-md text-[var(--color-on-primary)]' 
                      : 'hover:bg-[var(--color-surface-variant)] bg-[var(--color-surface)] border border-[var(--color-outline)]/60 text-[var(--color-primary)]'
                  }`}
                >
                  <span className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-xl font-black text-lg ${
                    isActive
                      ? 'bg-[var(--color-on-primary)] text-[var(--color-primary)]'
                      : 'bg-[var(--color-surface-variant)] text-[var(--color-secondary)]'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="flex flex-col justify-center h-12">
                    <h3 className="font-bold text-lg leading-tight">{step.name}</h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Content UI */}
          <div className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)]/60 rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[300px]">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined" style={{ fontSize: '12rem' }}>
                  info
                </span>
             </div>
             
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeStep}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.3 }}
                 className="relative z-10"
               >
                 <span className="text-[var(--color-primary)] font-black text-6xl opacity-20 mb-4 block">
                   {String(activeStep + 1).padStart(2, '0')}
                 </span>
                 <h4 className="text-2xl font-bold text-[var(--color-primary)] mb-4">{steps[activeStep].name}</h4>
                 <p className="text-[var(--color-secondary)] font-light leading-relaxed text-lg">
                   {steps[activeStep].text}
                 </p>
               </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
