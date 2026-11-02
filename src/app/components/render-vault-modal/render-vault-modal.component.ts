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
        class="modal-content relative w-full max-w-6xl max-h-[94vh] overflow-hidden bg-[#090c12] border border-white/15 rounded-2xl shadow-2xl flex flex-col"
        (click)="$event.stopPropagation()"
      >
        <!-- Top Toolbar -->
        <div class="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#06080d]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#c5a059]/20 flex items-center justify-center text-[#e5c378] font-bold text-xs">
              50
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                <span>Complete 50-Render Portfolio Vault</span>
                <span class="tag-badge gold text-[10px] hidden sm:inline">Corona 11 &bull; 4K UHD</span>
              </h3>
              <p class="text-xs text-slate-400 font-mono">
                Rahul Swami &bull; Authentic 3D Visualizer &amp; Interior Designer Works
              </p>
            </div>
          </div>

          <!-- Counter & Close -->
          <div class="flex items-center gap-4">
            <div class="text-xs font-mono text-[#00f5d4] bg-[#00f5d4]/10 px-3 py-1 rounded-full border border-[#00f5d4]/20">
              {{ currentIndex() + 1 }} / {{ filteredItems().length }}
            </div>

            <button 
              type="button"
              (click)="close.emit()" 
              class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Render Vault"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Filter Category Chips -->
        <div class="px-5 py-2.5 bg-[#0b0e16] border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <button 
            *ngFor="let cat of categories" 
            type="button"
            (click)="setCategory(cat.id)"
            [class.active-cat]="selectedCategory() === cat.id"
            class="vault-cat-btn"
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
            class="nav-arrow left-4"
            aria-label="Previous Render"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <!-- Current High-Res Render -->
          <img 
            [src]="currentItem().imagePath" 
            [alt]="currentItem().title"
            class="max-h-[60vh] sm:max-h-[65vh] w-auto max-w-full object-contain transition-all duration-300 select-none shadow-2xl"
          />

          <!-- Next Button -->
          <button 
            type="button"
            (click)="nextImage()"
            class="nav-arrow right-4"
            aria-label="Next Render"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <!-- Overlay Information Bar -->
          <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div class="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white flex items-center gap-2 pointer-events-auto">
              <span class="w-2 h-2 rounded-full bg-[#c5a059]"></span>
              <span class="font-bold text-[#e5c378]">{{ currentItem().title }}</span>
              <span class="text-slate-400">|</span>
              <span class="text-[#00f5d4]">{{ currentItem().category }}</span>
              <span class="text-slate-500 hidden sm:inline">&bull; {{ currentItem().fileName }}</span>
            </div>

            <div class="hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-slate-300 pointer-events-auto">
              <span>Use &larr; &rarr; arrow keys to navigate</span>
            </div>
          </div>
        </div>

        <!-- Bottom Thumbnail Strip -->
        <div class="p-3 bg-[#07090e] border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button 
            *ngFor="let item of filteredItems(); let i = index"
            type="button"
            (click)="currentIndex.set(i)"
            [class.active-thumb]="currentIndex() === i"
            class="relative w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden border border-white/10 shrink-0 cursor-pointer transition-all hover:border-[#c5a059]"
            [title]="item.title"
          >
            <img [src]="item.imagePath" [alt]="item.title" class="w-full h-full object-cover" loading="lazy" />
            <div class="absolute bottom-0 right-0 bg-black/80 text-[9px] font-mono text-slate-300 px-1 rounded-tl">
              {{ item.id }}
            </div>
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(10, 14, 22, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 20;
      backdrop-filter: blur(8px);
      transition: all 0.2s ease;
    }
    .nav-arrow:hover {
      background: var(--accent-gold);
      color: #000000;
      border-color: var(--accent-gold);
      box-shadow: 0 0 15px rgba(197, 160, 89, 0.5);
    }
    .vault-cat-btn {
      padding: 0.35rem 0.8rem;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .vault-cat-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
    }
    .active-cat {
      background: rgba(197, 160, 89, 0.18) !important;
      border-color: rgba(197, 160, 89, 0.45) !important;
      color: #e5c378 !important;
    }
    .active-thumb {
      border-color: var(--accent-gold) !important;
      box-shadow: 0 0 10px rgba(197, 160, 89, 0.6);
      transform: scale(1.06);
    }
  `],
})
export class RenderVaultModalComponent {
  items = RENDER_VAULT_ITEMS;

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  currentIndex = signal(0);
  selectedCategory = signal<string>('all');

  categories = [
    { id: 'all', label: 'All 50 Renders' },
    { id: 'Living & TV Wall', label: 'Living & TV Lounges' },
    { id: 'Master Bedroom', label: 'Master Bedrooms' },
    { id: 'Bedroom Design', label: 'Modern Suites' },
    { id: 'Custom Wardrobe', label: 'Wardrobes & Vanities' },
    { id: 'Modular Kitchen', label: 'Modular Kitchens' },
    { id: 'Feature Wall & Foyer', label: 'Staircase & Foyers' },
    { id: 'Villa Facade', label: 'Villa Facades' },
    { id: 'Home Office', label: 'Home Offices' },
    { id: 'Commercial', label: 'Commercial' },
  ];

  filteredItems = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.items;
    return this.items.filter((item) => item.category === cat);
  });

  currentItem = computed(() => {
    const list = this.filteredItems();
    const idx = this.currentIndex();
    if (idx >= list.length) {
      return list[0] || this.items[0];
    }
    return list[idx] || this.items[0];
  });

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.currentIndex.set(0);
  }

  getCategoryCount(cat: string): number {
    if (cat === 'all') return this.items.length;
    return this.items.filter((item) => item.category === cat).length;
  }

  nextImage(): void {
    const total = this.filteredItems().length;
    this.currentIndex.update((i) => (i + 1) % total);
  }

  prevImage(): void {
    const total = this.filteredItems().length;
    this.currentIndex.update((i) => (i - 1 + total) % total);
  }

  onBackdropClick(event: MouseEvent): void {
    this.close.emit();
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isOpen) {
      this.close.emit();
    }
  }

  @HostListener('window:keydown.arrowright')
  onArrowRight(): void {
    if (this.isOpen) {
      this.nextImage();
    }
  }

  @HostListener('window:keydown.arrowleft')
  onArrowLeft(): void {
    if (this.isOpen) {
      this.prevImage();
    }
  }
}

