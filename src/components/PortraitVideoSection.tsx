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

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function PortraitVideoSection() {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
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

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const progressHoverRef = useRef<{ [key: number]: boolean }>({});

  // Auto-pause other videos when activeVideoIndex changes
  const togglePlay = useCallback(
    (index: number) => {
      const currentVideo = videoRefs.current[index];
      if (!currentVideo) return;

      if (activeVideoIndex === index) {
        // Pause current
        currentVideo.pause();
        setActiveVideoIndex(null);
      } else {
        // Pause all other videos
        videoRefs.current.forEach((v, idx) => {
          if (v && idx !== index) {
            v.pause();
          }
        });

        // Set mute state matching global preference
        currentVideo.muted = isMuted;
        currentVideo
          .play()
          .then(() => {
            setActiveVideoIndex(index);
          })
          .catch((err) => {
            console.warn("Video playback interrupted:", err);
            // If autoplay with sound was blocked, fallback to muted play
            if (!currentVideo.muted) {
              currentVideo.muted = true;
              setIsMuted(true);
              currentVideo.play().catch(() => {});
              setActiveVideoIndex(index);
            }
          });
      }
    },
    [activeVideoIndex, isMuted]
  );

  // Toggle audio mute / unmute
  const toggleMute = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      const newMuted = !isMuted;
      setIsMuted(newMuted);

      // Apply to currently playing video
      const v = videoRefs.current[index];
      if (v) {
        v.muted = newMuted;
      }
    },
    [isMuted]
  );

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

  // Mobile carousel navigation
  const scrollToMobileSlide = (index: number) => {
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
  };

  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.offsetWidth * 0.8;
    const current = Math.round(scrollLeft / itemWidth);
    setMobileSlideIndex(Math.min(SUNPOWER_REELS.length - 1, Math.max(0, current)));
  };

  // Sync mute state to all videos
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.muted = isMuted;
      }
    });
  }, [isMuted]);

  return (
    <section
      id="reels"
      className="relative bg-forest-deep text-cream py-24 sm:py-32 overflow-hidden border-b border-cream/10"
      aria-label="Sunpower video reels and store experience"
    >
      {/* Subtle organic background ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-forest-light/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-sun-orange/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream/10 backdrop-blur-md border border-cream/15 text-[10px] sm:text-xs font-semibold tracking-[0.22em] text-sun-gold uppercase">
                <Sparkle size={13} weight="fill" className="text-sun-gold animate-pulse" />
                <span>REAL STORE MOMENTS · VERTICAL REELS</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-cream leading-[1.08] tracking-tight">
                Step inside Sunpower.
                <br />
                <em className="italic font-light text-cream/90">Seen through the lens.</em>
              </h2>
              <p className="text-sm sm:text-base text-cream/70 font-light leading-relaxed max-w-xl pt-1">
                Authentic vertical shorts captured at our southern stores. Experience the vibrant
                produce aisles, outdoor sunset cooking, and our organic roots.
              </p>
            </div>

            {/* Global sound helper & mobile indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={(e) => toggleMute(e, activeVideoIndex ?? 0)}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-cream/10 hover:bg-cream/20 text-cream text-xs font-medium tracking-wide border border-cream/20 backdrop-blur-md transition-all group"
                aria-label={isMuted ? "Unmute all videos" : "Mute all videos"}
              >
                {isMuted ? (
                  <>
                    <SpeakerSlash size={16} className="text-sun-orange group-hover:scale-110 transition-transform" />
                    <span>Audio: Muted (Click for sound)</span>
                  </>
                ) : (
                  <>
                    <SpeakerHigh size={16} className="text-sun-gold animate-bounce" />
                    <span className="text-sun-gold font-semibold">Audio: Playing Live</span>
                  </>
                )}
              </button>

              <div className="hidden lg:flex items-center gap-2 text-[11px] text-cream/50 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-sun-orange animate-ping" />
                <span>9:16 Portrait Reels</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Desktop 3 Columns / Mobile Swipeable Carousel */}
        <div className="relative">
          {/* Mobile Navigation Arrows (Visible only on mobile/tablet) */}
          <div className="md:hidden flex items-center justify-between pb-3 text-xs text-cream/70">
            <span className="text-[11px] uppercase tracking-widest text-cream/60">
              Reel {mobileSlideIndex + 1} of {SUNPOWER_REELS.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollToMobileSlide(Math.max(0, mobileSlideIndex - 1))}
                disabled={mobileSlideIndex === 0}
                aria-label="Previous reel"
                className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center text-cream disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream/10"
              >
                <CaretLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollToMobileSlide(Math.min(SUNPOWER_REELS.length - 1, mobileSlideIndex + 1))}
                disabled={mobileSlideIndex === SUNPOWER_REELS.length - 1}
                aria-label="Next reel"
                className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center text-cream disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream/10"
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
              const isPlaying = activeVideoIndex === idx;
              const curTime = currentTimes[idx] || 0;
              const totalDur = durations[idx] || reel.durationSeconds;
              const progressPct = playbackProgress[idx] || 0;
              const isHovered = showControlsFor === idx;

              return (
                <div
                  key={reel.id}
                  className="flex-shrink-0 w-[84vw] sm:w-[70vw] md:w-auto snap-center"
                >
                  <SectionReveal delay={idx * 0.12}>
                    <div
                      onMouseEnter={() => setShowControlsFor(idx)}
                      onMouseLeave={() => setShowControlsFor(null)}
                      onClick={() => togglePlay(idx)}
                      className={`group relative aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-forest-dark border cursor-pointer select-none transition-all duration-500 shadow-xl ${
                        isPlaying
                          ? "border-sun-orange ring-2 ring-sun-orange/40 shadow-sun-orange/20"
                          : "border-cream/15 hover:border-cream/40"
                      }`}
                    >
                      {/* Video Element */}
                      <video
                        ref={(el) => {
                          videoRefs.current[idx] = el;
                        }}
                        src={reel.src}
                        poster={reel.poster}
                        playsInline
                        loop
                        preload="metadata"
                        muted={isMuted}
                        onTimeUpdate={() => handleTimeUpdate(idx)}
                        onLoadedMetadata={() => handleLoadedMetadata(idx)}
                        onEnded={() => {
                          if (activeVideoIndex === idx) {
                            setActiveVideoIndex(null);
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
                          sizes="(max-width: 768px) 85vw, 33vw"
                          className="object-cover"
                        />
                      </div>

                      {/* Permanent Vignette & Glassmorphism Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/25 to-forest-deep/70 pointer-events-none" />
                      <div className="absolute inset-0 bg-forest-deep/20 pointer-events-none" />

                      {/* Active Playing Equalizer Indicator (Top Left Glow) */}
                      {isPlaying && (
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest-deep/85 backdrop-blur-md border border-sun-orange/60 text-[10px] font-semibold text-sun-orange tracking-wider uppercase shadow-lg">
                          <span className="flex items-end gap-0.5 h-3">
                            <span className="w-1 bg-sun-orange animate-[bounce_0.6s_ease-in-out_infinite] h-full rounded-sm" />
                            <span className="w-1 bg-sun-orange animate-[bounce_0.8s_ease-in-out_0.2s_infinite] h-2/3 rounded-sm" />
                            <span className="w-1 bg-sun-orange animate-[bounce_0.5s_ease-in-out_0.4s_infinite] h-5/6 rounded-sm" />
                          </span>
                          <span>NOW PLAYING</span>
                        </div>
                      )}

                      {/* Top Bar Overlay (When not playing or on hover) */}
                      <div className="absolute top-0 inset-x-0 p-4 sm:p-5 z-20 flex items-start justify-between gap-3 pointer-events-none">
                        {!isPlaying && (
                          <div className="flex flex-col gap-1.5">
                            <span className="self-start px-2.5 py-1 rounded-full bg-cream/15 backdrop-blur-md border border-cream/25 text-[9px] sm:text-[10px] font-semibold tracking-wider text-cream uppercase">
                              {reel.badge}
                            </span>
                            <div className="inline-flex items-center gap-1 text-[10px] text-cream/80 bg-forest-deep/70 backdrop-blur-sm px-2 py-0.5 rounded-md border border-cream/10">
                              <MapPin size={11} className="text-sun-orange" />
                              <span>{reel.location}</span>
                            </div>
                          </div>
                        )}

                        {/* Top-Right Sound & Duration Badges */}
                        <div className="flex items-center gap-2 ml-auto pointer-events-auto">
                          <button
                            type="button"
                            onClick={(e) => toggleMute(e, idx)}
                            className="p-2 sm:p-2.5 rounded-full bg-forest-deep/70 hover:bg-forest-deep text-cream border border-cream/20 backdrop-blur-md transition-all shadow-md active:scale-95"
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
                          {(!isPlaying || isHovered) && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pointer-events-auto"
                            >
                              <div
                                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center backdrop-blur-md border shadow-2xl transition-transform duration-300 transform group-hover:scale-110 ${
                                  isPlaying
                                    ? "bg-forest-deep/80 text-cream border-cream/30 hover:bg-sun-orange hover:text-forest-dark"
                                    : "bg-sun-orange/90 text-forest-dark border-cream/40 hover:bg-sun-amber"
                                }`}
                              >
                                {isPlaying ? (
                                  <Pause size={28} weight="fill" />
                                ) : (
                                  <Play size={28} weight="fill" className="ml-1" />
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Bottom Glassmorphic Card Overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20 flex flex-col justify-end space-y-3 pointer-events-auto bg-gradient-to-t from-forest-deep via-forest-deep/90 to-transparent pt-12">
                        {/* Interactive Scrubbable Progress Bar */}
                        <div
                          onClick={(e) => handleProgressSeek(e, idx)}
                          className="relative w-full h-2 bg-cream/20 hover:h-2.5 rounded-full cursor-pointer transition-all overflow-hidden group/bar"
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

                        {/* Timing and Sound indicator bar */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-cream/70 tracking-wider">
                          <span>
                            {formatTime(curTime)} / {formatTime(totalDur)}
                          </span>
                          <span className="uppercase text-[9px] tracking-widest text-sun-gold/90">
                            {isPlaying ? "Tap to pause" : "Tap to watch"}
                          </span>
                        </div>

                        {/* Title and details */}
                        <div>
                          <h3 className="font-serif text-lg sm:text-xl text-cream font-medium leading-snug line-clamp-2">
                            {reel.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-cream/75 font-light leading-relaxed line-clamp-2 mt-1">
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
                            <WhatsappLogo size={13} weight="fill" className="text-green-400 group-hover/wa:text-forest-dark" />
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
                onClick={() => scrollToMobileSlide(idx)}
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
