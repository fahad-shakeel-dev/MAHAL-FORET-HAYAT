'use client';

import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './HomeHero.module.css';

const slides = [
  { image: '/images/architecture.jpg', alt: 'Modern glass buildings against a pale blue sky', label: 'Build with confidence', title: 'Built for better.', description: 'Materials that bring your project to life.', action: 'Start your project', href: '#quote' },
  { image: '/images/infrastructure.jpg', alt: 'Blue industrial equipment in a bright, clean facility', label: 'Materials & solutions', title: 'Every layer. Covered.', description: 'From strong foundations to the final finish.', action: 'Explore materials', href: '#materials' },
  { image: '/images/transport-truck.webp', alt: 'White delivery truck carrying construction materials', label: 'Transport & delivery', title: 'Delivered. Simply.', description: 'Your materials, moving in the right direction.', action: 'Plan your delivery', href: '#quote' },
];
// Copies at either end let each transition move one slide before an invisible reset.
const loopSlides = [slides[slides.length - 1], ...slides, slides[0]];

export function HomeHero() {
  const track = useRef<HTMLDivElement>(null);
  const activeIndex = useRef(0);
  const loopReset = useRef<number | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef<{ pointerId: number; x: number; scrollLeft: number; index: number } | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [touching, setTouching] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    const element = track.current;
    if (!element) return;
    const align = () => {
      loopReset.current = (activeIndex.current + 1) * element.clientWidth;
      element.scrollTo({ left: loopReset.current, behavior: 'instant' });
    };
    align();
    const resize = new ResizeObserver(align);
    resize.observe(element);
    return () => {
      resize.disconnect();
      if (settleTimer.current) clearTimeout(settleTimer.current);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  const showSlide = useCallback((index: number) => {
    const element = track.current;
    if (!element || index === activeIndex.current) return;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setScrolling(true);
    transitionTimer.current = setTimeout(() => {
      element.scrollTo({ left: (index + 1) * element.clientWidth, behavior: reducedMotion ? 'instant' : 'smooth' });
    }, reducedMotion ? 0 : 220);
  }, [reducedMotion]);

  useEffect(() => {
    if (hovered || focused || scrolling || touching || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && track.current) {
        showSlide(active + 1);
      }
    }, 6500);
    return () => window.clearInterval(timer);
  }, [hovered, focused, scrolling, touching, reducedMotion, active, showSlide]);

  const handleScroll = () => {
    const element = track.current;
    if (!element) return;
    // Ignore the instant move between identical copies; it must not hide the new text.
    if (loopReset.current !== null && Math.abs(element.scrollLeft - loopReset.current) < 1) return;
    loopReset.current = null;
    setScrolling(true);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    if (drag.current) return;
    settleTimer.current = setTimeout(() => {
      const element = track.current;
      if (!element || !element.clientWidth) return;
      const position = Math.max(0, Math.min(loopSlides.length - 1, Math.round(element.scrollLeft / element.clientWidth)));
      const index = (position - 1 + slides.length) % slides.length;
      activeIndex.current = index;
      if (position === 0 || position === loopSlides.length - 1) {
        loopReset.current = (index + 1) * element.clientWidth;
        element.scrollTo({ left: loopReset.current, behavior: 'instant' });
      }
      setActive(index);
      setScrolling(false);
    }, 150);
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    const gesture = drag.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const element = event.currentTarget;
    const distance = element.scrollLeft - gesture.scrollLeft;
    let index = Math.round(element.scrollLeft / element.clientWidth);
    if (!cancelled && index === gesture.index && Math.abs(distance) > Math.min(80, element.clientWidth * .15)) {
      index += Math.sign(distance);
    }
    drag.current = null;
    setDragging(false);
    setTouching(false);
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    element.scrollTo({ left: Math.max(0, Math.min(loopSlides.length - 1, index)) * element.clientWidth, behavior: reducedMotion ? 'instant' : 'smooth' });
    handleScroll();
  };

  return (
    <section
      aria-label="Construction materials and transport"
      aria-roledescription="carousel"
      className={styles.hero}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <h1 className="sr-only">MAHAL FORET HAYAT — Construction materials and transport expertise</h1>
      <div className={styles.stage}>
      <div
        ref={track}
        className={styles.track}
        data-scrolling={scrolling}
        data-dragging={dragging}
        tabIndex={0}
        aria-label="Hero slides. Drag or swipe horizontally, or use the left and right arrow keys."
        onScroll={handleScroll}
        onPointerDown={event => {
          if (event.pointerType === 'touch' || event.button !== 0 || (event.target as Element).closest('a, button, input')) return;
          event.preventDefault();
          if (transitionTimer.current) clearTimeout(transitionTimer.current);
          if (settleTimer.current) clearTimeout(settleTimer.current);
          const element = event.currentTarget;
          element.scrollTo({ left: element.scrollLeft, behavior: 'instant' });
          drag.current = { pointerId: event.pointerId, x: event.clientX, scrollLeft: element.scrollLeft, index: Math.round(element.scrollLeft / element.clientWidth) };
          element.setPointerCapture(event.pointerId);
          setDragging(true);
          setTouching(true);
        }}
        onPointerMove={event => {
          const gesture = drag.current;
          if (!gesture || gesture.pointerId !== event.pointerId) return;
          event.preventDefault();
          event.currentTarget.scrollLeft = gesture.scrollLeft + gesture.x - event.clientX;
        }}
        onPointerUp={event => finishDrag(event)}
        onPointerCancel={event => finishDrag(event, true)}
        onLostPointerCapture={event => finishDrag(event, true)}
        onTouchStart={() => {
          if (transitionTimer.current) clearTimeout(transitionTimer.current);
          setTouching(true);
        }}
        onTouchEnd={() => {
          setTouching(false);
          handleScroll();
        }}
        onTouchCancel={() => {
          setTouching(false);
          handleScroll();
        }}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            showSlide(active + (event.key === 'ArrowRight' ? 1 : -1));
          } else if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            showSlide(event.key === 'Home' ? 0 : slides.length - 1);
          }
        }}
      >
        {loopSlides.map((slide, position) => {
          const index = (position - 1 + slides.length) % slides.length;
          const isClone = position === 0 || position === loopSlides.length - 1;
          return (
          <div
            key={`${position}-${slide.image}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
            aria-hidden={isClone || index !== active}
            inert={isClone || index !== active}
            className={styles.slide}
            data-active={index === active}
            data-loop-clone={isClone}
          >
            <div className={styles.content}>
              <p className={`${styles.reveal} ${styles.eyebrow}`}>{slide.label}</p>
              <h2 className={`${styles.reveal} ${styles.title}`}>{slide.title}</h2>
              <p className={`${styles.reveal} ${styles.description}`}>{slide.description}</p>
              <a href={slide.href} className={`${styles.reveal} ${styles.action}`}>
                {slide.action}<ArrowRight size={18} />
              </a>
            </div>
            <div className={styles.image}>
              <Image src={slide.image} alt={isClone ? '' : slide.alt} fill sizes="100vw" preload={position === 1} loading={position === 1 ? undefined : 'eager'} className={styles.photo} draggable={false} />
            </div>
            <div aria-hidden="true" className={styles.overlay} />
          </div>
          );
        })}
      </div>
        <div className={styles.sideArrows} data-visible={!scrolling} aria-hidden={scrolling}>
          <button type="button" aria-label="Previous slide" disabled={scrolling} onClick={() => showSlide(active - 1)} className={styles.arrow}><ArrowLeft size={20} /></button>
          <button type="button" aria-label="Next slide" disabled={scrolling} onClick={() => showSlide(active + 1)} className={styles.arrow}><ArrowRight size={20} /></button>
        </div>
      </div>
      <p className={styles.swipeHint}>Swipe to explore <ArrowRight size={12} aria-hidden="true" /></p>
    </section>
  );
}
