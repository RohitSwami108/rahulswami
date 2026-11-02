import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output, signal } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 py-3.5 transition-all duration-300">
      <div class="portfolio-container">
        <nav class="flex items-center justify-between px-5 py-3 rounded-full bg-[#10121a]/80 backdrop-blur-2xl border border-white/[0.09] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)]">
          
          <!-- Brand & Current Studio Status -->
          <a href="#" class="flex items-center gap-3 text-decoration-none group">
            <span class="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform"></span>
            <div class="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span class="font-bold text-white tracking-tight-custom text-sm sm:text-base">
                Rahul Swami
              </span>
              <span class="font-mono text-[11px] text-[#9ca3af] hidden sm:inline">
                / Interior Designer &bull; 3D Visualizer
              </span>
            </div>
          </a>

          <!-- Current Studio Indicator (Middle Pill) -->
          <div class="hidden xl:flex items-center gap-2 font-mono text-[11px] text-[#9ca3af] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.08]">
            <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span class="text-white font-medium">Sketch Spaces</span>
            <span class="text-[#6b7280]">&bull;</span>
            <span>Current Studio</span>
          </div>

          <!-- Desktop Links -->
          <div class="hidden lg:flex items-center gap-6 font-mono text-xs text-[#9ca3af]">
            <a href="#works" class="hover:text-white transition-colors">Selected Works</a>
            <a href="#visualizer-studio" class="hover:text-white transition-colors">2D vs 3D</a>
            <button 
              type="button" 
              (click)="openVault.emit()" 
              class="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-[#9ca3af] font-mono text-xs"
            >
              50-Render Vault
            </button>
            <a href="#about" class="hover:text-white transition-colors">Experience &amp; Skills</a>
            <a href="#contact" class="hover:text-white transition-colors">Contact</a>
          </div>

          <!-- Direct CV Download & Quick Chat CTAs -->
          <div class="flex items-center gap-2.5">
            <a 
              href="assets/docs/Rahul-Swami-Resume.pdf" 
              target="_blank" 
              download="Rahul-Swami-Resume.pdf"
              class="btn-primary-action text-xs px-4 py-2"
              title="Download Rahul Swami's Resume (PDF)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download CV</span>
            </a>

            <!-- Mobile Menu Toggle -->
            <button 
              type="button"
              (click)="toggleMobileMenu()" 
              class="lg:hidden p-2 text-[#9ca3af] hover:text-white cursor-pointer"
              aria-label="Toggle Navigation"
            >
              <svg *ngIf="!isMobileMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              <svg *ngIf="isMobileMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

        </nav>
      </div>

      <!-- Mobile Dropdown -->
      <div *ngIf="isMobileMenuOpen()" class="lg:hidden portfolio-container mt-2">
        <div class="p-5 rounded-2xl bg-[#10121a]/95 backdrop-blur-2xl border border-white/10 flex flex-col gap-3 font-mono text-xs shadow-2xl">
          <div class="flex items-center gap-2 pb-3 border-b border-white/10 text-white font-medium">
            <span class="w-2 h-2 rounded-full bg-[#10b981]"></span>
            <span>Currently working at Sketch Spaces</span>
          </div>
          <a href="#works" (click)="isMobileMenuOpen.set(false)" class="text-[#9ca3af] hover:text-white py-1">Selected Works</a>
          <a href="#visualizer-studio" (click)="isMobileMenuOpen.set(false)" class="text-[#9ca3af] hover:text-white py-1">2D vs 3D</a>
          <button type="button" (click)="onMobileVaultClick()" class="text-left text-[#9ca3af] hover:text-white py-1 font-mono text-xs bg-transparent border-none">
            50-Render Vault
          </button>
          <a href="#about" (click)="isMobileMenuOpen.set(false)" class="text-[#9ca3af] hover:text-white py-1">Experience &amp; Skills</a>
          <a href="#contact" (click)="isMobileMenuOpen.set(false)" class="text-[#9ca3af] hover:text-white py-1">Contact Details</a>
        </div>
      </div>
    </header>
  `,
  styles: [],
})
export class NavbarComponent {
  contact = CONTACT_INFO;
  isMobileMenuOpen = signal(false);

  @Output() openVault = new EventEmitter<void>();

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  onMobileVaultClick(): void {
    this.isMobileMenuOpen.set(false);
    this.openVault.emit();
  }
}
