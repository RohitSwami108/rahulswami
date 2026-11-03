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
        class="modal-content relative w-full max-w-7xl max-h-[95vh] overflow-hidden bg-[#08090d] border border-white/15 rounded-2xl shadow-2xl flex flex-col"
        (click)="$event.stopPropagation()"
      >
        <!-- Top Toolbar -->
        <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0b0d14]">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] font-mono font-bold text-xs">
              50
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-bold text-white tracking-tight-custom font-display flex items-center gap-2">
                <span>Complete 50-Render Master Vault</span>
                <span class="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/20 hidden sm:inline">
                  Corona 11 &bull; 4K UHD Studio Archive
                </span>
              </h3>
              <p class="text-xs text-[#9aa0ae] font-mono">
                Authentic Studio 3D Visualizer &amp; Interior Designer Works by Rahul Swami
              </p>
            </div>
          </div>

          <!-- View Mode & Close -->
          <div class="flex items-center gap-3 font-mono text-xs">
            <!-- View Mode Switcher: Grid vs Cinema Focus -->
            <div class="hidden sm:flex items-center gap-1 bg-[#07080a] p-1 rounded border border-white/10 text-xs">
              <button
                type="button"
                (click)="viewMode.set('grid')"
                [class.bg-white]="viewMode() === 'grid'"
                [class.text-black]="viewMode() === 'grid'"
                [class.text-[#9aa0ae]]="viewMode() !== 'grid'"
                class="px-2.5 py-1 rounded transition-colors cursor-pointer"
              >
                Grid View
              </button>
              <button
                type="button"
                (click)="viewMode.set('cinema')"
                [class.bg-white]="viewMode() === 'cinema'"
                [class.text-black]="viewMode() === 'cinema'"
                [class.text-[#9aa0ae]]="viewMode() !== 'cinema'"
                class="px-2.5 py-1 rounded transition-colors cursor-pointer"
              >
                Cinema View
              </button>
            </div>

            <!-- Close Button -->
            <button 
              type="button"
              (click)="close.emit()" 
              class="p-2 rounded bg-white/5 hover:bg-white/20 text-[#9aa0ae] hover:text-white transition-colors cursor-pointer border border-white/10"
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
            [class.text-[#9aa0ae]]="selectedCategory() !== cat.id"
            class="px-3 py-1 rounded border border-white/10 transition-all cursor-pointer hover:text-white whitespace-nowrap text-xs"
          >
            {{ cat.label }} ({{ getCategoryCount(cat.id) }})
          </button>
        </div>

        <!-- VIEW MODE 1: MASONRY / EDITORIAL GRID VIEW -->
        <div *ngIf="viewMode() === 'grid'" class="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#07080a]">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
            <div 
              *ngFor="let item of filteredItems(); let i = index"
              (click)="openInCinema(i)"
              class="group relative aspect-[4/3] rounded overflow-hidden bg-black border border-white/10 hover:border-[#c5a880]/50 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <img 
                [src]="item.imagePath" 
                [alt]="item.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
              
              <!-- Top Number Tag -->
              <div class="absolute top-2 left-2 bg-[#07080a]/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-white/90 border border-white/10">
                #{{ item.id < 10 ? '0' + item.id : item.id }}
              </div>

              <!-- Bottom Title & Category -->
              <div class="absolute bottom-2 left-2 right-2">
                <div class="text-[9px] font-mono text-[#c5a880] truncate">{{ item.category }}</div>
                <div class="text-xs font-bold text-white truncate font-display">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- VIEW MODE 2: CINEMA FOCUS LIGHTBOX VIEW -->
        <div *ngIf="viewMode() === 'cinema'" class="relative flex-1 bg-black flex flex-col justify-between overflow-hidden">
          
          <!-- Image Viewport -->
          <div class="relative flex-1 flex items-center justify-center p-4 min-h-[380px] sm:min-h-[500px]">
            <!-- Prev Button -->
            <button 
              type="button"
              (click)="prevImage()"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center cursor-pointer transition-all z-20 backdrop-blur-md shadow-xl"
              aria-label="Previous Render"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <!-- Current High-Res Render -->
            <img 
              [src]="currentItem().imagePath" 
              [alt]="currentItem().title"
              class="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain transition-all duration-300 select-none shadow-2xl"
            />

            <!-- Next Button -->
            <button 
              type="button"
              (click)="nextImage()"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center cursor-pointer transition-all z-20 backdrop-blur-md shadow-xl"
              aria-label="Next Render"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <!-- Bottom Left Info HUD -->
            <div class="absolute bottom-4 left-4 bg-[#07080a]/90 backdrop-blur-md px-4 py-2 rounded border border-white/15 text-xs font-mono text-white flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span class="font-bold text-white">{{ currentItem().title }}</span>
              <span class="text-[#616776]">|</span>
              <span class="text-[#c5a880]">{{ currentItem().category }}</span>
              <span class="text-[#9aa0ae] hidden sm:inline">&bull; {{ currentItem().fileName }}</span>
            </div>

            <!-- Bottom Right Counter HUD -->
            <div class="absolute bottom-4 right-4 bg-[#07080a]/90 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/15 text-xs font-mono text-white">
              {{ currentIndex() + 1 }} / {{ filteredItems().length }}
            </div>
          </div>

          <!-- Bottom Thumbnail Navigator -->
          <div class="p-3 bg-[#08090d] border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button 
              *ngFor="let item of filteredItems(); let i = index"
              type="button"
              (click)="currentIndex.set(i)"
              [class.border-[#c5a880]]="currentIndex() === i"
              [class.border-white/10]="currentIndex() !== i"
              class="relative w-16 h-12 sm:w-20 sm:h-14 rounded overflow-hidden border-2 shrink-0 cursor-pointer transition-all hover:border-white/60"
              [title]="item.title"
            >
              <img [src]="item.imagePath" [alt]="item.title" class="w-full h-full object-cover" loading="lazy" />
              <div class="absolute bottom-0 right-0 bg-black/80 text-[9px] font-mono text-white px-1">
                {{ item.id }}
              </div>
            </button>
          </div>

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
  viewMode = signal<'grid' | 'cinema'>('grid');

  categories = [
    { id: 'all', label: 'All 50 Works' },
    { id: 'bedrooms', label: 'Master Bedrooms' },
    { id: 'living', label: 'Living & TV Lounges' },
    { id: 'wardrobes', label: 'Wardrobes & Vanities' },
    { id: 'kitchens', label: 'Modular Kitchens' },
    { id: 'foyers', label: 'Staircases & Foyers' },
    { id: 'villa', label: 'Villa Architecture' },
  ];

  filteredItems = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.items;
    
    return this.items.filter(item => {
      const lowerCat = item.category.toLowerCase();
      const lowerTitle = item.title.toLowerCase();

      switch (cat) {
        case 'bedrooms':
          return lowerCat.includes('bedroom');
        case 'living':
          return lowerCat.includes('living') || lowerCat.includes('tv');
        case 'wardrobes':
          return lowerCat.includes('wardrobe') || lowerCat.includes('vanity');
        case 'kitchens':
          return lowerCat.includes('kitchen');
        case 'foyers':
          return lowerCat.includes('foyer') || lowerCat.includes('stair') || lowerCat.includes('feature wall');
        case 'villa':
          return lowerCat.includes('villa') || lowerCat.includes('facade') || lowerCat.includes('commercial');
        default:
          return true;
      }
    });
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
    return this.items.filter(item => {
      const lowerCat = item.category.toLowerCase();
      switch (catId) {
        case 'bedrooms': return lowerCat.includes('bedroom');
        case 'living': return lowerCat.includes('living') || lowerCat.includes('tv');
        case 'wardrobes': return lowerCat.includes('wardrobe') || lowerCat.includes('vanity');
        case 'kitchens': return lowerCat.includes('kitchen');
        case 'foyers': return lowerCat.includes('foyer') || lowerCat.includes('stair') || lowerCat.includes('feature wall');
        case 'villa': return lowerCat.includes('villa') || lowerCat.includes('facade') || lowerCat.includes('commercial');
        default: return true;
      }
    }).length;
  }

  openInCinema(index: number): void {
    this.currentIndex.set(index);
    this.viewMode.set('cinema');
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
      if (this.viewMode() === 'cinema') {
        this.viewMode.set('grid');
      } else {
        this.close.emit();
      }
    } else if (event.key === 'ArrowRight') {
      if (this.viewMode() === 'cinema') {
        this.nextImage();
      }
    } else if (event.key === 'ArrowLeft') {
      if (this.viewMode() === 'cinema') {
        this.prevImage();
      }
    }
  }
}
