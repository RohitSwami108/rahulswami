import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="py-14 bg-[#05070a] border-t border-white/10 relative overflow-hidden">
      <!-- Architectural Grid Bottom -->
      <div class="absolute inset-0 cad-grid-bg opacity-10 pointer-events-none"></div>

      <div class="container mx-auto relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          <!-- Brand & Bio (5 Cols) -->
          <div class="md:col-span-5 flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#c5a059] to-[#805e20] p-[1.5px] flex items-center justify-center">
                <div class="w-full h-full bg-[#0b0e14] rounded-full flex items-center justify-center font-luxury font-bold text-[#e5c378] text-sm">
                  RS
                </div>
              </div>
              <div>
                <div class="font-display font-bold text-white text-lg">Rahul Swami</div>
                <div class="text-[11px] font-mono text-[#94a3b8]">Interior Designer &bull; 3D Visualizer</div>
              </div>
            </div>

            <p class="text-xs text-slate-400 leading-relaxed max-w-sm">
              Transforming residential spaces into photorealistic 3D realities with 3ds Max &amp; Corona Renderer, backed by precise AutoCAD working drawings.
            </p>

            <div class="text-xs font-mono text-[#00f5d4]">
              Sector 63 Noida &bull; Jangpura, New Delhi
            </div>
          </div>

          <!-- Quick Navigation Links (3 Cols) -->
          <div class="md:col-span-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-[#e5c378] font-bold mb-4">
              Explore Portfolio
            </h4>
            <ul class="space-y-2 text-xs">
              <li><a href="#hero" class="text-slate-400 hover:text-white transition-colors">Hero Overview</a></li>
              <li><a href="#visualizer-studio" class="text-slate-400 hover:text-white transition-colors">Visualizer Studio (2D vs 3D)</a></li>
              <li><a href="#projects" class="text-slate-400 hover:text-white transition-colors">Curated Project Gallery</a></li>
              <li><a href="#services" class="text-slate-400 hover:text-white transition-colors">Design Services</a></li>
              <li><a href="#experience" class="text-slate-400 hover:text-white transition-colors">Studio Experience &amp; Skills</a></li>
              <li><a href="#estimator" class="text-slate-400 hover:text-white transition-colors">Project Estimator</a></li>
            </ul>
          </div>

          <!-- Direct Channels & Resume (4 Cols) -->
          <div class="md:col-span-4 flex flex-col gap-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-[#00f5d4] font-bold mb-1">
              Direct Contact
            </h4>
            <div class="text-xs text-slate-300 font-mono">
              Phone: <a [href]="'tel:' + contact.phoneRaw" class="text-white hover:text-[#e5c378]">{{ contact.phone }}</a>
            </div>
            <div class="text-xs text-slate-300 font-mono">
              Email: <a [href]="'mailto:' + contact.email" class="text-white hover:text-[#00f5d4]">{{ contact.email }}</a>
            </div>
            <div class="text-xs text-slate-300 font-mono">
              Current: <span class="text-[#e5c378]">Camara Interiors</span> (Sector 63, Noida)
            </div>

            <div class="pt-2">
              <a 
                href="assets/docs/Rahul-Swami-Resume.pdf" 
                target="_blank"
                download="Rahul-Swami-Resume.pdf"
                class="btn-outline-gold text-xs py-2 px-4 inline-flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright & Back to Top -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; 2026 Rahul Swami. All rights reserved &bull; 3D Visualizer &amp; Interior Designer
          </div>
          <button 
            type="button"
            (click)="scrollToTop()" 
            class="flex items-center gap-1.5 text-slate-400 hover:text-[#e5c378] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </button>
        </div>

      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {
  contact = CONTACT_INFO;

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

