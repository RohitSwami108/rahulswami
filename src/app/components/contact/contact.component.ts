import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CONTACT_INFO, TESTIMONIALS } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-20 md:py-32 hairline-bottom">
      <div class="editorial-container">
        
        <div class="max-w-4xl mb-16">
          <div class="font-mono text-xs text-[#71717a] uppercase tracking-widest mb-3">
            [ 04 // CONTACT &amp; INQUIRY ]
          </div>
          <h2 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight-custom mb-6">
            Let's collaborate on your next space.
          </h2>
          <p class="text-base sm:text-xl text-[#a1a1aa] font-normal leading-relaxed">
            Whether you need 4K photorealistic 3D renders for client sign-off, or millimeter-precise AutoCAD drawing sets for site carpenters &mdash; I'm here to help.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- Direct Channels (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col justify-between font-mono text-xs">
            <div class="space-y-6">
              
              <!-- Email -->
              <div class="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div class="text-[#71717a] text-[11px] uppercase mb-1">Email Inquiry</div>
                <a [href]="'mailto:' + contact.email" class="text-white hover:underline text-sm font-bold block mb-2 font-sans">
                  {{ contact.email }}
                </a>
                <button 
                  type="button"
                  (click)="copyToClipboard(contact.email, 'email')"
                  class="text-[11px] text-[#a1a1aa] hover:text-white cursor-pointer"
                >
                  {{ copiedEmail() ? '&check; Copied to clipboard' : 'Click to copy email' }}
                </button>
              </div>

              <!-- Phone & WhatsApp -->
              <div class="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div class="text-[#71717a] text-[11px] uppercase mb-1">Direct Call / WhatsApp</div>
                <a [href]="'tel:' + contact.phoneRaw" class="text-white hover:underline text-sm font-bold block mb-2 font-sans">
                  {{ contact.phone }}
                </a>
                <a 
                  [href]="contact.whatsappUrl" 
                  target="_blank"
                  class="text-[11px] text-[#22c55e] hover:underline"
                >
                  &rarr; Chat instantly on WhatsApp
                </a>
              </div>

              <!-- Location -->
              <div class="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div class="text-[#71717a] text-[11px] uppercase mb-1">Studio Practice Location</div>
                <div class="text-white text-sm font-bold font-sans">
                  {{ contact.location }}
                </div>
                <div class="text-[#71717a] text-[11px] mt-1">
                  Available across Noida, Delhi NCR &amp; Remote
                </div>
              </div>

            </div>

            <!-- Resume Link -->
            <div class="pt-6">
              <a 
                href="assets/docs/Rahul-Swami-Resume.pdf"
                target="_blank"
                download="Rahul-Swami-Resume.pdf"
                class="btn-cinema w-full text-xs py-3 justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Download Complete Resume (PDF)</span>
              </a>
            </div>
          </div>

          <!-- Quick Message Form (7 Cols) -->
          <div class="lg:col-span-7">
            <div class="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <h3 class="text-xl font-bold text-white tracking-tight-custom mb-1">
                Send a Direct Project Brief
              </h3>
              <p class="text-xs text-[#a1a1aa] mb-6 font-mono">
                Fill in your project requirements and I will respond within 24 hours.
              </p>

              <form (submit)="onSubmitForm($event)" class="space-y-4 font-mono text-xs">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[#71717a] mb-1.5">Your Name *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formName" 
                      name="formName" 
                      required
                      placeholder="e.g. Vikram Sharma" 
                      class="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs"
                    />
                  </div>
                  <div>
                    <label class="block text-[#71717a] mb-1.5">Email / Phone *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formContact" 
                      name="formContact" 
                      required
                      placeholder="e.g. vikram@studio.com" 
                      class="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[#71717a] mb-1.5">Space Type</label>
                    <select 
                      [(ngModel)]="formType" 
                      name="formType"
                      class="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs"
                    >
                      <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                      <option value="Living Room & TV Feature Wall">Living Room &amp; TV Feature Wall</option>
                      <option value="Modular Kitchen & Joinery">Modular Kitchen &amp; Joinery</option>
                      <option value="Modular Wardrobe & Dressing">Modular Wardrobe &amp; Dressing</option>
                      <option value="Full Residence 3D Visualization">Full Residence 3D Visualization</option>
                      <option value="AutoCAD 2D Execution Drawings">AutoCAD 2D Execution Drawings</option>
                      <option value="Villa Facade Architecture">Villa Facade Architecture</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[#71717a] mb-1.5">City / Location</label>
                    <input 
                      type="text" 
                      [(ngModel)]="formLocation" 
                      name="formLocation"
                      placeholder="e.g. Noida / New Delhi" 
                      class="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-[#71717a] mb-1.5">Brief &amp; Deliverables Required</label>
                  <textarea 
                    rows="4"
                    [(ngModel)]="formMessage" 
                    name="formMessage"
                    placeholder="Tell me about your space, dimensions, preferred style, and timeline..." 
                    class="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-white text-xs leading-relaxed"
                  ></textarea>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 pt-2">
                  <button 
                    type="submit"
                    class="btn-cinema text-xs py-2.5 px-6 cursor-pointer"
                  >
                    Send Email Inquiry &rarr;
                  </button>
                  <button 
                    type="button"
                    (click)="sendViaWhatsApp()"
                    class="btn-cinema-ghost text-xs py-2.5 px-6 cursor-pointer"
                  >
                    Send to WhatsApp &rarr;
                  </button>
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
  testimonials = TESTIMONIALS;

  copiedPhone = signal(false);
  copiedEmail = signal(false);

  formName = '';
  formContact = '';
  formType = 'Master Bedroom Suite';
  formLocation = '';
  formMessage = '';

  copyToClipboard(text: string, type: 'phone' | 'email'): void {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      this.copiedPhone.set(true);
      setTimeout(() => this.copiedPhone.set(false), 2500);
    } else {
      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 2500);
    }
  }

  onSubmitForm(event: Event): void {
    event.preventDefault();
    const subject = `Portfolio Inquiry: ${this.formType} from ${this.formName || 'Client'}`;
    const body = `Name: ${this.formName}
Contact: ${this.formContact}
Project: ${this.formType}
Location: ${this.formLocation}

Message:
${this.formMessage}`;

    window.location.href = `mailto:${this.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  sendViaWhatsApp(): void {
    const text = `Hello Rahul,
I would like to inquire about 3D visualization / interior design:
- Name: ${this.formName || 'Client'}
- Project: ${this.formType}
- Location: ${this.formLocation || 'NCR'}
- Message: ${this.formMessage || 'Interested in 3D renders and drawings.'}`;

    window.open(`https://wa.me/91${this.contact.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  }
}
