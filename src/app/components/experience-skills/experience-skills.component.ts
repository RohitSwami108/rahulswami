import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { EDUCATION_DATA, EXPERIENCES, SKILL_GROUPS } from '../../data/portfolio.data';

interface TechnicalSpecItem {
  software: string;
  version: string;
  proficiencyLevel: string;
  experience: string;
  engineSpecs: string[];
  workflow: string;
}

@Component({
  selector: 'app-experience-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-24 md:py-32 border-b border-white/[0.07] relative overflow-hidden">
      
      <!-- Section Watermark -->
      <div class="section-watermark-number">03</div>

      <!-- Architectural Crosshairs -->
      <div class="cad-crosshair top-10 left-6"></div>
      <div class="cad-crosshair bottom-10 right-6"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Section Header Row -->
        <div class="max-w-4xl mb-14">
          <div class="section-label mb-3">
            [ 03 // STUDIO PRACTICE &amp; TECHNICAL CAPABILITIES ]
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#f5f5f7] tracking-tight-custom mb-4 font-display">
            Studio Practice &amp; Spatial Mastery
          </h2>
          <p class="text-sm sm:text-base text-[#9aa0ae] max-w-2xl font-normal leading-relaxed">
            Collaborating with studio principals, interior design directors, and on-site contractors from initial schematic briefs to millimeter-accurate site execution drawings across 3 prominent studios.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          <!-- Left Column: Experiences Timeline (7 Cols) -->
          <div class="lg:col-span-7 flex flex-col gap-8">
            <div class="premium-card p-6 sm:p-9 border-white/[0.12]">
              <div class="flex items-center justify-between pb-4 mb-8 border-b border-white/[0.08] font-mono text-xs">
                <span class="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#10b981]"></span>
                  <span>Professional Studio Timeline</span>
                </span>
                <span class="text-[#c5a880]">2+ Years Studio Practice</span>
              </div>

              <div class="relative space-y-12 before:absolute before:inset-0 before:left-[11px] before:w-[2px] before:bg-gradient-to-b before:from-[#10b981] before:via-white/20 before:to-transparent">
                <div *ngFor="let exp of experiences; let i = index" class="relative pl-8 group">
                  
                  <!-- Timeline Node Marker -->
                  <div 
                    class="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    [class.bg-[#07080a]]="true"
                    [class.border-2]="true"
                    [class.border-[#10b981]]="exp.current"
                    [class.border-white/40]="!exp.current"
                  >
                    <span 
                      class="w-2 h-2 rounded-full"
                      [class.bg-[#10b981]]="exp.current"
                      [class.animate-pulse]="exp.current"
                      [class.bg-white/80]="!exp.current"
                    ></span>
                  </div>

                  <!-- Header Info -->
                  <div class="flex flex-wrap items-baseline justify-between gap-2 mb-2 font-mono">
                    <div class="flex items-center gap-2">
                      <h3 class="text-white font-bold text-xl font-display">{{ exp.company }}</h3>
                      <span class="text-xs text-[#9aa0ae]">&bull; {{ exp.location }}</span>
                    </div>

                    <!-- Current Studio Status Badge -->
                    <div 
                      *ngIf="exp.current" 
                      class="inline-flex items-center gap-1.5 text-xs text-[#10b981] bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/25 font-medium"
                    >
                      <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                      <span>{{ exp.badge }}</span>
                    </div>

                    <div 
                      *ngIf="!exp.current" 
                      class="text-xs text-[#9aa0ae] bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.08]"
                    >
                      {{ exp.period }}
                    </div>
                  </div>

                  <!-- Role Title -->
                  <div class="text-xs font-mono text-[#e2cfb6] mb-3 flex items-center gap-2">
                    <span class="text-[#c5a880] font-bold">&gt;</span>
                    <span class="font-semibold">{{ exp.role }}</span>
                    <span *ngIf="exp.current" class="text-[11px] text-[#9aa0ae]">({{ exp.period }})</span>
                  </div>

                  <!-- Summary -->
                  <p class="text-xs sm:text-sm text-[#9aa0ae] leading-relaxed mb-4">
                    {{ exp.summary }}
                  </p>

                  <!-- Key Studio Responsibilities -->
                  <ul class="space-y-2 mb-5">
                    <li *ngFor="let item of exp.responsibilities" class="flex items-start gap-2.5 text-xs text-[#d1d5db] leading-relaxed">
                      <span class="text-[#c5a880] mt-0.5 text-xs font-bold">&bull;</span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>

                  <!-- Software & Tools Stack -->
                  <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#9aa0ae]">
                    <span *ngFor="let tool of exp.tools" class="bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.07]">
                      {{ tool }}
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <!-- Academic & Schooling Credentials -->
            <div class="premium-card p-6 sm:p-8">
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4 pb-3 border-b border-white/[0.08]">
                Academic &amp; Schooling Credentials
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div *ngFor="let edu of education" class="p-4 rounded bg-white/[0.02] border border-white/[0.06]">
                  <div class="text-[#c5a880] text-[11px] mb-1 font-bold">{{ edu.year }}</div>
                  <div class="text-white font-bold font-display text-sm">{{ edu.institution }}</div>
                  <div class="text-[#e2cfb6] text-xs mt-0.5">{{ edu.degree }}</div>
                  <div class="text-[#9aa0ae] text-[11px] mt-1">{{ edu.field }} &bull; {{ edu.location }}</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Technical Specification Sheet & Capability Matrix (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col gap-6">
            
            <!-- Software Technical Specification Sheet (No generic progress bars!) -->
            <div class="premium-card p-6 sm:p-7 border-white/[0.12]">
              <div class="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-white font-bold mb-4 pb-3 border-b border-white/[0.08]">
                <span>SOFTWARE SPECIFICATION SHEET</span>
                <span class="text-[#10b981] text-[11px]">AUDITED 2026</span>
              </div>

              <div class="space-y-4 font-mono text-xs">
                
                <!-- 3ds Max -->
                <div class="p-3.5 rounded bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-colors">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-bold font-display text-base">Autodesk 3ds Max</span>
                    <span class="text-[#10b981] text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Mastery &bull; 2+ Yrs
                    </span>
                  </div>
                  <div class="text-[11px] text-[#c5a880] mb-2 font-mono">
                    Polygonal 3D Modeling &bull; Hard Surface Detailing &bull; Bespoke Furniture
                  </div>
                  <div class="flex flex-wrap gap-1 text-[10px] text-[#9aa0ae]">
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">Modifier Stacks</span>
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">Sub-D Modeling</span>
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">UVW Mapping</span>
                  </div>
                </div>

                <!-- Corona Renderer -->
                <div class="p-3.5 rounded bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-colors">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-bold font-display text-base">Corona Renderer 11</span>
                    <span class="text-[#10b981] text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Mastery &bull; 4K UHD
                    </span>
                  </div>
                  <div class="text-[11px] text-[#c5a880] mb-2 font-mono">
                    Corona Physical Cam &bull; PBR Materials &bull; LightMix &bull; Tone Mapping
                  </div>
                  <div class="flex flex-wrap gap-1 text-[10px] text-[#9aa0ae]">
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">ACES Tone Mapping</span>
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">Volumetric Sky</span>
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">IES Profiles</span>
                  </div>
                </div>

                <!-- AutoCAD 2025 -->
                <div class="p-3.5 rounded bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-colors">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-bold font-display text-base">AutoCAD 2025</span>
                    <span class="text-[#10b981] text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Advanced &bull; 100% CAD
                    </span>
                  </div>
                  <div class="text-[11px] text-[#c5a880] mb-2 font-mono">
                    2D Technical Working Drawings &bull; Joinery Elevations &bull; Ceiling Plans
                  </div>
                  <div class="flex flex-wrap gap-1 text-[10px] text-[#9aa0ae]">
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">Millimeter Tolerances</span>
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">Cross Sections</span>
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">Electrical Coordination</span>
                  </div>
                </div>

                <!-- Adobe Photoshop -->
                <div class="p-3.5 rounded bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-colors">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-bold font-display text-base">Adobe Photoshop</span>
                    <span class="text-[#9aa0ae] text-xs font-semibold bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">
                      Post-Production
                    </span>
                  </div>
                  <div class="text-[11px] text-[#c5a880] mb-2 font-mono">
                    Render Color Grading &bull; Atmospheric Compositing &bull; Texture Synthesis
                  </div>
                  <div class="flex flex-wrap gap-1 text-[10px] text-[#9aa0ae]">
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">Camera Raw</span>
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">Masking &amp; Passes</span>
                    <span class="bg-white/[0.04] px-1.5 py-0.5 rounded">Material Tuning</span>
                  </div>
                </div>

              </div>
            </div>

            <!-- Spatial & Architectural Disciplines -->
            <div class="premium-card p-6 sm:p-7">
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4 pb-3 border-b border-white/[0.08]">
                Architectural Detailing Disciplines
              </div>

              <div class="flex flex-wrap gap-2 font-mono text-xs">
                <span class="filter-pill">Photorealistic 3D Rendering</span>
                <span class="filter-pill">Residential Space Planning</span>
                <span class="filter-pill">Master Bedroom Suites</span>
                <span class="filter-pill">Modular Wardrobe Carcass</span>
                <span class="filter-pill">Feature TV Walls</span>
                <span class="filter-pill">False Ceiling Layouts</span>
                <span class="filter-pill">Lighting Setup &amp; Design</span>
                <span class="filter-pill">Material Selection</span>
                <span class="filter-pill">Villa Facade Visualization</span>
                <span class="filter-pill">AutoCAD Working Drawings</span>
                <span class="filter-pill">Millwork Joinery Details</span>
              </div>
            </div>

            <!-- Professional Ethos Statement -->
            <div class="premium-card p-6 sm:p-7 bg-[#0b0e15] border-[#c5a880]/20">
              <div class="font-mono text-xs uppercase tracking-wider text-[#c5a880] mb-2 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                <span>Candidate Statement</span>
              </div>
              <p class="text-xs sm:text-sm text-[#d1d5db] leading-relaxed italic font-normal">
                "A dedicated professional passionate about developing innovative design concepts and transforming ideas into visually appealing and functional spaces. Proven in fast-paced studio workflows with architects and site contractors."
              </p>
              <div class="mt-4 font-mono text-xs text-white font-medium flex items-center justify-between">
                <span>&mdash; Rahul Swami</span>
                <span class="text-[#10b981] text-[11px]">Sketch Spaces (Present)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
  styles: [],
})
export class ExperienceSkillsComponent {
  experiences = EXPERIENCES;
  education = EDUCATION_DATA;
  skillGroups = SKILL_GROUPS;
}
