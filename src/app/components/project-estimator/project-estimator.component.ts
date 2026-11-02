import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

interface SpaceOption {
  id: string;
  name: string;
  icon: string;
  recommendedViews: number;
}

@Component({
  selector: 'app-project-estimator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="estimator" class="py-24 relative overflow-hidden bg-[#07090f]">
      <div class="container mx-auto relative z-10">
        
        <!-- Section Header -->
        <div class="flex flex-col items-center text-center mb-16">
          <div class="section-tag">
            Instant Project Scope &amp; Estimation
          </div>
          <h2 class="section-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Plan Your 3D Visualization or
            <span class="gold-gradient-text font-luxury block sm:inline">
              Interior Scope
            </span>
          </h2>
          <p class="section-desc mt-3">
            Select your space requirements below to instantly generate a tailored scope summary and connect directly with Rahul on WhatsApp or Email.
          </p>
        </div>

        <div class="glass-card max-w-4xl mx-auto p-6 sm:p-10 border-gold-glow">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            <!-- Controls (Left 7 Cols) -->
            <div class="md:col-span-7 flex flex-col gap-6">
              
              <!-- Step 1: Select Space Type -->
              <div>
                <label class="block text-xs font-mono uppercase tracking-wider text-[#e5c378] font-bold mb-3">
                  1. Select Space / Module
                </label>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button 
                    *ngFor="let space of spaceOptions"
                    type="button"
                    (click)="selectedSpace.set(space.id)"
                    [class.active-space]="selectedSpace() === space.id"
                    class="space-option-btn p-3 rounded-xl border border-white/10 text-left transition-all cursor-pointer"
                  >
                    <div class="text-xs font-bold text-white font-display">
                      {{ space.name }}
                    </div>
                  </button>
                </div>
              </div>

              <!-- Step 2: Render Views Slider -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="text-xs font-mono uppercase tracking-wider text-[#e5c378] font-bold">
                    2. 3D Render Views Needed
                  </label>
                  <span class="text-xs font-mono font-bold text-[#00f5d4] bg-[#00f5d4]/10 px-2.5 py-0.5 rounded-full">
                    {{ viewCount() }} {{ viewCount() === 1 ? 'Angle' : 'Angles' }}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="8" 
                  [value]="viewCount()" 
                  (input)="onViewCountChange($event)"
                  class="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                />
                <div class="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>1 View (Single Hero)</span>
                  <span>4 Views (Standard Room)</span>
                  <span>8+ Views (Full Space)</span>
                </div>
              </div>

              <!-- Step 3: Required Deliverables Checkboxes -->
              <div>
                <label class="block text-xs font-mono uppercase tracking-wider text-[#e5c378] font-bold mb-3">
                  3. Select Deliverables
                </label>
                <div class="space-y-2">
                  <label class="checkbox-card flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer">
                    <input 
                      type="checkbox" 
                      [checked]="include3d()" 
                      (change)="toggle3d()"
                      class="accent-[#c5a059] w-4 h-4 rounded cursor-pointer" 
                    />
                    <div class="text-xs text-slate-200">
                      <strong class="text-white block">4K Photorealistic Corona 3D Renders</strong>
                      Physical camera framing, PBR materials, custom furniture modeling.
                    </div>
                  </label>

                  <label class="checkbox-card flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer">
                    <input 
                      type="checkbox" 
                      [checked]="includeCad()" 
                      (change)="toggleCad()"
                      class="accent-[#c5a059] w-4 h-4 rounded cursor-pointer" 
                    />
                    <div class="text-xs text-slate-200">
                      <strong class="text-white block">AutoCAD 2D Working Drawings</strong>
                      Carpentry elevations, carcass sections, millimeter dimensions for site execution.
                    </div>
                  </label>

                  <label class="checkbox-card flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] cursor-pointer">
                    <input 
                      type="checkbox" 
                      [checked]="includeLighting()" 
                      (change)="toggleLighting()"
                      class="accent-[#c5a059] w-4 h-4 rounded cursor-pointer" 
                    />
                    <div class="text-xs text-slate-200">
                      <strong class="text-white block">Lighting &amp; False Ceiling Reflected Plan</strong>
                      Concealed 3000K coves, magnetic track locations, and day/night rendering simulation.
                    </div>
                  </label>
                </div>
              </div>

            </div>

            <!-- Summary / Instant Action (Right 5 Cols) -->
            <div class="md:col-span-5 flex flex-col justify-between bg-black/40 p-6 rounded-2xl border border-white/10">
              <div>
                <div class="flex items-center gap-2 mb-4">
                  <span class="w-2 h-2 rounded-full bg-[#00f5d4]"></span>
                  <span class="text-xs font-mono uppercase tracking-widest text-[#00f5d4] font-bold">
                    Project Scope Summary
                  </span>
                </div>

                <div class="space-y-3 pb-6 border-b border-white/10 text-xs">
                  <div class="flex justify-between">
                    <span class="text-slate-400">Target Space:</span>
                    <span class="text-white font-semibold font-display">{{ getSpaceName() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Render Views:</span>
                    <span class="text-[#e5c378] font-mono font-bold">{{ viewCount() }} Angles (4K)</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">AutoCAD 2D:</span>
                    <span class="text-white font-mono">{{ includeCad() ? 'Included' : 'Not Requested' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Lighting Simulation:</span>
                    <span class="text-white font-mono">{{ includeLighting() ? 'Included' : 'Standard' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Est. Studio Turnaround:</span>
                    <span class="text-[#00f5d4] font-mono font-bold">{{ estimatedTurnaround() }}</span>
                  </div>
                </div>

                <div class="mt-4 p-3 rounded-xl bg-white/[0.04] text-[11px] text-slate-400 leading-relaxed font-mono">
                  Direct connection with designer: no middlemen, immediate discussion, quick revisions.
                </div>
              </div>

              <!-- CTAs -->
              <div class="space-y-3 pt-6">
                <a 
                  [href]="generateWhatsAppUrl()" 
                  target="_blank"
                  class="w-full btn-primary text-xs py-3.5 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>Inquire via WhatsApp</span>
                </a>

                <a 
                  [href]="generateEmailUrl()"
                  class="w-full btn-secondary text-xs py-2.5 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <span>Inquire via Email</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .space-option-btn {
      background: rgba(255, 255, 255, 0.03);
    }
    .space-option-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(197, 160, 89, 0.3);
    }
    .active-space {
      background: rgba(197, 160, 89, 0.15) !important;
      border-color: var(--accent-gold) !important;
      box-shadow: 0 0 15px rgba(197, 160, 89, 0.25);
    }
    .checkbox-card:hover {
      border-color: rgba(197, 160, 89, 0.3);
    }
  `],
})
export class ProjectEstimatorComponent {
  contact = CONTACT_INFO;

  selectedSpace = signal('bedroom');
  viewCount = signal(3);
  include3d = signal(true);
  includeCad = signal(true);
  includeLighting = signal(true);

  spaceOptions: SpaceOption[] = [
    { id: 'bedroom', name: 'Master Bedroom', icon: 'bed', recommendedViews: 3 },
    { id: 'living', name: 'Living & TV Wall', icon: 'tv', recommendedViews: 4 },
    { id: 'wardrobe', name: 'Modular Wardrobe', icon: 'closet', recommendedViews: 2 },
    { id: 'ceiling', name: 'False Ceiling Plan', icon: 'sun', recommendedViews: 2 },
    { id: 'full-home', name: 'Full Residence', icon: 'home', recommendedViews: 6 },
    { id: 'commercial', name: 'Commercial Office', icon: 'building', recommendedViews: 4 },
  ];

  onViewCountChange(event: Event): void {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    this.viewCount.set(val);
  }

  toggle3d(): void {
    this.include3d.update((v) => !v);
  }

  toggleCad(): void {
    this.includeCad.update((v) => !v);
  }

  toggleLighting(): void {
    this.includeLighting.update((v) => !v);
  }

  getSpaceName(): string {
    const found = this.spaceOptions.find((s) => s.id === this.selectedSpace());
    return found ? found.name : 'Custom Space';
  }

  estimatedTurnaround(): string {
    const views = this.viewCount();
    if (views <= 2) return '2 - 3 Business Days';
    if (views <= 4) return '3 - 5 Business Days';
    return '5 - 7 Business Days';
  }

  generateWhatsAppUrl(): string {
    const text = `Hello Rahul, I would like to inquire about interior design / 3D visualization:
- Space: ${this.getSpaceName()}
- 3D Render Views: ${this.viewCount()}
- 2D AutoCAD Drawings: ${this.includeCad() ? 'Yes' : 'No'}
- Lighting & Ceiling Simulation: ${this.includeLighting() ? 'Yes' : 'No'}
Please let me know your availability to discuss!`;

    return `https://wa.me/91${this.contact.phoneRaw}?text=${encodeURIComponent(text)}`;
  }

  generateEmailUrl(): string {
    const subject = `Interior Visualization Inquiry: ${this.getSpaceName()} - Rahul Swami Portfolio`;
    const body = `Hi Rahul,

I came across your interior design and 3D visualization portfolio and would like to inquire about a project:

- Space: ${this.getSpaceName()}
- 3D Renders: ${this.viewCount()} views
- AutoCAD Drawings: ${this.includeCad() ? 'Yes' : 'No'}
- Lighting Simulation: ${this.includeLighting() ? 'Yes' : 'No'}

Looking forward to hearing from you.`;

    return `mailto:${this.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

