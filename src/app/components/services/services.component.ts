import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SERVICES_DATA } from '../../data/portfolio.data';
import { Service } from '../../models/portfolio.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="py-20 md:py-28 hairline-bottom">
      <div class="editorial-container">
        
        <!-- Header -->
        <div class="mb-14">
          <div class="font-mono text-xs text-[#71717a] uppercase tracking-widest mb-3">
            [ 03 // SERVICES &amp; DELIVERABLES ]
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight-custom mb-4">
            What I Deliver
          </h2>
          <p class="text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-normal leading-relaxed">
            From single-room 3D concept renders to complete architectural drawing sets for on-site fabrication.
          </p>
        </div>

        <!-- Clean Editorial List (Filmmaker Style) -->
        <div class="space-y-4">
          <div 
            *ngFor="let s of services; let i = index"
            class="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all group"
          >
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <!-- Service Number & Title (5 Cols) -->
              <div class="md:col-span-5">
                <div class="font-mono text-xs text-[#71717a] mb-1">
                  0{{ i + 1 }} // SERVICE
                </div>
                <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight-custom group-hover:text-white transition-colors">
                  {{ s.title }}
                </h3>
                <div class="font-mono text-xs text-[#a1a1aa] mt-0.5">
                  {{ s.subtitle }}
                </div>
              </div>

              <!-- Description & Deliverables (5 Cols) -->
              <div class="md:col-span-5 text-xs text-[#a1a1aa] leading-relaxed">
                <p class="mb-3">
                  {{ s.description }}
                </p>
                <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#71717a]">
                  <span *ngFor="let d of s.deliverables" class="bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">
                    {{ d }}
                  </span>
                </div>
              </div>

              <!-- Turnaround & CTA (2 Cols) -->
              <div class="md:col-span-2 flex flex-col md:items-end justify-center font-mono">
                <div class="text-[11px] text-[#71717a]">Turnaround:</div>
                <div class="text-xs text-white font-bold mb-3">{{ s.turnaround }}</div>
                <a 
                  href="#contact"
                  class="btn-cinema-ghost text-xs px-3.5 py-1.5"
                >
                  Inquire &rarr;
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [],
})
export class ServicesComponent {
  services = SERVICES_DATA;
  @Output() serviceSelected = new EventEmitter<string>();
}
