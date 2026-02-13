import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroFallback from "@/assets/hero-steel-tubes.jpg";

interface HeroSlide {
  id: string;
  sort_order: number;
  image_url: string;
  headline: string;
  subtitle: string | null;
  cta_text: string | null;
  cta_link: string | null;
  is_active: boolean;
}

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const { data: slides } = useQuery({
    queryKey: ["hero-slides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data as HeroSlide[];
    },
    staleTime: 1000 * 60 * 5,
  });

  const activeSlides = slides?.length ? slides : null;
  const count = activeSlides?.length ?? 0;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [count, paused, next]);

  // Loading state – show empty hero shell while slides load
  if (!activeSlides) {
    return (
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent" />
      </section>
    );
  }

  const slide = activeSlides[current];

  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images */}
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.id}
          src={slide.image_url || heroFallback}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Copy overlay */}
      <div className="container relative z-10 py-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-secondary-foreground leading-[1.1] mb-6">
              {slide.headline}
            </h1>

            {slide.subtitle && (
              <p className="text-white/90 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
                {slide.subtitle}
              </p>
            )}

            {slide.cta_text && slide.cta_link && (
              <Link
                to={slide.cta_link}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow"
              >
                {slide.cta_text} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      {count > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
          {activeSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-8" : "bg-secondary-foreground/40 hover:bg-secondary-foreground/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary to-transparent" />
    </section>
  );
};

export default HeroSlider;
