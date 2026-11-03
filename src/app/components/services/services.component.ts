import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { SERVICES_DATA } from '../../data/portfolio.data';
import { Service } from '../../models/portfolio.models';

interface VisualService extends Service {
  image: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="py-24 md:py-32 border-b border-white/[0.08] relative overflow-hidden">
      
      <!-- 02: RECOGNIZABLE EDITORIAL BACKGROUND NUMERAL (8% Opacity, Left-Aligned) -->
      <div 
        class="section-watermark-number top-6 left-6 sm:left-14 md:left-20"
        [style.transform]="'translateY(' + (parallaxOffset() - 3200) * 0.12 + 'px)'"
      >
        04
      </div>

      <!-- 03: UNIQUE ARCHITECTURAL BACKGROUND PATTERN (Drawing Sheet Graphic Stamps & Modular Grids) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-35">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <!-- Drafting Sheet Border Grid -->
          <rect x="3%" y="20" width="94%" height="90%" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
          
          <!-- Architectural Detail Markings -->
          <circle cx="95%" cy="120" r="40" fill="none" stroke="rgba(197,168,128,0.07)" stroke-width="1" stroke-dasharray="4,6"/>
          <line x1="95%" y1="70" x2="95%" y2="170" stroke="rgba(197,168,128,0.08)" stroke-width="1"/>
          
          <!-- Title Block Stamp -->
          <text x="5%" y="95%" fill="rgba(197,168,128,0.3)" font-family="monospace" font-size="9">
            SHEET D-104 // DELIVERABLE SPECIFICATIONS // REVISION: 02 // SCALE: N.T.S.
          </text>
        </svg>
      </div>

      <!-- Architectural Crosshairs -->
      <div class="cad-crosshair top-10 left-6"></div>
      <div class="cad-crosshair bottom-10 right-6"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Section Header Row -->
        <div class="max-w-4xl mb-14">
          <div class="flex items-center gap-3 mb-3">
            <div class="section-label">
              [ 04 // STUDIO DELIVERABLES &amp; CAPABILITIES ]
            </div>
            <span class="hidden sm:inline-flex cad-tech-stamp">
              SPECIFICATION PACKAGES
            </span>
          </div>

          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#f5f5f7] tracking-tight-custom mb-4 font-display">
            Architectural Studio Deliverables
          </h2>
          <p class="text-sm sm:text-base text-[#9aa0ae] max-w-2xl font-normal leading-relaxed">
            Six standardized studio deliverable packages Rahul produces for interior design practices, architectural principals, and on-site contractors.
          </p>
        </div>

        <!-- 6 Premium Studio Visual Capability Cards Grid with Asymmetric Accents -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <div 
            *ngFor="let s of visualServices; let i = index"
            class="premium-card group flex flex-col justify-between border-white/[0.1] hover:border-[#c5a880]/50 transition-all duration-300"
            data-cursor="INSPECT"
          >
            <div>
              <!-- Relevant Architectural Image Header with Zoom Microinteraction -->
              <div class="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/[0.08]">
                <img 
                  [src]="s.image" 
                  [alt]="s.title"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 block"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#07080a]/90 via-transparent to-black/30 pointer-events-none"></div>

                <!-- Deliverable Index & Status Pill -->
                <div class="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span class="bg-[#07080a]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[#c5a880] border border-white/10 font-bold">
                    DELIVERABLE 0{{ i + 1 }}
                  </span>
                </div>

                <div class="absolute top-3.5 right-3.5 bg-emerald-500/10 text-emerald-400 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/20 text-[10px] font-mono">
                  {{ s.turnaround }}
                </div>

                <div class="absolute bottom-3 left-3.5 right-3.5">
                  <span class="text-[10px] font-mono text-[#e2cfb6] uppercase tracking-wider block">
                    {{ s.subtitle }}
                  </span>
                </div>
              </div>

              <!-- Content Body -->
              <div class="p-6">
                <!-- Title -->
                <h3 class="text-xl font-bold text-white tracking-tight-custom font-display mb-2 group-hover:text-[#c5a880] transition-colors">
                  {{ s.title }}
                </h3>

                <!-- Description -->
                <p class="text-xs sm:text-sm text-[#9aa0ae] leading-relaxed mb-5">
                  {{ s.description }}
                </p>

                <!-- Package Deliverables List -->
                <div class="space-y-2 mb-6 p-3.5 rounded bg-white/[0.02] border border-white/[0.06]">
                  <div class="text-[10px] font-mono text-[#c5a880] uppercase tracking-wider mb-2 font-bold">
                    Package Inclusions:
                  </div>
                  <div *ngFor="let d of s.deliverables" class="flex items-start gap-2 text-xs text-[#d1d5db]">
                    <span class="text-[#10b981] font-bold">&check;</span>
                    <span>{{ d }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Software Tools Footer Strip -->
            <div class="px-6 py-4 border-t border-white/[0.06] bg-[#07080a]/50 font-mono text-[11px] text-[#9aa0ae] flex flex-wrap items-center justify-between gap-2">
              <span class="text-white font-medium">Software:</span>
              <div class="flex flex-wrap gap-1">
                <span *ngFor="let tool of s.software" class="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06] text-[10px]">
                  {{ tool }}
                </span>
              </div>
            </div>

          </div>
        </div>

        <!-- Studio Collaboration Notice -->
        <div class="mt-12 p-6 sm:p-8 rounded-2xl bg-[#090b10] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-[#9aa0ae]">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-[#10b981] animate-pulse"></span>
            <div>
              <div class="text-white font-bold font-sans text-sm">Millimeter Zero-Error Architectural Standards</div>
              <div class="text-[#7e879b] text-xs mt-0.5">All 2D drawings aligned with on-site carpentry joinery &amp; electrical coordination.</div>
            </div>
          </div>
          <a 
            href="assets/docs/Rahul-Swami-Resume.pdf" 
            target="_blank" 
            download="Rahul-Swami-Resume.pdf"
            class="btn-primary-action text-xs px-5 py-2.5 shrink-0"
            data-cursor="DOWNLOAD"
          >
            <span>Review Full Resume &amp; Credentials</span>
            <span>&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  `,
  styles: [],
})
export class ServicesComponent {
  services = SERVICES_DATA;
  parallaxOffset = signal(0);
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Real project visual representations for each of the 6 core studio competencies
  visualServices: VisualService[] = [
    {
      ...this.services[0],
      image: 'assets/projects/rahul-work/page-01.jpg', // 3D Photorealistic Rendering (Corona 4K)
    },
    {
      ...this.services[1],
      image: 'assets/projects/rahul-work/page-08.jpg', // Master Bedroom Suite Architecture
    },
    {
      ...this.services[2],
      image: 'assets/projects/rahul-work/page-27.jpg', // Custom Modular Wardrobe & Vanity Detailing
    },
    {
      ...this.services[3],
      image: 'assets/projects/rahul-work/page-13.jpg', // Modular Kitchen Architecture & Gola Profiles
    },
    {
      ...this.services[4],
      image: 'assets/projects/rahul-work/page-06.jpg', // Feature Wall & Media Unit Architecture
    },
    {
      ...this.services[5],
      image: 'assets/drawings/cad-bedroom-elevation.svg', // 2D Technical Working Drawings (AutoCAD)
    },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.parallaxOffset.set(window.scrollY);
  }
}
