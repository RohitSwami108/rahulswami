import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer id="signature-closing" class="bg-[#050608] border-t border-white/[0.08] relative overflow-hidden text-[#f5f5f7]">
      
      <!-- =====================================================================
           CENTRAL DECORATIVE ARCHITECTURAL LINEWORK & GEOMETRIC COMPOSITION
           ===================================================================== -->
      <div 
        class="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-40 transition-transform duration-700 ease-out"
        [style.transform]="'translateY(' + (parallaxOffset() - 4800) * 0.08 + 'px)'"
        aria-hidden="true"
      >
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
          <defs>
            <linearGradient id="footerLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#c5a880" stop-opacity="0.6"/>
              <stop offset="50%" stop-color="#10b981" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#c5a880" stop-opacity="0.8"/>
            </linearGradient>

            <linearGradient id="radialGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#c5a880" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
            </linearGradient>
          </defs>

          <!-- Central Ambient Architectural Glow -->
          <circle cx="720" cy="450" r="380" fill="url(#radialGlow)" />

          <!-- Concentric Golden Ratio Compass Drafting Arcs -->
          <circle cx="720" cy="450" r="480" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
          <circle cx="720" cy="450" r="360" fill="none" stroke="url(#footerLineGrad)" stroke-width="1.2" stroke-dasharray="8,12" class="animate-spin-very-slow"/>
          <circle cx="720" cy="450" r="240" fill="none" stroke="rgba(197,168,128,0.18)" stroke-width="1"/>
          <circle cx="720" cy="450" r="140" fill="none" stroke="rgba(16,185,129,0.15)" stroke-width="1" stroke-dasharray="4,6"/>

          <!-- Tangent Precision Construction Rays -->
          <line x1="120" y1="450" x2="1320" y2="450" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
          <line x1="720" y1="80" x2="720" y2="820" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
          
          <line x1="280" y1="180" x2="1160" y2="720" stroke="rgba(197,168,128,0.07)" stroke-width="1" stroke-dasharray="6,8"/>
          <line x1="280" y1="720" x2="1160" y2="180" stroke="rgba(197,168,128,0.07)" stroke-width="1" stroke-dasharray="6,8"/>

          <!-- Precision Millimeter Measurement Ticks -->
          <g stroke="rgba(197,168,128,0.3)" stroke-width="1">
            <line x1="720" y1="80" x2="730" y2="80"/>
            <line x1="720" y1="210" x2="726" y2="210"/>
            <line x1="720" y1="330" x2="726" y2="330"/>
            <line x1="720" y1="570" x2="726" y2="570"/>
            <line x1="720" y1="690" x2="726" y2="690"/>
            <line x1="720" y1="820" x2="730" y2="820"/>
            
            <line x1="120" y1="450" x2="120" y2="440"/>
            <line x1="360" y1="450" x2="360" y2="444"/>
            <line x1="1080" y1="450" x2="1080" y2="444"/>
            <line x1="1320" y1="450" x2="1320" y2="440"/>
          </g>

          <!-- Fine Technical Annotations in SVG Grid -->
          <text x="735" y="95" fill="rgba(197,168,128,0.4)" font-family="monospace" font-size="9" letter-spacing="0.15em">
            DATUM ZENITH: EL. +4200 MM
          </text>
          <text x="735" y="815" fill="rgba(197,168,128,0.4)" font-family="monospace" font-size="9" letter-spacing="0.15em">
            DATUM NADIR: EL. &plusmn;0.00 MM
          </text>
          <text x="130" y="440" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="8.5" letter-spacing="0.12em">
            AZIMUTH: 270&deg; W
          </text>
          <text x="1230" y="440" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="8.5" letter-spacing="0.12em">
            AZIMUTH: 090&deg; E
          </text>
        </svg>
      </div>

      <!-- Corner Architectural Crosshairs -->
      <div class="cad-crosshair top-10 left-8"></div>
      <div class="cad-crosshair top-10 right-8"></div>
      <div class="cad-crosshair bottom-10 left-8"></div>
      <div class="cad-crosshair bottom-10 right-8"></div>

      <!-- =====================================================================
           MAIN EDITORIAL SIGNATURE SPREAD (LUXURY MAGAZINE CLOSING PAGE)
           ===================================================================== -->
      <div class="pt-32 pb-36 sm:pt-40 sm:pb-44 border-b border-white/[0.08] relative z-10">
        <div class="portfolio-container">
          <div class="max-w-5xl mx-auto flex flex-col items-center text-center">
            
            <!-- Colophon Presentation Stamp -->
            <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] font-mono text-[10px] text-[#c5a880] uppercase tracking-widest mb-12 shadow-sm backdrop-blur-md">
              <span class="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span>COLOPHON // EDITORIAL ARCHITECTURAL CLOSING</span>
              <span class="text-[#616776]">&bull;</span>
              <span class="text-white/80">VOL. RS-2026</span>
            </div>

            <!-- ELEGANT MASK-REVEALED EDITORIAL STATEMENT -->
            <div class="mb-10 max-w-4xl overflow-hidden">
              <blockquote class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#f5f5f7] tracking-tight-custom font-display leading-[1.08] select-none">
                <span class="block overflow-hidden pb-1">
                  <span class="inline-block transition-transform duration-1000 ease-out">
                    &ldquo;Designed through space.
                  </span>
                </span>
                <span class="block overflow-hidden pt-1">
                  <span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#c5a880] transition-transform duration-1000 ease-out">
                    Defined by detail.&rdquo;
                  </span>
                </span>
              </blockquote>
            </div>

            <!-- ARCHITECTURAL SIGNATURE MARK & CREDENTIALS -->
            <div class="flex items-center gap-5 mb-6">
              <div class="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#c5a880]"></div>
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-[#c5a880]"></span>
                <h3 class="font-display text-2xl sm:text-3xl font-bold text-white tracking-widest uppercase">
                  Rahul Swami
                </h3>
                <span class="w-2 h-2 rounded-full bg-[#10b981]"></span>
              </div>
              <div class="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#c5a880]"></div>
            </div>

            <!-- Professional Identity, Studio & Location Required by Prompt -->
            <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm text-[#9aa0ae] max-w-2xl leading-relaxed mb-4">
              <span class="text-white font-medium">Interior Designer &amp; 3D Visualizer</span>
              <span class="text-[#616776]">&bull;</span>
              <span class="text-[#e2cfb6] font-medium">Sapras Architects &amp; Engineers Pvt. Ltd. (Current Studio)</span>
              <span class="text-[#616776]">&bull;</span>
              <span class="text-[#10b981] font-medium flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>New Delhi, India</span>
              </span>
            </div>

            <!-- Fine Technical Presentation Annotations -->
            <div class="flex flex-wrap items-center justify-center gap-4 text-[10.5px] font-mono text-[#616776] mb-12">
              <span>LAT 28.5833&deg; N / LON 77.2417&deg; E</span>
              <span>&bull;</span>
              <span>DATUM: DEL-NCR</span>
              <span>&bull;</span>
              <span>CORONA 11 &amp; AUTOCAD 2025</span>
              <span>&bull;</span>
              <span>MASTER PRODUCTION SET</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
              <a 
                href="assets/docs/Rahul-Swami-Resume.pdf" 
                target="_blank" 
                download="Rahul-Swami-Resume.pdf"
                class="btn-primary-action text-xs px-6 py-3 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                data-cursor="DOWNLOAD"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Download Verified Resume (PDF)</span>
              </a>

              <a 
                [href]="contact.whatsappUrl"
                target="_blank"
                class="btn-ghost-action text-xs px-6 py-3 border-[#c5a880]/30 hover:border-[#c5a880] text-white hover:text-[#c5a880]"
                data-cursor="CHAT"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Connect via WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      <!-- =====================================================================
           TECHNICAL ARCHITECTURAL INDEX STRIP
           ===================================================================== -->
      <div class="py-12 font-mono text-xs text-[#9aa0ae] relative z-10 bg-[#07080a]">
        <div class="portfolio-container">
          
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.08]">
            <!-- Studio Identity Stamp -->
            <div>
              <div class="flex items-center gap-2 mb-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
                <span class="text-white font-bold font-display text-base tracking-wider uppercase">Rahul Swami</span>
              </div>
              <div class="text-[#9aa0ae] text-xs">
                Interior Designer &bull; 3D Visualizer &bull; <strong class="text-white font-medium">Sapras Architects &amp; Engineers (Current Studio)</strong>
              </div>
              <div class="text-[11px] text-[#616776] mt-1">
                Jangpura, New Delhi, India &bull; Available across Delhi NCR
              </div>
            </div>

            <!-- Editorial Nav Links -->
            <div class="flex flex-wrap items-center gap-6 text-xs text-[#9aa0ae]">
              <a href="#hero" class="hover:text-white transition-colors">Overview</a>
              <a href="#works" class="hover:text-white transition-colors">Selected Works</a>
              <a href="#visualizer-studio" class="hover:text-white transition-colors">2D vs 3D</a>
              <a href="#about" class="hover:text-white transition-colors">Studio Career</a>
              <a href="#materials" class="hover:text-[#c5a880] transition-colors">Material Studio</a>
              <a href="#services" class="hover:text-white transition-colors">Deliverables</a>
              <a href="#contact" class="hover:text-white transition-colors">Contact</a>
            </div>

            <!-- Back to Top Button -->
            <div>
              <button 
                type="button"
                (click)="scrollToTop()" 
                class="text-[#9aa0ae] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 bg-white/[0.04] px-4 py-2 rounded-lg border border-white/[0.08] hover:border-white/20"
                aria-label="Back to top of portfolio"
              >
                <span>Back to top</span>
                <span>&uarr;</span>
              </button>
            </div>
          </div>

          <!-- Bottom Colophon Specs -->
          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#616776]">
            <div>
              &copy; 2026 Rahul Swami. Architectural Portfolio for Studio Hiring &amp; Principal Review.
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
              <span>Autodesk 3ds Max 2024 &bull; Corona Renderer 11 &bull; AutoCAD 2025 &bull; Photoshop</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  `,
  styles: [`
    @keyframes spinVerySlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-very-slow {
      transform-origin: 720px 450px;
      animation: spinVerySlow 120s linear infinite;
    }
  `],
})
export class FooterComponent {
  contact = CONTACT_INFO;
  parallaxOffset = signal(0);
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.parallaxOffset.set(window.scrollY);
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
