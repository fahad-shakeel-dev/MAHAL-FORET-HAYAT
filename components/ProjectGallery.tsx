'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import type { ProjectPhoto } from '@/lib/projects';

export function ProjectGallery({ photos, name }: { photos: ProjectPhoto[]; name: string }) {
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photo = photos[active];
  function open(index: number) { setActive(index); dialogRef.current?.showModal(); }
  function step(direction: number) { setActive(index => (index + direction + photos.length) % photos.length); }
  return <>
    <div className={`grid gap-5 ${photos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
      {photos.map((item, index) => <figure key={item.src}>
        <button type="button" onClick={() => open(index)} aria-label={`${name}: ${item.caption}`} className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100">
          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 639px) 100vw, 50vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
          <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-sm"><Expand aria-hidden="true" className="h-4 w-4" /></span>
        </button>
        <figcaption className="flex flex-wrap items-start justify-between gap-2 py-4 text-xs"><span className="font-medium text-neutral-700">{item.caption}</span><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-500 underline underline-offset-4">{item.sourceLabel}</a></figcaption>
      </figure>)}
    </div>
    <dialog ref={dialogRef} aria-label={name} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); step(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); } }} className="m-auto max-h-[94dvh] w-[min(94vw,1200px)] max-w-none overflow-y-auto rounded-2xl border border-neutral-700 bg-surface-dark p-3 text-white backdrop:bg-black/85 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3"><p className="text-sm">{photo.caption}</p><button type="button" aria-label="Close project gallery" onClick={() => dialogRef.current?.close()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><X className="h-5 w-5" /></button></div>
      <div className="relative h-[60dvh] min-h-48"><Image src={photo.src} alt={photo.alt} fill sizes="94vw" className="object-contain" /></div>
      <div className="mt-4 flex items-center justify-between gap-4"><button type="button" aria-label="Previous gallery image" onClick={() => step(-1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><ArrowLeft className="h-4 w-4" /></button><span aria-live="polite" className="text-xs text-neutral-300">{active + 1} / {photos.length}</span><button type="button" aria-label="Next gallery image" onClick={() => step(1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"><ArrowRight className="h-4 w-4" /></button></div>
    </dialog>
  </>;
}
