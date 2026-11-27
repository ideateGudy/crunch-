"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImageLightbox, type LightboxImage } from "@/components/ImageLightbox";

export interface FullscreenImageButtonProps {
  images: LightboxImage[];
  initialIndex?: number;
  title: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
}

export function FullscreenImageButton({
  images,
  initialIndex = 0,
  title,
  sizes,
  className = "",
  imageClassName = "",
  children,
}: FullscreenImageButtonProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(initialIndex);

  const preview = images[initialIndex] ?? images[0];
  if (!preview) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(initialIndex);
          setOpen(true);
        }}
        aria-label={`Open ${title} photo in fullscreen`}
        className={`group relative block w-full overflow-hidden text-left ${className}`}
      >
        <Image
          src={preview.src}
          alt={preview.alt}
          fill
          sizes={sizes}
          className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${imageClassName}`}
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-band/75 text-band-ink opacity-90"
        >
          <Expand className="h-4 w-4" strokeWidth={1.75} />
        </span>
        {children}
      </button>

      {open && (
        <ImageLightbox
          images={images}
          index={index}
          title={title}
          onIndexChange={setIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
