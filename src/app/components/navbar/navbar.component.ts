import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Output, PLATFORM_ID, signal } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Top Architectural Scroll Progress Indicator -->
    <div class="scroll-progress-line" [style.width.%]="scrollPercent()"></div>

    <!-- Editorial Architectural Floating Navigation Bar -->
    <header class="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 transition-all duration-300 pointer-events-none">
      <div class="max-w-7xl mx-auto pointer-events-auto">
        <nav class="relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-[#090b11]/90 backdrop-blur-2xl border border-white/[0.12] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9)] transition-all duration-300">
          
          <!-- Inner Top Ambient Highlight Line -->
          <div class="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

          <!-- BRAND IDENTITY: Architectural Monogram & Studio Status -->
          <a href="#hero" class="flex items-center gap-3 text-decoration-none group shrink-0">
            <!-- Studio Monogram Box -->
            <div class="w-8 h-8 rounded-lg bg-white/[0.04] border border-[#c5a880]/30 group-hover:border-[#c5a880] flex items-center justify-center text-[#c5a880] font-mono font-bold text-xs transition-colors shadow-sm">
              RS
            </div>

            <!-- Name and Current Practice -->
            <div class="flex flex-col">
              <span class="font-bold text-white tracking-wider text-sm font-display uppercase group-hover:text-[#c5a880] transition-colors">
                Rahul Swami
              </span>
              <div class="flex items-center gap-1.5 font-mono text-[10px] text-[#9aa0ae]">
                <span class="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                <span class="text-white/90 font-medium">Sapras Architects</span>
                <span class="text-[#616776]">&bull;</span>
                <span class="text-[#c5a880]">3D Studio</span>
              </div>
            </div>
          </a>

          <!-- DESKTOP NAVIGATION LINKS (Centered & Balanced) -->
          <div class="hidden lg:flex items-center gap-1 xl:gap-2 font-mono text-xs">
            <a 
              href="#works" 
              class="px-3 py-1.5 rounded-lg text-[#9aa0ae] hover:text-white hover:bg-white/[0.04] transition-all duration-200"
            >
              Selected Works
            </a>

            <a 
              href="#visualizer-studio" 
              class="px-3 py-1.5 rounded-lg text-[#9aa0ae] hover:text-white hover:bg-white/[0.04] transition-all duration-200"
            >
              2D vs 3D
            </a>

            <a 
              href="#about" 
              class="px-3 py-1.5 rounded-lg text-[#9aa0ae] hover:text-white hover:bg-white/[0.04] transition-all duration-200"
            >
              Studio Career
            </a>

            <a 
              href="#materials" 
              class="px-3 py-1.5 rounded-lg text-[#9aa0ae] hover:text-[#c5a880] hover:bg-white/[0.04] transition-all duration-200 flex items-center gap-1"
            >
              <span>Material Studio</span>
              <span class="w-1 h-1 rounded-full bg-[#c5a880]"></span>
            </a>

            <a 
              href="#services" 
              class="px-3 py-1.5 rounded-lg text-[#9aa0ae] hover:text-white hover:bg-white/[0.04] transition-all duration-200"
            >
              Deliverables
            </a>

            <!-- 50-Render Vault Modal Trigger -->
            <button 
              type="button" 
              (click)="openVault.emit()" 
              class="px-3 py-1.5 rounded-lg text-[#9aa0ae] hover:text-[#c5a880] hover:bg-white/[0.04] transition-all duration-200 cursor-pointer bg-transparent border-none font-mono text-xs flex items-center gap-1.5"
            >
              <span>50-Render Vault</span>
              <span class="text-[9px] px-1.5 py-0.2 rounded bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 font-bold">50</span>
            </button>

            <a 
              href="#contact" 
              class="px-3 py-1.5 rounded-lg text-[#9aa0ae] hover:text-white hover:bg-white/[0.04] transition-all duration-200"
            >
              Contact
            </a>
          </div>

          <!-- RIGHT ACTIONS: Luxury Resume CTA & Mobile Menu Trigger -->
          <div class="flex items-center gap-2 sm:gap-3 shrink-0">
            <!-- Refined Architectural Resume Download Button -->
            <a 
              href="assets/docs/Rahul-Swami-Resume.pdf" 
              target="_blank" 
              download="Rahul-Swami-Resume.pdf"
              class="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#c5a880]/10 hover:bg-[#c5a880] border border-[#c5a880]/35 hover:border-[#c5a880] text-[#e2cfb6] hover:text-black font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(197,168,128,0.1)] group"
              title="Download Rahul Swami's Verified Resume (PDF)"
              data-cursor="DOWNLOAD"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="transition-transform group-hover:translate-y-0.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Resume (PDF)</span>
            </a>

            <!-- Mobile Hamburger Toggle -->
            <button 
              type="button"
              (click)="toggleMobileMenu()" 
              class="lg:hidden p-2 text-[#9aa0ae] hover:text-white cursor-pointer rounded-lg hover:bg-white/[0.05] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <svg *ngIf="!isMobileMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              <svg *ngIf="isMobileMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

        </nav>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div *ngIf="isMobileMenuOpen()" class="lg:hidden max-w-7xl mx-auto mt-2 pointer-events-auto">
        <div class="p-5 rounded-2xl bg-[#0a0c13]/95 backdrop-blur-2xl border border-white/10 flex flex-col gap-2 font-mono text-xs shadow-2xl">
          <div class="flex items-center gap-2 pb-3 mb-2 border-b border-white/10 text-white font-medium">
            <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>Currently practicing at Sapras Architects &amp; Engineers</span>
          </div>
          <a href="#works" (click)="isMobileMenuOpen.set(false)" class="text-[#9aa0ae] hover:text-white py-1.5 px-2 rounded hover:bg-white/5">Selected Works</a>
          <a href="#visualizer-studio" (click)="isMobileMenuOpen.set(false)" class="text-[#9aa0ae] hover:text-white py-1.5 px-2 rounded hover:bg-white/5">2D vs 3D</a>
          <a href="#about" (click)="isMobileMenuOpen.set(false)" class="text-[#9aa0ae] hover:text-white py-1.5 px-2 rounded hover:bg-white/5">Studio Career</a>
          <a href="#materials" (click)="isMobileMenuOpen.set(false)" class="text-[#c5a880] hover:text-white py-1.5 px-2 rounded hover:bg-white/5">Material Studio</a>
          <a href="#services" (click)="isMobileMenuOpen.set(false)" class="text-[#9aa0ae] hover:text-white py-1.5 px-2 rounded hover:bg-white/5">Deliverables</a>
          <button type="button" (click)="onMobileVaultClick()" class="text-left text-[#9aa0ae] hover:text-[#c5a880] py-1.5 px-2 rounded hover:bg-white/5 font-mono text-xs bg-transparent border-none cursor-pointer">
            50-Render Vault (Full Archive)
          </button>
          <a href="#contact" (click)="isMobileMenuOpen.set(false)" class="text-[#9aa0ae] hover:text-white py-1.5 px-2 rounded hover:bg-white/5">Contact</a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .scroll-progress-line {
      position: fixed;
      top: 0;
      left: 0;
      height: 2.5px;
      background: linear-gradient(90deg, #c5a880, #10b981, #c5a880);
      z-index: 100;
      pointer-events: none;
      transition: width 0.1s linear;
      box-shadow: 0 0 8px rgba(197, 168, 128, 0.4);
    }
  `],
})
export class NavbarComponent {
  contact = CONTACT_INFO;
  isMobileMenuOpen = signal(false);
  scrollPercent = signal(0);
  private isBrowser = false;

  @Output() openVault = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  onMobileVaultClick(): void {
    this.isMobileMenuOpen.set(false);
    this.openVault.emit();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const p = (window.scrollY / docHeight) * 100;
      this.scrollPercent.set(Math.min(100, Math.max(0, Math.round(p))));
    }
  }
}
