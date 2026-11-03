import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-24 md:py-36 border-b border-white/[0.08] relative overflow-hidden">
      
      <!-- 06: RECOGNIZABLE EDITORIAL BACKGROUND NUMERAL (8% Opacity) -->
      <div 
        class="section-watermark-number top-6 right-6 sm:right-16 md:right-24"
        [style.transform]="'translateY(' + (parallaxOffset() - 4200) * 0.12 + 'px)'"
      >
        06
      </div>

      <!-- 03: UNIQUE ARCHITECTURAL BACKGROUND PATTERN (Large Geometric Compass Arc & Radiant Light Sweep) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <!-- Geometric Radial Compass Lines -->
          <circle cx="85%" cy="85%" r="350" fill="none" stroke="rgba(197,168,128,0.06)" stroke-width="1.5" stroke-dasharray="10,14"/>
          <circle cx="85%" cy="85%" r="550" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
          
          <!-- Radial Degree Rays -->
          <line x1="85%" y1="85%" x2="50%" y2="40%" stroke="rgba(197,168,128,0.06)" stroke-width="1" stroke-dasharray="4,8"/>
          <line x1="85%" y1="85%" x2="40%" y2="70%" stroke="rgba(16,185,129,0.05)" stroke-width="1" stroke-dasharray="4,8"/>
          
          <!-- Cardinal Direction Compass Coordinates -->
          <text x="86%" y="87%" fill="rgba(197,168,128,0.35)" font-family="monospace" font-size="10">DATUM AZIMUTH: 312° // SEC-63 NOIDA</text>
        </svg>
      </div>

      <!-- Architectural Crosshairs -->
      <div class="cad-crosshair top-10 left-6"></div>
      <div class="cad-crosshair bottom-10 right-6"></div>

      <div class="portfolio-container relative z-10">
        
        <!-- Section Header Row -->
        <div class="max-w-4xl mb-14">
          <div class="flex items-center gap-3 mb-3">
            <div class="section-label">
              [ 06 // CANDIDATE INQUIRY &amp; STUDIO HIRING ]
            </div>
            <span class="hidden sm:inline-flex cad-tech-stamp">
              DIRECT ARCHITECTURAL CONTACT
            </span>
          </div>

          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#f5f5f7] tracking-tight-custom mb-4 font-display">
            Connect for Studio Opportunities
          </h2>
          <p class="text-sm sm:text-base text-[#9aa0ae] font-normal leading-relaxed max-w-2xl">
            Reviewing Rahul's portfolio for an Interior Designer or 3D Visualizer studio position? Reach out directly to discuss studio opportunities, technical working drawings, or interview scheduling.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          <!-- Direct Channels & Resume Download (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col justify-between font-mono text-xs gap-6">
            <div class="space-y-4">
              
              <!-- Official Resume Card -->
              <div class="premium-card p-6 sm:p-7 border-[#c5a880]/30 bg-[#0d1017]">
                <div class="flex items-center gap-2 text-[#10b981] text-[11px] font-semibold uppercase mb-2">
                  <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span>Verified Resume Document</span>
                </div>
                <h3 class="text-white font-bold font-display text-lg mb-1">
                  Rahul Swami &mdash; Official Resume
                </h3>
                <p class="text-[#9aa0ae] text-xs font-sans mb-5 leading-relaxed">
                  Includes complete studio history across Sketch Spaces (Current Studio), Camara Interiors &amp; Ettore Interior, detailed software credentials, and technical project highlights.
                </p>
                <a 
                  href="assets/docs/Rahul-Swami-Resume.pdf" 
                  target="_blank" 
                  download="Rahul-Swami-Resume.pdf"
                  class="btn-primary-action w-full text-xs py-2.5 justify-center"
                  data-cursor="DOWNLOAD"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  <span>Download Verified Resume (PDF)</span>
                </a>
              </div>

              <!-- Direct Email Channel -->
              <div class="premium-card p-5">
                <div class="text-[#616776] text-[11px] uppercase mb-1">Direct Email</div>
                <a [href]="'mailto:' + contact.email" class="text-white hover:text-[#c5a880] text-sm font-bold block mb-2 font-sans transition-colors">
                  {{ contact.email }}
                </a>
                <button 
                  type="button"
                  (click)="copyToClipboard(contact.email, 'email')"
                  class="text-[11px] text-[#9aa0ae] hover:text-white cursor-pointer bg-white/[0.04] px-2.5 py-1 rounded border border-white/10 transition-colors"
                >
                  {{ copiedEmail() ? '✓ Copied to clipboard' : 'Click to copy email address' }}
                </button>
              </div>

              <!-- Direct Phone & WhatsApp -->
              <div class="premium-card p-5">
                <div class="text-[#616776] text-[11px] uppercase mb-1">Direct Phone &amp; WhatsApp</div>
                <a [href]="'tel:' + contact.phoneRaw" class="text-white hover:text-[#c5a880] text-sm font-bold block mb-2 font-sans transition-colors">
                  {{ contact.phone }}
                </a>
                <a 
                  [href]="contact.whatsappUrl" 
                  target="_blank"
                  class="inline-flex items-center gap-1.5 text-xs text-[#34d399] hover:underline"
                  data-cursor="CHAT"
                >
                  <span>&rarr; Open instant WhatsApp chat</span>
                </a>
              </div>

              <!-- Studio Location & Mobility -->
              <div class="premium-card p-5">
                <div class="text-[#616776] text-[11px] uppercase mb-1">Studio Location &amp; Mobility</div>
                <div class="text-white text-sm font-bold font-display">
                  {{ contact.location }}
                </div>
                <div class="text-[#9aa0ae] text-[11px] mt-1">
                  Available for on-site design studio roles across New Delhi, Noida, Gurgaon &amp; Delhi NCR.
                </div>
              </div>

            </div>
          </div>

          <!-- Studio Recruiter Inquiry Message Form (7 Cols) -->
          <div class="lg:col-span-7">
            <div class="premium-card p-6 sm:p-9 border-white/[0.12]">
              <h3 class="text-xl font-bold text-white tracking-tight-custom mb-1 font-display">
                Send Direct Studio Inquiry
              </h3>
              <p class="text-xs text-[#9aa0ae] mb-6 font-mono">
                For architectural principals, interior leads, and studio talent directors scheduling portfolio interviews.
              </p>

              <form (submit)="onSubmitForm($event)" class="space-y-4 font-mono text-xs">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[#9aa0ae] mb-1.5">Your Name *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formName" 
                      name="formName" 
                      required
                      placeholder="e.g. Vikram Sharma" 
                      class="w-full px-4 py-2.5 rounded bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a880] text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-[#9aa0ae] mb-1.5">Studio / Architecture Firm *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formStudio" 
                      name="formStudio" 
                      required
                      placeholder="e.g. Studio Architects / Design Lab" 
                      class="w-full px-4 py-2.5 rounded bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a880] text-xs transition-colors"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[#9aa0ae] mb-1.5">Work Email / Phone *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formContact" 
                      name="formContact" 
                      required
                      placeholder="e.g. contact@studio.com" 
                      class="w-full px-4 py-2.5 rounded bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a880] text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-[#9aa0ae] mb-1.5">Inquiry Type</label>
                    <select 
                      [(ngModel)]="formReason" 
                      name="formReason"
                      class="w-full px-4 py-2.5 rounded bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a880] text-xs transition-colors"
                    >
                      <option value="Studio Position / Interview Request">Studio Position / Interview Request</option>
                      <option value="Technical Drawing & CAD Review">Technical Drawing &amp; CAD Review</option>
                      <option value="Photorealistic 3D Visualizer Role">Photorealistic 3D Visualizer Role</option>
                      <option value="General Architectural Inquiry">General Architectural Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-[#9aa0ae] mb-1.5">Message / Note</label>
                  <textarea 
                    [(ngModel)]="formMessage" 
                    name="formMessage" 
                    rows="4" 
                    placeholder="We reviewed your portfolio and resume for our interior architecture team..." 
                    class="w-full px-4 py-2.5 rounded bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#c5a880] text-xs resize-none transition-colors"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div class="pt-2">
                  <button 
                    type="submit" 
                    class="btn-primary-action w-full text-xs py-3 justify-center cursor-pointer font-mono"
                    data-cursor="SEND"
                  >
                    <span>Send Inquiry to Rahul</span>
                    <span class="text-xs">&rarr;</span>
                  </button>
                </div>

                <!-- Submission Success Notice -->
                <div *ngIf="formSubmitted()" class="p-4 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                  ✓ Thank you! Your inquiry has been prepared. You can also reach Rahul directly on WhatsApp or at rahul627q&#64;gmail.com.
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [],
})
export class ContactSectionComponent {
  contact = CONTACT_INFO;
  copiedEmail = signal(false);
  formSubmitted = signal(false);
  parallaxOffset = signal(0);
  private isBrowser = false;

  formName = '';
  formStudio = '';
  formContact = '';
  formReason = 'Studio Position / Interview Request';
  formMessage = '';

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  copyToClipboard(text: string, type: 'email'): void {
    if (this.isBrowser && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (type === 'email') {
          this.copiedEmail.set(true);
          setTimeout(() => this.copiedEmail.set(false), 2500);
        }
      });
    }
  }

  onSubmitForm(event: Event): void {
    event.preventDefault();
    if (!this.formName || !this.formContact) return;

    this.formSubmitted.set(true);
    const subject = encodeURIComponent(`Studio Inquiry from ${this.formName} (${this.formStudio})`);
    const body = encodeURIComponent(
      `Candidate Inquiry Details:\n\nName: ${this.formName}\nStudio: ${this.formStudio}\nContact: ${this.formContact}\nInquiry Type: ${this.formReason}\n\nMessage:\n${this.formMessage}`
    );

    if (this.isBrowser) {
      window.open(`mailto:${this.contact.email}?subject=${subject}&body=${body}`, '_blank');
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.parallaxOffset.set(window.scrollY);
  }
}
