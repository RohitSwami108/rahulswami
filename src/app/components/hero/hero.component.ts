import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import * as THREE from 'three';
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

export type ViewportPipelineStage = 'wireframe' | 'clay' | 'pbr' | 'corona';

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
      
      <!-- 04: RECOGNIZABLE EDITORIAL BACKGROUND NUMERAL (8% Opacity) -->
      <div 
        class="section-watermark-number top-4 right-4 sm:right-12 md:right-20"
        [style.transform]="'translateY(' + parallaxOffset() * 0.15 + 'px)'"
      >
        00
      </div>

      <!-- 05: UNIQUE ARCHITECTURAL BACKGROUND PATTERN (Hero Geometry & Coordinate Network) -->
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

        <!-- 03: ADVANCED TYPOGRAPHY & ANIMATED TYPING ENGINE -->
        <div class="max-w-5xl mb-12">
          
          <!-- Section Technical Stamp -->
          <div class="flex items-center gap-3 mb-4">
            <div class="section-label">
              [ 00 // INTRODUCTION &amp; 3D SPATIAL ARCHITECTURE ]
            </div>
            <div class="hidden sm:inline-flex cad-tech-stamp">
              DWG: RS-2026 // MASTER ARCHIVE
            </div>
          </div>
          
          <!-- EXACT REQUESTED HERO HEADING: Precision spaces. Photographic discipline. Architectural storytelling. -->
          <h1 class="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#f5f5f7] tracking-tight-custom leading-[1.08] mb-6 font-display">
            Precision spaces. <br class="hidden sm:inline"/>
            Photographic discipline. <br class="hidden sm:inline"/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f7] to-[#c5a880]">
              Architectural storytelling.
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
            href="#materials" 
            class="btn-ghost-action"
            data-cursor="INSPECT"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path></svg>
            <span>Material &amp; Lighting Studio</span>
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

        <!-- 02: REAL 3D ARCHITECTURAL HERO EXPERIENCE & PIPELINE TRANSFORMATION -->
        <div 
          class="premium-card group relative transition-transform duration-300 ease-out overflow-hidden border-white/[0.14] shadow-2xl"
          [style.transform]="tiltTransform()"
          data-cursor="VIEW"
        >
          <!-- Top Architectural VFB Software Console Toolbar -->
          <div class="px-5 py-3.5 bg-[#0a0c14] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <!-- Left: 4-Stage Architectural Pipeline Switcher -->
            <div class="flex items-center gap-1 bg-[#07080a] p-1 rounded-xl border border-white/10 text-[11px] overflow-x-auto">
              <span class="text-[#616776] px-2 text-[10px] hidden md:inline">PIPELINE:</span>
              <button
                type="button"
                (click)="setPipelineStage('wireframe')"
                [class.bg-[#10b981]]="pipelineStage() === 'wireframe'"
                [class.text-black]="pipelineStage() === 'wireframe'"
                [class.text-[#9aa0ae]]="pipelineStage() !== 'wireframe'"
                class="px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer font-bold whitespace-nowrap"
                title="Stage 1: Real-Time 3D Wireframe"
              >
                1. WIREFRAME (3D)
              </button>
              <button
                type="button"
                (click)="setPipelineStage('clay')"
                [class.bg-white]="pipelineStage() === 'clay'"
                [class.text-black]="pipelineStage() === 'clay'"
                [class.text-[#9aa0ae]]="pipelineStage() !== 'clay'"
                class="px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer font-bold whitespace-nowrap"
                title="Stage 2: Solid Clay Geometry"
              >
                2. SOLID CLAY (3D)
              </button>
              <button
                type="button"
                (click)="setPipelineStage('pbr')"
                [class.bg-[#c5a880]]="pipelineStage() === 'pbr'"
                [class.text-black]="pipelineStage() === 'pbr'"
                [class.text-[#9aa0ae]]="pipelineStage() !== 'pbr'"
                class="px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer font-bold whitespace-nowrap"
                title="Stage 3: PBR Materials"
              >
                3. PBR SHADED (3D)
              </button>
              <button
                type="button"
                (click)="setPipelineStage('corona')"
                [class.bg-gradient-to-r]="pipelineStage() === 'corona'"
                [class.from-white]="pipelineStage() === 'corona'"
                [class.to-[#c5a880]]="pipelineStage() === 'corona'"
                [class.text-black]="pipelineStage() === 'corona'"
                [class.text-[#9aa0ae]]="pipelineStage() !== 'corona'"
                class="px-2.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer font-bold whitespace-nowrap"
                title="Stage 4: 4K Corona Photorealistic Render"
              >
                4. 4K CORONA RENDER
              </button>
            </div>

            <!-- Right: Atmosphere Lighting & Engine Status -->
            <div class="flex items-center gap-3">
              <div class="bg-[#07080a] p-1 rounded-lg border border-white/10 flex items-center gap-1 text-[10px]">
                <span class="text-[#616776] px-1.5 hidden lg:inline">ATMOSPHERE:</span>
                <button
                  type="button"
                  (click)="lightingMode.set('warm')"
                  [class.bg-white]="lightingMode() === 'warm'"
                  [class.text-black]="lightingMode() === 'warm'"
                  [class.text-[#9aa0ae]]="lightingMode() !== 'warm'"
                  class="px-2 py-0.5 rounded transition-colors cursor-pointer"
                  title="3000K Warm Light"
                >
                  3000K Warm
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
                  5500K Daylight
                </button>
              </div>

              <div class="hidden sm:flex items-center gap-1.5 text-xs text-[#c5a880]">
                <span class="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>CORONA 11 &bull; 4K UHD</span>
              </div>
            </div>
          </div>
          
          <!-- Image Viewport Container with Guaranteed Responsive Min-Height -->
          <div 
            #heroViewport
            (mousemove)="onViewportMouseMove($event)"
            class="relative aspect-[16/9] sm:aspect-[21/10] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden bg-[#0a0c10]"
          >
            
            <!-- Three.js Real-Time 3D WebGL Canvas -->
            <canvas 
              #threeCanvas 
              class="absolute inset-0 w-full h-full z-10 transition-opacity duration-700 pointer-events-none"
              [style.opacity]="isThreeStageActive() ? '1' : '0'"
            ></canvas>

            <!-- Real High-Res 4K Corona Render (Stage 4 / Fallback) -->
            <img 
              [src]="activeSlide().image" 
              [alt]="activeSlide().title"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              class="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] block select-none z-0 relative"
              [style.opacity]="isThreeStageActive() ? '0.2' : '1'"
              [style.filter]="lightingFilter()"
            />

            <!-- Subtle Vignette & Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#07080a]/90 via-black/20 to-[#07080a]/50 pointer-events-none z-10"></div>

            <!-- Top Left HUD: Floating Architectural Technical Annotations -->
            <div class="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-col gap-1.5 pointer-events-none z-20">
              <div class="bg-[#07080a]/85 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 flex items-center gap-2 text-xs font-mono text-white/95">
                <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span *ngIf="pipelineStage() === 'corona'">CORONA_PHYSICAL_CAM // {{ activeSlide().camData.focal }}</span>
                <span *ngIf="pipelineStage() === 'wireframe'">THREE_PERSPECTIVE_CAM // 3D WIREFRAME ROOM</span>
                <span *ngIf="pipelineStage() === 'clay'">CLAY_GEOMETRY_CAM // SOLID ARCHITECTURAL MESH</span>
                <span *ngIf="pipelineStage() === 'pbr'">PBR_SHADER_CAM // WALNUT &amp; CALACATTA</span>
              </div>
              
              <!-- Floating Annotations Required by Brief -->
              <div class="hidden sm:inline-flex bg-[#07080a]/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-[#9aa0ae] gap-2">
                <span>ROOM / 001</span>
                <span>&bull;</span>
                <span>CAMERA / 01</span>
                <span>&bull;</span>
                <span>MATERIAL / {{ activeSlide().camData.material }}</span>
                <span>&bull;</span>
                <span>LIGHTING / 3000K</span>
                <span>&bull;</span>
                <span>RENDER ENGINE / CORONA 11</span>
              </div>
            </div>

            <!-- Bottom Left HUD: Material Callout -->
            <div class="hidden lg:block absolute bottom-24 left-6 pointer-events-none z-20">
              <div class="bg-[#07080a]/75 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-[10px] font-mono text-[#9aa0ae] flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
                <span>PBR: {{ activeSlide().camData.material }}</span>
              </div>
            </div>

            <!-- Bottom Caption & Perspective Switcher -->
            <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
              <div>
                <span class="font-mono text-[11px] text-[#c5a880] uppercase tracking-wider block mb-1">
                  {{ activeSlide().category }} &bull; {{ activeSlide().location }}
                </span>
                <h3 class="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight-custom font-display">
                  {{ activeSlide().title }}
                </h3>
              </div>

              <!-- Multi-Camera Angle Selector (Real Archive Renders) -->
              <div class="flex items-center gap-1.5 bg-[#07080a]/85 backdrop-blur-md p-1.5 rounded-lg border border-white/15">
                <span class="text-[9px] font-mono text-[#7e879b] px-2 hidden md:inline">PERSPECTIVE:</span>
                <button
                  *ngFor="let s of slides; let i = index"
                  type="button"
                  (click)="selectSlide(i)"
                  [class.bg-white]="currentSlideIndex() === i"
                  [class.text-black]="currentSlideIndex() === i"
                  [class.text-[#9aa0ae]]="currentSlideIndex() !== i"
                  class="font-mono text-xs px-2.5 py-1 rounded transition-colors cursor-pointer hover:text-white"
                  [attr.aria-label]="'Switch to camera angle ' + s.number"
                >
                  CAM_0{{ i + 1 }}
                </button>
              </div>
            </div>

          </div>

          <!-- Bottom Metric Bar -->
          <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.08] bg-[#07080a] border-t border-white/[0.08] text-xs font-mono">
            <div class="p-4 sm:p-5">
              <span class="text-[#7e879b] block text-[10px] mb-1">[ METRIC // 01 ]</span>
              <div class="text-white font-bold text-lg font-sans">2+ Years</div>
              <div class="text-[#9aa0ae] text-[11px]">Professional Studio Practice</div>
            </div>
            <div class="p-4 sm:p-5">
              <span class="text-[#7e879b] block text-[10px] mb-1">[ METRIC // 02 ]</span>
              <div class="text-white font-bold text-lg font-sans">50+ Works</div>
              <div class="text-[#9aa0ae] text-[11px]">Corona 11 4K Master Vault</div>
            </div>
            <div class="p-4 sm:p-5">
              <span class="text-[#7e879b] block text-[10px] mb-1">[ METRIC // 03 ]</span>
              <div class="text-white font-bold text-lg font-sans">100% CAD</div>
              <div class="text-[#9aa0ae] text-[11px]">Millimeter Execution Sets</div>
            </div>
            <div class="p-4 sm:p-5">
              <span class="text-[#7e879b] block text-[10px] mb-1">[ METRIC // 04 ]</span>
              <div class="text-white font-bold text-lg font-sans">3 Studios</div>
              <div class="text-[#9aa0ae] text-[11px]">Sketch Spaces &bull; Camara &bull; Ettore</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .typing-cursor {
      display: inline-block;
      width: 2.5px;
      height: 1.15em;
      background: linear-gradient(to bottom, #c5a880, #10b981);
      margin-left: 4px;
      vertical-align: middle;
      animation: cursorBlink 0.9s infinite;
    }

    @keyframes cursorBlink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  contact = CONTACT_INFO;
  isBrowser = false;

  // ViewChild references
  @ViewChild('threeCanvas') threeCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroViewport') heroViewportRef!: ElementRef<HTMLDivElement>;

  // Three.js State
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private wireframeGroup: THREE.Group | null = null;
  private clayGroup: THREE.Group | null = null;
  private pbrGroup: THREE.Group | null = null;
  private animFrameId: number | null = null;
  private targetCamX = 0;
  private targetCamY = 1.2;

  // Pipeline Stage: 'wireframe' | 'clay' | 'pbr' | 'corona'
  pipelineStage = signal<ViewportPipelineStage>('corona');
  isThreeStageActive = computed(() => this.pipelineStage() !== 'corona');

  // Multi-angle perspectives of real projects
  slides: HeroSlide[] = [
    {
      id: 'cam-01',
      number: '01',
      title: 'Luxury Master Bedroom w/ Fluted Wall & Curved Wingback',
      category: 'Master Bedroom Suite',
      image: 'assets/projects/rahul-work/page-08.jpg',
      specs: '3ds Max 2024 • Corona 11 • 4K UHD • AutoCAD Execution Set',
      location: 'Camara Interiors • Sector 63, Noida',
      software: 'Autodesk 3ds Max / Corona Renderer 11 / AutoCAD 2025',
      camData: {
        focal: '24mm F/2.8',
        shutter: '1/60s EV 11.2',
        lightTemp: '3000K Cove LED',
        material: 'Smoked Walnut & Fluted MDF',
      },
    },
    {
      id: 'cam-02',
      number: '02',
      title: 'The Opulent Arched Living Lounge & TV Suite',
      category: 'Living & Dining Lounge',
      image: 'assets/projects/rahul-work/page-01.jpg',
      specs: '3ds Max 2024 • Corona 11 • 4K UHD • Arched Wall Niche',
      location: 'Camara Interiors • Sector 63, Noida',
      software: '3ds Max / Corona 11 / Photoshop / AutoCAD',
      camData: {
        focal: '28mm F/3.2',
        shutter: '1/80s EV 12.0',
        lightTemp: '3000K Warm Backlight Arc',
        material: 'Bookmatched Calacatta Gold Marble',
      },
    },
    {
      id: 'cam-03',
      number: '03',
      title: 'The Parisian Boiserie Master Suite & TV Credenza',
      category: 'Master Bedroom Suite',
      image: 'assets/projects/rahul-work/page-02.jpg',
      specs: '3ds Max 2024 • Corona 11 • Classical French Boiserie',
      location: 'Camara Interiors • Sector 63, Noida',
      software: '3ds Max / Corona 11 / AutoCAD',
      camData: {
        focal: '35mm F/2.8',
        shutter: '1/50s EV 10.8',
        lightTemp: '3200K Sconce Warmth',
        material: 'French Boiserie & Walnut Veneer',
      },
    },
    {
      id: 'cam-04',
      number: '04',
      title: 'The Organic Curved Asymmetric Bedroom Suite',
      category: 'Contemporary Bedroom',
      image: 'assets/projects/rahul-work/page-05.jpg',
      specs: '3ds Max 2024 • Corona 11 • Curved Acoustic Fluting',
      location: 'Ettore Interior • Gagan Vihar, Delhi',
      software: '3ds Max / Corona 11 / AutoCAD',
      camData: {
        focal: '24mm F/3.5',
        shutter: '1/60s EV 11.5',
        lightTemp: '3000K Recessed Uplight',
        material: 'Curved Plaster & Oak Ribbing',
      },
    },
  ];

  currentSlideIndex = signal(0);
  activeSlide = computed(() => this.slides[this.currentSlideIndex()]);

  // Lighting environment mode
  lightingMode = signal<'warm' | 'daylight'>('warm');
  lightingFilter = computed(() =>
    this.lightingMode() === 'warm'
      ? 'sepia(0.08) saturate(1.04) contrast(1.02)'
      : 'brightness(1.05) saturate(1.02) contrast(1.04)'
  );

  // Parallax signals
  parallaxOffset = signal(0);
  mouseX = signal(0);
  mouseY = signal(0);
  tiltTransform = computed(() => {
    const x = this.mouseX();
    const y = this.mouseY();
    return `perspective(1200px) rotateX(${y * -3.5}deg) rotateY(${x * 3.5}deg) translateZ(0)`;
  });

  // Continuous typing phrases requested by user
  private phrases: string[] = [
    'Interior Designer',
    '3D Visualizer',
    'Architectural Storyteller',
    'Spatial Design Enthusiast',
    'Technical Drawing Specialist',
    'Material & Lighting Explorer',
  ];

  typedText = signal<string>('');
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: any = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initTyping();
      this.initThreeRoom();
    }
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.disposeThreeScene();
  }

  // Set the 4-stage pipeline
  setPipelineStage(stage: ViewportPipelineStage): void {
    this.pipelineStage.set(stage);

    if (this.wireframeGroup) {
      this.wireframeGroup.visible = stage === 'wireframe';
    }
    if (this.clayGroup) {
      this.clayGroup.visible = stage === 'clay';
    }
    if (this.pbrGroup) {
      this.pbrGroup.visible = stage === 'pbr';
    }
  }

  selectSlide(index: number): void {
    this.currentSlideIndex.set(index);
    this.setPipelineStage('corona');
  }

  // --- Real 3D Architectural Scene Implementation with Three.js ---
  private initThreeRoom(): void {
    if (!this.threeCanvasRef) return;
    const canvas = this.threeCanvasRef.nativeElement;

    try {
      const width = canvas.clientWidth || 900;
      const height = canvas.clientHeight || 550;

      // 1. Scene & Camera
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0a0c10);

      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(0, 1.2, 3.8);

      // 2. Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 3. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      this.scene.add(ambientLight);

      const warmCoveLight = new THREE.PointLight(0xffb74d, 1.8, 10);
      warmCoveLight.position.set(0, 2.2, -0.5);
      this.scene.add(warmCoveLight);

      const dirLight = new THREE.DirectionalLight(0xe2cfb6, 1.2);
      dirLight.position.set(2, 4, 3);
      this.scene.add(dirLight);

      // 4. Build Architectural Geometry (Floor, Feature Wall, Arched Credenza, Plinth Table)
      this.wireframeGroup = new THREE.Group();
      this.clayGroup = new THREE.Group();
      this.pbrGroup = new THREE.Group();

      this.buildArchitecturalMeshes();

      this.scene.add(this.wireframeGroup);
      this.scene.add(this.clayGroup);
      this.scene.add(this.pbrGroup);

      // Initially set visibility according to current pipeline stage
      this.setPipelineStage(this.pipelineStage());

      // Start render loop
      this.renderThreeLoop();
    } catch (e) {
      console.warn('Three.js initialization fallback to high-res render image:', e);
      this.pipelineStage.set('corona');
    }
  }

  private buildArchitecturalMeshes(): void {
    if (!this.wireframeGroup || !this.clayGroup || !this.pbrGroup) return;

    // --- MATERIALS FOR STAGE 2 (Clay) ---
    const clayMat = new THREE.MeshStandardMaterial({
      color: 0xd8d3cb,
      roughness: 0.88,
      metalness: 0.02,
    });

    // --- MATERIALS FOR STAGE 3 (PBR) ---
    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x3d291d,
      roughness: 0.45,
      metalness: 0.05,
    });
    const marbleMat = new THREE.MeshStandardMaterial({
      color: 0xf0ece5,
      roughness: 0.12,
      metalness: 0.02,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      roughness: 0.22,
      metalness: 0.92,
    });

    // --- LINE MATERIAL FOR STAGE 1 (Wireframe) ---
    const wireMatGold = new THREE.LineBasicMaterial({ color: 0xc5a880, linewidth: 1.5 });
    const wireMatEmerald = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 1.5 });

    const addMeshAndWire = (
      geom: THREE.BufferGeometry,
      clayMaterial: THREE.Material,
      pbrMaterial: THREE.Material,
      wireMaterial: THREE.LineBasicMaterial = wireMatGold
    ) => {
      // Clay Mesh
      const cMesh = new THREE.Mesh(geom, clayMaterial);
      this.clayGroup!.add(cMesh);

      // PBR Mesh
      const pMesh = new THREE.Mesh(geom, pbrMaterial);
      this.pbrGroup!.add(pMesh);

      // Wireframe Edges
      const edges = new THREE.EdgesGeometry(geom);
      const wire = new THREE.LineSegments(edges, wireMaterial);
      this.wireframeGroup!.add(wire);

      return { cMesh, pMesh, wire };
    };

    // 1. Floor Plane (Width 6, Depth 6)
    const floorGeom = new THREE.PlaneGeometry(6, 6, 8, 8);
    floorGeom.rotateX(-Math.PI / 2);
    floorGeom.translate(0, 0, 0);
    const floor = addMeshAndWire(
      floorGeom,
      new THREE.MeshStandardMaterial({ color: 0x1a1c22, roughness: 0.8 }),
      new THREE.MeshStandardMaterial({ color: 0x14161b, roughness: 0.25 }),
      wireMatEmerald
    );

    // 2. Back Feature Wall
    const wallGeom = new THREE.BoxGeometry(6, 3, 0.1);
    wallGeom.translate(0, 1.5, -2);
    addMeshAndWire(wallGeom, clayMat, walnutMat, wireMatGold);

    // 3. Cantilevered TV Credenza Plinth
    const credenzaGeom = new THREE.BoxGeometry(3.2, 0.45, 0.7);
    credenzaGeom.translate(0, 0.35, -1.5);
    addMeshAndWire(credenzaGeom, clayMat, marbleMat, wireMatGold);

    // 4. Arched Niche Top Curve
    const archGeom = new THREE.CylinderGeometry(1.2, 1.2, 0.2, 32, 1, false, 0, Math.PI);
    archGeom.rotateX(Math.PI / 2);
    archGeom.translate(0, 2.3, -1.9);
    addMeshAndWire(archGeom, clayMat, brassMat, wireMatGold);

    // 5. Minimalist Plinth Coffee Table
    const tableGeom = new THREE.CylinderGeometry(0.7, 0.7, 0.35, 24);
    tableGeom.translate(0, 0.18, 0.5);
    addMeshAndWire(tableGeom, clayMat, walnutMat, wireMatEmerald);

    // 6. Suspended Brass Ring Accent
    const ringGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.04, 32, 1, true);
    ringGeom.translate(0, 2.4, 0.5);
    addMeshAndWire(ringGeom, clayMat, brassMat, wireMatGold);
  }

  private renderThreeLoop = (): void => {
    if (!this.renderer || !this.scene || !this.camera) return;

    // Performance optimization: only compute WebGL draw call when 3D stage is visible
    if (this.isThreeStageActive()) {
      this.camera.position.x += (this.targetCamX - this.camera.position.x) * 0.05;
      this.camera.position.y += (this.targetCamY - this.camera.position.y) * 0.05;
      this.camera.lookAt(0, 0.9, -0.5);

      this.renderer.render(this.scene, this.camera);
    }

    this.animFrameId = requestAnimationFrame(this.renderThreeLoop);
  };

  private disposeThreeScene(): void {
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    this.scene = null;
    this.camera = null;
  }

  onViewportMouseMove(event: MouseEvent): void {
    if (!this.heroViewportRef) return;
    const rect = this.heroViewportRef.nativeElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    // Update Three.js camera target orbit
    this.targetCamX = x * 0.8;
    this.targetCamY = 1.2 - y * 0.4;
  }

  // --- Character-by-Character Continuous Typing Engine ---
  private initTyping(): void {
    const currentWord = this.phrases[this.phraseIndex];

    if (this.isDeleting) {
      this.typedText.set(currentWord.substring(0, this.charIndex - 1));
      this.charIndex--;
    } else {
      this.typedText.set(currentWord.substring(0, this.charIndex + 1));
      this.charIndex++;
    }

    let speed = this.isDeleting ? 45 : 90;

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      speed = 2200; // Pause on complete word
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      speed = 450; // Pause before typing next word
    }

    this.typingTimer = setTimeout(() => this.initTyping(), speed);
  }

  // --- Mouse Parallax Coordinates ---
  onSectionMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = (event.clientX / width) * 2 - 1;
    const y = (event.clientY / height) * 2 - 1;
    this.mouseX.set(x);
    this.mouseY.set(y);
  }

  onSectionMouseLeave(): void {
    this.mouseX.set(0);
    this.mouseY.set(0);
    this.targetCamX = 0;
    this.targetCamY = 1.2;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.parallaxOffset.set(window.scrollY);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser || !this.threeCanvasRef || !this.renderer || !this.camera) return;
    const canvas = this.threeCanvasRef.nativeElement;
    const w = canvas.clientWidth || 900;
    const h = canvas.clientHeight || 550;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
}
