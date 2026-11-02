import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SERVICES_DATA } from '../../data/portfolio.data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="py-20 md:py-28 border-b border-white/[0.08] relative">
      <div class="portfolio-container">
        
        <!-- Section Header (Unified Layout) -->
        <div class="max-w-4xl mb-14">
          <div class="section-label">
            [ 04 // STUDIO DELIVERABLES &amp; CORE COMPETENCIES ]
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight-custom mb-4">
            Professional Studio Deliverables
          </h2>
          <p class="text-base sm:text-lg text-[#9ca3af] max-w-2xl font-normal leading-relaxed">
            Standard architectural packages, 3D visualization assets, and technical drawing sets Rahul produces for interior design studios, architects, and on-site contractors.
          </p>
        </div>

        <!-- Cohesive Deliverables Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            *ngFor="let s of services; let i = index"
            class="premium-card p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <!-- Deliverable Index & Software Pill -->
              <div class="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08] font-mono text-xs">
                <span class="text-[#6b7280]">DELIVERABLE 0{{ i + 1 }}</span>
                <span class="text-[#10b981] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                  Studio Quality
                </span>
              </div>

              <!-- Title & Subtitle -->
              <h3 class="text-xl font-bold text-white tracking-tight-custom mb-1">
                {{ s.title }}
              </h3>
              <div class="font-mono text-xs text-[#9ca3af] mb-4">
                {{ s.subtitle }}
              </div>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-5">
                {{ s.description }}
              </p>

              <!-- Deliverable Items List -->
              <div class="space-y-2 mb-6">
                <div class="text-[11px] font-mono text-white/80 uppercase tracking-wider mb-1">
                  Deliverable Package Includes:
                </div>
                <div *ngFor="let d of s.deliverables" class="flex items-start gap-2 text-xs text-[#d1d5db]">
                  <span class="text-[#10b981] mt-0.5">&check;</span>
                  <span>{{ d }}</span>
                </div>
              </div>
            </div>

            <!-- Software Tools Footer Strip -->
            <div class="pt-4 border-t border-white/[0.06] font-mono text-[11px] text-[#9ca3af] flex flex-wrap items-center justify-between gap-2">
              <span class="text-white font-medium">Software:</span>
              <div class="flex flex-wrap gap-1">
                <span *ngFor="let tool of s.software" class="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  {{ tool }}
                </span>
              </div>
            </div>

          </div>
        </div>

        <!-- Studio Collaboration Note -->
        <div class="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9ca3af]">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
            <span>All deliverables produced to industry execution standards with zero-error tolerances.</span>
          </div>
          <a 
            href="assets/docs/Rahul-Swami-Resume.pdf" 
            target="_blank" 
            download="Rahul-Swami-Resume.pdf"
            class="text-white hover:underline flex items-center gap-1 font-sans font-medium text-xs shrink-0"
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
}
