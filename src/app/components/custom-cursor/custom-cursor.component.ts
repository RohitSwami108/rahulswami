import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      *ngIf="isEnabled()"
      class="custom-cursor-dot"
      [style.left.px]="dotX()"
      [style.top.px]="dotY()"
      [style.opacity]="isVisible() ? 1 : 0"
    ></div>

    <div 
      *ngIf="isEnabled()"
      class="custom-cursor-follower"
      [style.left.px]="ringX()"
      [style.top.px]="ringY()"
      [style.opacity]="isVisible() ? 1 : 0"
      [style.width.px]="followerSize()"
      [style.height.px]="followerSize()"
      [ngClass]="followerClasses()"
    >
      <span *ngIf="cursorText()" class="font-mono text-[9px] tracking-widest text-black font-bold uppercase select-none pointer-events-none">
        {{ cursorText() }}
      </span>
    </div>
  `,
  styles: [`
    :host {
      pointer-events: none;
    }
  `],
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  isEnabled = signal(false);
  isVisible = signal(false);
  cursorText = signal<string | null>(null);

  dotX = signal(-100);
  dotY = signal(-100);
  ringX = signal(-100);
  ringY = signal(-100);

  followerSize = signal(34);
  cursorState = signal<'default' | 'hover-link' | 'hover-project' | 'hover-drag' | 'hover-inspect'>('default');

  private targetX = -100;
  private targetY = -100;
  private currentX = -100;
  private currentY = -100;
  private rafId: number | null = null;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.isEnabled.set(true);
      this.startAnimationLoop();
    }
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
  }

  private startAnimationLoop(): void {
    const loop = () => {
      // Smooth lerp (linear interpolation) for trailing ring
      this.currentX += (this.targetX - this.currentX) * 0.18;
      this.currentY += (this.targetY - this.currentY) * 0.18;

      this.ringX.set(this.currentX);
      this.ringY.set(this.currentY);

      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!this.isEnabled()) return;

    this.isVisible.set(true);
    this.dotX.set(e.clientX);
    this.dotY.set(e.clientY);
    this.targetX = e.clientX;
    this.targetY = e.clientY;

    // Detect target element
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const interactiveCard = target.closest('[data-cursor]');
    const isButtonOrLink = target.closest('a, button, input, select, textarea, .filter-pill');
    const isDragArea = target.closest('.comparison-container, [data-cursor="DRAG"]');

    if (interactiveCard) {
      const mode = interactiveCard.getAttribute('data-cursor');
      this.cursorText.set(mode || 'VIEW');
      this.followerSize.set(64);
      this.cursorState.set('hover-project');
    } else if (isDragArea) {
      this.cursorText.set('DRAG');
      this.followerSize.set(54);
      this.cursorState.set('hover-drag');
    } else if (isButtonOrLink) {
      this.cursorText.set(null);
      this.followerSize.set(44);
      this.cursorState.set('hover-link');
    } else {
      this.cursorText.set(null);
      this.followerSize.set(32);
      this.cursorState.set('default');
    }
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.isVisible.set(false);
  }

  @HostListener('document:mouseenter')
  onMouseEnter(): void {
    this.isVisible.set(true);
  }

  followerClasses(): string {
    if (this.cursorText() === 'LIGHT') {
      return 'bg-emerald-400 border-emerald-400 text-black shadow-[0_0_25px_rgba(16,185,129,0.6)]';
    }
    if (this.cursorText() === 'MATERIAL') {
      return 'bg-[#c5a880] border-[#c5a880] text-black shadow-[0_0_25px_rgba(197,168,128,0.6)]';
    }
    switch (this.cursorState()) {
      case 'hover-project':
        return 'bg-[#c5a880] border-[#c5a880] shadow-[0_0_25px_rgba(197,168,128,0.5)]';
      case 'hover-drag':
        return 'bg-white border-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)]';
      case 'hover-link':
        return 'border-[#c5a880] bg-white/[0.04] scale-110';
      default:
        return 'border-white/25 bg-transparent';
    }
  }
}

