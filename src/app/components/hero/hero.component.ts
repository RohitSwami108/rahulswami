import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

interface HeroSlide {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  specs: string;
  location: string;
  software: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/[0.08] relative overflow-hidden">
      <!-- Subtle Ambient Lighting Glow -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-b from-white/[0.04] to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Top Editorial Meta Line -->
        <div class="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#9ca3af] mb-8 pb-4 border-b border-white/[0.08]">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 text-white font-medium bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
              <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span>SKETCH SPACES</span>
            </span>
            <span class="text-[#6b7280]">&bull;</span>
            <span class="text-[#d1d5db]">CURRENT STUDIO (RECENTLY JOINED)</span>
            <span class="text-[#6b7280] hidden sm:inline">&bull;</span>
            <span class="text-[#9ca3af] hidden sm:inline">PREV: CAMARA &amp; ETTORE</span>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[#6b7280]">PORTFOLIO CONTEXT:</span>
            <span class="text-white font-medium">ACCOMPANYING RESUME FOR STUDIO REVIEW</span>
          </div>
        </div>

        <!-- Main Headline & Subtitle -->
        <div class="max-w-5xl mb-12">
          <div class="section-label">
            [ 00 // ARCHITECTURAL VISUALIZER &amp; DESIGNER ]
          </div>
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight-custom leading-[1.06] mb-8">
            Precision spaces crafted with photographic discipline.
          </h1>
          <p class="text-base sm:text-xl text-[#9ca3af] font-normal leading-relaxed max-w-3xl">
            Rahul Swami is an Interior Designer and 3D Visualizer currently working at 
            <span class="text-white font-semibold">Sketch Spaces</span>, with 2+ years of prior studio practice across 
            <em class="text-white not-italic font-medium">Camara Interiors</em> and <em class="text-white not-italic font-medium">Ettore Interior</em>. 
            Crafting photorealistic 3D residential environments in 
            <strong class="text-white font-semibold">3ds Max &amp; Corona Renderer 11</strong>, 
            backed by millimeter-accurate on-site <strong class="text-white font-semibold">AutoCAD 2D working drawings</strong>.
          </p>
        </div>

        <!-- Action CTAs -->
        <div class="flex flex-wrap items-center gap-3.5 mb-16">
          <a href="#works" class="btn-primary-action">
            <span>Explore Selected Works</span>
            <span class="font-mono text-xs">&darr;</span>
          </a>

          <a 
            href="assets/docs/Rahul-Swami-Resume.pdf" 
            target="_blank" 
            download="Rahul-Swami-Resume.pdf"
            class="btn-ghost-action"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Download Official Resume (PDF)</span>
          </a>

          <a 
            href="#visualizer-studio" 
            class="btn-ghost-action"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
            <span>Inspect 2D vs 3D Accuracy</span>
          </a>

          <a 
            [href]="contact.whatsappUrl"
            target="_blank"
            class="btn-ghost-action text-[#34d399] border-emerald-500/20 hover:border-emerald-500/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Direct WhatsApp Inquiry</span>
          </a>
        </div>

        <!-- Cinematic Large Featured Spotlight (Interactive Angle Switcher) -->
        <div class="premium-card group">
          <!-- Image Viewport -->
          <div class="relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden bg-black">
            <img 
              [src]="activeSlide().image" 
              [alt]="activeSlide().title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none"></div>

            <!-- Top Overlay Camera & Studio Meta -->
            <div class="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-xs font-mono text-white/90">
              <div class="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#10b981]"></span>
                <span>AUTHENTIC RENDER &bull; {{ activeSlide().number }} / 04</span>
              </div>
              <div class="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 hidden sm:flex items-center gap-2 text-[#9ca3af]">
                <span>{{ activeSlide().specs }}</span>
                <span>&bull;</span>
                <span class="text-white">{{ activeSlide().software }}</span>
              </div>
            </div>

            <!-- Bottom Caption & Quick Angle Jump Tabs -->
            <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span class="font-mono text-xs text-[#9ca3af] uppercase tracking-wider block mb-1">
                  {{ activeSlide().category }} &bull; {{ activeSlide().location }}
                </span>
                <h3 class="text-xl sm:text-3xl font-bold text-white tracking-tight-custom">
                  {{ activeSlide().title }}
                </h3>
              </div>

              <!-- Quick Perspective Jump Buttons -->
              <div class="flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 rounded-full border border-white/10 self-start sm:self-auto">
                <span class="text-[11px] font-mono text-[#6b7280] px-2 hidden md:inline">CAM VIEW:</span>
                <button 
                  *ngFor="let s of slides; let i = index"
                  type="button"
                  (click)="activeSlideIndex.set(i)"
                  [class.bg-white]="activeSlideIndex() === i"
                  [class.text-black]="activeSlideIndex() === i"
                  [class.text-[#9ca3af]]="activeSlideIndex() !== i"
                  class="font-mono text-xs px-3 py-1 rounded-full transition-all cursor-pointer hover:text-white"
                >
                  {{ s.number }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Metric Grid (Minimalist Architectural Facts) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/[0.08] font-mono">
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white">2+ Years</div>
            <div class="text-xs text-[#9ca3af] mt-1">Studio Practice</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white">50 Renders</div>
            <div class="text-xs text-[#9ca3af] mt-1">Corona 11 Real Works</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white">100% Precision</div>
            <div class="text-xs text-[#9ca3af] mt-1">AutoCAD Working Drawings</div>
          </div>
          <div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white">3 Studios</div>
            <div class="text-xs text-[#9ca3af] mt-1">Sketch Spaces &bull; Camara &bull; Ettore</div>
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
      id: 'slide-01',
      number: 'CAM_01',
      title: 'Luxury Master Bedroom w/ Fluted Wall & Curved Wingback',
      category: 'Master Bedroom Suite',
      image: 'assets/projects/rahul-work/page-01.jpg',
      specs: 'Corona 11.2 • 3000K Warm Cove • 24mm Lens',
      location: 'Camara Interiors • Sector 63, Noida',
      software: '3ds Max 2024 / Corona 11',
    },
    {
      id: 'slide-02',
      number: 'CAM_02',
      title: 'Curved Asymmetrical Headboard & Bedside Pendants',
      category: 'Master Suite Perspective',
      image: 'assets/projects/rahul-work/page-03.jpg',
      specs: 'Corona Sun & Sky + IES Downlights',
      location: 'Camara Interiors • Sector 63, Noida',
      software: '3ds Max 2024 / Corona 11',
    },
    {
      id: 'slide-03',
      number: 'CAM_03',
      title: 'Double-Height Living Lounge & Curved Floating Console',
      category: 'Living Lounge & Media Wall',
      image: 'assets/projects/rahul-work/page-06.jpg',
      specs: 'Volumetric Daylight + Concealed LEDs',
      location: 'Camara Interiors • Noida NCR',
      software: '3ds Max 2024 / Corona 11',
    },
    {
      id: 'slide-04',
      number: 'CAM_04',
      title: "Khanna's Villa — 3-Storey Contemporary Facade",
      category: 'Exterior Villa Architecture',
      image: 'assets/projects/rahul-work/page-14.jpg',
      specs: 'Exterior Dusk Ambience • 4K UHD',
      location: 'Camara Interiors • NCR',
      software: '3ds Max 2024 / Corona 11',
    },
  ];

  activeSlide = () => this.slides[this.activeSlideIndex()];
}
