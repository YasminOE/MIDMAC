export const opacity = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: { duration: 0.9, ease: [0.5, 0, 0.01, 0.69] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.9, ease: [0.5, 0, 0.01, 0.69] },
    },
  };
  
  export const slideDown = {
    initial: {
      top: 0,
    },
    enter: {
      top: 0,
      transition: { duration: 0.1 },
    },
    exit: {
      top: "-100vh",
      transition: { 
        duration: 1.2,
        ease: [0.5, 0, 0.01, 0.69],
        delay: 1.3
      },
    },
  };
  
  