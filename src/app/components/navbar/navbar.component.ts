import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.scrolled-header]="isScrolled()"
    >
      <div class="editorial-container py-4">
        <nav class="flex items-center justify-between border-b border-white/[0.08] pb-3.5 pt-1 backdrop-blur-md px-2 sm:px-0">
          
          <!-- Brand / Logo -->
          <a href="#" class="flex items-center gap-2.5 text-decoration-none group">
            <span class="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform"></span>
            <div class="flex items-baseline gap-2">
              <span class="font-bold text-white tracking-tight-custom text-sm sm:text-base">
                Rahul Swami
              </span>
              <span class="font-mono text-xs text-[#71717a] hidden sm:inline">
                / 3D Visualizer &bull; Designer
              </span>
            </div>
          </a>

          <!-- Center Nav Links -->
          <div class="hidden md:flex items-center gap-6 font-mono text-xs text-[#a1a1aa]">
            <a href="#works" class="hover:text-white transition-colors">Works</a>
            <a href="#visualizer-studio" class="hover:text-white transition-colors">2D vs 3D</a>
            <a href="#about" class="hover:text-white transition-colors">Studio &amp; Practice</a>
            <a href="#services" class="hover:text-white transition-colors">Services</a>
            <a href="#contact" class="hover:text-white transition-colors">Contact</a>
          </div>

          <!-- Right Status & CTAs -->
          <div class="flex items-center gap-3">
            <!-- Live Time / Status -->
            <div class="hidden lg:flex items-center gap-2 font-mono text-[11px] text-[#71717a] bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
              <span>{{ localTime() }} IST &bull; New Delhi</span>
            </div>

            <!-- Contact CTA -->
            <a 
              [href]="contact.whatsappUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn-cinema text-xs px-3.5 py-1.5"
            >
              <span>Get in Touch</span>
              <span class="font-mono text-[10px]">&rarr;</span>
            </a>

            <!-- Mobile Menu Toggle -->
            <button 
              type="button"
              (click)="toggleMobileMenu()" 
              class="md:hidden p-1.5 text-[#a1a1aa] hover:text-white"
              aria-label="Toggle Navigation"
            >
              <svg *ngIf="!isMobileMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              <svg *ngIf="isMobileMenuOpen()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

        </nav>
      </div>

      <!-- Mobile Dropdown -->
      <div *ngIf="isMobileMenuOpen()" class="md:hidden editorial-container">
        <div class="p-5 rounded-xl bg-[#0d0d10] border border-white/10 flex flex-col gap-3 font-mono text-xs">
          <a href="#works" (click)="isMobileMenuOpen.set(false)" class="text-[#a1a1aa] hover:text-white py-1">Works</a>
          <a href="#visualizer-studio" (click)="isMobileMenuOpen.set(false)" class="text-[#a1a1aa] hover:text-white py-1">2D vs 3D</a>
          <a href="#about" (click)="isMobileMenuOpen.set(false)" class="text-[#a1a1aa] hover:text-white py-1">Studio &amp; Practice</a>
          <a href="#services" (click)="isMobileMenuOpen.set(false)" class="text-[#a1a1aa] hover:text-white py-1">Services</a>
          <a href="#contact" (click)="isMobileMenuOpen.set(false)" class="text-[#a1a1aa] hover:text-white py-1">Contact</a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .scrolled-header {
      background: rgba(7, 7, 7, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
  `],
})
export class NavbarComponent implements OnInit {
  contact = CONTACT_INFO;
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  localTime = signal('');

  ngOnInit(): void {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock(): void {
    const now = new Date();
    this.localTime.set(
      now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    );
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 25);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }
}
