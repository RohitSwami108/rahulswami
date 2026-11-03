import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
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
    <section id="about" class="py-24 md:py-32 border-b border-white/[0.08] relative overflow-hidden">
      
      <!-- 02: RECOGNIZABLE EDITORIAL BACKGROUND NUMERAL (8% Opacity) -->
      <div 
        class="section-watermark-number top-6 right-6 sm:right-16 md:right-24"
        [style.transform]="'translateY(' + (parallaxOffset() - 2300) * 0.12 + 'px)'"
      >
        03
      </div>

      <!-- 03: UNIQUE ARCHITECTURAL BACKGROUND PATTERN (Connecting Geometry & Abstract 3D Wireframe Grid) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <!-- Geometric 3D Isometric Wireframe Cube Nodes -->
          <g stroke="rgba(197,168,128,0.12)" stroke-width="1" fill="none">
            <polygon points="120,80 180,45 240,80 180,115" />
            <polygon points="120,80 180,115 180,185 120,150" />
            <polygon points="240,80 180,115 180,185 240,150" />
          </g>

          <g stroke="rgba(16,185,129,0.08)" stroke-width="1" fill="none" transform="translate(900, 300)">
            <polygon points="100,60 150,30 200,60 150,90" />
            <polygon points="100,60 150,90 150,150 100,120" />
            <polygon points="200,60 150,90 150,150 200,120" />
          </g>

          <!-- Vertical Timeline Connector Circuits -->
          <line x1="18%" y1="0" x2="18%" y2="100%" stroke="rgba(255,255,255,0.025)" stroke-dasharray="6,6"/>
          <line x1="82%" y1="0" x2="82%" y2="100%" stroke="rgba(255,255,255,0.025)" stroke-dasharray="6,6"/>
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
              [ 03 // STUDIO PRACTICE &amp; TECHNICAL CAPABILITIES ]
            </div>
            <span class="hidden sm:inline-flex cad-tech-stamp">
              TIMELINE: 2024 &mdash; PRESENT
            </span>
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

              <!-- Vertical Timeline with Connecting Lines & Studio Identity Markers -->
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
                    <span class="text-[#10b981] font-bold">&gt;</span>
                    <span class="font-semibold">{{ exp.role }}</span>
                    <span *ngIf="exp.current" class="text-[11px] text-[#9aa0ae]">({{ exp.period }})</span>
                  </div>

                  <!-- Summary -->
                  <p class="text-xs sm:text-sm text-[#9aa0ae] leading-relaxed mb-4">
                    {{ exp.summary }}
                  </p>

                  <!-- Key Studio Responsibilities from CV -->
                  <ul class="space-y-2 mb-5">
                    <li *ngFor="let item of exp.responsibilities" class="flex items-start gap-2.5 text-xs text-[#d1d5db] leading-relaxed">
                      <span class="text-[#c5a880] mt-0.5 text-xs">&bull;</span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>

                  <!-- Software & Tools Used -->
                  <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#9aa0ae]">
                    <span *ngFor="let tool of exp.tools" class="bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.06]">
                      {{ tool }}
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <!-- Education Card -->
            <div class="premium-card p-6 sm:p-8 border-white/[0.12]">
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4 pb-3 border-b border-white/[0.08] flex items-center justify-between">
                <span>Academic &amp; Schooling Credentials</span>
                <span class="text-[#c5a880]">DELHI &bull; NCR</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div *ngFor="let edu of education" class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div class="text-[#c5a880] text-[11px] mb-1 font-bold">{{ edu.year }}</div>
                  <div class="text-white font-bold font-sans text-sm">{{ edu.institution }}</div>
                  <div class="text-[#d1d5db] text-xs mt-0.5">{{ edu.degree }}</div>
                  <div class="text-[#9aa0ae] text-[11px] mt-1">{{ edu.field }} &bull; {{ edu.location }}</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Skills Technical Dashboard (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col gap-8">
            
            <!-- Software Arsenal Technical Meters -->
            <div class="premium-card p-6 sm:p-8 border-white/[0.12]">
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-5 pb-3 border-b border-white/[0.08] flex items-center justify-between">
                <span>Production Pipeline &amp; Software Arsenal</span>
                <span class="text-[#10b981]">100% CAD &bull; 4K CORONA</span>
              </div>

              <div class="space-y-5">
                <div *ngFor="let item of techSpecs" class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-bold font-sans text-sm">{{ item.software }}</span>
                    <span class="text-[#c5a880] text-[11px] font-semibold">{{ item.proficiencyLevel }}</span>
                  </div>
                  
                  <div class="text-[11px] text-[#9aa0ae] mb-3">
                    {{ item.workflow }}
                  </div>

                  <!-- Engine Features Pills -->
                  <div class="flex flex-wrap gap-1 mb-3">
                    <span *ngFor="let spec of item.engineSpecs" class="bg-white/[0.03] text-[#7e879b] text-[10px] px-2 py-0.5 rounded border border-white/[0.05]">
                      {{ spec }}
                    </span>
                  </div>

                  <!-- Animated Progress Bar -->
                  <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-[#c5a880] to-[#10b981] rounded-full"
                      [style.width]="item.proficiencyLevel === '95% Mastery' ? '95%' : item.proficiencyLevel === '94% Advanced' ? '94%' : '90%'"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Core Design Capabilities Pills -->
            <div class="premium-card p-6 sm:p-8 border-white/[0.12]">
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4 pb-3 border-b border-white/[0.08]">
                Core Spatial &amp; Technical Capabilities
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
                <span class="filter-pill">Carpentry Detail Sections</span>
              </div>
            </div>

            <!-- Candidate Studio Statement -->
            <div class="premium-card p-6 sm:p-7 bg-[#0b0e14] border-white/[0.12]">
              <div class="font-mono text-xs uppercase tracking-wider text-[#c5a880] mb-2 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                <span>Candidate Studio Statement</span>
              </div>
              <p class="text-xs sm:text-sm text-[#d1d5db] leading-relaxed italic font-normal">
                "A dedicated interior designer and 3D visualizer passionate about developing innovative design concepts and transforming spatial ideas into functional, photorealistic environments. Proven in fast-paced studio workflows with architects and site contractors."
              </p>
              <div class="mt-4 font-mono text-xs text-white font-medium flex items-center justify-between">
                <span>&mdash; Rahul Swami</span>
                <span class="text-[#10b981] text-[11px]">Sketch Spaces (Current Studio)</span>
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
  parallaxOffset = signal(0);
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  techSpecs: TechnicalSpecItem[] = [
    {
      software: 'Autodesk 3ds Max 2024',
      version: 'v2024.2',
      proficiencyLevel: '95% Mastery',
      experience: '2+ yrs studio practice',
      engineSpecs: ['Polygonal Modeling', 'Hard Surface', 'Bespoke Furniture', 'Retopology'],
      workflow: 'High-poly architectural interior modeling & millwork components',
    },
    {
      software: 'Corona Renderer 11',
      version: 'v11.2 Hotfix 1',
      proficiencyLevel: '95% Mastery',
      experience: '2+ yrs studio practice',
      engineSpecs: ['Corona Physical Cam', 'Tone Mapping', 'LightMix', 'PBR Shaders', 'IES Profiles'],
      workflow: 'Physically-accurate atmospheric lighting & photographic shading',
    },
    {
      software: 'AutoCAD 2025',
      version: '2D Architectural Drafting',
      proficiencyLevel: '94% Advanced',
      experience: '2+ yrs studio practice',
      engineSpecs: ['Working Drawings', 'Millwork Elevations', 'False Ceiling Plans', 'Electrical Markings'],
      workflow: 'Millimeter-precise on-site execution packages for carpenters & contractors',
    },
    {
      software: 'Adobe Photoshop 2024',
      version: 'Post-Production',
      proficiencyLevel: '90% Advanced',
      experience: '2+ yrs studio practice',
      engineSpecs: ['Color Grading', 'Texture Synthesis', 'Atmospheric Compositing', 'Camera Raw'],
      workflow: 'High-end architectural photography color grading & client presentation boards',
    },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.parallaxOffset.set(window.scrollY);
  }
}
