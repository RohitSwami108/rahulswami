import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Output, PLATFORM_ID, computed, signal } from '@angular/core';
import { PROJECTS_DATA } from '../../data/portfolio.data';
import { Project, ProjectCategory } from '../../models/portfolio.models';

interface CategoryFilterTab {
  id: ProjectCategory;
  label: string;
  count: number;
}

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="works" class="py-24 md:py-32 border-b border-white/[0.08] relative overflow-hidden">
      
      <!-- 02: RECOGNIZABLE EDITORIAL BACKGROUND NUMERAL (8% Opacity) -->
      <div 
        class="section-watermark-number top-6 right-6 sm:right-16 md:right-24"
        [style.transform]="'translateY(' + (parallaxOffset() - 700) * 0.12 + 'px)'"
      >
        01
      </div>

      <!-- 03: UNIQUE ARCHITECTURAL BACKGROUND PATTERN (Topographic Contours & Floor Plan Lines) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-35">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <!-- Topographic Contour Lines -->
          <path d="M -100,200 Q 300,50 800,280 T 1800,120" fill="none" stroke="rgba(197,168,128,0.06)" stroke-width="1.2" stroke-dasharray="8,10"/>
          <path d="M -100,280 Q 350,120 850,350 T 1800,200" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
          <path d="M -100,360 Q 400,190 900,420 T 1800,280" fill="none" stroke="rgba(197,168,128,0.04)" stroke-width="1"/>
          
          <!-- Floor Plan Section Elevation Grid -->
          <line x1="8%" y1="0" x2="8%" y2="100%" stroke="rgba(255,255,255,0.02)" stroke-dasharray="4,8"/>
          <line x1="92%" y1="0" x2="92%" y2="100%" stroke="rgba(255,255,255,0.02)" stroke-dasharray="4,8"/>
          
          <!-- Coordinate Ticks -->
          <circle cx="8%" cy="20%" r="2" fill="rgba(16,185,129,0.3)"/>
          <circle cx="92%" cy="60%" r="2" fill="rgba(197,168,128,0.3)"/>
        </svg>
      </div>

      <!-- Architectural Crosshairs -->
      <div class="cad-crosshair top-10 left-6"></div>
      <div class="cad-crosshair bottom-10 right-6"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Section Header Row -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div class="flex items-center gap-3 mb-3">
              <div class="section-label">
                [ 01 // SELECTED STUDIO ARCHITECTURAL WORKS ]
              </div>
              <span class="hidden sm:inline-flex cad-tech-stamp">
                SHEET A-101 // SPATIAL INDEX
              </span>
            </div>

            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#f5f5f7] tracking-tight-custom mb-4 font-display">
              Curated Architectural Works
            </h2>
            <p class="text-sm sm:text-base text-[#9aa0ae] max-w-2xl font-normal leading-relaxed">
              Showcasing residential interior suites, custom modular millwork, and exterior facades created across Sapras Architects &amp; Engineers, Camara Interiors, and Ettore Interior. Modeled in 3ds Max, rendered in Corona 11, and detailed in AutoCAD.
            </p>
          </div>

          <!-- Open Complete 50-Render Vault CTA -->
          <div class="flex items-center gap-3 shrink-0">
            <button 
              type="button"
              (click)="openVault.emit()"
              class="btn-primary-action text-xs px-4 py-2.5 cursor-pointer font-mono"
              data-cursor="EXPLORE"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span>Explore Complete 50-Render Vault</span>
              <span class="text-[11px]">&rarr;</span>
            </button>
          </div>
        </div>

        <!-- Filter Category Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-14 scrollbar-none font-mono text-xs">
          <button 
            *ngFor="let tab of filterTabs"
            type="button"
            (click)="setCategory(tab.id)"
            [class.active]="selectedCategory() === tab.id"
            class="filter-pill cursor-pointer"
          >
            <span>{{ tab.label }}</span>
            <span class="opacity-60 text-[11px]">({{ tab.count }})</span>
          </button>
        </div>

        <!-- 05: EDITORIAL ASYMMETRIC MAGAZINE GRID (When 'All Works' is active) -->
        <div *ngIf="selectedCategory() === 'all'" class="space-y-16">
          
          <!-- FEATURED SPREAD: Project 01 (opulent-arched-lounge) -->
          <article 
            *ngIf="projects[0]"
            class="premium-card group cursor-pointer border-white/[0.12] hover:border-[#c5a880]/50"
            (click)="onSelectProject(projects[0])"
            (keydown.enter)="onSelectProject(projects[0])"
            tabindex="0"
            data-cursor="INSPECT"
          >
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              <!-- Left Visual Canvas (7 Cols) -->
              <div class="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[380px] lg:min-h-[520px] overflow-hidden bg-black">
                <img 
                  [src]="getCardActiveImage(projects[0])" 
                  [alt]="projects[0].title"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none"></div>

                <!-- Top Left Badge -->
                <div class="absolute top-4 left-4 flex items-center gap-2">
                  <span class="bg-[#07080a]/85 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-[#c5a880] border border-white/10 font-bold">
                    FEATURED MASTER SUITE
                  </span>
                  <span class="bg-[#07080a]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white/80 border border-white/10 hidden sm:inline">
                    CORONA 11 &bull; 4K UHD
                  </span>
                </div>

                <!-- Bottom Angle Switcher on Visual -->
                <div 
                  *ngIf="projects[0].gallery.length > 1" 
                  class="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#07080a]/90 backdrop-blur-md p-1.5 rounded border border-white/15"
                  (click)="$event.stopPropagation()"
                >
                  <span class="text-[10px] font-mono text-[#9aa0ae] px-1.5 hidden sm:inline">CAM ANGLES:</span>
                  <button
                    *ngFor="let img of projects[0].gallery.slice(0, 5); let angleIdx = index"
                    type="button"
                    (click)="setCardImage(projects[0].id, img)"
                    [class.bg-white]="getCardActiveImage(projects[0]) === img"
                    [class.text-black]="getCardActiveImage(projects[0]) === img"
                    [class.text-white]="getCardActiveImage(projects[0]) !== img"
                    class="font-mono text-[10px] px-2 py-0.5 rounded transition-all cursor-pointer hover:bg-white/30"
                  >
                    V{{ angleIdx + 1 }}
                  </button>
                </div>
              </div>

              <!-- Right Editorial Specification Column (5 Cols) -->
              <div class="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between bg-[#0b0e14]/90 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
                <div>
                  <div class="flex items-center justify-between font-mono text-xs text-[#9aa0ae] pb-4 mb-5 border-b border-white/[0.08]">
                    <div class="flex items-center gap-2 text-white">
                      <span class="text-[#c5a880] font-mono font-bold">[ 01 / 10 ]</span>
                      <span class="uppercase tracking-wider text-[11px] text-[#e2cfb6]">{{ projects[0].categoryLabel }}</span>
                    </div>
                    <span class="text-[11px]">{{ projects[0].studio }} &bull; {{ projects[0].year }}</span>
                  </div>

                  <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight-custom mb-3 font-display group-hover:text-[#c5a880] transition-colors">
                    {{ projects[0].title }}
                  </h3>
                  
                  <p class="text-xs sm:text-sm text-[#9aa0ae] leading-relaxed mb-6">
                    {{ projects[0].description }}
                  </p>

                  <!-- Architectural Specs HUD -->
                  <div class="space-y-2 mb-6 p-4 rounded bg-white/[0.02] border border-white/[0.06] font-mono text-xs">
                    <div class="flex items-baseline justify-between text-[11px]">
                      <span class="text-[#616776]">DIMENSIONS</span>
                      <span class="text-white">{{ projects[0].specs.dimensions || '5400 × 4200mm' }}</span>
                    </div>
                    <div class="flex items-baseline justify-between text-[11px]">
                      <span class="text-[#616776]">LIGHTING</span>
                      <span class="text-[#c5a880]">{{ projects[0].specs.lighting }}</span>
                    </div>
                    <div class="flex items-baseline justify-between text-[11px]">
                      <span class="text-[#616776]">LOCATION</span>
                      <span class="text-[#9aa0ae]">{{ projects[0].location }}</span>
                    </div>
                  </div>

                  <!-- Software Tags -->
                  <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#9aa0ae] mb-6">
                    <span *ngFor="let tool of projects[0].software" class="bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.08]">
                      {{ tool }}
                    </span>
                    <span class="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/20">
                      AutoCAD 2D Elevations
                    </span>
                  </div>
                </div>

                <!-- Footer Action -->
                <div class="pt-5 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs">
                  <span class="text-[#616776]">ARCHITECTURAL CASE STUDY</span>
                  <span class="text-white group-hover:translate-x-1.5 transition-transform flex items-center gap-1.5 font-medium text-xs">
                    <span>Inspect Full Case Study</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>

            </div>
          </article>

          <!-- ASYMMETRIC 2-COLUMN SPREAD: Projects 02 & 03 -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Project 02: Parisian Boiserie (7 Cols) -->
            <article 
              *ngIf="projects[1]"
              class="lg:col-span-7 premium-card group cursor-pointer flex flex-col justify-between"
              (click)="onSelectProject(projects[1])"
              (keydown.enter)="onSelectProject(projects[1])"
              tabindex="0"
              data-cursor="INSPECT"
            >
              <div>
                <div class="px-6 py-4 border-b border-white/[0.07] flex items-center justify-between font-mono text-xs text-[#9aa0ae]">
                  <div class="flex items-center gap-2 text-white">
                    <span class="text-[#c5a880] font-bold">[ 02 / 10 ]</span>
                    <span class="uppercase tracking-wider text-[11px] text-[#e2cfb6]">{{ projects[1].categoryLabel }}</span>
                  </div>
                  <span class="text-[11px]">{{ projects[1].studio }} &bull; {{ projects[1].year }}</span>
                </div>

                <div class="relative aspect-[16/10] overflow-hidden bg-black">
                  <img 
                    [src]="getCardActiveImage(projects[1])" 
                    [alt]="projects[1].title"
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <!-- Angle Switcher -->
                  <div 
                    *ngIf="projects[1].gallery.length > 1" 
                    class="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#07080a]/90 backdrop-blur-md p-1 rounded border border-white/15"
                    (click)="$event.stopPropagation()"
                  >
                    <button
                      *ngFor="let img of projects[1].gallery.slice(0, 4); let angleIdx = index"
                      type="button"
                      (click)="setCardImage(projects[1].id, img)"
                      [class.bg-white]="getCardActiveImage(projects[1]) === img"
                      [class.text-black]="getCardActiveImage(projects[1]) === img"
                      [class.text-white]="getCardActiveImage(projects[1]) !== img"
                      class="font-mono text-[10px] px-2 py-0.5 rounded transition-all cursor-pointer hover:bg-white/30"
                    >
                      V{{ angleIdx + 1 }}
                    </button>
                  </div>
                  <div class="absolute bottom-4 right-4 bg-white text-black px-3 py-1 rounded text-xs font-mono font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                    Inspect &rarr;
                  </div>
                </div>

                <div class="p-6">
                  <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight-custom font-display mb-2 group-hover:text-[#c5a880] transition-colors">
                    {{ projects[1].title }}
                  </h3>
                  <p class="text-xs sm:text-sm text-[#9aa0ae] leading-relaxed mb-4 line-clamp-2">
                    {{ projects[1].subtitle }}
                  </p>
                  <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#9aa0ae]">
                    <span *ngFor="let tool of projects[1].software" class="bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.08]">
                      {{ tool }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="px-6 py-4 border-t border-white/[0.07] flex items-center justify-between font-mono text-xs text-[#9aa0ae]">
                <span>{{ projects[1].location }}</span>
                <span class="text-white flex items-center gap-1 font-medium">Case Study &rarr;</span>
              </div>
            </article>

            <!-- Project 03: Organic Curved Headboard (5 Cols) -->
            <article 
              *ngIf="projects[2]"
              class="lg:col-span-5 premium-card group cursor-pointer flex flex-col justify-between"
              (click)="onSelectProject(projects[2])"
              (keydown.enter)="onSelectProject(projects[2])"
              tabindex="0"
              data-cursor="INSPECT"
            >
              <div>
                <div class="px-6 py-4 border-b border-white/[0.07] flex items-center justify-between font-mono text-xs text-[#9aa0ae]">
                  <div class="flex items-center gap-2 text-white">
                    <span class="text-[#c5a880] font-bold">[ 03 / 10 ]</span>
                    <span class="uppercase tracking-wider text-[11px] text-[#e2cfb6]">{{ projects[2].categoryLabel }}</span>
                  </div>
                  <span class="text-[11px]">{{ projects[2].studio }}</span>
                </div>

                <div class="relative aspect-[16/11] overflow-hidden bg-black">
                  <img 
                    [src]="getCardActiveImage(projects[2])" 
                    [alt]="projects[2].title"
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <!-- Angle Switcher -->
                  <div 
                    *ngIf="projects[2].gallery.length > 1" 
                    class="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#07080a]/90 backdrop-blur-md p-1 rounded border border-white/15"
                    (click)="$event.stopPropagation()"
                  >
                    <button
                      *ngFor="let img of projects[2].gallery.slice(0, 4); let angleIdx = index"
                      type="button"
                      (click)="setCardImage(projects[2].id, img)"
                      [class.bg-white]="getCardActiveImage(projects[2]) === img"
                      [class.text-black]="getCardActiveImage(projects[2]) === img"
                      [class.text-white]="getCardActiveImage(projects[2]) !== img"
                      class="font-mono text-[10px] px-2 py-0.5 rounded transition-all cursor-pointer hover:bg-white/30"
                    >
                      V{{ angleIdx + 1 }}
                    </button>
                  </div>
                  <div class="absolute bottom-4 right-4 bg-white text-black px-3 py-1 rounded text-xs font-mono font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                    Inspect &rarr;
                  </div>
                </div>

                <div class="p-6">
                  <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight-custom font-display mb-2 group-hover:text-[#c5a880] transition-colors">
                    {{ projects[2].title }}
                  </h3>
                  <p class="text-xs sm:text-sm text-[#9aa0ae] leading-relaxed mb-4 line-clamp-2">
                    {{ projects[2].subtitle }}
                  </p>
                  <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#9aa0ae]">
                    <span *ngFor="let tool of projects[2].software" class="bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.08]">
                      {{ tool }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="px-6 py-4 border-t border-white/[0.07] flex items-center justify-between font-mono text-xs text-[#9aa0ae]">
                <span>{{ projects[2].location }}</span>
                <span class="text-white flex items-center gap-1 font-medium">Case Study &rarr;</span>
              </div>
            </article>

          </div>

          <!-- ASYMMETRIC SPREAD 2: Projects 04, 05, 06 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article 
              *ngFor="let project of projects.slice(3, 9); let idx = index"
              class="premium-card group cursor-pointer flex flex-col justify-between"
              (click)="onSelectProject(project)"
              (keydown.enter)="onSelectProject(project)"
              tabindex="0"
              data-cursor="INSPECT"
            >
              <div>
                <div class="px-6 py-3.5 border-b border-white/[0.07] flex items-center justify-between font-mono text-xs text-[#9aa0ae]">
                  <div class="flex items-center gap-2 text-white">
                    <span class="text-[#c5a880] font-bold">[ 0{{ idx + 4 }} / 10 ]</span>
                    <span class="uppercase tracking-wider text-[11px] text-[#e2cfb6]">{{ project.categoryLabel }}</span>
                  </div>
                  <span class="text-[11px]">{{ project.year }}</span>
                </div>

                <div class="relative aspect-[16/10] overflow-hidden bg-black">
                  <img 
                    [src]="getCardActiveImage(project)" 
                    [alt]="project.title"
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <!-- Angle Switcher -->
                  <div 
                    *ngIf="project.gallery.length > 1" 
                    class="absolute bottom-3.5 left-3.5 flex items-center gap-1 bg-[#07080a]/90 backdrop-blur-md p-1 rounded border border-white/15"
                    (click)="$event.stopPropagation()"
                  >
                    <button
                      *ngFor="let img of project.gallery.slice(0, 3); let angleIdx = index"
                      type="button"
                      (click)="setCardImage(project.id, img)"
                      [class.bg-white]="getCardActiveImage(project) === img"
                      [class.text-black]="getCardActiveImage(project) === img"
                      [class.text-white]="getCardActiveImage(project) !== img"
                      class="font-mono text-[9px] px-1.5 py-0.5 rounded transition-all cursor-pointer"
                    >
                      V{{ angleIdx + 1 }}
                    </button>
                  </div>
                  <div class="absolute bottom-3.5 right-3.5 bg-white text-black px-2.5 py-0.5 rounded text-[11px] font-mono font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                    Inspect &rarr;
                  </div>
                </div>

                <div class="p-5">
                  <h3 class="text-lg font-bold text-white tracking-tight-custom font-display mb-1.5 group-hover:text-[#c5a880] transition-colors line-clamp-1">
                    {{ project.title }}
                  </h3>
                  <p class="text-xs text-[#9aa0ae] leading-relaxed mb-4 line-clamp-2">
                    {{ project.subtitle }}
                  </p>
                  <div class="flex flex-wrap gap-1 font-mono text-[10px] text-[#9aa0ae]">
                    <span *ngFor="let tool of project.software" class="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
                      {{ tool }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="px-5 py-3 border-t border-white/[0.07] flex items-center justify-between font-mono text-[11px] text-[#9aa0ae]">
                <span>{{ project.location }}</span>
                <span class="text-white flex items-center gap-1">Specs &rarr;</span>
              </div>
            </article>
          </div>

          <!-- PROJECT 10: 2D CAD Blueprint Execution Spread -->
          <article 
            *ngIf="projects[9]"
            class="premium-card group cursor-pointer border-[#c5a880]/30 hover:border-[#c5a880]"
            (click)="onSelectProject(projects[9])"
            (keydown.enter)="onSelectProject(projects[9])"
            tabindex="0"
            data-cursor="CAD"
          >
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div class="lg:col-span-8 p-6 sm:p-8 bg-[#06080d] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
                <div class="relative w-full aspect-[21/9] sm:aspect-[21/8] overflow-hidden rounded border border-white/10 p-2 bg-[#050608]">
                  <img [src]="projects[9].mainImage" [alt]="projects[9].title" class="w-full h-full object-contain" />
                </div>
              </div>
              <div class="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div class="font-mono text-xs text-[#10b981] font-bold mb-2 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                    <span>TECHNICAL DRAWING PACKAGE</span>
                  </div>
                  <h3 class="text-xl sm:text-2xl font-bold text-white font-display mb-2 group-hover:text-[#c5a880] transition-colors">
                    {{ projects[9].title }}
                  </h3>
                  <p class="text-xs text-[#9aa0ae] leading-relaxed mb-4">
                    {{ projects[9].description }}
                  </p>
                </div>
                <div class="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span class="text-[#c5a880]">AutoCAD 2025</span>
                  <span class="text-white">Inspect Drawing Set &rarr;</span>
                </div>
              </div>
            </div>
          </article>

        </div>

        <!-- Filtered Grid View (When a specific category filter is chosen) -->
        <div *ngIf="selectedCategory() !== 'all'" class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <article 
            *ngFor="let project of filteredProjects(); let idx = index"
            class="premium-card group flex flex-col justify-between cursor-pointer"
            (click)="onSelectProject(project)"
            (keydown.enter)="onSelectProject(project)"
            tabindex="0"
            data-cursor="INSPECT"
          >
            <div>
              <div class="px-6 py-4 border-b border-white/[0.07] flex items-center justify-between font-mono text-xs text-[#9aa0ae]">
                <div class="flex items-center gap-2.5 text-white">
                  <span class="text-[#c5a880] font-mono font-bold">[ 0{{ idx + 1 }} ]</span>
                  <span class="font-semibold tracking-tight uppercase text-xs text-[#f5f5f7]">{{ project.categoryLabel }}</span>
                </div>
                <div class="text-[11px] text-[#9aa0ae]">
                  {{ project.studio }} &bull; {{ project.year }}
                </div>
              </div>

              <div class="relative aspect-[16/10] overflow-hidden bg-black">
                <img 
                  [src]="getCardActiveImage(project)" 
                  [alt]="project.title"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                
                <div class="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[10px] font-mono text-white/90">
                  4K UHD CORONA 11
                </div>

                <!-- Angle Switcher Pills inside image -->
                <div 
                  *ngIf="project.gallery.length > 1" 
                  class="absolute bottom-4 left-4 flex items-center gap-1.5 bg-[#07080a]/90 backdrop-blur-md p-1 rounded border border-white/15"
                  (click)="$event.stopPropagation()"
                >
                  <span class="text-[10px] font-mono text-[#9aa0ae] px-1.5 hidden sm:inline">ANGLES:</span>
                  <button
                    *ngFor="let img of project.gallery.slice(0, 4); let angleIdx = index"
                    type="button"
                    (click)="setCardImage(project.id, img)"
                    [class.bg-white]="getCardActiveImage(project) === img"
                    [class.text-black]="getCardActiveImage(project) === img"
                    [class.text-white]="getCardActiveImage(project) !== img"
                    class="font-mono text-[10px] px-2 py-0.5 rounded transition-all cursor-pointer hover:bg-white/30"
                  >
                    V{{ angleIdx + 1 }}
                  </button>
                  <span *ngIf="project.gallery.length > 4" class="text-[10px] font-mono text-[#9aa0ae] pr-1.5">
                    +{{ project.gallery.length - 4 }}
                  </span>
                </div>

                <div class="absolute bottom-4 right-4 bg-white text-black px-3 py-1 rounded text-xs font-mono font-medium opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-lg">
                  <span>Inspect</span>
                  <span>&rarr;</span>
                </div>
              </div>

              <div class="p-6">
                <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight-custom font-display group-hover:text-[#c5a880] transition-colors mb-2">
                  {{ project.title }}
                </h3>
                <p class="text-xs sm:text-sm text-[#9aa0ae] leading-relaxed mb-4 line-clamp-2">
                  {{ project.subtitle }}
                </p>

                <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#9aa0ae]">
                  <span *ngFor="let tool of project.software" class="bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.08]">
                    {{ tool }}
                  </span>
                  <span *ngIf="project.cadDrawing" class="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    2D CAD Drawing Included
                  </span>
                </div>
              </div>
            </div>

            <div class="px-6 pb-5 pt-3 flex items-center justify-between border-t border-white/[0.07] font-mono text-xs text-[#9aa0ae]">
              <span>{{ project.location }}</span>
              <span class="text-white group-hover:translate-x-1.5 transition-transform flex items-center gap-1 font-medium">
                <span>View Full Case Study</span>
                <span>&rarr;</span>
              </span>
            </div>

          </article>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .line-clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `],
})
export class ProjectGalleryComponent {
  projects = PROJECTS_DATA;
  selectedCategory = signal<ProjectCategory>('all');
  cardImageMap = signal<Record<string, string>>({});
  parallaxOffset = signal(0);
  private isBrowser = false;

  @Output() projectSelected = new EventEmitter<Project>();
  @Output() openVault = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  filterTabs: CategoryFilterTab[] = [
    { id: 'all', label: 'All Works', count: this.projects.length },
    { id: 'bedroom', label: 'Master Bedrooms', count: this.countCategory('bedroom') },
    { id: 'living', label: 'Living & Lounges', count: this.countCategory('living') },
    { id: 'wardrobe', label: 'Wardrobes & Vanities', count: this.countCategory('wardrobe') },
    { id: 'kitchen', label: 'Modular Kitchens', count: this.countCategory('kitchen') },
    { id: 'feature-wall', label: 'Staircase & Foyers', count: this.countCategory('feature-wall') },
    { id: 'exterior', label: 'Villa Architecture', count: this.countCategory('exterior') },
    { id: 'drawings', label: '2D CAD Blueprints', count: this.countCategory('drawings') },
  ];

  filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.projects;
    return this.projects.filter(p => p.category === cat);
  });

  setCategory(cat: ProjectCategory): void {
    this.selectedCategory.set(cat);
  }

  getCardActiveImage(project: Project): string {
    const map = this.cardImageMap();
    return map[project.id] || project.mainImage;
  }

  setCardImage(projectId: string, image: string): void {
    this.cardImageMap.update(m => ({ ...m, [projectId]: image }));
  }

  onSelectProject(project: Project): void {
    this.projectSelected.emit(project);
  }

  private countCategory(cat: ProjectCategory): number {
    return this.projects.filter(p => p.category === cat).length;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.parallaxOffset.set(window.scrollY);
  }
}
