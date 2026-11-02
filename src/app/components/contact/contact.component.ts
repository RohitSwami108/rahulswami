import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CONTACT_INFO } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-20 md:py-32 border-b border-white/[0.08] relative">
      <div class="portfolio-container">
        
        <!-- Section Header (Unified Layout) -->
        <div class="max-w-4xl mb-14">
          <div class="section-label">
            [ 05 // CANDIDATE INQUIRY &amp; RESUME ]
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight-custom mb-4">
            Connect for Studio Opportunities &amp; Review
          </h2>
          <p class="text-base sm:text-lg text-[#9ca3af] font-normal leading-relaxed max-w-2xl">
            Reviewing Rahul's portfolio for an Interior Designer or 3D Visualizer role? Reach out directly to discuss studio opportunities, technical working drawings, or interview scheduling.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          <!-- Direct Channels & Resume Download (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col justify-between font-mono text-xs gap-6">
            <div class="space-y-4">
              
              <!-- Direct Resume Download Card (Prominent) -->
              <div class="premium-card p-6 border-white/20 bg-[#12151e]">
                <div class="flex items-center gap-2 text-[#10b981] text-[11px] font-semibold uppercase mb-2">
                  <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span>Verified Resume Document</span>
                </div>
                <h4 class="text-white font-bold font-sans text-base mb-1">
                  Rahul Swami &mdash; Official Resume
                </h4>
                <p class="text-[#9ca3af] text-xs font-sans mb-4">
                  Includes full work history across Sketch Spaces, Camara Interiors &amp; Ettore Interior, detailed software credentials, and project highlights.
                </p>
                <a 
                  href="assets/docs/Rahul-Swami-Resume.pdf" 
                  target="_blank" 
                  download="Rahul-Swami-Resume.pdf"
                  class="btn-primary-action w-full text-xs py-2.5 justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  <span>Download Resume (PDF)</span>
                </a>
              </div>

              <!-- Email Channel -->
              <div class="premium-card p-5">
                <div class="text-[#6b7280] text-[11px] uppercase mb-1">Direct Email</div>
                <a [href]="'mailto:' + contact.email" class="text-white hover:underline text-sm font-bold block mb-2 font-sans">
                  {{ contact.email }}
                </a>
                <button 
                  type="button"
                  (click)="copyToClipboard(contact.email, 'email')"
                  class="text-[11px] text-[#9ca3af] hover:text-white cursor-pointer bg-white/[0.04] px-2.5 py-1 rounded border border-white/10"
                >
                  {{ copiedEmail() ? '✓ Copied to clipboard' : 'Click to copy email address' }}
                </button>
              </div>

              <!-- Phone & WhatsApp -->
              <div class="premium-card p-5">
                <div class="text-[#6b7280] text-[11px] uppercase mb-1">Direct Call &amp; WhatsApp</div>
                <a [href]="'tel:' + contact.phoneRaw" class="text-white hover:underline text-sm font-bold block mb-2 font-sans">
                  {{ contact.phone }}
                </a>
                <a 
                  [href]="contact.whatsappUrl" 
                  target="_blank"
                  class="inline-flex items-center gap-1.5 text-xs text-[#34d399] hover:underline"
                >
                  <span>&rarr; Open instant WhatsApp chat</span>
                </a>
              </div>

              <!-- Studio Location -->
              <div class="premium-card p-5">
                <div class="text-[#6b7280] text-[11px] uppercase mb-1">Location &amp; Mobility</div>
                <div class="text-white text-sm font-bold font-sans">
                  {{ contact.location }}
                </div>
                <div class="text-[#9ca3af] text-[11px] mt-1">
                  Open for on-site design studio roles across New Delhi, Noida, Gurgaon &amp; NCR.
                </div>
              </div>

            </div>
          </div>

          <!-- Studio Recruiter Message Form (7 Cols) -->
          <div class="lg:col-span-7">
            <div class="premium-card p-6 sm:p-8">
              <h3 class="text-xl font-bold text-white tracking-tight-custom mb-1 font-sans">
                Send Direct Studio Inquiry
              </h3>
              <p class="text-xs text-[#9ca3af] mb-6 font-mono">
                For architectural leads, design recruiters, and studio directors scheduling portfolio reviews.
              </p>

              <form (submit)="onSubmitForm($event)" class="space-y-4 font-mono text-xs">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[#9ca3af] mb-1.5">Your Name *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formName" 
                      name="formName" 
                      required
                      placeholder="e.g. Vikram Sharma" 
                      class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs"
                    />
                  </div>
                  <div>
                    <label class="block text-[#9ca3af] mb-1.5">Studio / Architecture Firm *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formStudio" 
                      name="formStudio" 
                      required
                      placeholder="e.g. Studio Architects / Design Lab" 
                      class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[#9ca3af] mb-1.5">Work Email / Phone *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formContact" 
                      name="formContact" 
                      required
                      placeholder="e.g. contact@studio.com" 
                      class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs"
                    />
                  </div>
                  <div>
                    <label class="block text-[#9ca3af] mb-1.5">Inquiry Reason</label>
                    <select 
                      [(ngModel)]="formReason" 
                      name="formReason"
                      class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs"
                    >
                      <option value="Studio Position / Interview Request">Studio Position / Interview Request</option>
                      <option value="Technical Drawing Review">Technical Drawing Review</option>
                      <option value="Photorealistic 3D Visualizer Role">Photorealistic 3D Visualizer Role</option>
                      <option value="General Architectural Inquiry">General Architectural Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-[#9ca3af] mb-1.5">Message / Note</label>
                  <textarea 
                    [(ngModel)]="formMessage" 
                    name="formMessage" 
                    rows="4" 
                    placeholder="We reviewed your portfolio and resume for our interior architecture team..." 
                    class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs resize-none"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <div class="pt-2">
                  <button 
                    type="submit" 
                    class="btn-primary-action w-full text-xs py-3 justify-center cursor-pointer"
                  >
                    <span>Send Message to Rahul</span>
                    <span class="font-mono text-xs">&rarr;</span>
                  </button>
                </div>

                <!-- Submission Success Notice -->
                <div *ngIf="formSubmitted()" class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
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

  formName = '';
  formStudio = '';
  formContact = '';
  formReason = 'Studio Position / Interview Request';
  formMessage = '';

  copyToClipboard(text: string, type: 'email'): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
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
    const subject = encodeURIComponent(`Portfolio Inquiry from ${this.formName} (${this.formStudio})`);
    const body = encodeURIComponent(
      `Candidate Inquiry Details:\n\nName: ${this.formName}\nStudio: ${this.formStudio}\nContact: ${this.formContact}\nReason: ${this.formReason}\n\nMessage:\n${this.formMessage}`
    );

    // Open mail client fallback
    if (typeof window !== 'undefined') {
      window.open(`mailto:${this.contact.email}?subject=${subject}&body=${body}`, '_blank');
    }
  }
}
