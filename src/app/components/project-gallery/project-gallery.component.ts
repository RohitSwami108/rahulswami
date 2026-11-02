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
    <section id="works" class="py-20 md:py-28 hairline-bottom">
      <div class="editorial-container">
        
        <!-- Header Row -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div class="font-mono text-xs text-[#71717a] uppercase tracking-widest mb-3">
              [ 01 // SELECTED WORKS ]
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight-custom">
              Spatial Projects &amp; Visualizations
            </h2>
          </div>

          <!-- Open 50 Vault Button -->
          <div class="flex items-center gap-3">
            <button 
              type="button"
              (click)="openVault.emit()"
              class="btn-cinema text-xs px-4 py-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <span>Explore Complete 50-Render Vault</span>
              <span class="font-mono text-[10px]">&rarr;</span>
            </button>
          </div>
        </div>

        <!-- Filter Categories (Minimalist Monospace Pills) -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none font-mono text-xs">
          <button 
            *ngFor="let tab of filterTabs"
            type="button"
            (click)="setCategory(tab.id)"
            [class.active]="selectedCategory() === tab.id"
            class="editorial-pill cursor-pointer transition-all"
          >
            <span>{{ tab.label }}</span>
            <span class="opacity-50">({{ tab.count }})</span>
          </button>
        </div>

        <!-- Project Cards (Cinematic Large Grid) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <article 
            *ngFor="let project of filteredProjects(); let idx = index"
            class="editorial-card overflow-hidden group flex flex-col justify-between cursor-pointer"
            (click)="onSelectProject(project)"
          >
            <div>
              <!-- Top Metadata Bar -->
              <div class="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between font-mono text-xs text-[#71717a]">
                <div class="flex items-center gap-2 text-white">
                  <span>[ 0{{ idx + 1 }} ]</span>
                  <span class="font-bold tracking-tight uppercase text-xs">{{ project.categoryLabel }}</span>
                </div>
                <div>
                  {{ project.studio }} &bull; {{ project.year }}
                </div>
              </div>

              <!-- Main Project Image (Aspect 16/10) -->
              <div class="relative aspect-[16/10] overflow-hidden bg-black">
                <img 
                  [src]="project.mainImage" 
                  [alt]="project.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  loading="lazy"
                />
                
                <!-- View Suite Hover Pill -->
                <div class="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white opacity-90 group-hover:opacity-100 transition-opacity">
                  {{ project.gallery.length }} Selected Views &rarr;
                </div>
              </div>

              <!-- Project Title & Description -->
              <div class="p-6">
                <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight-custom group-hover:text-white transition-colors mb-2">
                  {{ project.title }}
                </h3>
                <p class="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-4 line-clamp-2">
                  {{ project.subtitle }}
                </p>

                <!-- Software Stack Pills -->
                <div class="flex flex-wrap gap-1.5 font-mono text-[11px] text-[#71717a]">
                  <span *ngFor="let tool of project.software" class="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                    {{ tool }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Card Bottom Action -->
            <div class="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/[0.06] font-mono text-xs text-[#a1a1aa]">
              <span>{{ project.location }}</span>
              <span class="text-white group-hover:underline flex items-center gap-1">
                <span>Inspect Suite &amp; Specs</span>
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
    return this.projects.filter((p) => p.category === cat);
  });

  setCategory(category: ProjectCategory): void {
    this.selectedCategory.set(category);
  }

  onSelectProject(project: Project): void {
    this.projectSelected.emit(project);
  }

  private countCategory(cat: string): number {
    return this.projects.filter((p) => p.category === cat).length;
  }
}
