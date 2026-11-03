import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-signature-reveal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="isVisible()"
      class="fixed inset-0 z-[999999] bg-[#050608] flex items-center justify-center transition-opacity duration-700 pointer-events-none select-none"
      [class.opacity-0]="isFading()"
    >
      <!-- Central Architectural Geometric Linework -->
      <div class="relative flex flex-col items-center max-w-md px-6 text-center">
        
        <!-- Animated Drawing Compass & Crosshair -->
        <div class="relative w-28 h-28 mb-6 flex items-center justify-center">
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(197,168,128,0.25)" stroke-width="1" stroke-dasharray="4,6" class="animate-spin-slow"/>
            <circle cx="50" cy="50" r="28" fill="none" stroke="#c5a880" stroke-width="1.2" class="animate-draw-circle"/>
            <!-- Axis lines -->
            <line x1="15" y1="50" x2="85" y2="50" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
            <line x1="50" y1="15" x2="50" y2="85" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
            <!-- Center coordinate point -->
            <circle cx="50" cy="50" r="2.5" fill="#10b981" />
          </svg>
        </div>

        <!-- Typography Reveal -->
        <div class="font-display font-bold text-white tracking-widest text-lg sm:text-xl uppercase mb-1.5">
          Rahul Swami
        </div>

        <div class="font-mono text-[11px] text-[#c5a880] tracking-wider uppercase mb-1">
          Architectural 3D Visualizer &amp; Interior Designer
        </div>

        <div class="flex items-center gap-2 font-mono text-[9px] text-[#9aa0ae] tracking-widest uppercase">
          <span class="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
          <span>Sapras Architects &bull; New Delhi, India</span>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      transform-origin: 50% 50%;
      animation: spinSlow 20s linear infinite;
    }

    @keyframes drawCircle {
      0% {
        stroke-dasharray: 200;
        stroke-dashoffset: 200;
      }
      100% {
        stroke-dasharray: 200;
        stroke-dashoffset: 0;
      }
    }
    .animate-draw-circle {
      animation: drawCircle 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `],
})
export class SignatureRevealComponent implements OnInit {
  isVisible = signal(true);
  isFading = signal(false);
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.isVisible.set(false);
      return;
    }

    // Skip if reduced motion is requested
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.isVisible.set(false);
      return;
    }

    // Check session storage to avoid repeating on every page refresh if already seen
    const seen = sessionStorage.getItem('rs_intro_seen');
    const delay = seen ? 400 : 900;

    setTimeout(() => {
      this.isFading.set(true);
      setTimeout(() => {
        this.isVisible.set(false);
        sessionStorage.setItem('rs_intro_seen', 'true');
      }, 700);
    }, delay);
  }
}

