import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EDUCATION_DATA, EXPERIENCES, SKILL_GROUPS } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 md:py-28 border-b border-white/[0.08] relative">
      <div class="portfolio-container">
        
        <!-- Section Header (Unified Layout) -->
        <div class="max-w-4xl mb-14">
          <div class="section-label">
            [ 03 // STUDIO PRACTICE &amp; PROFESSIONAL BACKGROUND ]
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight-custom mb-4">
            Studio Experience &amp; Spatial Capabilities
          </h2>
          <p class="text-base sm:text-lg text-[#9ca3af] max-w-2xl font-normal leading-relaxed">
            Collaborating with architectural directors, interior design leads, and site execution contractors from initial concept briefs to millimeter-precise on-site delivery.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          <!-- Left Column: Experiences Timeline (7 Cols) -->
          <div class="lg:col-span-7 flex flex-col gap-8">
            <div class="premium-card p-6 sm:p-8">
              <div class="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08] font-mono text-xs">
                <span class="text-white font-bold uppercase tracking-wider">Professional Studio Career</span>
                <span class="text-[#9ca3af]">2+ Years Studio Practice</span>
              </div>

              <div class="space-y-10">
                <div *ngFor="let exp of experiences; let i = index" class="relative pl-6 border-l border-white/10 last:pb-0">
                  
                  <!-- Timeline Node Dot -->
                  <div 
                    class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full"
                    [class.bg-[#10b981]]="exp.current"
                    [class.ring-4]="exp.current"
                    [class.ring-emerald-500/20]="exp.current"
                    [class.bg-white]="!exp.current"
                  ></div>

                  <!-- Header Info -->
                  <div class="flex flex-wrap items-baseline justify-between gap-2 mb-2 font-mono">
                    <div class="flex items-center gap-2">
                      <span class="text-white font-bold text-lg font-sans">{{ exp.company }}</span>
                      <span class="text-xs text-[#9ca3af]">&bull; {{ exp.location }}</span>
                    </div>

                    <!-- Current Studio Status Badge -->
                    <div 
                      *ngIf="exp.current" 
                      class="inline-flex items-center gap-1.5 text-xs text-[#10b981] bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-medium"
                    >
                      <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                      <span>{{ exp.badge }}</span>
                    </div>

                    <div 
                      *ngIf="!exp.current" 
                      class="text-xs text-[#9ca3af] bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/[0.08]"
                    >
                      {{ exp.period }}
                    </div>
                  </div>

                  <!-- Role Title -->
                  <div class="text-xs font-mono text-[#e5e7eb] mb-3 flex items-center gap-2">
                    <span class="text-[#10b981]">&gt;</span>
                    <span class="font-semibold">{{ exp.role }}</span>
                    <span *ngIf="exp.current" class="text-[11px] text-[#9ca3af]">({{ exp.period }})</span>
                  </div>

                  <!-- Summary -->
                  <p class="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4">
                    {{ exp.summary }}
                  </p>

                  <!-- Responsibilities from Resume -->
                  <ul class="space-y-2 mb-4">
                    <li *ngFor="let item of exp.responsibilities" class="flex items-start gap-2 text-xs text-[#d1d5db] leading-relaxed">
                      <span class="text-[#9ca3af] mt-1 text-[10px]">&bull;</span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>

                  <!-- Tools Stack -->
                  <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#9ca3af]">
                    <span *ngFor="let tool of exp.tools" class="bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/[0.06]">
                      {{ tool }}
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <!-- Education Card -->
            <div class="premium-card p-6 sm:p-8">
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4 pb-3 border-b border-white/[0.08]">
                Academic &amp; Schooling Credentials
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div *ngFor="let edu of education" class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div class="text-[#9ca3af] text-[11px] mb-1">{{ edu.year }}</div>
                  <div class="text-white font-bold font-sans text-sm">{{ edu.institution }}</div>
                  <div class="text-[#d1d5db] text-xs mt-0.5">{{ edu.degree }}</div>
                  <div class="text-[#9ca3af] text-[11px] mt-1">{{ edu.field }} &bull; {{ edu.location }}</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Software Mastery & Spatial Competencies (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col gap-6">
            
            <!-- Software Mastery Arsenal -->
            <div class="premium-card p-6 sm:p-7">
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4 pb-3 border-b border-white/[0.08]">
                Software Arsenal &amp; Technical Proficiency
              </div>

              <div class="space-y-4 font-mono text-xs">
                <!-- 3ds Max -->
                <div class="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-bold font-sans text-sm">Autodesk 3ds Max</span>
                    <span class="text-[#10b981] text-[11px] font-semibold">95% &bull; Mastery</span>
                  </div>
                  <div class="text-[11px] text-[#9ca3af] mb-2">Polygonal 3D Modeling &bull; Hard Surface &bull; Furniture Detailing</div>
                  <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-white rounded-full" style="width: 95%"></div>
                  </div>
                </div>

                <!-- Corona Renderer -->
                <div class="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-bold font-sans text-sm">Corona Renderer 11</span>
                    <span class="text-[#10b981] text-[11px] font-semibold">95% &bull; Mastery</span>
                  </div>
                  <div class="text-[11px] text-[#9ca3af] mb-2">Photorealistic Lighting &bull; PBR Materials &bull; LightMix Tone Mapping</div>
                  <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-white rounded-full" style="width: 95%"></div>
                  </div>
                </div>

                <!-- AutoCAD -->
                <div class="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-bold font-sans text-sm">AutoCAD 2025</span>
                    <span class="text-[#10b981] text-[11px] font-semibold">94% &bull; Advanced</span>
                  </div>
                  <div class="text-[11px] text-[#9ca3af] mb-2">2D Working Drawings &bull; Joinery Elevations &bull; Ceiling Plans</div>
                  <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-white rounded-full" style="width: 94%"></div>
                  </div>
                </div>

                <!-- Adobe Photoshop -->
                <div class="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-bold font-sans text-sm">Adobe Photoshop</span>
                    <span class="text-[#9ca3af] text-[11px]">90% &bull; Post-Production</span>
                  </div>
                  <div class="text-[11px] text-[#9ca3af] mb-2">Architectural Color Grading &bull; Texture Synthesis &bull; Compositing</div>
                  <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-white/80 rounded-full" style="width: 90%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Core Design Capabilities Pills -->
            <div class="premium-card p-6 sm:p-7">
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
                <span class="filter-pill">Millwork Joinery Details</span>
              </div>
            </div>

            <!-- Professional Ethos -->
            <div class="premium-card p-6 sm:p-7 bg-[#10121a]">
              <div class="font-mono text-xs uppercase tracking-wider text-[#9ca3af] mb-2">
                Candidate Statement
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
