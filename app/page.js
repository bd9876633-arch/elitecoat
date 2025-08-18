'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

/* ---- Event helper: raportează în GA4 (dacă e activ) + Vercel Analytics ---- */
const trackEvent = (name, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
  }
  if (typeof window !== 'undefined' && window.va && typeof window.va.track === 'function') {
    window.va.track(name, params);
  }
};

export default function Home() {
  /* -------- HERO: alegere random doar pe client (fără hydration mismatch) -------- */
  const heroImages = ['/images/1.jpg','/images/2.jpg','/images/3.jpg','/images/4.jpg','/images/5.jpg','/images/6.jpg'];
  const [mounted, setMounted] = useState(false);
  const [heroSrc, setHeroSrc] = useState(heroImages[0]);
  useEffect(() => {
    setMounted(true);
    setHeroSrc(heroImages[Math.floor(Math.random() * heroImages.length)]);
  }, []);

  /* ---------------- GALLERY (filtre + lightbox) ---------------- */
  const totalImages = 60; // ajustează după câte poze ai în /public/images/
  const allImages = useMemo(
    () => Array.from({ length: totalImages }, (_, i) => `/images/${i + 1}.jpg`),
    [totalImages]
  );

  const categoryMap = {
    All:        [1, totalImages],
    Plastering: [1, 12],
    Drylining:  [13, 24],
    Decorating: [25, 36],
    Tiling:     [37, 48],
    Flooring:   [49, 54],
    Paving:     [55, 60],
  };
  const categories = Object.keys(categoryMap);
  const [activeCat, setActiveCat] = useState('All');
  const galleryImages = useMemo(() => {
    const [start, end] = categoryMap[activeCat];
    return allImages.slice(start - 1, end); // slice end-exclusiv
  }, [activeCat, allImages]);

  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="min-h-screen scroll-smooth bg-white text-gray-900">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between">
            <a href="#home" className="font-semibold tracking-tight">
              EliteCoat Interiors Ltd
            </a>
            <div className="hidden gap-6 md:flex text-sm">
              <a href="#services" className="hover:text-gray-700">Services</a>
              <a href="#about" className="hover:text-gray-700">About</a>
              <a href="#process" className="hover:text-gray-700">Process</a>
              <a href="#gallery" className="hover:text-gray-700">Gallery</a>
              <a href="#contact" className="hover:text-gray-700">Contact</a>
            </div>
            <a
              href="tel:+447843174557"
              onClick={() => trackEvent('call_click', { location: 'nav' })}
              className="hidden md:inline-flex rounded-2xl bg-gray-900 px-4 py-2 text-white shadow-sm hover:bg-gray-800"
            >
              Get a Quote
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-500">
              Craft • Detail • Reliability
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              High-quality Plastering &amp; Interiors
            </h1>
            <p className="mt-4 max-w-xl text-lg text-gray-600">
              Skim coat (Multi-Finish), plasterboard/drylining, painting &amp; decorating
              (including wallpaper), wall &amp; floor tiling, wood/laminate flooring and
              paving. Clean, punctual and finished to a smooth, durable standard – ready for
              decorating.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="tel:+447843174557"
                onClick={() => trackEvent('call_click', { location: 'hero' })}
                className="inline-flex items-center rounded-2xl bg-gray-900 px-5 py-3 text-white shadow-sm hover:bg-gray-800"
              >
                Request a quotation
              </a>
              <a
                href="#services"
                className="inline-flex items-center rounded-2xl border px-5 py-3 hover:bg-gray-50"
              >
                View services
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Note: For an accurate quotation a site visit is required to assess
              condition and measurements.
            </p>
          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-2xl border shadow-sm md:h-[26rem]">
            {mounted ? (
              <Image src={heroSrc} alt="EliteCoat Interiors project" fill priority className="object-cover" />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
              Services
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">What we do</h2>
            <p className="mt-3 text-gray-600">
              Professional finishes using British Gypsum Thistle Multi-Finish, quality
              boards and materials, and tidy workmanship.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title="Skim Coat Plastering"
              bullets={[
                'Thistle Multi-Finish for smooth walls & ceilings',
                'Preparation, repairs, two-coat skim where needed',
                'Ready for painting/decorating',
              ]}
            />
            <ServiceCard
              title="Plasterboard / Drylining (Rigips)"
              bullets={[
                'Stud walls, partitions, ceilings',
                'Moisture & sound-rated boards available',
                'Ready for skimming or tape & joint',
              ]}
            />
            <ServiceCard
              title="Wall & Floor Tiling"
              bullets={[
                'Ceramic, porcelain, natural stone',
                'Surface preparation, adhesive, grouting',
                'Bathrooms, kitchens, splashbacks, floors',
              ]}
            />
            <ServiceCard
              title="Wood & Laminate Flooring"
              bullets={[
                'Subfloor preparation, underlay, precise cutting',
                'Laminate, engineered & solid wood',
                'Clean finish with trims & thresholds',
              ]}
            />
            <ServiceCard
              title="Block & Patio Paving"
              bullets={[
                'Driveways, patios, garden paths',
                'Ground prep, levelling, laying blocks/slabs',
                'Durable, attractive finish',
              ]}
            />
            <ServiceCard
              title="Painting & Decorating (incl. Wallpaper)"
              bullets={[
                'Mist coat on new plaster; priming and sealing',
                'Walls, ceilings and woodwork – emulsion, satin, gloss',
                'Feature walls, colour matching and durable finishes',
                'Wallpaper hanging: lining paper, patterned and murals',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">About Us</h2>
            <p className="mt-4 text-gray-600">
              EliteCoat Interiors Ltd provides reliable interior finishes across the
              West Midlands and beyond. We focus on quality, cleanliness and clear
              communication. Fully insured. Free quotations after site visit.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Process</h2>
          </div>
          <ol className="mx-auto max-w-2xl list-decimal list-inside space-y-4 text-gray-700">
            <li>Site visit to check surfaces, measurements and requirements</li>
            <li>Free quotation based on project size and materials</li>
            <li>Preparation and protection of surrounding areas</li>
            <li>Professional installation / plastering / tiling / flooring</li>
            <li>Clean-up and final handover</li>
          </ol>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Gallery</h2>
            <p className="mt-3 text-gray-600">Selected projects by EliteCoat Interiors Ltd.</p>
          </div>

          {/* filtre */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const active = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={[
                    'rounded-full border px-3 py-1 text-sm transition',
                    active ? 'bg-gray-900 text-white border-gray-900' : 'hover:bg-gray-100',
                  ].join(' ')}
                  aria-pressed={active}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* grid imagini */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((src, i) => (
              <button
                key={`${activeCat}-${i}`}
                onClick={() => setLightbox(src)}
                className="relative h-40 w-full overflow-hidden rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                title="View larger"
              >
                <Image src={src} alt={`Project ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* lightbox */}
        {lightbox && (
          <div
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative max-h-[90vh] max-w-5xl">
              <Image
                src={lightbox}
                alt="Project large"
                width={1920}
                height={1280}
                className="h-auto w-full rounded-xl object-contain"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Contact Us</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-gray-700">
              <p><span className="font-medium">Area:</span> Wolverhampton</p>
              <p>
                <span className="font-medium">Phone:</span>{' '}
                <a
                  href="tel:+447843174557"
                  onClick={() => trackEvent('call_click', { location: 'contact' })}
                  className="underline hover:no-underline"
                >
                  07843&nbsp;174&nbsp;557
                </a>
              </p>
              <p>
                <span className="font-medium">Email:</span>{' '}
                <a href="mailto:elitecoatinteriors@gmail.com" className="underline hover:no-underline">
                  elitecoatinteriors@gmail.com
                </a>
              </p>
              <p className="text-sm text-gray-500">
                To provide an accurate quotation we need to visit the property and inspect the area first.
              </p>
              <a
                href="https://wa.me/447843174557"
                onClick={() => trackEvent('whatsapp_click', { location: 'contact' })}
                className="inline-flex items-center rounded-2xl border px-4 py-2 text-sm hover:bg-gray-50"
              >
                WhatsApp us
              </a>
            </div>

            {/* Formspree */}
            <form
              action="https://formspree.io/f/xpwleend"
              method="POST"
              onSubmit={() => trackEvent('form_submit', { source: 'contact_form' })}
              className="space-y-4 rounded-2xl border p-4 md:p-6"
            >
              <input name="name" type="text" placeholder="Name" className="w-full rounded-lg border px-3 py-2" required />
              <input name="email" type="email" placeholder="Email" className="w-full rounded-lg border px-3 py-2" required />
              <input name="phone" type="tel" placeholder="Phone (optional)" className="w-full rounded-lg border px-3 py-2" />
              <textarea name="message" rows={4} placeholder="Tell us about your project…" className="w-full rounded-lg border px-3 py-2" required />
              <input type="hidden" name="_subject" value="New enquiry from EliteCoat website" />
              <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
              <button type="submit" className="w-full rounded-2xl bg-gray-900 px-5 py-3 text-white hover:bg-gray-800">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} EliteCoat Interiors Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* ---- Card reutilizabil ---- */
function ServiceCard({ title, bullets }) {
  return (
    <div className="rounded-2xl border shadow-sm">
      <div className="p-6">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-green-500" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
