import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
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
        class="modal-content relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0a0a0d] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8"
        (click)="$event.stopPropagation()"
      >
        <!-- Top Bar -->
        <div class="flex items-start justify-between gap-4 pb-5 hairline-bottom">
          <div>
            <div class="flex items-center gap-2 font-mono text-xs text-[#71717a] mb-1.5">
              <span class="text-white font-medium uppercase">{{ project.categoryLabel }}</span>
              <span>&bull;</span>
              <span>{{ project.studio }}</span>
              <span>&bull;</span>
              <span>{{ project.location }}</span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight-custom">
              {{ project.title }}
            </h3>
            <p class="text-xs sm:text-sm text-[#a1a1aa] mt-1 font-normal">
              {{ project.subtitle }}
            </p>
          </div>

          <!-- Close Button -->
          <button 
            type="button"
            (click)="close.emit()" 
            class="p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer border border-white/10"
            aria-label="Close Case Study"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Main Image / Multi-Angle Carousel -->
        <div class="my-6">
          <div class="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-black border border-white/10 group">
            <img 
              [src]="activeImage()" 
              [alt]="project.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />

            <!-- 4K Badge -->
            <div class="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-[#a1a1aa] border border-white/10">
              4K Corona Photorealistic Render
            </div>
          </div>

          <!-- Gallery Thumbnails -->
          <div *ngIf="project.gallery && project.gallery.length > 1" class="flex items-center gap-2.5 mt-4 overflow-x-auto pb-2 scrollbar-none">
            <button 
              *ngFor="let img of project.gallery; let i = index"
              type="button"
              (click)="activeImage.set(img)"
              [class.border-white]="activeImage() === img"
              [class.opacity-100]="activeImage() === img"
              [class.opacity-50]="activeImage() !== img"
              class="relative w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 border-white/10 shrink-0 cursor-pointer transition-all hover:opacity-100"
            >
              <img [src]="img" [alt]="project.title + ' view ' + i" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Project Detail Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 hairline-top">
          
          <!-- Left Details: Description & Key Highlights -->
          <div class="lg:col-span-7 flex flex-col gap-5">
            <div>
              <h4 class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-2">
                Project Design Brief
              </h4>
              <p class="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <div>
              <h4 class="font-mono text-xs uppercase tracking-wider text-white font-bold mb-3">
                Key Architectural Highlights
              </h4>
              <ul class="space-y-2">
                <li *ngFor="let item of project.highlights" class="flex items-start gap-2.5 text-xs text-[#d4d4d8]">
                  <span class="text-white mt-0.5">&bull;</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- Software Stack -->
            <div>
              <h4 class="font-mono text-xs uppercase tracking-wider text-[#71717a] mb-2">
                Software &amp; Tools Pipeline
              </h4>
              <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#a1a1aa]">
                <span *ngFor="let tool of project.software" class="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  {{ tool }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right Details: Material Palette & Render Specifications -->
          <div class="lg:col-span-5 flex flex-col gap-4 bg-white/[0.02] p-5 rounded-xl border border-white/[0.06] font-mono">
            
            <!-- Dimensions -->
            <div *ngIf="project.specs.dimensions">
              <div class="text-[11px] text-[#71717a] uppercase">Spatial Dimensions</div>
              <div class="text-xs font-bold text-white mt-0.5">
                {{ project.specs.dimensions }}
              </div>
            </div>

            <!-- Render Engine & Camera Setup -->
            <div *ngIf="project.specs.camera || project.specs.renderEngine">
              <div class="text-[11px] text-[#71717a] uppercase">Camera &amp; Render Engine</div>
              <div class="text-xs text-white mt-1">
                {{ project.specs.renderEngine || 'Corona Renderer 11' }}
              </div>
              <div class="text-xs text-[#a1a1aa] mt-0.5">
                {{ project.specs.camera }}
              </div>
            </div>

            <!-- Lighting Design Scheme -->
            <div *ngIf="project.specs.lighting">
              <div class="text-[11px] text-[#71717a] uppercase">Lighting Scheme</div>
              <div class="text-xs text-[#d4d4d8] mt-1 leading-relaxed">
                {{ project.specs.lighting }}
              </div>
            </div>

            <!-- Material Curation Board -->
            <div *ngIf="project.specs.materials && project.specs.materials.length">
              <div class="text-[11px] text-[#71717a] uppercase mb-2">Material Palette</div>
              <div class="space-y-1">
                <div *ngFor="let mat of project.specs.materials" class="flex items-center gap-2 text-xs text-[#a1a1aa]">
                  <span class="w-1 h-1 rounded-full bg-white"></span>
                  <span>{{ mat }}</span>
                </div>
              </div>
            </div>

            <!-- Color Palette Swatches -->
            <div *ngIf="project.specs.colorPalette && project.specs.colorPalette.length">
              <div class="text-[11px] text-[#71717a] uppercase mb-2">Color Swatches</div>
              <div class="flex items-center gap-2">
                <div 
                  *ngFor="let color of project.specs.colorPalette" 
                  class="flex flex-col items-center gap-1"
                  [title]="color.name + ' (' + color.hex + ')'"
                >
                  <div 
                    class="w-6 h-6 rounded-full border border-white/20"
                    [style.backgroundColor]="color.hex"
                  ></div>
                  <span class="text-[9px] text-[#71717a]">{{ color.hex }}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- Modal Footer Actions -->
        <div class="flex items-center justify-between pt-6 mt-6 hairline-top font-mono text-xs">
          <div class="text-[#71717a]">
            Rahul Swami &bull; +91 9717379245 &bull; New Delhi
          </div>
          <div class="flex items-center gap-3">
            <button 
              type="button"
              (click)="close.emit()" 
              class="btn-cinema-ghost text-xs px-4 py-2"
            >
              Close
            </button>
            <a 
              href="#contact" 
              (click)="close.emit()"
              class="btn-cinema text-xs px-4 py-2"
            >
              Inquire Project &rarr;
            </a>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [],
})
export class ProjectModalComponent {
  private _project: Project | null = null;
  activeImage = signal<string>('');

  @Input()
  set project(val: Project | null) {
    this._project = val;
    if (val) {
      this.activeImage.set(val.mainImage);
    }
  }

  get project(): Project | null {
    return this._project;
  }

  @Output() close = new EventEmitter<void>();

  onBackdropClick(event: MouseEvent): void {
    this.close.emit();
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.project) {
      this.close.emit();
    }
  }
}
