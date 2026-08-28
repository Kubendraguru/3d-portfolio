document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const video = document.getElementById('scrollVideo');
  const videoScrollSection = document.getElementById('videoScrollSection');
  const videoPinViewport = document.getElementById('videoPinViewport');
  const timecodeDisplay = document.getElementById('timecodeDisplay');
  const hudProgressBar = document.getElementById('hudProgressBar');
  const progressPercent = document.getElementById('progressPercent');
  const loadingOverlay = document.getElementById('loadingOverlay');

  // 1. Initialize Lenis Smooth Scrolling for Cinematic Feel
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // 2. Format Timecode (MM:SS)
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // 3. Main ScrollTrigger Setup
  function initScrollVideo() {
    // Ensure video is paused and ready
    video.pause();

    const duration = video.duration || 10.29;
    timecodeDisplay.textContent = `00:00 / ${formatTime(duration)}`;

    // Force render of the very first frame
    try {
      video.currentTime = 0.001;
    } catch (e) {
      console.warn('Initial seek ignored:', e);
    }

    // Hide loader
    if (loadingOverlay) {
      loadingOverlay.classList.add('loaded');
    }

    // Dynamic scroll range based on device & video duration
    const isMobile = window.innerWidth <= 768;
    const scrollDistance = isMobile ? window.innerHeight * 3.5 : window.innerHeight * 4.8;

    // Create GSAP Scroll-Linked Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoScrollSection,
        pin: videoPinViewport,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: 1.0, // Buttery smooth interpolation
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Update HUD UI
          const currentSec = progress * duration;
          timecodeDisplay.textContent = `${formatTime(currentSec)} / ${formatTime(duration)}`;
          hudProgressBar.style.width = `${progress * 100}%`;
          progressPercent.textContent = `${Math.min(100, Math.floor(progress * 100)).toString().padStart(3, '0')}%`;
        }
      }
    });

    // Directly bind video.currentTime through GSAP
    tl.to(video, {
      currentTime: duration,
      ease: 'none',
    });

    // Refresh ScrollTrigger to ensure accurate layout metrics
    ScrollTrigger.refresh();
  }

  // 4. Handle Video Loading Robustly
  if (video.readyState >= 2 && video.duration > 0) {
    initScrollVideo();
  } else {
    video.addEventListener('loadedmetadata', initScrollVideo, { once: true });
    video.addEventListener('canplay', () => {
      if (loadingOverlay) loadingOverlay.classList.add('loaded');
    }, { once: true });
  }

  // Fallback if metadata is delayed
  setTimeout(() => {
    if (loadingOverlay && !loadingOverlay.classList.contains('loaded')) {
      initScrollVideo();
    }
  }, 2000);

  // 5. Mobile Video Unlock on First Touch
  const unlockPlayback = () => {
    if (video.paused && video.currentTime <= 0.01) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.pause();
          })
          .catch(() => {});
      }
    }
    window.removeEventListener('touchstart', unlockPlayback);
    window.removeEventListener('click', unlockPlayback);
  };
  window.addEventListener('touchstart', unlockPlayback, { passive: true });
  window.addEventListener('click', unlockPlayback, { passive: true });

  // 6. Handle Window Resizing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
});
