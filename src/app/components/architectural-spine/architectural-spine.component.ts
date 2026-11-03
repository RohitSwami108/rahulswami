import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-architectural-spine',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Desktop-only Continuous Architectural Drawing Line Motif -->
    <div 
      *ngIf="isBrowser"
      class="fixed inset-y-0 left-4 lg:left-8 w-12 pointer-events-none z-30 hidden md:block select-none"
      aria-hidden="true"
    >
      <!-- Background Static Guide Grid Line -->
      <div class="absolute left-6 top-0 bottom-0 w-[1px] bg-white/[0.04]"></div>

      <!-- Main Animated Drawing Spine -->
      <svg class="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="spineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#c5a880" stop-opacity="0.9"/>
            <stop offset="35%" stop-color="#10b981" stop-opacity="0.95"/>
            <stop offset="70%" stop-color="#e2cfb6" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="1"/>
          </linearGradient>

          <filter id="spineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Dynamic Drawn Path (SVG Viewport tracks window scroll) -->
        <!-- Milestone Ticks along the vertical axis -->
        <g stroke="rgba(255,255,255,0.15)" stroke-width="1">
          <line x1="16" y1="120" x2="32" y2="120" />
          <line x1="20" y1="240" x2="28" y2="240" />
          <line x1="16" y1="360" x2="32" y2="360" />
          <line x1="20" y1="480" x2="28" y2="480" />
          <line x1="16" y1="600" x2="32" y2="600" />
          <line x1="20" y1="720" x2="28" y2="720" />
          <line x1="16" y1="840" x2="32" y2="840" />
        </g>

        <!-- Progressive Progress Spine Line -->
        <line 
          x1="24" 
          y1="0" 
          x2="24" 
          [attr.y2]="tipY()" 
          stroke="url(#spineGradient)" 
          stroke-width="1.75"
          filter="url(#spineGlow)"
        />

        <!-- Active Architectural Drafting Tip (Follows Scroll) -->
        <g [attr.transform]="'translate(24, ' + tipY() + ')'">
          <!-- Outer Pulsing Halo -->
          <circle r="9" fill="none" stroke="#10b981" stroke-width="1" class="animate-ping opacity-30" />
          <!-- Middle Precision Ring -->
          <circle r="4.5" fill="#07080a" stroke="#c5a880" stroke-width="1.5" />
          <!-- Inner Core Coordinate Point -->
          <circle r="2" fill="#10b981" />
          
          <!-- Live Dimension Tag -->
          <text 
            x="14" 
            y="3.5" 
            fill="#c5a880" 
            font-family="monospace" 
            font-size="8.5" 
            letter-spacing="0.1em"
            font-weight="bold"
            class="opacity-90"
          >
            {{ currentSectionTag() }} [{{ scrollPercent() }}%]
          </text>
        </g>
      </svg>
    </div>
  `,
  styles: [`
    :host {
      pointer-events: none;
    }
  `],
})
export class ArchitecturalSpineComponent implements OnInit, OnDestroy {
  scrollPercent = signal(0);
  tipY = signal(60);
  currentSectionTag = signal('00:DATUM');
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateScroll();
    }
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    this.updateScroll();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isBrowser) return;
    this.updateScroll();
  }

  private updateScroll(): void {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((current / docHeight) * 100))) : 0;
    this.scrollPercent.set(pct);

    // Tip Y tracks within the viewport between 60px and window.innerHeight - 60px
    const vh = window.innerHeight;
    const computedY = 60 + ((vh - 120) * pct) / 100;
    this.tipY.set(Math.round(computedY));

    // Dynamic Section Tag
    if (pct < 12) {
      this.currentSectionTag.set('00:DATUM');
    } else if (pct < 28) {
      this.currentSectionTag.set('01:SPATIAL');
    } else if (pct < 42) {
      this.currentSectionTag.set('02:CAD_3D');
    } else if (pct < 58) {
      this.currentSectionTag.set('03:CAREER');
    } else if (pct < 72) {
      this.currentSectionTag.set('04:PBR_MAT');
    } else if (pct < 86) {
      this.currentSectionTag.set('05:PACKAGES');
    } else {
      this.currentSectionTag.set('06:CONNECT');
    }
  }
}

