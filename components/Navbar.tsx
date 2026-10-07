"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Search, Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { ProductSearchResults } from './ProductSearchResults';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { ProductsMenu } from './ProductsMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { contactDetails } from '@/lib/contact-details';

// Navigation links configuration
const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  // { label: 'Brands', href: '/brands' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
];

const linkStyle = 'relative whitespace-nowrap py-2 text-sm font-medium text-neutral-700 hover:text-brand-700 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 tracking-normal aria-[current=page]:text-brand-700 aria-[current=page]:after:absolute aria-[current=page]:after:bottom-0 aria-[current=page]:after:left-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:w-full aria-[current=page]:after:bg-brand-500';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isTransparent = !isScrolled;
  const mobileDialogRef = useRef<HTMLDialogElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  function closeSearch(restoreFocus = false) {
    setIsSearchOpen(false);
    setSearchQuery('');
    if (restoreFocus) searchButtonRef.current?.focus();
  }

  function submitSearch() {
    if (!searchQuery.trim()) {
      searchInputRef.current?.focus();
      return;
    }
    router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}#catalog`);
    closeSearch();
  }

  // Handle sticky navbar elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const initialFrame = window.requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Keyboard shortcut support (Cmd/Ctrl + K to open search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        setSearchQuery('');
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !searchContainerRef.current?.contains(event.target)) {
        closeSearch();
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isSearchOpen]);

  // Focus management for search input
  useEffect(() => {
    if (isSearchOpen) {
      const focusTimer = setTimeout(() => searchInputRef.current?.focus(), 100);
      return () => clearTimeout(focusTimer);
    }
  }, [isSearchOpen]);

  // Mobile menu scroll lock
  useEffect(() => {
    const dialog = mobileDialogRef.current;
    if (!dialog) return;

    if (isMobileMenuOpen) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (desktopQuery.matches) setIsMobileMenuOpen(false);
    };
    desktopQuery.addEventListener('change', closeOnDesktop);

    return () => {
      document.body.style.overflow = '';
      desktopQuery.removeEventListener('change', closeOnDesktop);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Notification / Contact Bar */}
      <div className="w-full font-sans relative z-[51] bg-surface-dark text-neutral-300 py-2 px-4 md:px-8 text-xs font-medium border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a 
              href={contactDetails.phoneHref}
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <div className="p-1 rounded-full bg-neutral-800 group-hover:bg-brand-800 transition-colors">
                <Phone className="w-3 h-3 text-brand-700 group-hover:text-white transition-colors" />
              </div>
              <span className="tracking-wider">Project inquiries</span>
            </a>
            <span className="hidden sm:inline-block text-neutral-700">|</span>
            <Link 
              href="/contact?purpose=technical#quote" 
              className="hidden sm:inline-block hover:text-white transition-colors text-neutral-400 hover:text-neutral-200"
            >
              Technical support
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav 
        aria-label="Main navigation" 
        className={`w-full shrink-0 font-sans sticky top-0 z-50 py-1.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none border-b ${
          isTransparent
            ? 'bg-transparent border-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-md border-neutral-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 md:h-[60px]">
          
          {/* Brand Logo */}
          <Link 
            href="/" 
            aria-label="Mahal Foret Hayat home" 
            className={`flex shrink-0 items-center group transition-all duration-300 ${
              isSearchOpen ? 'hidden md:flex' : 'flex'
            }`}
          >
            <Image
              src="/blacktextbrandname.png"
              alt="Mahal Foret Hayat logo"
              width={220}
              height={72}
              priority
              className="h-12 w-auto max-w-[190px] object-contain sm:max-w-[240px] lg:max-w-[250px]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          {!isSearchOpen && (
            <div className="hidden lg:flex items-center gap-4 xl:gap-7">
              {navigationLinks.slice(0, 2).map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  aria-current={(link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? 'page' : undefined} 
                  prefetch={false} 
                  className={linkStyle}
                >
                  {link.label}
                </Link>
              ))}
              
              <ProductsMenu />

              {navigationLinks.slice(2).map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  aria-current={(link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? 'page' : undefined} 
                  prefetch={false} 
                  className={linkStyle}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Action Controls (Search & Mobile Toggle) */}
          <div className={`flex min-w-0 items-center gap-2 sm:gap-3 justify-end ${isSearchOpen ? 'flex-1 md:ml-6 md:max-w-xl' : 'flex-grow lg:flex-grow-0'}`}>
            
            {/* Search Component Bar */}
            <div ref={searchContainerRef} className={`relative min-w-0 flex items-center justify-end transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isSearchOpen ? 'w-full max-w-xl' : 'w-auto'
            }`}>
              <div className={`relative flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group ${
                isSearchOpen 
                  ? 'w-full bg-white rounded-lg border border-brand-200 shadow-(--brand-shadow) px-4 py-2 ring-4 ring-brand-500/10'
                  : 'w-auto bg-neutral-50 hover:bg-brand-50/60 rounded-lg border border-neutral-200 hover:border-brand-200 p-1.5 md:px-3.5 md:py-1.5 cursor-pointer'
              }`}
                onClick={() => !isSearchOpen && setIsSearchOpen(true)}
              >
                {/* Search Icon */}
                <button 
                  ref={searchButtonRef}
                  type="button"
                  aria-label="Search"
                  aria-expanded={isSearchOpen}
                  aria-controls="navbar-search-results"
                  onClick={() => isSearchOpen ? submitSearch() : setIsSearchOpen(true)}
                  className={`flex items-center justify-center shrink-0 transition-colors ${
                    isSearchOpen ? 'text-brand-700 cursor-default' : 'text-neutral-500 group-hover:text-brand-700'
                  }`}
                >
                  <Search className={`transition-all duration-500 ${isSearchOpen ? 'w-4 h-4 mr-2' : 'w-5 h-5'}`} />
                </button>

                {/* Search Input (conditionally shown but animated width) */}
                <input 
                  ref={searchInputRef}
                  type="search"
                  tabIndex={isSearchOpen ? 0 : -1}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search the product catalog"
                  onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing) { event.preventDefault(); submitSearch(); } }}
                  placeholder="Search products or material systems..." 
                  className={`min-w-0 [&::-webkit-search-cancel-button]:appearance-none bg-transparent text-[15px] text-neutral-800 placeholder-neutral-400 outline-none border-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isSearchOpen ? 'w-full opacity-100 px-1' : 'w-0 opacity-0 px-0'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Right side controls when closed */}
                {!isSearchOpen && (
                  <div className="hidden md:flex items-center gap-2 ml-2">
                    <span className="text-[13px] font-semibold text-neutral-500 group-hover:text-neutral-700 whitespace-nowrap transition-colors">Search</span>
                    <kbd className="text-[10px] bg-white text-neutral-400 px-1.5 py-0.5 rounded shadow-sm border border-neutral-200 font-mono tracking-tighter">
                      ⌘K
                    </kbd>
                  </div>
                )}

                {/* Clear / Close Buttons when open */}
                {isSearchOpen && <div className="flex shrink-0 items-center ml-2">
                  {searchQuery && (
                    <button 
                      type="button" 
                      aria-label="Clear search"
                      onClick={(e) => { e.stopPropagation(); setSearchQuery(''); searchInputRef.current?.focus(); }}
                      className="p-1 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="w-[1px] h-4 bg-neutral-200 mx-2 shrink-0"></div>
                  <button 
                    type="button" 
                    aria-label="Close search"
                    onClick={(e) => { e.stopPropagation(); closeSearch(true); }}
                    className="flex h-9 w-9 items-center justify-center text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>}
              </div>
              {isSearchOpen && <div id="navbar-search-results" className="absolute left-0 right-0 top-full z-50"><ProductSearchResults query={searchQuery} onNavigate={() => closeSearch()} /></div>}
            </div>

            {/* Mobile Navigation Toggle */}
            <button 
              type="button"
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'} 
              aria-expanded={isMobileMenuOpen} 
              aria-controls="mobile-navigation" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`lg:hidden min-h-11 min-w-11 p-2 text-neutral-700 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-colors ${
                isSearchOpen ? 'hidden' : 'block'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <dialog 
          ref={mobileDialogRef} 
          id="mobile-navigation" 
          aria-labelledby="mobile-navigation-title" 
          className="mobile-navigation-drawer fixed inset-y-0 left-0 right-auto m-0 h-dvh max-h-none w-[min(88vw,360px)] border-0 bg-white p-0 text-neutral-800 shadow-2xl backdrop:bg-neutral-900/40 backdrop:backdrop-blur-sm transition-all"
          onCancel={() => setIsMobileMenuOpen(false)} 
          onClose={() => setIsMobileMenuOpen(false)} 
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}
        >
          <div className="flex h-full flex-col bg-white">
            {/* Drawer Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-6 py-5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-700 flex items-center justify-center text-white font-bold text-sm">
                  B
                </div>
                <h2 id="mobile-navigation-title" className="text-base font-bold text-neutral-900">
                  Menu Navigation
                </h2>
              </div>
              <button 
                type="button" 
                aria-label="Close navigation" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="min-h-11 min-w-11 p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Content Body */}
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-6 py-6 text-sm">
              <Link 
                href="/" 
                prefetch={false} 
                className="py-2.5 font-medium text-neutral-800 hover:text-brand-700 transition-colors border-b border-neutral-50" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link 
                href="/about" 
                prefetch={false} 
                className="py-2.5 font-medium text-neutral-800 hover:text-brand-700 transition-colors border-b border-neutral-50" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              <div className="py-2">
                <ProductsMenu mobile onNavigate={() => setIsMobileMenuOpen(false)} />
              </div>

              {navigationLinks.slice(2).map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  aria-current={(link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)) ? 'page' : undefined} 
                  prefetch={false} 
                  className="py-2.5 font-medium text-neutral-800 hover:text-brand-700 transition-colors border-b border-neutral-50" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}


            </div>
          </div>
        </dialog>
      </nav>
    </>
  );
}
