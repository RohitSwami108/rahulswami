import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { gsap } from 'gsap';

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
    <section id="visualizer-studio" #sectionRef class="py-24 md:py-32 border-b border-white/[0.07] relative overflow-hidden">
      
      <!-- Section Watermark -->
      <div class="section-watermark-number">02</div>

      <!-- Architectural Crosshairs -->
      <div class="cad-crosshair top-10 left-6"></div>
      <div class="cad-crosshair bottom-10 right-6"></div>

      <!-- Subtle Ambient Glow -->
      <div class="absolute -top-32 right-1/4 w-[600px] h-[300px] bg-gradient-to-b from-[#c5a880]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Section Header Row -->
        <div class="max-w-4xl mb-12">
          <div class="section-label mb-3">
            [ 02 // TECHNICAL FIDELITY: 2D AUTOCAD VS 3D CORONA ]
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

          <!-- Top Blueprint Dimension Line -->
          <div class="my-4 cad-dim-line">
            <span>&bull; ELEVATION SPAN: {{ currentSubject().dimensions }} &bull;</span>
          </div>

          <!-- Split Comparison Viewport -->
          <div 
            #comparisonContainer
            class="relative rounded-xl overflow-hidden select-none cursor-ew-resize aspect-[16/9] sm:aspect-[21/10] bg-black shadow-2xl border border-white/15 group"
            (mousedown)="startDrag($event)"
            (touchstart)="startDragTouch($event)"
          >
            <!-- Right Layer: Rahul's 3D Corona Photorealistic Render (Background) -->
            <div class="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                [src]="currentSubject().renderJpg" 
                alt="Corona 3D Photorealistic Render by Rahul Swami"
                class="w-full h-full object-cover transition-all duration-500"
                [style.filter]="lightingFilter()"
              />
              
              <!-- 3D Render Overlay Label -->
              <div class="absolute top-4 right-4 bg-[#07080a]/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/15 text-xs font-mono text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>CORONA 11 3D RENDER (4K UHD)</span>
              </div>

              <!-- Camera Spec Callout -->
              <div class="hidden md:block absolute bottom-4 right-4 bg-[#07080a]/85 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[11px] font-mono text-[#9aa0ae]">
                {{ currentSubject().cameraInfo }}
              </div>
            </div>

            <!-- Left Layer: 2D AutoCAD Technical Elevation (Clipped) -->
            <div 
              class="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white/80 shadow-2xl"
              [style.width.%]="sliderPosition()"
            >
              <div class="w-full h-full relative" [style.width.px]="containerWidth">
                <img 
                  [src]="currentSubject().cadSvg" 
                  alt="AutoCAD 2025 Technical Working Drawing"
                  class="w-full h-full object-cover bg-[#0a0c12]"
                />

                <!-- 2D CAD Overlay Label -->
                <div class="absolute top-4 left-4 bg-[#07080a]/90 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/20 text-xs font-mono text-white flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span>AUTOCAD 2025 WORKING DRAWING</span>
                </div>

                <!-- 2D Dimension Callout -->
                <div class="hidden md:block absolute bottom-4 left-4 bg-[#07080a]/85 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[11px] font-mono text-[#c5a880]">
                  SCALE 1:50 &bull; 0.00mm ERROR TOLERANCE
                </div>
              </div>
            </div>

            <!-- Draggable Divider Handle -->
            <div 
              class="absolute top-0 bottom-0 -ml-5 w-10 flex items-center justify-center pointer-events-none z-20"
              [style.left.%]="sliderPosition()"
            >
              <div class="w-10 h-10 rounded-full bg-[#07080a]/95 border-2 border-white shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center justify-center text-white backdrop-blur-md">
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
              <span class="text-white">&larr; Drag Left / Right &rarr;</span>
              <span>to inspect structural alignment between CAD working linework and Corona 3D shading</span>
            </div>
            <div class="flex items-center gap-3 text-[11px]">
              <span class="text-[#e2cfb6]">DIMENSIONS: {{ currentSubject().dimensions }}</span>
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
  @ViewChild('sectionRef') sectionRef!: ElementRef<HTMLElement>;

  sliderPosition = signal(50);
  isDragging = false;
  lightingMode = signal<'warm' | 'daylight' | 'night'>('warm');
  containerWidth = 1000;
  activeSubjectId = signal('bedroom');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  subjects: VisualizerSubject[] = [
    {
      id: 'bedroom',
      title: 'Master Bedroom Wall Elevation',
      cadSvg: 'assets/drawings/cad-bedroom-elevation.svg',
      renderJpg: 'assets/projects/rahul-work/page-01.jpg',
      dimensions: '4200mm W x 3000mm H',
      location: 'Sector 63, Noida Suite',
      notes: 'Fluted wooden wall panels, recessed LED profile coves, and upholstered headboard joinery.',
      cameraInfo: 'CoronaPhysicalCam • 24mm F/2.8 • LightMix 3000K',
    },
    {
      id: 'wardrobe',
      title: 'Modular Glass Wardrobe Joinery',
      cadSvg: 'assets/drawings/cad-wardrobe-detail.svg',
      renderJpg: 'assets/projects/rahul-work/page-11.jpg',
      dimensions: '3600mm W x 2700mm H',
      location: 'Camara Interiors Residence',
      notes: 'Internal carcass shelving, sensor-activated hanging rods, and tinted glass sliding shutters.',
      cameraInfo: 'CoronaPhysicalCam • 35mm F/4.0 • Concealed Strip 3000K',
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.comparisonContainer) {
        this.containerWidth = this.comparisonContainer.nativeElement.getBoundingClientRect().width;
      }
    }
  }
}
