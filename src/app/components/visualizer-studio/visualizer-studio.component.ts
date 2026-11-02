import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';

interface VisualizerSubject {
  id: string;
  title: string;
  cadSvg: string;
  renderJpg: string;
  dimensions: string;
  location: string;
  notes: string;
}

@Component({
  selector: 'app-visualizer-studio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="visualizer-studio" class="py-20 md:py-28 border-b border-white/[0.08] relative overflow-hidden">
      <!-- Ambient Lighting -->
      <div class="absolute -top-32 right-1/4 w-[600px] h-[300px] bg-gradient-to-b from-white/[0.03] to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Section Header (Unified Layout) -->
        <div class="max-w-4xl mb-12">
          <div class="section-label">
            [ 02 // TECHNICAL ACCURACY: 2D CAD VS 3D CORONA ]
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight-custom mb-4">
            From 2D Blueprint to Photorealistic 3D Render
          </h2>
          <p class="text-base sm:text-lg text-[#9ca3af] max-w-2xl font-normal leading-relaxed">
            Drag the interactive slider below to inspect the transformation: see how millimeter-precise 
            AutoCAD working drawings and carpentry joinery elevations directly materialize into Rahul's 
            photorealistic 3D renders created with 3ds Max and Corona Renderer 11.
          </p>
        </div>

        <!-- Interactive Comparison Studio Card -->
        <div class="premium-card p-5 sm:p-7 max-w-6xl mx-auto">
          
          <!-- Studio Toolbar Controls -->
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            
            <!-- Left: Subject Selector (Master Suite vs Wardrobe) -->
            <div class="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span class="text-[11px] font-mono text-[#6b7280] uppercase tracking-wider mr-1 hidden sm:inline">SUBJECT:</span>
              <button 
                *ngFor="let subj of subjects"
                type="button"
                (click)="activeSubjectId.set(subj.id)"
                [class.bg-white]="activeSubjectId() === subj.id"
                [class.text-black]="activeSubjectId() === subj.id"
                [class.text-[#9ca3af]]="activeSubjectId() !== subj.id"
                class="font-mono text-xs px-3.5 py-1.5 rounded-full border border-white/10 transition-all cursor-pointer hover:border-white/30"
              >
                {{ subj.title }}
              </button>
            </div>

            <!-- Right: Lighting Simulator Toggle -->
            <div class="flex items-center gap-1.5 bg-black/60 p-1 rounded-full border border-white/10 font-mono text-xs">
              <span class="text-[11px] text-[#6b7280] px-2 hidden md:inline">LIGHTING:</span>
              <button 
                type="button"
                (click)="setLightingMode('warm')" 
                [class.bg-white]="lightingMode() === 'warm'"
                [class.text-black]="lightingMode() === 'warm'"
                [class.text-[#9ca3af]]="lightingMode() !== 'warm'"
                class="px-2.5 py-1 rounded-full transition-all cursor-pointer"
              >
                Warm Cove (3000K)
              </button>
              <button 
                type="button"
                (click)="setLightingMode('daylight')" 
                [class.bg-white]="lightingMode() === 'daylight'"
                [class.text-black]="lightingMode() === 'daylight'"
                [class.text-[#9ca3af]]="lightingMode() !== 'daylight'"
                class="px-2.5 py-1 rounded-full transition-all cursor-pointer"
              >
                Daylight (5500K)
              </button>
              <button 
                type="button"
                (click)="setLightingMode('night')" 
                [class.bg-white]="lightingMode() === 'night'"
                [class.text-black]="lightingMode() === 'night'"
                [class.text-[#9ca3af]]="lightingMode() !== 'night'"
                class="px-2.5 py-1 rounded-full transition-all cursor-pointer"
              >
                Night Ambience
              </button>
            </div>

          </div>

          <!-- The Split Comparison Viewport -->
          <div 
            #comparisonContainer
            class="relative mt-6 rounded-xl overflow-hidden select-none cursor-ew-resize aspect-[16/9] sm:aspect-[21/10] bg-black shadow-2xl border border-white/10 group"
            (mousedown)="startDrag($event)"
            (touchstart)="startDragTouch($event)"
          >
            <!-- Right Layer: Rahul's Real 3D Corona Photorealistic Render (Background) -->
            <div class="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                [src]="currentSubject().renderJpg" 
                alt="Corona 3D Photorealistic Render by Rahul Swami"
                class="w-full h-full object-cover transition-all duration-500"
                [style.filter]="lightingFilter()"
              />
              
              <!-- 3D Render Overlay Label -->
              <div class="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>CORONA 11 3D RENDER (4K UHD)</span>
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
                  alt="AutoCAD 2D Technical Working Drawing"
                  class="w-full h-full object-cover"
                />

                <!-- 2D CAD Overlay Label -->
                <div class="absolute top-4 left-4 bg-black/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-white flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span>AUTOCAD 2025 WORKING DRAWING</span>
                </div>
              </div>
            </div>

            <!-- Draggable Divider Handle -->
            <div 
              class="absolute top-0 bottom-0 -ml-5 w-10 flex items-center justify-center pointer-events-none z-20"
              [style.left.%]="sliderPosition()"
            >
              <div class="w-9 h-9 rounded-full bg-black/90 border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center text-white backdrop-blur-md">
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
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#9ca3af] mt-5 px-2">
            <div class="flex items-center gap-2">
              <span class="text-white">&larr; Drag Left / Right &rarr;</span>
              <span>to inspect precision alignment between CAD linework and Corona 3D shading</span>
            </div>
            <div class="flex items-center gap-3 text-[11px]">
              <span class="text-[#d1d5db]">DIMENSIONS: {{ currentSubject().dimensions }}</span>
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
export class VisualizerStudioComponent {
  @ViewChild('comparisonContainer') comparisonContainer!: ElementRef<HTMLDivElement>;

  sliderPosition = signal(50);
  isDragging = false;
  lightingMode = signal<'warm' | 'daylight' | 'night'>('warm');
  containerWidth = 1000;
  activeSubjectId = signal('bedroom');

  subjects: VisualizerSubject[] = [
    {
      id: 'bedroom',
      title: 'Master Bedroom Wall Elevation',
      cadSvg: 'assets/drawings/cad-bedroom-elevation.svg',
      renderJpg: 'assets/projects/rahul-work/page-01.jpg',
      dimensions: '4200mm W x 3000mm H',
      location: 'Sector 63, Noida Suite',
      notes: 'Fluted wooden wall panels, recessed LED profile coves, and upholstered headboard joinery.',
    },
    {
      id: 'wardrobe',
      title: 'Modular Glass Wardrobe Joinery',
      cadSvg: 'assets/drawings/cad-wardrobe-detail.svg',
      renderJpg: 'assets/projects/rahul-work/page-11.jpg',
      dimensions: '3600mm W x 2700mm H',
      location: 'Camara Interiors Residence',
      notes: 'Internal carcass shelving, sensor-activated hanging rods, and tinted glass sliding shutters.',
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
}
