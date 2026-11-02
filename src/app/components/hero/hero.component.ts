import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

interface HeroSlide {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  specs: string;
  location: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="pt-32 pb-16 md:pt-40 md:pb-24 hairline-bottom">
      <div class="editorial-container">
        
        <!-- Top Editorial Meta Line -->
        <div class="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#71717a] mb-8 pb-4 hairline-bottom">
          <div class="flex items-center gap-2">
            <span class="text-white font-medium">CAMARA INTERIORS</span>
            <span>&bull;</span>
            <span>SECTOR 63, NOIDA</span>
            <span>&bull;</span>
            <span>NEW DELHI</span>
          </div>
          <div class="flex items-center gap-2">
            <span>DISCIPLINE:</span>
            <span class="text-[#a1a1aa]">3D VISUALIZATION &bull; INTERIOR DESIGN &bull; AUTOCAD</span>
          </div>
        </div>

        <!-- Main Headline -->
        <div class="max-w-5xl mb-12">
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight-custom leading-[1.05] mb-8">
            Spaces rendered with photographic discipline.
          </h1>
          <p class="text-base sm:text-xl text-[#a1a1aa] font-normal leading-relaxed max-w-3xl">
            Rahul Swami is an Interior Designer and 3D Visualizer with 
            <span class="text-white font-medium">2 years of studio practice</span> 
            across <em class="text-white not-italic">Camara Interiors</em> and <em class="text-white not-italic">Ettore Interior</em>. 
            Crafting high-definition 3D residential models in 
            <strong class="text-white font-medium">3ds Max &amp; Corona Renderer</strong>, 
            directly paired with on-site <strong class="text-white font-medium">AutoCAD 2D working drawings</strong>.
          </p>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap items-center gap-3 mb-16">
          <a href="#works" class="btn-cinema">
            <span>Explore Selected Works</span>
            <span class="font-mono text-xs">&darr;</span>
          </a>

          <a 
            href="assets/docs/Rahul-Swami-Resume.pdf" 
            target="_blank" 
            download="Rahul-Swami-Resume.pdf"
            class="btn-cinema-ghost"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Resume (PDF)</span>
          </a>

          <a 
            [href]="contact.whatsappUrl"
            target="_blank"
            class="btn-cinema-ghost"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>WhatsApp (+91 9717379245)</span>
          </a>
        </div>

        <!-- Cinematic Large Featured Spotlight (Inspired by Filmmaker Home) -->
        <div class="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0f] group">
          <!-- Image Viewport -->
          <div class="relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden bg-black">
            <img 
              [src]="activeSlide().image" 
              [alt]="activeSlide().title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

            <!-- Top Overlay Meta -->
            <div class="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-xs font-mono text-white/80">
              <div class="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                FEATURED WORK &bull; {{ activeSlide().number }} / 04
              </div>
              <div class="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 hidden sm:block">
                {{ activeSlide().specs }}
              </div>
            </div>

            <!-- Bottom Caption & Selector -->
            <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span class="font-mono text-xs text-[#a1a1aa] uppercase tracking-wider block mb-1">
                  {{ activeSlide().category }} &bull; {{ activeSlide().location }}
                </span>
                <h3 class="text-xl sm:text-3xl font-bold text-white tracking-tight-custom">
                  {{ activeSlide().title }}
                </h3>
              </div>

              <!-- Quick Slide Jump Tabs -->
              <div class="flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-white/10 self-start sm:self-auto">
                <button 
                  *ngFor="let s of slides; let i = index"
                  type="button"
                  (click)="activeSlideIndex.set(i)"
                  [class.bg-white]="activeSlideIndex() === i"
                  [class.text-black]="activeSlideIndex() === i"
                  [class.text-[#71717a]]="activeSlideIndex() !== i"
                  class="font-mono text-xs px-2.5 py-1 rounded-full transition-all cursor-pointer hover:text-white"
                >
                  {{ s.number }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Metric Grid (Minimalist Framer Style) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 hairline-top font-mono">
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white">2+ Years</div>
            <div class="text-xs text-[#71717a] mt-1">Studio Practice</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white">50 Renders</div>
            <div class="text-xs text-[#71717a] mt-1">Corona Real Works</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white">100% Precision</div>
            <div class="text-xs text-[#71717a] mt-1">AutoCAD Site Packages</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white">2 Studios</div>
            <div class="text-xs text-[#71717a] mt-1">Camara &amp; Ettore</div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [],
})
export class HeroComponent {
  contact = CONTACT_INFO;
  activeSlideIndex = signal(0);

  slides: HeroSlide[] = [
    {
      id: 'living',
      number: '01',
      title: 'The Opulent Arched TV & Living Lounge',
      category: 'Residential Interior',
      image: 'assets/projects/rahul-work/page-01.jpg',
      specs: 'Corona 11 · 3ds Max · AutoCAD',
      location: 'Camara Interiors · Noida',
    },
    {
      id: 'boiserie',
      number: '02',
      title: 'The Parisian Boiserie Master Suite',
      category: 'Master Bedroom',
      image: 'assets/projects/rahul-work/page-08.jpg',
      specs: 'Physical Cam 28mm · Cove 3000K',
      location: 'Sector 63, Noida',
    },
    {
      id: 'wardrobe',
      number: '03',
      title: 'Aura Tinted Glass Wardrobe & Vanity',
      category: 'Custom Millwork & Dressing',
      image: 'assets/projects/rahul-work/page-27.jpg',
      specs: 'Bronze Glass · PIR Sensor Lighting',
      location: 'Camara Interiors',
    },
    {
      id: 'villa',
      number: '04',
      title: 'Khanna\'s Villa 3-Storey Luxury Facade',
      category: 'Exterior Architecture',
      image: 'assets/projects/rahul-work/page-30.jpg',
      specs: 'Stone Cladding · Pergola Terrace',
      location: 'New Delhi / NCR',
    },
  ];

  activeSlide(): HeroSlide {
    return this.slides[this.activeSlideIndex()];
  }
}
