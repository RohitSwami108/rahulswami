import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, computed, signal } from '@angular/core';
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
    <section id="works" class="py-20 md:py-28 border-b border-white/[0.08] relative">
      <div class="portfolio-container">
        
        <!-- Header Row -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div class="section-label">
              [ 01 // SELECTED STUDIO WORKS ]
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight-custom mb-3">
              Spatial Projects &amp; Visualizations
            </h2>
            <p class="text-base text-[#9ca3af] max-w-2xl font-normal leading-relaxed">
              Curated residential suites, custom millwork, and exterior facades produced across studio practice, modeled in 3ds Max and rendered in Corona Renderer 11 with AutoCAD execution sets.
            </p>
          </div>

          <!-- Open Complete 50-Render Vault CTA -->
          <div class="flex items-center gap-3 shrink-0">
            <button 
              type="button"
              (click)="openVault.emit()"
              class="btn-primary-action text-xs px-4 py-2.5 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span>Explore Complete 50-Render Vault</span>
              <span class="font-mono text-[10px]">&rarr;</span>
            </button>
          </div>
        </div>

        <!-- Filter Category Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none font-mono text-xs">
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

        <!-- Projects Grid (Consistent Editorial Grid) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <article 
            *ngFor="let project of filteredProjects(); let idx = index"
            class="premium-card group flex flex-col justify-between cursor-pointer"
            (click)="onSelectProject(project)"
          >
            <div>
              <!-- Top Metadata Strip -->
              <div class="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between font-mono text-xs text-[#9ca3af]">
                <div class="flex items-center gap-2.5 text-white">
                  <span class="text-[#6b7280] font-mono">[ 0{{ idx + 1 }} ]</span>
                  <span class="font-semibold tracking-tight uppercase text-xs text-[#f3f4f6]">{{ project.categoryLabel }}</span>
                </div>
                <div class="text-[11px] text-[#9ca3af]">
                  {{ project.studio }} &bull; {{ project.year }}
                </div>
              </div>

              <!-- Main Project Image Viewport with Multi-Angle Quick Switcher -->
              <div class="relative aspect-[16/10] overflow-hidden bg-black">
                <img 
                  [src]="getCardActiveImage(project)" 
                  [alt]="project.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                
                <!-- Corner 4K Corona Badge -->
                <div class="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono text-white/90">
                  4K UHD RENDER
                </div>

                <!-- Angle Switcher Pills inside image for recruiter preview -->
                <div 
                  *ngIf="project.gallery.length > 1" 
                  class="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 rounded-full border border-white/15"
                  (click)="$event.stopPropagation()"
                >
                  <span class="text-[10px] font-mono text-[#9ca3af] px-1.5 hidden sm:inline">ANGLES:</span>
                  <button
                    *ngFor="let img of project.gallery.slice(0, 4); let angleIdx = index"
                    type="button"
                    (click)="setCardImage(project.id, img)"
                    [class.bg-white]="getCardActiveImage(project) === img"
                    [class.text-black]="getCardActiveImage(project) === img"
                    [class.text-white]="getCardActiveImage(project) !== img"
                    class="font-mono text-[10px] px-2 py-0.5 rounded-full transition-all cursor-pointer hover:bg-white/30"
                    [title]="'View angle ' + (angleIdx + 1)"
                  >
                    V{{ angleIdx + 1 }}
                  </button>
                  <span *ngIf="project.gallery.length > 4" class="text-[10px] font-mono text-[#9ca3af] pr-1.5">
                    +{{ project.gallery.length - 4 }}
                  </span>
                </div>

                <!-- Inspect Pill on Hover -->
                <div class="absolute bottom-4 right-4 bg-white text-black px-3 py-1 rounded-full text-xs font-mono font-medium opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-lg">
                  <span>Inspect Suite</span>
                  <span>&rarr;</span>
                </div>
              </div>

              <!-- Project Title & Subtitle -->
              <div class="p-6">
                <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight-custom group-hover:text-white transition-colors mb-2">
                  {{ project.title }}
                </h3>
                <p class="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-4 line-clamp-2">
                  {{ project.subtitle }}
                </p>

                <!-- Technical Software Tags -->
                <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#9ca3af]">
                  <span *ngFor="let tool of project.software" class="bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/[0.08]">
                    {{ tool }}
                  </span>
                  <span *ngIf="project.cadDrawing" class="bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    2D CAD Drawing Included
                  </span>
                </div>
              </div>
            </div>

            <!-- Card Bottom Footer Strip -->
            <div class="px-6 pb-5 pt-3 flex items-center justify-between border-t border-white/[0.06] font-mono text-xs text-[#9ca3af]">
              <span>{{ project.location }}</span>
              <span class="text-white group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
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

  @Output() projectSelected = new EventEmitter<Project>();
  @Output() openVault = new EventEmitter<void>();

  filterTabs: CategoryFilterTab[] = [
    { id: 'all', label: 'All Works', count: this.projects.length },
    { id: 'bedroom', label: 'Master Bedrooms', count: this.countCategory('bedroom') },
    { id: 'living', label: 'Living & TV Lounges', count: this.countCategory('living') },
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
}
