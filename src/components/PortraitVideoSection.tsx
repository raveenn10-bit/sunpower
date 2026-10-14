"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  SpeakerHigh,
  SpeakerSlash,
  MapPin,
  Clock,
  Sparkle,
  ArrowUpRight,
  WhatsappLogo,
  CaretLeft,
  CaretRight,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { SectionReveal } from "@/components/SectionReveal";
import { WHATSAPP_INTL_NUMBER } from "@/data/products";

export interface VideoReel {
  id: string;
  src: string;
  poster: string;
  durationSeconds: number;
  durationLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  inquiryQuery: string;
}

export const SUNPOWER_REELS: VideoReel[] = [
  {
    id: "dewata-tour",
    src: "/assets/videos/sunpower-reel-1.mp4",
    poster: "/assets/videos/sunpower-reel-1-poster.jpg",
    durationSeconds: 124,
    durationLabel: "2:04",
    badge: "Dewata Store Tour",
    title: "Inside Sunpower: The Guided Market Tour",
    subtitle: "Organic Harvests, Cold Fridge & Healthy Living",
    location: "Dewata & Galle",
    description:
      "Take an immersive walkthrough of our Dewata store with our host — exploring crisp farm vegetables, dairy, artisanal pantry jars, and natural wellness essentials.",
    inquiryQuery: "Hi Sunpower, I saw your Dewata store tour reel! What fresh organic items arrived today?",
  },
  {
    id: "coastal-cooking",
    src: "/assets/videos/sunpower-reel-2.mp4",
    poster: "/assets/videos/sunpower-reel-2-poster.jpg",
    durationSeconds: 132,
    durationLabel: "2:12",
    badge: "Coastal Cooking & Lifestyle",
    title: "Sunset Nourishment: Fresh Coastal Bowls",
    subtitle: "Surf Recovery Salad & Mediterranean Olive Oil",
    location: "Ahangama & South Coast",
    description:
      "Golden hour cooking along the southern coast — whisking pure cold-pressed olive oil, crisp greens, and nourishing protein for the ultimate post-surf bowl.",
    inquiryQuery: "Hi Sunpower, I loved the coastal cooking reel! Do you stock extra virgin olive oils and fresh greens?",
  },
  {
    id: "organic-origins",
    src: "/assets/videos/sunpower-reel-3.mp4",
    poster: "/assets/videos/sunpower-reel-3-poster.jpg",
    durationSeconds: 20,
    durationLabel: "0:20",
    badge: "Organic Origins & Heritage",
    title: "Pure Living: Organic & Local Farmer Goods",
    subtitle: "Home of Moonshadow Naturals",
    location: "Dewata Flagship Market",
    description:
      "Look for our iconic turquoise sign along Matara Road — your dedicated local home for 100% organic farmer goods, Moonshadow Naturals skincare, and conscious food.",
    inquiryQuery: "Hi Sunpower, I saw the Moonshadow Naturals & organic farmer goods sign reel. What skincare items are in stock?",
  },
];

const AUTO_PLAY_CYCLE_SECONDS = 30;

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function PortraitVideoSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(true);
  const [cycleSecondsRemaining, setCycleSecondsRemaining] = useState<number>(AUTO_PLAY_CYCLE_SECONDS);
  const [playbackProgress, setPlaybackProgress] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
  });
  const [currentTimes, setCurrentTimes] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
  });
  const [durations, setDurations] = useState<{ [key: number]: number }>({
    0: 124,
    1: 132,
    2: 20,
  });
  const [mobileSlideIndex, setMobileSlideIndex] = useState<number>(0);
  const [showControlsFor, setShowControlsFor] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const hasInViewTriggeredRef = useRef<boolean>(false);
  const activeVideoIndexRef = useRef<number | null>(null);
  activeVideoIndexRef.current = activeVideoIndex;

  // Scroll mobile carousel container
  const scrollToMobileSlide = useCallback((index: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const targetChild = el.children[index] as HTMLElement;
    if (targetChild) {
      el.scrollTo({
        left: targetChild.offsetLeft - 16,
        behavior: "smooth",
      });
      setMobileSlideIndex(index);
    }
  }, []);

  // Play a specific video with robust autoplay & browser policy handling
  const playVideoAtIndex = useCallback(
    (index: number, options?: { resetTime?: boolean }) => {
      // Pause all other videos
      videoRefs.current.forEach((v, idx) => {
        if (v && idx !== index) {
          v.pause();
        }
      });

      const targetVideo = videoRefs.current[index];
      if (!targetVideo) return;

      if (options?.resetTime) {
        try {
          targetVideo.currentTime = 0;
        } catch {}
      }

      // Initialize auto-play countdown for this video's limit
      const maxDuration = Math.min(
        AUTO_PLAY_CYCLE_SECONDS,
        durations[index] || SUNPOWER_REELS[index].durationSeconds
      );
      setCycleSecondsRemaining(maxDuration);

      targetVideo.defaultMuted = true;
      targetVideo.muted = isMuted;
      targetVideo.playsInline = true;

      targetVideo
        .play()
        .then(() => {
          setActiveVideoIndex(index);
          setIsPlaying(true);
          setMobileSlideIndex(index);
          scrollToMobileSlide(index);
        })
        .catch((err) => {
          console.warn("Autoplay with current settings interrupted, retrying muted:", err);
          // If browser policy blocked playback, ensure muted=true and retry
          targetVideo.muted = true;
          setIsMuted(true);
          targetVideo
            .play()
            .then(() => {
              setActiveVideoIndex(index);
              setIsPlaying(true);
              setMobileSlideIndex(index);
              scrollToMobileSlide(index);
            })
            .catch(() => {
              // Wait for user click gesture if strict browser policy
              setActiveVideoIndex(index);
              setIsPlaying(false);
              setMobileSlideIndex(index);
              scrollToMobileSlide(index);
            });
        });
    },
    [isMuted, durations, scrollToMobileSlide]
  );

  // Smoothly advance to the next reel
  const advanceToNextVideo = useCallback(() => {
    const currentIdx = activeVideoIndexRef.current ?? 0;
    const nextIdx = (currentIdx + 1) % SUNPOWER_REELS.length;
    playVideoAtIndex(nextIdx, { resetTime: true });
  }, [playVideoAtIndex]);

  // Toggle Play / Pause for a video
  const togglePlay = useCallback(
    (index: number) => {
      const currentVideo = videoRefs.current[index];
      if (!currentVideo) return;

      if (activeVideoIndex === index) {
        if (!currentVideo.paused) {
          currentVideo.pause();
          setIsPlaying(false);
        } else {
          currentVideo
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {});
        }
      } else {
        // Switch to chosen video
        playVideoAtIndex(index, { resetTime: false });
      }
    },
    [activeVideoIndex, playVideoAtIndex]
  );

  // Toggle audio mute / unmute seamlessly across all videos
  const toggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMuted((prev) => {
      const nextMuted = !prev;
      videoRefs.current.forEach((v) => {
        if (v) {
          v.muted = nextMuted;
        }
      });
      return nextMuted;
    });
  }, []);

  // Toggle 30s auto-play mode
  const toggleAutoPlay = useCallback(() => {
    setAutoPlayEnabled((prev) => {
      const nextState = !prev;
      if (nextState) {
        // Resuming auto-play
        if (activeVideoIndex === null) {
          playVideoAtIndex(0);
        } else {
          const v = videoRefs.current[activeVideoIndex];
          if (v && v.paused) {
            v.play().then(() => setIsPlaying(true)).catch(() => {});
          }
          const maxDur = Math.min(
            AUTO_PLAY_CYCLE_SECONDS,
            durations[activeVideoIndex] || SUNPOWER_REELS[activeVideoIndex].durationSeconds
          );
          setCycleSecondsRemaining(maxDur);
        }
      }
      return nextState;
    });
  }, [activeVideoIndex, durations, playVideoAtIndex]);

  // Auto-play 30s countdown timer
  useEffect(() => {
    if (!autoPlayEnabled || activeVideoIndex === null || !isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setCycleSecondsRemaining((prev) => {
        if (prev <= 1) {
          advanceToNextVideo();
          return AUTO_PLAY_CYCLE_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoPlayEnabled, activeVideoIndex, isPlaying, advanceToNextVideo]);

  // Handle seeking via clicking progress bar
  const handleProgressSeek = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    const v = videoRefs.current[index];
    const dur = durations[index] || SUNPOWER_REELS[index].durationSeconds;

    if (v) {
      v.currentTime = fraction * dur;
      setPlaybackProgress((prev) => ({ ...prev, [index]: fraction * 100 }));
      setCurrentTimes((prev) => ({ ...prev, [index]: fraction * dur }));
    }
  };

  // Video event handlers
  const handleTimeUpdate = (index: number) => {
    const v = videoRefs.current[index];
    if (!v) return;
    const dur = v.duration || durations[index] || SUNPOWER_REELS[index].durationSeconds;
    const cur = v.currentTime;
    const pct = dur > 0 ? (cur / dur) * 100 : 0;

    setPlaybackProgress((prev) => ({ ...prev, [index]: pct }));
    setCurrentTimes((prev) => ({ ...prev, [index]: cur }));
  };

  const handleLoadedMetadata = (index: number) => {
    const v = videoRefs.current[index];
    if (v && v.duration && !isNaN(v.duration)) {
      setDurations((prev) => ({ ...prev, [index]: v.duration }));
    }
  };

  const handleVideoEnded = (index: number) => {
    if (autoPlayEnabled) {
      advanceToNextVideo();
    } else {
      setIsPlaying(false);
    }
  };

  // Mobile carousel swipe / scroll sync
  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const firstChild = el.children[0] as HTMLElement | undefined;
    const itemWidth = firstChild ? firstChild.offsetWidth + 24 : el.offsetWidth * 0.8;
    const current = Math.round(scrollLeft / itemWidth);
    setMobileSlideIndex(Math.min(SUNPOWER_REELS.length - 1, Math.max(0, current)));
  };

  // IntersectionObserver: Auto-play starts when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      playVideoAtIndex(0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!hasInViewTriggeredRef.current) {
            hasInViewTriggeredRef.current = true;
            // First time in view: auto-start Reel 0
            playVideoAtIndex(0);
          } else if (autoPlayEnabled && activeVideoIndexRef.current !== null) {
            const currentVideo = videoRefs.current[activeVideoIndexRef.current];
            if (currentVideo && currentVideo.paused) {
              currentVideo.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          }
        } else {
          // Scrolled out of view: pause playback to conserve CPU and bandwidth
          if (activeVideoIndexRef.current !== null) {
            const currentVideo = videoRefs.current[activeVideoIndexRef.current];
            if (currentVideo && !currentVideo.paused) {
              currentVideo.pause();
              setIsPlaying(false);
            }
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, [autoPlayEnabled, playVideoAtIndex]);

  // Pause when browser tab is inactive / hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (activeVideoIndexRef.current !== null) {
          const v = videoRefs.current[activeVideoIndexRef.current];
          if (v && !v.paused) {
            v.pause();
            setIsPlaying(false);
          }
        }
      } else {
        if (autoPlayEnabled && activeVideoIndexRef.current !== null) {
          const v = videoRefs.current[activeVideoIndexRef.current];
          if (v && v.paused) {
            v.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoPlayEnabled]);

  // Sync mute state on mount & state change
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.defaultMuted = true;
        v.muted = isMuted;
        v.playsInline = true;
      }
    });
  }, [isMuted]);

  return (
    <section
      ref={sectionRef}
      id="reels"
      className="relative bg-forest-deep text-cream py-12 sm:py-20 lg:py-28 overflow-hidden border-b border-cream/10"
      aria-label="Sunpower video reels and store experience"
    >
      {/* Subtle organic background ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-forest-light/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-sun-orange/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
            <div className="space-y-2 sm:space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream/10 backdrop-blur-md border border-cream/15 text-[9px] sm:text-xs font-semibold tracking-[0.22em] text-sun-gold uppercase">
                <Sparkle size={12} weight="fill" className="text-sun-gold animate-pulse" />
                <span>REAL STORE MOMENTS · VERTICAL REELS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl lg:text-6xl text-cream leading-[1.08] tracking-tight">
                Step inside Sunpower.
                <br />
                <em className="italic font-light text-cream/90">Seen through the lens.</em>
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-cream/70 font-light leading-relaxed max-w-xl pt-1">
                Authentic vertical shorts captured at our southern stores. Experience the vibrant
                produce aisles, outdoor sunset cooking, and our organic roots.
              </p>
            </div>

            {/* Global autoplay toggle, sound helper & 30s badge */}
            <div className="flex flex-wrap items-center gap-3">
              {/* 30s Auto-Play Toggle */}
              <button
                type="button"
                onClick={toggleAutoPlay}
                className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide border backdrop-blur-md transition-all shadow-md active:scale-95 group ${
                  autoPlayEnabled
                    ? "bg-sun-orange/15 hover:bg-sun-orange/25 text-cream border-sun-orange/40"
                    : "bg-cream/10 hover:bg-cream/20 text-cream/70 border-cream/20"
                }`}
                title={
                  autoPlayEnabled
                    ? "Click to pause 30-second auto-cycle"
                    : "Click to resume 30-second auto-cycle"
                }
                aria-label={autoPlayEnabled ? "Pause 30s auto-play" : "Enable 30s auto-play"}
              >
                {autoPlayEnabled ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sun-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sun-orange"></span>
                    </span>
                    <span>
                      30s Auto-Play:{" "}
                      <strong className="text-sun-gold font-mono">
                        {isPlaying ? `${cycleSecondsRemaining}s` : "Paused"}
                      </strong>
                    </span>
                  </>
                ) : (
                  <>
                    <Pause size={13} weight="fill" className="text-cream/50" />
                    <span>30s Auto-Play: Paused</span>
                  </>
                )}
              </button>

              {/* Global Audio Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs font-medium tracking-wide border border-cream/20 backdrop-blur-md transition-all active:scale-95 group"
                aria-label={isMuted ? "Unmute all videos" : "Mute all videos"}
              >
                {isMuted ? (
                  <>
                    <SpeakerSlash size={16} className="text-sun-orange group-hover:scale-110 transition-transform" />
                    <span>
                      Audio: Muted <span className="text-cream/50 hidden sm:inline">(Tap for sound)</span>
                    </span>
                  </>
                ) : (
                  <>
                    <SpeakerHigh size={16} className="text-sun-gold animate-bounce" />
                    <span className="text-sun-gold font-semibold">Audio: Live</span>
                  </>
                )}
              </button>

              <div className="hidden xl:flex items-center gap-2 text-[11px] text-cream/50 tracking-wider uppercase pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sun-orange" />
                <span>9:16 Shorts</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Desktop 3 Columns / Mobile Swipeable Carousel */}
        <div className="relative">
          {/* Mobile Navigation Header & Carousel Arrows */}
          <div className="md:hidden flex items-center justify-between pb-3 text-xs text-cream/70">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-cream/80 font-mono">
                Reel {mobileSlideIndex + 1} of {SUNPOWER_REELS.length}
              </span>
              {autoPlayEnabled && isPlaying && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sun-orange/20 text-sun-gold border border-sun-orange/30 font-mono">
                  Next in {cycleSecondsRemaining}s
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  const prevIdx = Math.max(0, mobileSlideIndex - 1);
                  playVideoAtIndex(prevIdx, { resetTime: false });
                }}
                disabled={mobileSlideIndex === 0}
                aria-label="Previous reel"
                className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center text-cream disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream/10 active:scale-95"
              >
                <CaretLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const nextIdx = Math.min(SUNPOWER_REELS.length - 1, mobileSlideIndex + 1);
                  playVideoAtIndex(nextIdx, { resetTime: false });
                }}
                disabled={mobileSlideIndex === SUNPOWER_REELS.length - 1}
                aria-label="Next reel"
                className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center text-cream disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream/10 active:scale-95"
              >
                <CaretRight size={16} />
              </button>
            </div>
          </div>

          {/* Cards Container */}
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex md:grid md:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 scroll-smooth no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0"
          >
            {SUNPOWER_REELS.map((reel, idx) => {
              const isActive = activeVideoIndex === idx;
              const isCurrentlyPlaying = isActive && isPlaying;
              const curTime = currentTimes[idx] || 0;
              const totalDur = durations[idx] || reel.durationSeconds;
              const progressPct = playbackProgress[idx] || 0;
              const isHovered = showControlsFor === idx;

              // Calculate 30-second cycle percentage for story-style progress bar
              const targetCycle = Math.min(AUTO_PLAY_CYCLE_SECONDS, totalDur);
              const elapsedInCycle = Math.max(0, targetCycle - cycleSecondsRemaining);
              const cyclePct = targetCycle > 0 ? (elapsedInCycle / targetCycle) * 100 : 0;

              return (
                <div
                  key={reel.id}
                  className="flex-shrink-0 w-[82vw] max-w-[320px] sm:w-[65vw] sm:max-w-[360px] md:w-auto md:max-w-none snap-center mx-auto"
                >
                  <SectionReveal delay={idx * 0.12}>
                    <div
                      onMouseEnter={() => setShowControlsFor(idx)}
                      onMouseLeave={() => setShowControlsFor(null)}
                      onClick={() => togglePlay(idx)}
                      className={`group relative aspect-[9/16] max-h-[560px] sm:max-h-[640px] md:max-h-none w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-forest-dark border cursor-pointer select-none transition-all duration-500 shadow-xl ${
                        isCurrentlyPlaying
                          ? "border-sun-orange ring-2 ring-sun-orange/40 shadow-sun-orange/20"
                          : isActive
                          ? "border-sun-gold/60 ring-1 ring-sun-gold/30"
                          : "border-cream/15 hover:border-cream/40"
                      }`}
                    >
                      {/* Top 30-Second Story-Style Linear Progress Bar */}
                      {isActive && (
                        <div className="absolute top-0 inset-x-0 h-1 bg-cream/20 z-30 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-sun-gold to-sun-orange shadow-[0_0_10px_rgba(245,158,11,0.9)] transition-all ${
                              autoPlayEnabled && isCurrentlyPlaying
                                ? "duration-1000 ease-linear"
                                : "duration-200"
                            }`}
                            style={{ width: `${cyclePct}%` }}
                          />
                        </div>
                      )}

                      {/* Video Element */}
                      <video
                        ref={(el) => {
                          videoRefs.current[idx] = el;
                        }}
                        src={reel.src}
                        poster={reel.poster}
                        playsInline
                        preload="metadata"
                        muted={isMuted}
                        onTimeUpdate={() => handleTimeUpdate(idx)}
                        onLoadedMetadata={() => handleLoadedMetadata(idx)}
                        onEnded={() => handleVideoEnded(idx)}
                        onPlay={() => {
                          if (activeVideoIndex === idx) {
                            setIsPlaying(true);
                          }
                        }}
                        onPause={() => {
                          if (activeVideoIndex === idx) {
                            setIsPlaying(false);
                          }
                        }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />

                      {/* Poster Fallback Image layer if video is loading */}
                      <div className="absolute inset-0 -z-10">
                        <Image
                          src={reel.poster}
                          alt={reel.title}
                          fill
                          sizes="(max-width: 768px) 82vw, 33vw"
                          className="object-cover"
                        />
                      </div>

                      {/* Permanent Vignette & Glassmorphism Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/25 to-forest-deep/70 pointer-events-none" />
                      <div className="absolute inset-0 bg-forest-deep/20 pointer-events-none" />

                      {/* Top Bar Overlay */}
                      <div className="absolute top-0 inset-x-0 p-4 sm:p-5 z-20 flex items-start justify-between gap-2 pointer-events-none">
                        {/* Location & Category Badges */}
                        <div className="flex flex-col gap-1.5">
                          <span className="self-start px-2.5 py-1 rounded-full bg-cream/15 backdrop-blur-md border border-cream/25 text-[9px] sm:text-[10px] font-semibold tracking-wider text-cream uppercase">
                            {reel.badge}
                          </span>
                          <div className="inline-flex items-center gap-1 text-[10px] text-cream/80 bg-forest-deep/70 backdrop-blur-sm px-2 py-0.5 rounded-md border border-cream/10">
                            <MapPin size={11} className="text-sun-orange" />
                            <span>{reel.location}</span>
                          </div>
                        </div>

                        {/* Top-Right Sound & Duration Badges */}
                        <div className="flex items-center gap-2 ml-auto pointer-events-auto">
                          <button
                            type="button"
                            onClick={(e) => toggleMute(e)}
                            className="p-2 sm:p-2.5 rounded-full bg-forest-deep/80 hover:bg-forest-deep text-cream border border-cream/20 backdrop-blur-md transition-all shadow-md active:scale-95"
                            title={isMuted ? "Click to unmute" : "Click to mute"}
                            aria-label={isMuted ? "Unmute reel" : "Mute reel"}
                          >
                            {isMuted ? (
                              <SpeakerSlash size={15} className="text-sun-orange" />
                            ) : (
                              <SpeakerHigh size={15} className="text-sun-gold" />
                            )}
                          </button>

                          <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-deep/70 backdrop-blur-md border border-cream/20 text-[10px] font-mono text-cream/90">
                            <Clock size={11} className="text-sun-gold" />
                            <span>{reel.durationLabel}</span>
                          </div>
                        </div>
                      </div>

                      {/* Central Interactive Play/Pause Button */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                        <AnimatePresence>
                          {(!isCurrentlyPlaying || isHovered) && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pointer-events-auto"
                            >
                              <div
                                className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center backdrop-blur-md border shadow-2xl transition-transform duration-300 transform group-hover:scale-110 active:scale-95 ${
                                  isCurrentlyPlaying
                                    ? "bg-forest-deep/80 text-cream border-cream/30 hover:bg-sun-orange hover:text-forest-dark"
                                    : "bg-sun-orange/90 text-forest-dark border-cream/40 hover:bg-sun-amber"
                                }`}
                              >
                                {isCurrentlyPlaying ? (
                                  <Pause size={22} weight="fill" className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                                ) : (
                                  <Play size={22} weight="fill" className="ml-0.5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Bottom Glassmorphic Card Overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-5 lg:p-6 z-20 flex flex-col justify-end space-y-2 sm:space-y-3 pointer-events-auto bg-gradient-to-t from-forest-deep via-forest-deep/90 to-transparent pt-8 sm:pt-12">
                        {/* Interactive Scrubbable Progress Bar */}
                        <div
                          onClick={(e) => handleProgressSeek(e, idx)}
                          className="relative w-full h-1.5 sm:h-2 bg-cream/20 hover:h-2.5 rounded-full cursor-pointer transition-all overflow-hidden group/bar"
                          title="Click to seek"
                          role="slider"
                          aria-label={`Playback progress for ${reel.title}`}
                          aria-valuenow={Math.round(progressPct)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className="absolute top-0 bottom-0 left-0 bg-sun-orange rounded-full transition-[width] duration-150"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>

                        {/* Timing and Status Indicator Bar */}
                        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-cream/70 tracking-wider">
                          <span>
                            {formatTime(curTime)} / {formatTime(totalDur)}
                          </span>
                          <span className="uppercase text-[8.5px] sm:text-[9px] tracking-widest text-sun-gold/90">
                            {isCurrentlyPlaying
                              ? autoPlayEnabled
                                ? `Cycle: ${cycleSecondsRemaining}s remaining`
                                : "Tap to pause"
                              : isActive
                              ? "Paused · Tap to play"
                              : "Tap to watch"}
                          </span>
                        </div>

                        {/* Title and details */}
                        <div>
                          <h3 className="font-serif text-base sm:text-lg lg:text-xl text-cream font-medium leading-snug line-clamp-2">
                            {reel.title}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-cream/75 font-light leading-relaxed line-clamp-2 mt-0.5 sm:mt-1">
                            {reel.description}
                          </p>
                        </div>

                        {/* Action buttons footer */}
                        <div className="pt-1 flex items-center justify-between gap-2 border-t border-cream/10">
                          <span className="text-[10px] text-cream/60 tracking-wider uppercase font-mono">
                            {reel.location}
                          </span>

                          <a
                            href={`https://wa.me/${WHATSAPP_INTL_NUMBER}?text=${encodeURIComponent(
                              reel.inquiryQuery
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/10 hover:bg-sun-orange hover:text-forest-dark text-[10px] sm:text-xs font-semibold tracking-wider text-cream transition-all group/wa border border-cream/20 shadow-sm"
                          >
                            <WhatsappLogo
                              size={13}
                              weight="fill"
                              className="text-green-400 group-hover/wa:text-forest-dark"
                            />
                            <span>Inquire</span>
                            <ArrowUpRight size={11} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                </div>
              );
            })}
          </div>

          {/* Mobile slide indicator dots */}
          <div className="md:hidden flex items-center justify-center gap-1.5 pt-4">
            {SUNPOWER_REELS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => playVideoAtIndex(idx, { resetTime: false })}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  mobileSlideIndex === idx
                    ? "w-6 bg-sun-orange"
                    : "w-1.5 bg-cream/25 hover:bg-cream/50"
                }`}
                aria-label={`Jump to reel ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Banner Note */}
        <SectionReveal delay={0.3}>
          <div className="mt-12 sm:mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-cream/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Real store footage recorded at Sunpower Dewata & Ahangama branches.</span>
            </div>
            <a
              href="https://www.instagram.com/sunpowerfarmersmarket/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sun-orange hover:text-sun-amber font-medium transition-colors"
            >
              <span>Watch more daily reels on Instagram</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
