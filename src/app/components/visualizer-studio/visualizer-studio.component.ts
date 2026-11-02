import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-visualizer-studio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="visualizer-studio" class="py-24 relative overflow-hidden bg-[#07090e]">
      <!-- Background Architectural Lines -->
      <div class="absolute inset-0 cad-grid-bg opacity-20 pointer-events-none"></div>

      <div class="container mx-auto relative z-10">
        
        <!-- Section Header -->
        <div class="flex flex-col items-center text-center mb-16">
          <div class="section-tag">
            Interactive Visualizer Lab
          </div>
          <h2 class="section-title text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            From 2D Blueprint to
            <span class="gold-gradient-text font-luxury block sm:inline">
              Photorealistic 3D Render
            </span>
          </h2>
          <p class="section-desc mt-3">
            Drag the interactive slider below to inspect the transformation: see how precise 
            AutoCAD 2D elevations and carpentry working drawings materialize into Rahul's 
            photorealistic 3D renders created with 3ds Max and Corona Renderer.
          </p>
        </div>

        <!-- Interactive Comparison Studio Card -->
        <div class="glass-card p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto border-gold-glow relative">
          
          <!-- Studio Toolbar Controls -->
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            
            <!-- Left: Mode Indicators -->
            <div class="flex items-center gap-3">
              <span class="tag-badge cyan">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
                AutoCAD 2025 (Left)
              </span>
              <span class="text-slate-500 font-mono text-xs">VS</span>
              <span class="tag-badge gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                Corona Renderer 11 (Right)
              </span>
            </div>

            <!-- Lighting Scenario Simulator -->
            <div class="flex items-center gap-2 bg-[#0a0e16] p-1.5 rounded-full border border-white/10">
              <span class="text-[11px] font-mono text-slate-400 px-2 hidden md:inline">Lighting Sim:</span>
              <button 
                type="button"
                (click)="setLightingMode('warm')" 
                [class.active-mode]="lightingMode() === 'warm'"
                class="lighting-btn"
              >
                Warm Cove (3000K)
              </button>
              <button 
                type="button"
                (click)="setLightingMode('daylight')" 
                [class.active-mode]="lightingMode() === 'daylight'"
                class="lighting-btn"
              >
                Daylight (5500K)
              </button>
              <button 
                type="button"
                (click)="setLightingMode('night')" 
                [class.active-mode]="lightingMode() === 'night'"
                class="lighting-btn"
              >
                Dramatic Night
              </button>
            </div>

          </div>

          <!-- The Split Comparison Viewport -->
          <div 
            #comparisonContainer
            class="comparison-container relative mt-6 rounded-xl overflow-hidden select-none cursor-ew-resize aspect-[16/9] sm:aspect-[21/10] bg-black shadow-2xl border border-white/10"
            (mousedown)="startDrag($event)"
            (touchstart)="startDragTouch($event)"
          >
            <!-- Right Layer: Rahul's Real 3D Corona Photorealistic Render (Background) -->
            <div class="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                [src]="currentRenderImage()" 
                alt="Corona 3D Photorealistic Render by Rahul Swami"
                class="w-full h-full object-cover transition-all duration-500"
                [style.filter]="lightingFilter()"
              />
              
              <!-- 3D Render Overlay Label -->
              <div class="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#c5a059]/40 text-xs font-mono text-[#e5c378] flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></span>
                <span>CORONA 3D RENDER (4K UHD)</span>
              </div>
            </div>

            <!-- Left Layer: 2D AutoCAD Technical Elevation (Clipped) -->
            <div 
              class="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[#00f5d4] shadow-2xl"
              [style.width.%]="sliderPosition()"
            >
              <div class="w-full h-full relative" [style.width.px]="containerWidth">
                <img 
                  src="assets/drawings/cad-bedroom-elevation.svg" 
                  alt="AutoCAD 2D Technical Working Drawing"
                  class="w-full h-full object-cover"
                />

                <!-- 2D CAD Overlay Label -->
                <div class="absolute top-4 left-4 bg-[#0a121f]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#00f5d4]/40 text-xs font-mono text-[#00f5d4] flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00f5d4] animate-ping"></span>
                  <span>AUTOCAD 2D WORKING DRAWING</span>
                </div>
              </div>
            </div>

            <!-- Draggable Divider Handle -->
            <div 
              class="slider-handle absolute top-0 bottom-0 -ml-5 w-10 flex items-center justify-center pointer-events-none z-20"
              [style.left.%]="sliderPosition()"
            >
              <div class="handle-pill w-9 h-9 rounded-full bg-[#0e1726] border-2 border-[#00f5d4] shadow-[0_0_20px_#00f5d4] flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="-ml-2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>

          </div>

          <!-- Slider Instruction / Touch Hint -->
          <div class="flex items-center justify-between text-xs font-mono text-slate-400 mt-4 px-2">
            <span class="flex items-center gap-1.5">
              <span class="text-[#00f5d4]">&larr; Drag Left</span> to reveal 3D Render
            </span>
            <span class="text-[#e5c378] hidden sm:inline">
              Sector 63, Noida &bull; Master Suite Wall Elevation
            </span>
            <span class="flex items-center gap-1.5">
              Drag Right <span class="text-[#00f5d4]">&rarr;</span> for 2D CAD Blueprint
            </span>
          </div>

          <!-- Technical Pipeline Breakdown -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div class="text-[#00f5d4] font-mono text-xs font-semibold uppercase tracking-wider mb-1">
                Phase 01: Drafting
              </div>
              <h5 class="text-white font-bold text-sm mb-1">AutoCAD 2025</h5>
              <p class="text-xs text-slate-400 leading-relaxed">
                Millimeter-precise carpentry elevations, section cuts, false ceiling step heights, and electrical cove routing.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div class="text-[#e5c378] font-mono text-xs font-semibold uppercase tracking-wider mb-1">
                Phase 02: 3D Geometry
              </div>
              <h5 class="text-white font-bold text-sm mb-1">Autodesk 3ds Max</h5>
              <p class="text-xs text-slate-400 leading-relaxed">
                Precision poly-modeling of fluted slats, cushioned headboards, floating plinths, and bespoke furniture hardware.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div class="text-[#f59e0b] font-mono text-xs font-semibold uppercase tracking-wider mb-1">
                Phase 03: Illumination
              </div>
              <h5 class="text-white font-bold text-sm mb-1">Corona Renderer 11</h5>
              <p class="text-xs text-slate-400 leading-relaxed">
                Corona Physical Camera framing, IES profile downlights, 3000K indirect LED coves, and PBR realistic shaders.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div class="text-[#38bdf8] font-mono text-xs font-semibold uppercase tracking-wider mb-1">
                Phase 04: Production
              </div>
              <h5 class="text-white font-bold text-sm mb-1">Site Delivery</h5>
              <p class="text-xs text-slate-400 leading-relaxed">
                4K visual client presentations matched seamlessly with on-site carpentry fabrication for Camara Interiors.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .lighting-btn {
      padding: 0.3rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-family: var(--font-mono);
      color: #94a3b8;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .lighting-btn:hover {
      color: #ffffff;
    }

    .lighting-btn.active-mode {
      background: rgba(197, 160, 89, 0.2);
      color: var(--accent-gold-light);
      border: 1px solid rgba(197, 160, 89, 0.4);
    }

    .slider-handle .handle-pill {
      box-shadow: 0 0 15px rgba(0, 245, 212, 0.7);
    }
  `],
})
export class VisualizerStudioComponent {
  @ViewChild('comparisonContainer') comparisonContainerRef!: ElementRef<HTMLDivElement>;

  sliderPosition = signal(50); // percentage 0 - 100
  isDragging = false;
  containerWidth = 1000;
  lightingMode = signal<'daylight' | 'warm' | 'night'>('warm');

  currentRenderImage = signal('assets/projects/rahul-work/page-08.jpg');

  lightingFilter(): string {
    switch (this.lightingMode()) {
      case 'daylight':
        return 'brightness(1.05) contrast(1.02)';
      case 'night':
        return 'brightness(0.9) contrast(1.1)';
      case 'warm':
      default:
        return 'brightness(1) contrast(1.05)';
    }
  }

  setLightingMode(mode: 'daylight' | 'warm' | 'night'): void {
    this.lightingMode.set(mode);
    if (mode === 'daylight') {
      this.currentRenderImage.set('assets/projects/rahul-work/page-28.jpg');
    } else if (mode === 'night') {
      this.currentRenderImage.set('assets/projects/rahul-work/page-27.jpg');
    } else {
      this.currentRenderImage.set('assets/projects/rahul-work/page-08.jpg');
    }
  }

  startDrag(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.updateSlider(event.clientX);
  }

  startDragTouch(event: TouchEvent): void {
    this.isDragging = true;
    if (event.touches.length > 0) {
      this.updateSlider(event.touches[0].clientX);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.updateSlider(event.clientX);
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging || event.touches.length === 0) return;
    this.updateSlider(event.touches[0].clientX);
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  stopDrag(): void {
    this.isDragging = false;
  }

  private updateSlider(clientX: number): void {
    if (!this.comparisonContainerRef) return;
    const rect = this.comparisonContainerRef.nativeElement.getBoundingClientRect();
    this.containerWidth = rect.width;
    const offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    this.sliderPosition.set(percentage);
  }
}
