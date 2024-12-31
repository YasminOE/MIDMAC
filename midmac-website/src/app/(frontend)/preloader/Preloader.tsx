'use client'
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PreloaderLogo from "@/assets/images/preloader-2.svg";
import PreloaderLogoOutline from "@/assets/images/preloader-2-outline.svg";
import Image from "next/image";

export default function PreLoader() {
  const [_dimension, setDimension] = useState({ width: 0, height: 0 });
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    const stage1 = setTimeout(() => setCurrentStage(1), 2500);
    const stage2 = setTimeout(() => setCurrentStage(2), 3400);
    const stage3 = setTimeout(() => setIsComplete(true), 4300);

    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
    };
  }, []);

  const logoContainerVariants = {
    initial: { opacity: 1, y: 0 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.5, ease: [0.5, 0, 0.01, 0.69] }
    },
    exit: { 
      opacity: 1,
      y: "100vh",
      transition: { duration: 1.2, ease: [0.5, 0, 0.01, 0.69] }
    }
  };

  const fillLogoVariants = {
    initial: { 
      clipPath: 'inset(100% 0 0 0)',
    },
    animate: { 
      clipPath: 'inset(0 0 0 0)',
      transition: { duration: 2, ease: [0.5, 0, 0.01, 0.69] }
    }
  };

  const darkBackgroundVariants = {
    initial: {
      height: "0vh",
    },
    animate: {
      height: "100vh",
      transition: { duration: 0.9, ease: [0.5, 0, 0.01, 0.69] }
    }
  };

  return (
    <>
      {!isComplete && (
        <motion.div 
          className="loader"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={slideDown}
        >
          <motion.div
            className="no-scroll overlay bg-[#DAD2C2]"
          >
            {currentStage >= 2 && (
              <motion.div 
                className="absolute bottom-0 left-0 w-full bg-[#1E1E1E]"
                variants={darkBackgroundVariants}
                initial="initial"
                animate="animate"
              />
            )}

            <AnimatePresence mode="wait">
              {currentStage <= 1 && (
                <motion.div
                  key="logo-container"
                  className="relative w-24 h-24 z-10"
                  variants={logoContainerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {/* Outline logo (background) */}
                  <div className="absolute inset-0">
                    <Image
                      src={PreloaderLogoOutline}
                      alt="Midmac Logo Outline"
                      fill
                      className="object-contain pre-loader-outline"
                      priority
                    />
                  </div>
                  
                  {/* Filled logo (overlay) */}
                  <motion.div 
                    className="absolute inset-0"
                    variants={fillLogoVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <Image
                      src={PreloaderLogo}
                      alt="Midmac Logo Fill"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}