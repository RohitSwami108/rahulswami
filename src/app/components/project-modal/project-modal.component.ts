import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { PROJECTS_DATA } from '../../data/portfolio.data';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="project" 
      class="modal-backdrop"
      (click)="onBackdropClick($event)"
    >
      <div 
        class="modal-content relative w-full max-w-6xl max-h-[94vh] overflow-y-auto bg-[#0a0c12] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-9"
        (click)="$event.stopPropagation()"
      >
        <!-- Top Editorial Navigation Bar -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
          <div class="flex items-center gap-3">
            <span class="bg-[#c5a880]/10 text-[#c5a880] px-3 py-1 rounded text-xs font-mono font-bold border border-[#c5a880]/20">
              ARCHITECTURAL CASE STUDY
            </span>
            <div class="flex items-center gap-2 font-mono text-xs text-[#9aa0ae]">
              <span class="text-white font-medium uppercase">{{ project.categoryLabel }}</span>
              <span>&bull;</span>
              <span>{{ project.studio }}</span>
              <span>&bull;</span>
              <span class="text-[#c5a880]">{{ project.year }}</span>
            </div>
          </div>

          <!-- Actions & Close -->
          <div class="flex items-center gap-2.5">
            <!-- Prev / Next Project Switchers -->
            <button 
              type="button"
              (click)="goToPrevProject()"
              class="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Previous Case Study (ArrowLeft)"
              data-cursor="PREV"
            >
              <span>&larr;</span>
              <span>Prev Case Study</span>
            </button>
            <button 
              type="button"
              (click)="goToNextProject()"
              class="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/10 text-white font-mono text-xs border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Next Case Study (ArrowRight)"
              data-cursor="NEXT"
            >
              <span>Next Case Study</span>
              <span>&rarr;</span>
            </button>

            <!-- Close Button -->
            <button 
              type="button"
              (click)="close.emit()" 
              class="p-2 rounded bg-white/5 hover:bg-white/15 text-[#9aa0ae] hover:text-white transition-colors cursor-pointer border border-white/10 ml-2"
              aria-label="Close Case Study"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Project Hero Header with Architectural Focus Stamp -->
        <div class="my-6">
          <div class="flex items-center gap-2.5 text-xs font-mono text-[#c5a880] mb-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>[ FOCUS: {{ getCategoryFocusTitle(project.category) }} ]</span>
            <span class="text-[#616776] hidden sm:inline">&bull;</span>
            <span class="text-[#9aa0ae] hidden sm:inline">{{ project.location }}</span>
          </div>
          <h2 class="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight-custom font-display mb-2">
            {{ project.title }}
          </h2>
          <p class="text-sm sm:text-base text-[#e2cfb6] font-normal leading-relaxed">
            {{ project.subtitle }}
          </p>
        </div>

        <!-- Main Cinematic Hero Render with Full Lightbox Option -->
        <div class="mb-8">
          <div class="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-black border border-white/10 group">
            <img 
              [src]="activeImage()" 
              [alt]="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01] block"
            />

            <!-- Top Left HUD -->
            <div class="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/15 text-xs font-mono text-white flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span>CORONA 11 &bull; 4K UHD PHOTOREALISTIC RENDER</span>
            </div>

            <!-- Bottom Left HUD: Camera Spec -->
            <div *ngIf="project.specs.camera" class="absolute bottom-4 left-4 hidden sm:block bg-black/85 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-[#9aa0ae] border border-white/15">
              {{ project.specs.camera }}
            </div>

            <!-- Fullscreen Lightbox Button -->
            <button 
              type="button"
              (click)="toggleFullscreenImage()"
              class="absolute bottom-4 right-4 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md px-3.5 py-1.5 rounded text-xs font-mono font-medium border border-white/20 transition-colors cursor-pointer flex items-center gap-1.5"
              data-cursor="VIEW"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
              <span>View Fullscreen Lightbox</span>
            </button>
          </div>

          <!-- Multi-Camera Angle Switcher Strip -->
          <div *ngIf="project.gallery && project.gallery.length > 1" class="flex items-center gap-2.5 mt-4 overflow-x-auto pb-2 scrollbar-none">
            <span class="text-xs font-mono text-[#616776] px-1 hidden sm:inline">PERSPECTIVES:</span>
            <button 
              *ngFor="let img of project.gallery; let i = index"
              type="button"
              (click)="activeImage.set(img)"
              [class.border-[#c5a880]]="activeImage() === img"
              [class.opacity-100]="activeImage() === img"
              [class.opacity-50]="activeImage() !== img"
              class="relative w-20 h-14 sm:w-24 sm:h-16 rounded overflow-hidden border-2 border-white/10 shrink-0 cursor-pointer transition-all hover:opacity-100"
            >
              <img [src]="img" [alt]="project.title + ' view ' + (i + 1)" class="w-full h-full object-cover" />
              <div class="absolute bottom-0 right-0 bg-black/80 text-[9px] font-mono text-white px-1">
                V{{ i + 1 }}
              </div>
            </button>
          </div>
        </div>

        <!-- 10: UNIQUE DISCIPLINE-SPECIFIC ARCHITECTURAL FOCUS CARD -->
        <div class="mb-8 p-5 sm:p-6 rounded-xl border border-white/10 bg-[#07090e]">
          <div class="flex items-center gap-2 font-mono text-xs text-[#c5a880] mb-2 font-bold uppercase">
            <span class="w-2 h-2 rounded-full bg-[#10b981]"></span>
            <span>Specialized Discipline Focus: {{ project.categoryLabel }}</span>
          </div>
          <p class="text-xs sm:text-sm text-[#d1d5db] leading-relaxed">
            {{ getCategoryFocusDescription(project.category) }}
          </p>
        </div>

        <!-- Comprehensive Architectural Case Study Breakdown -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/[0.08]">
          
          <!-- Left Column (7 Cols): Project Overview, Highlights & Drawings -->
          <div class="lg:col-span-7 flex flex-col gap-6">
            
            <!-- Design Brief -->
            <div class="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 class="font-mono text-xs uppercase tracking-wider text-[#c5a880] font-bold mb-2.5 flex items-center gap-2">
                <span>[ 01 // DESIGN CONCEPT &amp; CREATIVE DIRECTION ]</span>
              </h3>
              <p class="text-xs sm:text-sm text-[#d1d5db] leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <!-- Architectural Highlights -->
            <div class="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 class="font-mono text-xs uppercase tracking-wider text-[#c5a880] font-bold mb-3">
                [ 02 // KEY ARCHITECTURAL &amp; JOINERY HIGHLIGHTS ]
              </h3>
              <ul class="space-y-2.5">
                <li *ngFor="let item of project.highlights" class="flex items-start gap-2.5 text-xs text-[#d1d5db] leading-relaxed">
                  <span class="text-[#10b981] mt-0.5 font-bold">&check;</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- AutoCAD Technical Execution Drawing (When Available) -->
            <div *ngIf="project.cadDrawing" class="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>[ 03 // AUTOCAD 2025 TECHNICAL DRAWING ]</span>
                </h3>
                <span class="text-[11px] font-mono text-[#9aa0ae]">Millimeter Precision</span>
              </div>
              <div class="relative aspect-[16/9] rounded overflow-hidden bg-[#07080a] border border-white/10 p-2">
                <img [src]="project.cadDrawing" alt="AutoCAD technical elevation" class="w-full h-full object-contain" />
              </div>
            </div>

            <!-- Software Tools Pipeline -->
            <div>
              <div class="font-mono text-xs uppercase tracking-wider text-[#616776] mb-2">
                Software &amp; Production Stack
              </div>
              <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#9aa0ae]">
                <span *ngFor="let tool of project.software" class="bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.08]">
                  {{ tool }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right Column (5 Cols): Technical Specifications & Material Palette -->
          <div class="lg:col-span-5 flex flex-col gap-5 bg-white/[0.02] p-6 rounded-xl border border-white/[0.06] font-mono">
            
            <div class="text-xs uppercase tracking-wider text-[#c5a880] font-bold pb-3 border-b border-white/[0.08]">
              TECHNICAL SPECIFICATIONS HUD
            </div>

            <!-- Dimensions -->
            <div *ngIf="project.specs.dimensions">
              <div class="text-[10px] text-[#616776] uppercase">Spatial Dimensions</div>
              <div class="text-xs font-bold text-white mt-0.5">
                {{ project.specs.dimensions }}
              </div>
            </div>

            <!-- Studio & Location -->
            <div>
              <div class="text-[10px] text-[#616776] uppercase">Studio &amp; Location</div>
              <div class="text-xs text-white mt-0.5">
                {{ project.studio }} &bull; {{ project.location }}
              </div>
            </div>

            <!-- Render Engine & Setup -->
            <div>
              <div class="text-[10px] text-[#616776] uppercase">Render Engine &amp; Camera</div>
              <div class="text-xs text-white mt-0.5">
                {{ project.specs.renderEngine || 'Corona Renderer 11 (3ds Max 2024)' }}
              </div>
              <div *ngIf="project.specs.camera" class="text-xs text-[#9aa0ae] mt-0.5">
                {{ project.specs.camera }}
              </div>
            </div>

            <!-- Lighting Scheme -->
            <div *ngIf="project.specs.lighting">
              <div class="text-[10px] text-[#616776] uppercase">Lighting Scheme</div>
              <div class="text-xs text-[#e2cfb6] mt-0.5 leading-relaxed">
                {{ project.specs.lighting }}
              </div>
            </div>

            <!-- Material Curation Board -->
            <div *ngIf="project.specs.materials && project.specs.materials.length">
              <div class="text-[10px] text-[#616776] uppercase mb-2">PBR Material Palette</div>
              <div class="space-y-1.5">
                <div *ngFor="let mat of project.specs.materials" class="flex items-center gap-2 text-xs text-[#d1d5db]">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
                  <span>{{ mat }}</span>
                </div>
              </div>
            </div>

            <!-- Color Palette Swatches -->
            <div *ngIf="project.specs.colorPalette && project.specs.colorPalette.length">
              <div class="text-[10px] text-[#616776] uppercase mb-2.5">Studio Color Palette</div>
              <div class="flex items-center gap-3">
                <div 
                  *ngFor="let color of project.specs.colorPalette" 
                  class="flex flex-col items-center gap-1"
                  [title]="color.name + ' (' + color.hex + ')'"
                >
                  <div 
                    class="w-7 h-7 rounded border border-white/20 shadow-md"
                    [style.backgroundColor]="color.hex"
                  ></div>
                  <span class="text-[9px] text-[#9aa0ae]">{{ color.hex }}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- Case Study Footer Navigation -->
        <div class="flex flex-wrap items-center justify-between gap-4 pt-6 mt-8 border-t border-white/[0.08] font-mono text-xs">
          <div class="text-[#616776]">
            {{ project.title }} &bull; Rahul Swami &bull; +91 9717379245
          </div>

          <div class="flex items-center gap-3">
            <button 
              type="button"
              (click)="close.emit()" 
              class="btn-ghost-action text-xs px-4 py-2"
            >
              Back to Gallery
            </button>
            <a 
              href="#contact" 
              (click)="close.emit()"
              class="btn-primary-action text-xs px-4 py-2"
            >
              Inquire Project &rarr;
            </a>
          </div>
        </div>

      </div>

      <!-- Fullscreen Lightbox Overlay (when fullscreen requested) -->
      <div 
        *ngIf="isFullscreen()" 
        class="fixed inset-0 z-[1100] bg-black/98 flex items-center justify-center p-4"
        (click)="isFullscreen.set(false)"
      >
        <button 
          type="button"
          (click)="isFullscreen.set(false)"
          class="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <img 
          [src]="activeImage()" 
          [alt]="project.title" 
          class="max-w-[95vw] max-h-[92vh] object-contain shadow-2xl select-none"
          (click)="$event.stopPropagation()"
        />
      </div>

    </div>
  `,
  styles: [],
})
export class ProjectModalComponent {
  private _project: Project | null = null;
  activeImage = signal<string>('');
  isFullscreen = signal(false);

  projects = PROJECTS_DATA;

  @Input()
  set project(val: Project | null) {
    this._project = val;
    if (val) {
      this.activeImage.set(val.mainImage);
      this.isFullscreen.set(false);
    }
  }

  get project(): Project | null {
    return this._project;
  }

  @Output() close = new EventEmitter<void>();

  onBackdropClick(event: MouseEvent): void {
    this.close.emit();
  }

  toggleFullscreenImage(): void {
    this.isFullscreen.update(v => !v);
  }

  goToNextProject(): void {
    if (!this.project) return;
    const currentIndex = this.projects.findIndex(p => p.id === this.project?.id);
    const nextIndex = (currentIndex + 1) % this.projects.length;
    this.project = this.projects[nextIndex];
  }

  goToPrevProject(): void {
    if (!this.project) return;
    const currentIndex = this.projects.findIndex(p => p.id === this.project?.id);
    const prevIndex = (currentIndex - 1 + this.projects.length) % this.projects.length;
    this.project = this.projects[prevIndex];
  }

  getCategoryFocusTitle(category: string): string {
    switch (category) {
      case 'bedroom':
        return 'Mood, Lighting Atmosphere & Bouclé/Velvet Detailing';
      case 'living':
        return 'Spatial Planning, Architectural Arches & Media Wall Console';
      case 'wardrobe':
        return 'Carcass Joinery, Fluted Glass & Hafele/Hettich Hardware';
      case 'kitchen':
        return 'Ergonomics, Handle-less Gola Profiles & Quartz Detailing';
      case 'exterior':
        return 'Facade Proportions, Exterior Dusk Lighting & Stone Cladding';
      case 'drawings':
        return 'AutoCAD Working Drawing Sheets & Millimeter Execution Details';
      default:
        return 'Spatial Geometry, Lighting & Joinery Integration';
    }
  }

  getCategoryFocusDescription(category: string): string {
    switch (category) {
      case 'bedroom':
        return 'Focuses on creating intimate, sensory bedroom sanctuaries. Features bespoke curved wingback headboards, acoustic fluted slats, 3000K concealed warm cove illumination, and balanced two-point camera compositions in Corona Renderer.';
      case 'living':
        return 'Emphasizes spacious circulation, sweeping continuous architectural arches, warm perimeter LED channels, and natural white oak floating credenzas designed for seamless residential entertaining.';
      case 'wardrobe':
        return 'Details 18mm BWR plywood carcass joinery, aluminum slim bronze profiles, tinted smoked glass shutters, and sensor-activated internal illumination rods for high-end walk-in wardrobes.';
      case 'kitchen':
        return 'Focuses on working ergonomics, handle-less J-pull and Gola aluminum profiles, lift-up fluted glass wall shutters, seamless quartz backsplashes, and integrated appliance fitments.';
      case 'exterior':
        return 'Highlights 3-storey contemporary facade geometry, travertine stone cladding, vertical louvers, perimeter dusk exterior illumination, and structural framing rendered with volumetric sky models.';
      case 'drawings':
        return 'Demonstrates millimeter-accurate technical working drawings produced in AutoCAD 2025, detailing carpenter fabrication elevations, sectional joinery, false ceiling levels, and electrical point markers.';
      default:
        return 'Cohesive spatial integration combining photorealistic 3D rendering with on-site AutoCAD technical execution.';
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.project) return;

    if (event.key === 'Escape') {
      if (this.isFullscreen()) {
        this.isFullscreen.set(false);
      } else {
        this.close.emit();
      }
    } else if (event.key === 'ArrowRight') {
      this.goToNextProject();
    } else if (event.key === 'ArrowLeft') {
      this.goToPrevProject();
    }
  }
}
