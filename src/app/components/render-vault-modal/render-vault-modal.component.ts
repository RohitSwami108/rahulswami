import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, computed, signal } from '@angular/core';
import { RENDER_VAULT_ITEMS } from '../../data/portfolio.data';
import { RenderVaultItem } from '../../models/portfolio.models';

@Component({
  selector: 'app-render-vault-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="isOpen" 
      class="modal-backdrop"
      (click)="onBackdropClick($event)"
    >
      <div 
        class="modal-content relative w-full max-w-6xl max-h-[94vh] overflow-hidden bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl flex flex-col"
        (click)="$event.stopPropagation()"
      >
        <!-- Top Toolbar -->
        <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#08090d]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-mono font-bold text-xs">
              50
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-bold text-white tracking-tight-custom flex items-center gap-2">
                <span>Complete 50-Render Master Vault</span>
                <span class="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 hidden sm:inline">
                  Corona 11 &bull; 4K UHD
                </span>
              </h3>
              <p class="text-xs text-[#9ca3af] font-mono">
                Authentic Studio 3D Visualizer &amp; Interior Designer Works by Rahul Swami
              </p>
            </div>
          </div>

          <!-- Counter & Close -->
          <div class="flex items-center gap-4">
            <div class="text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-full border border-white/15">
              {{ currentIndex() + 1 }} / {{ filteredItems().length }}
            </div>

            <button 
              type="button"
              (click)="close.emit()" 
              class="p-2 rounded-full bg-white/5 hover:bg-white/20 text-[#9ca3af] hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Close Render Vault"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Filter Category Chips -->
        <div class="px-6 py-2.5 bg-[#0f1118] border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none font-mono text-xs">
          <button 
            *ngFor="let cat of categories" 
            type="button"
            (click)="setCategory(cat.id)"
            [class.bg-white]="selectedCategory() === cat.id"
            [class.text-black]="selectedCategory() === cat.id"
            [class.text-[#9ca3af]]="selectedCategory() !== cat.id"
            class="px-3 py-1 rounded-full border border-white/10 transition-all cursor-pointer hover:text-white whitespace-nowrap text-xs"
          >
            {{ cat.label }} ({{ getCategoryCount(cat.id) }})
          </button>
        </div>

        <!-- Main Image Display & Navigation -->
        <div class="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[480px]">
          <!-- Prev Button -->
          <button 
            type="button"
            (click)="prevImage()"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center cursor-pointer transition-all z-20 backdrop-blur-md"
            aria-label="Previous Render"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <!-- Current High-Res Render -->
          <img 
            [src]="currentItem().imagePath" 
            [alt]="currentItem().title"
            class="max-h-[60vh] sm:max-h-[66vh] w-auto max-w-full object-contain transition-all duration-300 select-none shadow-2xl"
          />

          <!-- Next Button -->
          <button 
            type="button"
            (click)="nextImage()"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center cursor-pointer transition-all z-20 backdrop-blur-md"
            aria-label="Next Render"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <!-- Overlay Information Bar -->
          <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div class="bg-black/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-white flex items-center gap-2.5 pointer-events-auto">
              <span class="w-2 h-2 rounded-full bg-[#10b981]"></span>
              <span class="font-bold text-white">{{ currentItem().title }}</span>
              <span class="text-[#6b7280]">|</span>
              <span class="text-[#9ca3af]">{{ currentItem().category }}</span>
              <span class="text-[#6b7280] hidden sm:inline">&bull; {{ currentItem().fileName }}</span>
            </div>

            <div class="hidden sm:flex items-center gap-2 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-[#9ca3af] pointer-events-auto">
              <span>Navigate with &larr; &rarr; keys</span>
            </div>
          </div>
        </div>

        <!-- Bottom Thumbnail Strip -->
        <div class="p-3 bg-[#08090d] border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button 
            *ngFor="let item of filteredItems(); let i = index"
            type="button"
            (click)="currentIndex.set(i)"
            [class.border-white]="currentIndex() === i"
            [class.border-white/10]="currentIndex() !== i"
            class="relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer transition-all hover:border-white/60"
            [title]="item.title"
          >
            <img [src]="item.imagePath" [alt]="item.title" class="w-full h-full object-cover" loading="lazy" />
            <div class="absolute bottom-0 right-0 bg-black/80 text-[9px] font-mono text-white px-1 rounded-tl">
              {{ item.id }}
            </div>
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [],
})
export class RenderVaultModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  items: RenderVaultItem[] = RENDER_VAULT_ITEMS;
  currentIndex = signal(0);
  selectedCategory = signal<string>('all');

  categories = [
    { id: 'all', label: 'All 50 Renders' },
    { id: 'Bedrooms', label: 'Bedrooms' },
    { id: 'Living Rooms', label: 'Living & Media' },
    { id: 'Wardrobes & Vanities', label: 'Wardrobes' },
    { id: 'Modular Kitchens', label: 'Kitchens' },
    { id: 'Stairs & Foyers', label: 'Foyers & Stairs' },
    { id: 'Villa Facade', label: 'Villa Facades' },
  ];

  filteredItems = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.items;
    return this.items.filter(item => item.category === cat);
  });

  currentItem = computed(() => {
    const list = this.filteredItems();
    const idx = this.currentIndex();
    return list[idx] || list[0] || this.items[0];
  });

  setCategory(catId: string): void {
    this.selectedCategory.set(catId);
    this.currentIndex.set(0);
  }

  getCategoryCount(catId: string): number {
    if (catId === 'all') return this.items.length;
    return this.items.filter(item => item.category === catId).length;
  }

  nextImage(): void {
    const list = this.filteredItems();
    this.currentIndex.update(i => (i + 1) % list.length);
  }

  prevImage(): void {
    const list = this.filteredItems();
    this.currentIndex.update(i => (i - 1 + list.length) % list.length);
  }

  onBackdropClick(event: MouseEvent): void {
    this.close.emit();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) return;

    if (event.key === 'Escape') {
      this.close.emit();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    }
  }
}
