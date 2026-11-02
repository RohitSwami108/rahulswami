import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="py-14 bg-[#08090c] font-mono text-xs text-[#9ca3af]">
      <div class="portfolio-container">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span class="text-white font-bold font-sans text-base">Rahul Swami</span>
            </div>
            <div class="text-[#9ca3af] text-xs">
              Interior Designer &bull; 3D Visualizer &bull; <strong class="text-white font-normal">Sketch Spaces (Current)</strong>
            </div>
          </div>

          <!-- Nav Links -->
          <div class="flex flex-wrap items-center gap-6 text-xs text-[#9ca3af]">
            <a href="#hero" class="hover:text-white transition-colors">Overview</a>
            <a href="#works" class="hover:text-white transition-colors">Selected Works</a>
            <a href="#visualizer-studio" class="hover:text-white transition-colors">2D vs 3D</a>
            <a href="#about" class="hover:text-white transition-colors">Studio Career</a>
            <a href="#services" class="hover:text-white transition-colors">Deliverables</a>
            <a href="#contact" class="hover:text-white transition-colors">Candidate Contact</a>
          </div>

          <!-- Back to Top -->
          <div>
            <button 
              type="button"
              (click)="scrollToTop()" 
              class="text-[#9ca3af] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/[0.08]"
            >
              <span>Back to top</span>
              <span>&uarr;</span>
            </button>
          </div>
        </div>

        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6b7280]">
          <div>
            &copy; 2026 Rahul Swami. Designed for Studio &amp; Recruiter Review.
          </div>
          <div>
            Sketch Spaces &bull; Camara Interiors &bull; Ettore Interior &bull; New Delhi &amp; NCR
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
