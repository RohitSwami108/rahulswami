import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
    <section id="services" class="py-24 md:py-32 border-b border-white/[0.07] relative overflow-hidden">
      
      <!-- Section Watermark -->
      <div class="section-watermark-number">04</div>

      <!-- Architectural Crosshairs -->
      <div class="cad-crosshair top-10 left-6"></div>
      <div class="cad-crosshair bottom-10 right-6"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Section Header Row -->
        <div class="max-w-4xl mb-14">
          <div class="section-label mb-3">
            [ 04 // STUDIO DELIVERABLES &amp; CAPABILITIES ]
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#f5f5f7] tracking-tight-custom mb-4 font-display">
            Architectural Studio Deliverables
          </h2>
          <p class="text-sm sm:text-base text-[#9aa0ae] max-w-2xl font-normal leading-relaxed">
            Six standardized studio deliverable packages Rahul produces for interior design practices, architectural principals, and on-site contractors.
          </p>
        </div>

        <!-- 6 Premium Studio Visual Capability Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <div 
            *ngFor="let s of visualServices; let i = index"
            class="premium-card group flex flex-col justify-between border-white/[0.1] hover:border-[#c5a880]/40 transition-all duration-300"
          >
            <div>
              <!-- Relevant Architectural Image Header -->
              <div class="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/[0.08]">
                <img 
                  [src]="s.image" 
                  [alt]="s.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#07080a]/90 via-transparent to-black/30 pointer-events-none"></div>

                <!-- Deliverable Index & Status Pill -->
                <div class="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span class="bg-[#07080a]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[#c5a880] border border-white/10">
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
              <span class="text-white font-medium text-[10px]">TOOL PIPELINE:</span>
              <div class="flex flex-wrap gap-1">
                <span *ngFor="let tool of s.software" class="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.07] text-[10px]">
                  {{ tool }}
                </span>
              </div>
            </div>

          </div>
        </div>

        <!-- Studio Collaboration Assurance Note -->
        <div class="mt-12 p-6 sm:p-7 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9aa0ae]">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>All drawing sets and renders adhere to architectural execution standards with zero-error millimeter tolerances.</span>
          </div>
          <a 
            href="assets/docs/Rahul-Swami-Resume.pdf" 
            target="_blank" 
            download="Rahul-Swami-Resume.pdf"
            class="text-[#c5a880] hover:text-white flex items-center gap-1.5 font-sans font-medium text-xs shrink-0 underline decoration-[#c5a880]/40 underline-offset-4"
          >
            <span>Review Resume for Studio Hiring</span>
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

  visualServices: VisualService[] = [
    {
      ...this.services[0],
      image: 'assets/projects/rahul-work/page-01.jpg',
    },
    {
      ...this.services[1],
      image: 'assets/projects/bedroom-luxury-01.jpg',
    },
    {
      ...this.services[2],
      image: 'assets/projects/wardrobe-walkin-01.jpg',
    },
    {
      ...this.services[3],
      image: 'assets/projects/rahul-work/page-16.jpg',
    },
    {
      ...this.services[4],
      image: 'assets/projects/living-tv-wall-01.jpg',
    },
    {
      ...this.services[5],
      image: 'assets/drawings/cad-bedroom-elevation.svg',
    },
  ];
}
