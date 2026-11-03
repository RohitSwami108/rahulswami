import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild, signal } from '@angular/core';

interface VisualizerSubject {
  id: string;
  title: string;
  cadSvg: string;
  renderJpg: string;
  dimensions: string;
  location: string;
  notes: string;
  cameraInfo: string;
}

@Component({
  selector: 'app-visualizer-studio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="visualizer-studio" class="py-24 md:py-32 border-b border-white/[0.08] relative overflow-hidden">
      
      <!-- 02: RECOGNIZABLE EDITORIAL BACKGROUND NUMERAL (8% Opacity, Left-Aligned for Editorial Asymmetry) -->
      <div 
        class="section-watermark-number top-6 left-6 sm:left-14 md:left-20"
        [style.transform]="'translateY(' + (parallaxOffset() - 1500) * 0.12 + 'px)'"
      >
        02
      </div>

      <!-- 03: UNIQUE ARCHITECTURAL BACKGROUND PATTERN (Technical CAD Blueprint Grid & Measurement Lines) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="cadGridTech" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.025)" stroke-width="1"/>
              <circle cx="40" cy="40" r="1" fill="rgba(16, 185, 129, 0.3)"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cadGridTech)" />
          
          <!-- Technical Drafting Dimension Lines -->
          <line x1="5%" y1="120" x2="95%" y2="120" stroke="rgba(197, 168, 128, 0.08)" stroke-width="1" stroke-dasharray="6,8"/>
          <line x1="5%" y1="110" x2="5%" y2="130" stroke="rgba(197, 168, 128, 0.15)" stroke-width="1.5"/>
          <line x1="95%" y1="110" x2="95%" y2="130" stroke="rgba(197, 168, 128, 0.15)" stroke-width="1.5"/>
          
          <!-- Elevation Axis Markers -->
          <text x="6%" y="115" fill="rgba(197, 168, 128, 0.4)" font-family="monospace" font-size="9">SPAN: 18,400 MM [DATUM EL. +3200]</text>
        </svg>
      </div>

      <!-- Architectural Crosshairs -->
      <div class="cad-crosshair top-10 left-6"></div>
      <div class="cad-crosshair bottom-10 right-6"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Section Header Row -->
        <div class="max-w-4xl mb-12">
          <div class="flex items-center gap-3 mb-3">
            <div class="section-label">
              [ 02 // TECHNICAL FIDELITY: 2D AUTOCAD VS 3D CORONA ]
            </div>
            <span class="hidden sm:inline-flex cad-tech-stamp">
              PRECISION RATIO: 1:1 EXECUTION
            </span>
          </div>

          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#f5f5f7] tracking-tight-custom mb-4 font-display">
            From 2D Blueprint to Photorealistic 3D
          </h2>
          <p class="text-sm sm:text-base text-[#9aa0ae] max-w-2xl font-normal leading-relaxed">
            Drag the interactive divider below to inspect the transformation: see how millimeter-precise AutoCAD 2025 working drawings and joinery elevations directly translate into Rahul's photorealistic 3D renders created in 3ds Max and Corona Renderer 11.
          </p>
        </div>

        <!-- Interactive Comparison Studio Card -->
        <div class="premium-card p-5 sm:p-8 max-w-6xl mx-auto border-white/[0.12]">
          
          <!-- Studio Toolbar Controls -->
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            
            <!-- Left: Subject Selector -->
            <div class="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span class="text-[11px] font-mono text-[#616776] uppercase tracking-wider mr-1 hidden sm:inline">SUBJECT:</span>
              <button 
                *ngFor="let subj of subjects"
                type="button"
                (click)="activeSubjectId.set(subj.id)"
                [class.bg-white]="activeSubjectId() === subj.id"
                [class.text-black]="activeSubjectId() === subj.id"
                [class.text-[#9aa0ae]]="activeSubjectId() !== subj.id"
                class="font-mono text-xs px-3.5 py-1.5 rounded border border-white/10 transition-all cursor-pointer hover:border-white/30"
              >
                {{ subj.title }}
              </button>
            </div>

            <!-- Right: Lighting Simulator Controls -->
            <div class="flex items-center gap-1.5 bg-[#07080a] p-1 rounded border border-white/10 font-mono text-xs">
              <span class="text-[11px] text-[#616776] px-2 hidden md:inline">ATMOSPHERE:</span>
              <button 
                type="button"
                (click)="setLightingMode('warm')" 
                [class.bg-white]="lightingMode() === 'warm'"
                [class.text-black]="lightingMode() === 'warm'"
                [class.text-[#9aa0ae]]="lightingMode() !== 'warm'"
                class="px-2.5 py-1 rounded transition-all cursor-pointer"
              >
                Warm Cove (3000K)
              </button>
              <button 
                type="button"
                (click)="setLightingMode('daylight')" 
                [class.bg-white]="lightingMode() === 'daylight'"
                [class.text-black]="lightingMode() === 'daylight'"
                [class.text-[#9aa0ae]]="lightingMode() !== 'daylight'"
                class="px-2.5 py-1 rounded transition-all cursor-pointer"
              >
                Daylight (5500K)
              </button>
              <button 
                type="button"
                (click)="setLightingMode('night')" 
                [class.bg-white]="lightingMode() === 'night'"
                [class.text-black]="lightingMode() === 'night'"
                [class.text-[#9aa0ae]]="lightingMode() !== 'night'"
                class="px-2.5 py-1 rounded transition-all cursor-pointer"
              >
                Night Ambience
              </button>
            </div>

          </div>

          <!-- The Split Comparison Viewport with Drag Cursor -->
          <div 
            #comparisonContainer
            class="comparison-container relative mt-6 rounded-xl overflow-hidden select-none cursor-ew-resize aspect-[16/9] sm:aspect-[21/10] bg-black shadow-2xl border border-white/10 group"
            (mousedown)="startDrag($event)"
            (touchstart)="startDragTouch($event)"
            data-cursor="DRAG"
          >
            <!-- Right Layer: Rahul's Real 3D Corona Photorealistic Render (Background) -->
            <div class="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                [src]="currentSubject().renderJpg" 
                alt="Corona 3D Photorealistic Render by Rahul Swami"
                class="w-full h-full object-cover transition-all duration-500 block"
                [style.filter]="lightingFilter()"
              />
              
              <!-- 3D Render Overlay Label -->
              <div class="absolute top-4 right-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>CORONA 11 3D RENDER (4K UHD)</span>
              </div>
            </div>

            <!-- Left Layer: 2D AutoCAD Technical Elevation (Clipped) -->
            <div 
              class="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
              [style.width.%]="sliderPosition()"
            >
              <div class="w-full h-full relative" [style.width.px]="containerWidth">
                <img 
                  [src]="currentSubject().cadSvg" 
                  alt="AutoCAD 2D Technical Working Drawing"
                  class="w-full h-full object-cover block bg-[#07090e]"
                />

                <!-- 2D CAD Overlay Label -->
                <div class="absolute top-4 left-4 bg-black/90 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/20 text-xs font-mono text-white flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#c5a880] animate-ping"></span>
                  <span>AUTOCAD 2025 WORKING DRAWING</span>
                </div>
              </div>
            </div>

            <!-- Draggable Divider Handle -->
            <div 
              class="absolute top-0 bottom-0 -ml-5 w-10 flex items-center justify-center pointer-events-none z-20"
              [style.left.%]="sliderPosition()"
            >
              <div class="w-10 h-10 rounded-full bg-black/95 border-2 border-[#c5a880] shadow-[0_0_25px_rgba(197,168,128,0.5)] flex items-center justify-center text-white backdrop-blur-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="-ml-2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>

          </div>

          <!-- Bottom Status & Dimension Strip -->
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#9aa0ae] mt-5 px-2">
            <div class="flex items-center gap-2">
              <span class="text-[#c5a880] font-bold">&larr; Drag Interactive Slider &rarr;</span>
              <span class="hidden sm:inline">to inspect accuracy between CAD elevation lines and Corona PBR shading</span>
            </div>
            <div class="flex items-center gap-3 text-[11px]">
              <span class="text-[#e2cfb6] font-bold">DIMENSIONS: {{ currentSubject().dimensions }}</span>
              <span>&bull;</span>
              <span>{{ currentSubject().location }}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [],
})
export class VisualizerStudioComponent implements AfterViewInit {
  @ViewChild('comparisonContainer') comparisonContainer!: ElementRef<HTMLDivElement>;

  sliderPosition = signal(50);
  isDragging = false;
  lightingMode = signal<'warm' | 'daylight' | 'night'>('warm');
  containerWidth = 1000;
  activeSubjectId = signal('bedroom');
  parallaxOffset = signal(0);
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  subjects: VisualizerSubject[] = [
    {
      id: 'bedroom',
      title: 'Master Bedroom Wall Elevation',
      cadSvg: 'assets/drawings/cad-bedroom-elevation.svg',
      renderJpg: 'assets/projects/rahul-work/page-01.jpg',
      dimensions: '4200mm W x 3000mm H',
      location: 'Sector 63, Noida Suite',
      notes: 'Fluted wooden wall panels, recessed LED profile coves, and upholstered headboard joinery.',
      cameraInfo: 'Corona Physical Cam 24mm',
    },
    {
      id: 'wardrobe',
      title: 'Modular Glass Wardrobe Joinery',
      cadSvg: 'assets/drawings/cad-wardrobe-detail.svg',
      renderJpg: 'assets/projects/rahul-work/page-11.jpg',
      dimensions: '3600mm W x 2700mm H',
      location: 'Camara Interiors Residence',
      notes: 'Internal carcass shelving, sensor-activated hanging rods, and tinted glass sliding shutters.',
      cameraInfo: 'Corona Cam 28mm Focal',
    },
  ];

  currentSubject = () => {
    return this.subjects.find(s => s.id === this.activeSubjectId()) || this.subjects[0];
  };

  setLightingMode(mode: 'warm' | 'daylight' | 'night'): void {
    this.lightingMode.set(mode);
  }

  lightingFilter(): string {
    switch (this.lightingMode()) {
      case 'warm':
        return 'sepia(0.12) saturate(1.15) brightness(1.02)';
      case 'daylight':
        return 'contrast(1.06) brightness(1.08) saturate(0.98)';
      case 'night':
        return 'brightness(0.78) contrast(1.25) saturate(1.2) hue-rotate(-8deg)';
      default:
        return 'none';
    }
  }

  startDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.updatePosition(event.clientX);
  }

  startDragTouch(event: TouchEvent): void {
    this.isDragging = true;
    if (event.touches.length > 0) {
      this.updatePosition(event.touches[0].clientX);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.updatePosition(event.clientX);
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging || event.touches.length === 0) return;
    this.updatePosition(event.touches[0].clientX);
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  stopDrag(): void {
    this.isDragging = false;
  }

  private updatePosition(clientX: number): void {
    if (!this.comparisonContainer) return;
    const rect = this.comparisonContainer.nativeElement.getBoundingClientRect();
    this.containerWidth = rect.width;
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    this.sliderPosition.set(percentage);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.parallaxOffset.set(window.scrollY);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.comparisonContainer) {
      this.containerWidth = this.comparisonContainer.nativeElement.getBoundingClientRect().width;
    }
  }
}
