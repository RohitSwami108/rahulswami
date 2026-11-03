import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="py-16 bg-[#07080a] border-t border-white/[0.07] font-mono text-xs text-[#9aa0ae] relative overflow-hidden">
      
      <!-- Architectural Crosshair -->
      <div class="cad-crosshair top-6 right-6"></div>

      <div class="portfolio-container relative z-10">
        
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
              LAT 28.5833° N / LON 77.2417° E &bull; Jangpura, New Delhi, India
            </div>
          </div>

          <!-- Nav Links -->
          <div class="flex flex-wrap items-center gap-6 text-xs text-[#9aa0ae]">
            <a href="#hero" class="hover:text-white transition-colors">Overview</a>
            <a href="#works" class="hover:text-white transition-colors">Selected Works</a>
            <a href="#visualizer-studio" class="hover:text-white transition-colors">2D vs 3D</a>
            <a href="#about" class="hover:text-white transition-colors">Studio Career</a>
            <a href="#services" class="hover:text-white transition-colors">Deliverables</a>
            <a href="#contact" class="hover:text-white transition-colors">Contact</a>
          </div>

          <!-- Back to Top -->
          <div>
            <button 
              type="button"
              (click)="scrollToTop()" 
              class="text-[#9aa0ae] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 bg-white/[0.04] px-4 py-2 rounded border border-white/[0.08]"
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
