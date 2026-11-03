import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-[#050608] border-t border-white/[0.08] relative overflow-hidden">
      
      <!-- 11: FINAL EDITORIAL ARCHITECTURAL SIGNATURE PAGE -->
      <div class="pt-24 pb-28 border-b border-white/[0.08] relative overflow-hidden">
        
        <!-- Subtle Blueprint Compass Arc in Footer Background -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <circle cx="50%" cy="100%" r="520" fill="none" stroke="rgba(197,168,128,0.12)" stroke-width="1" stroke-dasharray="10,14"/>
            <circle cx="50%" cy="100%" r="760" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
            <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="rgba(197,168,128,0.06)" stroke-width="1" stroke-dasharray="4,8"/>
          </svg>
        </div>

        <!-- Architectural Crosshair Accents -->
        <div class="cad-crosshair top-8 left-12"></div>
        <div class="cad-crosshair top-8 right-12"></div>

        <div class="portfolio-container relative z-10 text-center">
          <div class="max-w-4xl mx-auto flex flex-col items-center">
            
            <!-- Editorial Colophon Tag -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] font-mono text-[10px] text-[#c5a880] uppercase tracking-widest mb-10 shadow-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span>COLOPHON // ARCHITECTURAL CLOSING</span>
            </div>

            <!-- EXACT REQUESTED MAIN STATEMENT: "Designed through space. Defined by detail." -->
            <blockquote class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight-custom font-display leading-[1.14] mb-8 max-w-3xl">
              &ldquo;Designed through space. <br class="hidden sm:inline"/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#c5a880]">
                Defined by detail.
              </span>&rdquo;
            </blockquote>

            <!-- Editorial Signature Line & Name Stamp -->
            <div class="flex items-center gap-4 mb-5">
              <div class="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#c5a880]"></div>
              <div class="font-display text-xl sm:text-2xl font-bold text-white tracking-wider uppercase">
                &mdash; Rahul Swami
              </div>
              <div class="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#c5a880]"></div>
            </div>

            <!-- Verified Studio Credential Subtitle -->
            <p class="font-mono text-xs sm:text-sm text-[#9aa0ae] max-w-xl leading-relaxed">
              Interior Designer &amp; 3D Visualizer practicing at 
              <strong class="text-white font-medium">Sketch Spaces</strong>. 
              Specializing in Corona Renderer 11 photorealism and millimeter-accurate AutoCAD 2025 construction detailing sets.
            </p>

            <!-- Quick Action Links -->
            <div class="flex flex-wrap items-center justify-center gap-3 mt-10 font-mono text-xs">
              <a 
                href="assets/docs/Rahul-Swami-Resume.pdf" 
                target="_blank" 
                download="Rahul-Swami-Resume.pdf"
                class="btn-primary-action text-xs px-5 py-2.5"
                data-cursor="DOWNLOAD"
              >
                <span>Download Official Resume (PDF)</span>
                <span>&darr;</span>
              </a>

              <a 
                [href]="contact.whatsappUrl"
                target="_blank"
                class="btn-ghost-action text-xs px-5 py-2.5"
                data-cursor="CHAT"
              >
                <span>Direct WhatsApp Chat</span>
                <span>&rarr;</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      <!-- TECHNICAL STUDIO INDEX FOOTER STRIP -->
      <div class="py-12 font-mono text-xs text-[#9aa0ae] relative z-10">
        <div class="portfolio-container">
          
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.08]">
            <!-- Brand & Studio Identity -->
            <div>
              <div class="flex items-center gap-2 mb-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
                <span class="text-white font-bold font-display text-base">Rahul Swami</span>
              </div>
              <div class="text-[#9aa0ae] text-xs">
                Interior Designer &bull; 3D Visualizer &bull; <strong class="text-white font-medium">Sketch Spaces (Current Studio)</strong>
              </div>
              <div class="text-[11px] text-[#616776] mt-1">
                LAT 28.5833&deg; N / LON 77.2417&deg; E &bull; Jangpura, New Delhi, India
              </div>
            </div>

            <!-- Nav Links -->
            <div class="flex flex-wrap items-center gap-6 text-xs text-[#9aa0ae]">
              <a href="#hero" class="hover:text-white transition-colors">Overview</a>
              <a href="#works" class="hover:text-white transition-colors">Selected Works</a>
              <a href="#visualizer-studio" class="hover:text-white transition-colors">2D vs 3D</a>
              <a href="#about" class="hover:text-white transition-colors">Studio Career</a>
              <a href="#materials" class="hover:text-[#c5a880] transition-colors">Material Studio</a>
              <a href="#services" class="hover:text-white transition-colors">Deliverables</a>
              <a href="#contact" class="hover:text-white transition-colors">Contact</a>
            </div>

            <!-- Back to Top -->
            <div>
              <button 
                type="button"
                (click)="scrollToTop()" 
                class="text-[#9aa0ae] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 bg-white/[0.04] px-4 py-2 rounded border border-white/[0.08] hover:border-white/20"
                aria-label="Back to top of portfolio"
              >
                <span>Back to top</span>
                <span>&uarr;</span>
              </button>
            </div>
          </div>

          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#616776]">
            <div>
              &copy; 2026 Rahul Swami. Architectural Portfolio for Studio Hiring &amp; Principal Review.
            </div>
            <div>
              Autodesk 3ds Max &bull; Corona Renderer 11 &bull; AutoCAD 2025 &bull; Photoshop
            </div>
          </div>

        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  contact = CONTACT_INFO;

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
