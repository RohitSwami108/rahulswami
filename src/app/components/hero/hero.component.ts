import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnDestroy, PLATFORM_ID, ViewChild, computed, signal } from '@angular/core';
import { CONTACT_INFO } from '../../data/portfolio.data';

interface HeroSlide {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  specs: string;
  location: string;
  software: string;
  camData: {
    focal: string;
    shutter: string;
    lightTemp: string;
    material: string;
  };
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section 
      id="hero" 
      #heroSection
      (mousemove)="onSectionMouseMove($event)"
      (mouseleave)="onSectionMouseLeave()"
      class="pt-28 pb-16 md:pt-36 md:pb-28 border-b border-white/[0.08] relative overflow-hidden"
    >
      
      <!-- 02: RECOGNIZABLE EDITORIAL BACKGROUND NUMERAL (8% Opacity) -->
      <div 
        class="section-watermark-number top-4 right-4 sm:right-12 md:right-20"
        [style.transform]="'translateY(' + parallaxOffset() * 0.15 + 'px)'"
      >
        00
      </div>

      <!-- 03: UNIQUE ARCHITECTURAL BACKGROUND PATTERN (Hero Geometry & Coordinate Network) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="heroGridPattern" width="160" height="160" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="160" y2="0" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
              <line x1="0" y1="0" x2="0" y2="160" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
              <circle cx="80" cy="80" r="1.5" fill="rgba(197,168,128,0.2)"/>
              <path d="M 0,80 L 160,80 M 80,0 L 80,160" stroke="rgba(255,255,255,0.015)" stroke-dasharray="4,6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGridPattern)" />
          
          <!-- Geometric Blueprint Compass Arcs -->
          <circle cx="85%" cy="30%" r="280" fill="none" stroke="rgba(197,168,128,0.06)" stroke-width="1" stroke-dasharray="8,12"/>
          <circle cx="85%" cy="30%" r="420" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
          <line x1="60%" y1="30%" x2="100%" y2="30%" stroke="rgba(197,168,128,0.08)" stroke-width="1" stroke-dasharray="3,6"/>
          
          <!-- Architectural Coordinate Crosshairs -->
          <circle cx="15%" cy="75%" r="180" fill="none" stroke="rgba(16,185,129,0.04)" stroke-width="1"/>
          <line x1="0" y1="75%" x2="35%" y2="75%" stroke="rgba(16,185,129,0.06)" stroke-width="1" stroke-dasharray="5,8"/>
        </svg>
      </div>

      <!-- Architectural Crosshairs in Corners -->
      <div class="cad-crosshair top-8 left-8"></div>
      <div class="cad-crosshair top-8 right-8"></div>
      <div class="cad-crosshair bottom-8 left-8"></div>
      <div class="cad-crosshair bottom-8 right-8"></div>

      <!-- Subtle Atmospheric Ambient Glow -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[420px] bg-gradient-to-b from-[#c5a880]/[0.06] via-[#10b981]/[0.025] to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Architectural Coordinate & Studio Status Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#9aa0ae] mb-10 pb-4 border-b border-white/[0.08]">
          <div class="flex items-center gap-2.5">
            <span class="inline-flex items-center gap-1.5 text-white font-medium bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/25">
              <span class="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span class="tracking-wider">SKETCH SPACES</span>
            </span>
            <span class="text-[#616776]">&bull;</span>
            <span class="text-[#e2cfb6] font-medium tracking-wide">CURRENT STUDIO</span>
            <span class="text-[#616776] hidden sm:inline">&bull;</span>
            <span class="text-[#7e879b] hidden sm:inline">PREVIOUS: CAMARA INTERIORS &amp; ETTORE INTERIOR</span>
          </div>

          <div class="flex items-center gap-3 text-[10px] text-[#7e879b]">
            <span class="hidden md:inline text-white/50">ARCHITECTURAL COORDINATES:</span>
            <span class="text-[#c5a880] font-mono tracking-widest">N 28° 35' 12" / E 77° 14' 55"</span>
            <span class="text-[#616776]">&bull;</span>
            <span class="text-white/80">DATUM: DEL-NCR</span>
          </div>
        </div>

        <!-- 01: CREATIVE TYPOGRAPHY & ANIMATED TYPING ENGINE -->
        <div class="max-w-5xl mb-12">
          
          <!-- Section Technical Stamp -->
          <div class="flex items-center gap-3 mb-4">
            <div class="section-label">
              [ 00 // ARCHITECTURAL VISUALIZER &amp; DESIGNER ]
            </div>
            <div class="hidden sm:inline-flex cad-tech-stamp">
              DWG: RS-2026 // MASTER ARCHIVE
            </div>
          </div>
          
          <!-- Expressive Editorial Headline -->
          <h1 class="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#f5f5f7] tracking-tight-custom leading-[1.08] mb-6 font-display">
            Transforming spaces <br class="hidden sm:inline"/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#c5a880]">
              into experiences.
            </span>
          </h1>

          <!-- Continuous Character-by-Character Typing Presentation (Zero Layout Jump) -->
          <div class="h-10 sm:h-12 flex items-center font-mono text-lg sm:text-2xl lg:text-3xl font-semibold mb-6 overflow-hidden">
            <span class="text-[#9aa0ae] mr-3 select-none">Specializing as:</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a880] via-[#e2cfb6] to-[#10b981] inline-block tracking-tight font-display">
              {{ typedText() }}
            </span>
            <span class="typing-cursor"></span>
          </div>

          <!-- Editorial Studio Bio -->
          <p class="text-sm sm:text-lg text-[#9aa0ae] font-normal leading-relaxed max-w-3xl">
            Rahul Swami is an Interior Designer and 3D Visualizer currently practicing at 
            <span class="text-white font-semibold underline decoration-[#10b981]/50 underline-offset-4">Sketch Spaces</span>, 
            with 2+ years of prior studio experience across <em class="text-white not-italic font-medium">Camara Interiors</em> 
            and <em class="text-white not-italic font-medium">Ettore Interior</em>. 
            Crafting photorealistic 3D residential environments in 
            <strong class="text-white font-semibold">Autodesk 3ds Max &amp; Corona Renderer 11</strong>, 
            anchored by millimeter-accurate on-site <strong class="text-white font-semibold">AutoCAD 2025 technical execution drawings</strong>.
          </p>
        </div>

        <!-- Action CTAs -->
        <div class="flex flex-wrap items-center gap-3.5 mb-14">
          <a href="#works" class="btn-primary-action" data-cursor="EXPLORE">
            <span>Explore Selected Works</span>
            <span class="font-mono text-xs">&darr;</span>
          </a>

          <a 
            href="assets/docs/Rahul-Swami-Resume.pdf" 
            target="_blank" 
            download="Rahul-Swami-Resume.pdf"
            class="btn-ghost-action"
            data-cursor="DOWNLOAD"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Download Official Resume (PDF)</span>
          </a>

          <a 
            href="#visualizer-studio" 
            class="btn-ghost-action"
            data-cursor="INSPECT"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
            <span>Inspect 2D CAD vs 3D Corona</span>
          </a>

          <a 
            [href]="contact.whatsappUrl"
            target="_blank"
            class="btn-emerald-action"
            data-cursor="CHAT"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Direct WhatsApp Inquiry</span>
          </a>
        </div>

        <!-- 04: MOUSE-PARALLAX ARCHITECTURAL VIEWPORT WITH HUD METADATA -->
        <div 
          class="premium-card group relative transition-transform duration-300 ease-out"
          [style.transform]="tiltTransform()"
          data-cursor="VIEW"
        >
          
          <!-- Image Viewport Container with Guaranteed Responsive Min-Height -->
          <div class="relative aspect-[16/9] sm:aspect-[21/10] min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] overflow-hidden bg-[#0c0e13]">
            
            <!-- Real High-Res 4K Corona Render -->
            <img 
              [src]="activeSlide().image" 
              [alt]="activeSlide().title"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02] block select-none"
              [style.filter]="lightingFilter()"
            />

            <!-- Subtle Vignette & Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#07080a]/90 via-black/15 to-[#07080a]/40 pointer-events-none"></div>

            <!-- Top Left HUD: Camera Spec -->
            <div class="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-col gap-1.5 pointer-events-none z-10">
              <div class="bg-[#07080a]/85 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 flex items-center gap-2 text-xs font-mono text-white/95">
                <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>CORONA_PHYSICAL_CAM // {{ activeSlide().camData.focal }}</span>
              </div>
              <div class="hidden sm:inline-flex bg-[#07080a]/75 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-[#9aa0ae]">
                <span>EXP: {{ activeSlide().camData.shutter }} &bull; LIGHT: {{ activeSlide().camData.lightTemp }}</span>
              </div>
            </div>

            <!-- Top Right HUD: Lighting Mode & Engine Tag -->
            <div class="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 z-10">
              <!-- Day/Night Quick Atmosphere Toggle -->
              <div class="bg-[#07080a]/85 backdrop-blur-md p-1 rounded border border-white/10 flex items-center gap-1 font-mono text-[10px]">
                <button
                  type="button"
                  (click)="lightingMode.set('warm')"
                  [class.bg-white]="lightingMode() === 'warm'"
                  [class.text-black]="lightingMode() === 'warm'"
                  [class.text-[#9aa0ae]]="lightingMode() !== 'warm'"
                  class="px-2 py-0.5 rounded transition-colors cursor-pointer"
                  title="3000K Warm Light"
                >
                  3000K
                </button>
                <button
                  type="button"
                  (click)="lightingMode.set('daylight')"
                  [class.bg-white]="lightingMode() === 'daylight'"
                  [class.text-black]="lightingMode() === 'daylight'"
                  [class.text-[#9aa0ae]]="lightingMode() !== 'daylight'"
                  class="px-2 py-0.5 rounded transition-colors cursor-pointer"
                  title="5500K Daylight"
                >
                  5500K
                </button>
              </div>

              <div class="hidden md:flex bg-[#07080a]/85 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-xs font-mono text-[#c5a880]">
                <span>4K UHD CORONA 11</span>
              </div>
            </div>

            <!-- Bottom Left HUD: Material Callout -->
            <div class="hidden lg:block absolute bottom-24 left-6 pointer-events-none z-10">
              <div class="bg-[#07080a]/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[10px] font-mono text-[#9aa0ae]">
                <span>PBR: {{ activeSlide().camData.material }}</span>
              </div>
            </div>

            <!-- Bottom Caption & Perspective Switcher -->
            <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
              <div>
                <span class="font-mono text-[11px] text-[#c5a880] uppercase tracking-wider block mb-1">
                  {{ activeSlide().category }} &bull; {{ activeSlide().location }}
                </span>
                <h3 class="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight-custom font-display">
                  {{ activeSlide().title }}
                </h3>
              </div>

              <!-- Perspective Jump Buttons -->
              <div class="flex items-center gap-1 bg-[#07080a]/90 backdrop-blur-md p-1.5 rounded border border-white/15 self-start sm:self-auto">
                <span class="text-[10px] font-mono text-[#616776] px-2 hidden md:inline">PERSPECTIVE:</span>
                <button 
                  *ngFor="let s of slides; let i = index"
                  type="button"
                  (click)="activeSlideIndex.set(i)"
                  [class.bg-white]="activeSlideIndex() === i"
                  [class.text-black]="activeSlideIndex() === i"
                  [class.text-[#9aa0ae]]="activeSlideIndex() !== i"
                  class="font-mono text-xs px-2.5 py-1 rounded transition-all cursor-pointer hover:text-white"
                >
                  {{ s.number }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 02: Architectural Metrics & Technical Annotations Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/[0.08] font-mono">
          <div class="border-l border-white/[0.08] pl-4">
            <div class="text-[10px] text-[#c5a880] uppercase tracking-widest">[ METRIC // 01 ]</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">2+ Years</div>
            <div class="text-xs text-[#9aa0ae] mt-1">Professional Studio Practice</div>
          </div>
          <div class="border-l border-white/[0.08] pl-4">
            <div class="text-[10px] text-[#c5a880] uppercase tracking-widest">[ METRIC // 02 ]</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">50+ Works</div>
            <div class="text-xs text-[#9aa0ae] mt-1">Corona 11 4K Master Vault</div>
          </div>
          <div class="border-l border-white/[0.08] pl-4">
            <div class="text-[10px] text-[#c5a880] uppercase tracking-widest">[ METRIC // 03 ]</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">100% CAD</div>
            <div class="text-xs text-[#9aa0ae] mt-1">Millimeter Execution Sets</div>
          </div>
          <div class="border-l border-white/[0.08] pl-4">
            <div class="text-[10px] text-[#c5a880] uppercase tracking-widest">[ METRIC // 04 ]</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">3 Studios</div>
            <div class="text-xs text-[#9aa0ae] mt-1">Sketch Spaces &bull; Camara &bull; Ettore</div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  contact = CONTACT_INFO;
  activeSlideIndex = signal(0);
  lightingMode = signal<'warm' | 'daylight'>('warm');

  // Animated Typing Signals
  typedText = signal('');
  private phrases = [
    'Interior Designer',
    '3D Visualizer',
    'Architectural Storyteller',
    'Spatial Design Enthusiast',
    'Technical Drawing Specialist',
    'Material & Lighting Explorer',
  ];
  private currentPhraseIndex = 0;
  private isDeleting = false;
  private typingTimer: any = null;

  // Desktop Mouse Tilt Parallax
  tiltX = signal(0);
  tiltY = signal(0);
  parallaxOffset = signal(0);

  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  slides: HeroSlide[] = [
    {
      id: 'slide-01',
      number: 'CAM_01',
      title: 'Luxury Master Bedroom w/ Fluted Wall & Curved Wingback',
      category: 'Master Bedroom Suite',
      image: 'assets/projects/rahul-work/page-01.jpg',
      specs: 'Corona 11.2 • 3000K Warm Cove • 24mm Lens',
      location: 'Camara Interiors • Sector 63, Noida',
      software: '3ds Max 2024 / Corona 11',
      camData: {
        focal: '24mm F/2.8',
        shutter: '1/60s EV 11.2',
        lightTemp: '3000K Cove LED',
        material: 'Smoked Walnut & Fluted MDF',
      },
    },
    {
      id: 'slide-02',
      number: 'CAM_02',
      title: 'Curved Asymmetrical Headboard & Bedside Pendants',
      category: 'Master Suite Perspective',
      image: 'assets/projects/rahul-work/page-03.jpg',
      specs: 'Corona Sun & Sky + IES Downlights',
      location: 'Camara Interiors • Sector 63, Noida',
      software: '3ds Max 2024 / Corona 11',
      camData: {
        focal: '35mm F/4.0',
        shutter: '1/125s EV 12.0',
        lightTemp: 'Sun 42° + 3000K Cove',
        material: 'Bouclé Upholstery & Brushed Brass',
      },
    },
    {
      id: 'slide-03',
      number: 'CAM_03',
      title: 'Double-Height Living Lounge & Curved Floating Console',
      category: 'Living Lounge & Media Wall',
      image: 'assets/projects/rahul-work/page-06.jpg',
      specs: 'Volumetric Daylight + Concealed LEDs',
      location: 'Camara Interiors • Noida NCR',
      software: '3ds Max 2024 / Corona 11',
      camData: {
        focal: '20mm F/3.5',
        shutter: '1/90s EV 11.8',
        lightTemp: '5500K Daylight + Warm LED',
        material: 'Calacatta Marble & Fluted Glass',
      },
    },
    {
      id: 'slide-04',
      number: 'CAM_04',
      title: "Khanna's Villa — 3-Storey Contemporary Facade",
      category: 'Exterior Villa Architecture',
      image: 'assets/projects/rahul-work/page-14.jpg',
      specs: 'Exterior Dusk Ambience • 4K UHD',
      location: 'Camara Interiors • NCR',
      software: '3ds Max 2024 / Corona 11',
      camData: {
        focal: '28mm F/5.6',
        shutter: '1/30s EV 9.5',
        lightTemp: 'Blue Hour Dusk + Warm Spots',
        material: 'Travertine Stone & Louver Metal',
      },
    },
  ];

  activeSlide = computed(() => this.slides[this.activeSlideIndex()] || this.slides[0]);

  lightingFilter(): string {
    return this.lightingMode() === 'warm'
      ? 'sepia(0.08) saturate(1.08) brightness(1.01)'
      : 'contrast(1.05) brightness(1.06) saturate(0.96)';
  }

  tiltTransform = computed(() => {
    if (this.tiltX() === 0 && this.tiltY() === 0) return 'none';
    return `perspective(1000px) rotateX(${this.tiltY()}deg) rotateY(${this.tiltX()}deg)`;
  });

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initTypingLoop();
    }
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
  }

  private initTypingLoop(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.typedText.set(this.phrases[0]);
      return;
    }

    const typeStep = () => {
      const fullPhrase = this.phrases[this.currentPhraseIndex];
      const currentText = this.typedText();

      if (this.isDeleting) {
        this.typedText.set(fullPhrase.substring(0, currentText.length - 1));
        if (this.typedText() === '') {
          this.isDeleting = false;
          this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
          this.typingTimer = setTimeout(typeStep, 450);
          return;
        }
        this.typingTimer = setTimeout(typeStep, 35);
      } else {
        this.typedText.set(fullPhrase.substring(0, currentText.length + 1));
        if (this.typedText() === fullPhrase) {
          this.isDeleting = true;
          this.typingTimer = setTimeout(typeStep, 2200); // hold phrase
          return;
        }
        this.typingTimer = setTimeout(typeStep, 65);
      }
    };

    typeStep();
  }

  onSectionMouseMove(e: MouseEvent): void {
    if (!this.isBrowser || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;

    // Subtle restrained tilt: max 2.5 degrees
    this.tiltX.set(Math.round(deltaX * 2.5 * 10) / 10);
    this.tiltY.set(Math.round(-deltaY * 2.0 * 10) / 10);
  }

  onSectionMouseLeave(): void {
    this.tiltX.set(0);
    this.tiltY.set(0);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.parallaxOffset.set(window.scrollY);
  }
}
