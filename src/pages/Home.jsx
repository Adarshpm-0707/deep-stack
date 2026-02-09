"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showComingSoon, setShowComingSoon] = useState(true);

  // 🔁 Toggle text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowComingSoon((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center px-6 text-white">

      {/* --- BACKGROUND ORBS --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [-100, 150, -50, -100],
            y: [-50, 100, -100, -50],
            scale: [1, 1.4, 0.8, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full"
        />

        <motion.div
          animate={{
            x: [100, -150, 50, 100],
            y: [50, -100, 100, 50],
            scale: [1.2, 0.9, 1.3, 1.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.01)_50%)] bg-[length:100%_4px]" />
      </div>

      {/* --- CONTENT --- */}
      <section className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">

        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-7xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-12"
        >
          A new era of <br className="hidden md:block" />
          <span className="italic font-serif text-neon">
            artificial intelligence
          </span>{" "}
          learning
        </motion.h1>

        {/* 🔁 LOOPING TEXT */}
        <div className="relative h-[120px] flex items-center justify-center">

          <AnimatePresence mode="wait">
            {showComingSoon ? (
              <motion.p
                key="coming-soon"
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="
                  text-xl md:text-3xl lg:text-2xl
                  font-light uppercase tracking-[0.3em]
                "
              >
                <span className="text-white">Coming</span>{" "}
                <span className="text-neon font-semibold drop-shadow-[0_0_20px_rgba(230,255,0,0.6)]">
                  Soon
                </span>
              </motion.p>
            ) : (
              <motion.p
                key="get-ready"
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="
                  text-sm md:text-3xl lg:text-2xl
                  font-light uppercase tracking-[0.3em]
                  text-white/80
                "
              >
                Get Ready To Dive Deep
              </motion.p>
            )}
          </AnimatePresence>

        </div>

        {/* DOTS */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-16 flex gap-6"
        >
          <div className="w-2 h-2 bg-neon rounded-full shadow-[0_0_12px_#E6FF00]" />
          <div className="w-2 h-2 bg-white/40 rounded-full" />
          <div className="w-2 h-2 bg-neon rounded-full shadow-[0_0_12px_#E6FF00]" />
        </motion.div>

      </section>
    </main>
  );
}
