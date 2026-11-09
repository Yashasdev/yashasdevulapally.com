"use client";
import Image from "next/image";
import { useRef, useState } from "react";
type Photo = { src: string; alt: string; caption: string };
export function PhotoGallery({
  photos,
  compact = false,
}: {
  photos: Photo[];
  compact?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Photo>(photos[0]);
  return (
    <>
      <div
        className={`photo-gallery${compact ? " photo-gallery-compact" : ""}`}
      >
        {photos.map((photo) => (
          <figure key={photo.src}>
            <button
              type="button"
              onClick={() => {
                setSelected(photo);
                dialog.current?.showModal();
              }}
              aria-label={`View photo: ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={600}
                sizes={
                  compact
                    ? "(max-width: 600px) 130px, 160px"
                    : "(max-width: 600px) 30vw, 300px"
                }
              />
            </button>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label={selected.caption}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="photo-close"
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close photo"
        >
          ×
        </button>
        {/* Original photo preserves detail in the viewer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={selected.src} alt={selected.alt} />
        <p>{selected.caption}</p>
      </dialog>
    </>
  );
}
