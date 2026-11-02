import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EDUCATION_DATA, EXPERIENCES, SKILL_GROUPS } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 md:py-28 hairline-bottom">
      <div class="editorial-container">
        
        <!-- Header -->
        <div class="mb-14">
          <div class="font-mono text-xs text-[#71717a] uppercase tracking-widest mb-3">
            [ 02 // ABOUT &amp; STUDIO PRACTICE ]
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight-custom mb-4">
            Studio Experience &amp; Capabilities
          </h2>
          <p class="text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-normal leading-relaxed">
            Collaborating with architects, interior design studios, and site contractors from initial spatial brief to millimeter-precise on-site execution.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <!-- Left Column: Experiences Timeline (7 Cols) -->
          <div class="lg:col-span-7 flex flex-col gap-10">
            <div>
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-6">
                Work History
              </div>

              <div class="space-y-8">
                <div *ngFor="let exp of experiences" class="pb-8 hairline-bottom last:border-b-0">
                  <div class="flex flex-wrap items-baseline justify-between gap-2 mb-2 font-mono">
                    <div class="flex items-center gap-2">
                      <span class="text-white font-bold text-base font-sans">{{ exp.company }}</span>
                      <span class="text-xs text-[#71717a]">&bull; {{ exp.location }}</span>
                    </div>
                    <div class="text-xs text-[#a1a1aa] bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.06]">
                      {{ exp.period }}
                    </div>
                  </div>

                  <div class="text-xs font-mono text-[#d4d4d8] mb-3">
                    {{ exp.role }}
                  </div>

                  <p class="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-4">
                    {{ exp.summary }}
                  </p>

                  <!-- Bullet Points from CV -->
                  <ul class="space-y-2 mb-4">
                    <li *ngFor="let item of exp.responsibilities" class="flex items-start gap-2 text-xs text-[#a1a1aa] leading-relaxed">
                      <span class="text-white mt-0.5">&bull;</span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>

                  <!-- Tools -->
                  <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#71717a]">
                    <span *ngFor="let tool of exp.tools" class="bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">
                      {{ tool }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Education -->
            <div>
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4">
                Education
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div *ngFor="let edu of education" class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div class="text-[#71717a] text-[11px] mb-1">{{ edu.year }}</div>
                  <div class="text-white font-bold font-sans text-sm">{{ edu.institution }}</div>
                  <div class="text-[#a1a1aa] text-xs mt-0.5">{{ edu.degree }}</div>
                  <div class="text-[#71717a] text-[11px] mt-1">{{ edu.field }} &bull; {{ edu.location }}</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Capabilities & Tools (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col gap-8">
            
            <!-- Software Arsenal -->
            <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4">
                Software &amp; Tools Arsenal
              </div>

              <div class="space-y-3 font-mono text-xs">
                <div class="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                  <span class="text-white">Autodesk 3ds Max</span>
                  <span class="text-[#a1a1aa]">3D Modeling &bull; Hard Surface</span>
                </div>
                <div class="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                  <span class="text-white">Corona Renderer 11</span>
                  <span class="text-[#a1a1aa]">Physical Cam &bull; LightMix</span>
                </div>
                <div class="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                  <span class="text-white">AutoCAD 2025</span>
                  <span class="text-[#a1a1aa]">2D Working Drawings</span>
                </div>
                <div class="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                  <span class="text-white">Adobe Photoshop</span>
                  <span class="text-[#a1a1aa]">Post-Production Grading</span>
                </div>
              </div>
            </div>

            <!-- Capabilities Tags (Inspired by quynh.moe) -->
            <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-4">
                Core Design Capabilities
              </div>

              <div class="flex flex-wrap gap-2 font-mono text-xs">
                <span class="editorial-pill">Photorealistic 3D Rendering</span>
                <span class="editorial-pill">Residential Space Planning</span>
                <span class="editorial-pill">Master Bedroom Suites</span>
                <span class="editorial-pill">Modular Wardrobe Carcass</span>
                <span class="editorial-pill">Feature TV Walls</span>
                <span class="editorial-pill">False Ceiling Layouts</span>
                <span class="editorial-pill">Lighting Setup &amp; Design</span>
                <span class="editorial-pill">Material Selection</span>
                <span class="editorial-pill">Villa Facade Visualization</span>
                <span class="editorial-pill">AutoCAD Working Drawings</span>
              </div>
            </div>

            <!-- Studio Philosophy -->
            <div class="p-6 rounded-2xl bg-[#0d0d10] border border-white/[0.08]">
              <div class="font-mono text-xs uppercase tracking-wider text-[#71717a] mb-2">
                Ethos
              </div>
              <p class="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed italic font-normal">
                "A self-taught professional passionate about developing innovative design concepts and transforming ideas into visually appealing and functional spaces. Proven in fast-paced studio workflows with architects and site contractors."
              </p>
              <div class="mt-4 font-mono text-xs text-white">
                &mdash; Rahul Swami, Camara Interiors
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
