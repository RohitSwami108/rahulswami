import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';

export interface MaterialSample {
  id: string;
  name: string;
  category: string;
  finish: string;
  colorHex: string;
  roughness: number;
  metallic: number;
  specs: string;
  projectApplication: string;
  projectLocation: string;
  projectImage: string;
  pbrDetails: {
    albedo: string;
    normal: string;
    roughnessMap: string;
    ior: string;
  };
}

export interface LightingEnvironment {
  id: '3000k' | '4000k' | '5500k' | '2700k';
  name: string;
  kelvin: string;
  type: string;
  description: string;
  colorTone: string;
  filterStyle: string;
}

@Component({
  selector: 'app-material-lighting-studio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="materials" class="py-24 md:py-36 border-b border-white/[0.08] relative overflow-hidden bg-[#060709]">
      
      <!-- 04: RECOGNIZABLE EDITORIAL BACKGROUND NUMERAL (8% Opacity) -->
      <div 
        class="section-watermark-number top-6 right-6 sm:right-16 md:right-24"
        [style.transform]="'translateY(' + (parallaxOffset() - 3600) * 0.12 + 'px)'"
      >
        04
      </div>

      <!-- UNIQUE ARCHITECTURAL BACKGROUND PATTERN: Specimen Matrix & Light Ray Vectors -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="matGrid" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="1.5" fill="rgba(197,168,128,0.2)"/>
              <line x1="0" y1="60" x2="120" y2="60" stroke="rgba(255,255,255,0.02)" stroke-dasharray="2,6"/>
              <line x1="60" y1="0" x2="60" y2="120" stroke="rgba(255,255,255,0.02)" stroke-dasharray="2,6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#matGrid)" />
          
          <!-- Radial Light Spread Cone -->
          <path d="M 60% 0 L 40% 100% L 80% 100% Z" fill="rgba(197,168,128,0.02)" />
          <line x1="60%" y1="0" x2="20%" y2="100%" stroke="rgba(16,185,129,0.04)" stroke-dasharray="6,8"/>
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
              [ 04 // MATERIAL &amp; LIGHTING EXPLORATION STUDIO ]
            </div>
            <span class="hidden sm:inline-flex cad-tech-stamp">
              PBR SHADER ARCHIVE // CORONA 11
            </span>
          </div>

          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#f5f5f7] tracking-tight-custom mb-4 font-display">
            Interactive Material &amp; Lighting Studio
          </h2>
          <p class="text-sm sm:text-base text-[#9aa0ae] max-w-3xl font-normal leading-relaxed">
            Inspect Rahul Swami's physically-based material library and simulated lighting environments. Select an architectural specimen to explore its PBR shader calibration, tactile micro-surface qualities, and verified project deployment.
          </p>
        </div>

        <!-- Master Interactive Grid: Material Specimen Rail + Live Architectural Viewport -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          <!-- LEFT: Material Swatches Selection Matrix (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col gap-4">
            <div class="flex items-center justify-between pb-3 border-b border-white/[0.08] font-mono text-xs text-[#9aa0ae]">
              <span class="text-white font-bold uppercase tracking-wider flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#c5a880]"></span>
                <span>Select Material Specimen ({{ materials.length }})</span>
              </span>
              <span class="text-[11px] text-[#c5a880]">Click to Inspect</span>
            </div>

            <!-- Material Swatch Buttons List -->
            <div class="space-y-2.5 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
              <button
                *ngFor="let mat of materials; let i = index"
                type="button"
                (click)="selectMaterial(mat)"
                [class.border-[#c5a880]]="selectedMaterial().id === mat.id"
                [class.bg-[#12151e]]="selectedMaterial().id === mat.id"
                [class.border-white/10]="selectedMaterial().id !== mat.id"
                [class.bg-white/[0.02]]="selectedMaterial().id !== mat.id"
                class="w-full text-left p-3.5 rounded-xl border transition-all duration-300 hover:border-white/30 flex items-center justify-between group cursor-pointer"
                data-cursor="MATERIAL"
              >
                <div class="flex items-center gap-3.5 min-w-0">
                  <!-- Material Color / Texture Indicator Orb -->
                  <div 
                    class="w-9 h-9 rounded-lg shrink-0 border border-white/20 shadow-inner flex items-center justify-center relative overflow-hidden"
                    [style.background]="mat.colorHex"
                  >
                    <div class="absolute inset-0 bg-gradient-to-tr from-black/40 to-white/20"></div>
                    <span *ngIf="selectedMaterial().id === mat.id" class="w-1.5 h-1.5 rounded-full bg-white relative z-10 shadow"></span>
                  </div>

                  <!-- Name and Category -->
                  <div class="min-w-0">
                    <div class="text-xs font-bold text-white group-hover:text-[#c5a880] transition-colors truncate font-sans">
                      {{ mat.name }}
                    </div>
                    <div class="text-[10px] font-mono text-[#7e879b] truncate">
                      {{ mat.category }} &bull; {{ mat.finish }}
                    </div>
                  </div>
                </div>

                <!-- Specimen Index Tag -->
                <div class="text-[10px] font-mono text-[#9aa0ae] group-hover:text-white shrink-0 ml-2">
                  0{{ i + 1 }} &rarr;
                </div>
              </button>
            </div>
          </div>

          <!-- RIGHT: Live Material & Lighting Viewport (7 Cols) -->
          <div class="lg:col-span-7 flex flex-col gap-6">
            
            <!-- Atmospheric Lighting Environment Controller -->
            <div class="premium-card p-4 sm:p-5 border-white/[0.12] bg-[#090b10]">
              <div class="flex flex-wrap items-center justify-between gap-3 mb-3 font-mono text-xs">
                <div class="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
                  <span class="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span>Lighting Environment Simulation:</span>
                </div>
                <div class="text-[#c5a880] text-[11px]">
                  ACTIVE: {{ activeLighting().name }} ({{ activeLighting().kelvin }})
                </div>
              </div>

              <!-- Lighting Toggle Buttons -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                <button
                  *ngFor="let light of lightingOptions"
                  type="button"
                  (click)="setLighting(light)"
                  [class.bg-white]="activeLighting().id === light.id"
                  [class.text-black]="activeLighting().id === light.id"
                  [class.border-white]="activeLighting().id === light.id"
                  [class.text-[#9aa0ae]]="activeLighting().id !== light.id"
                  [class.border-white/10]="activeLighting().id !== light.id"
                  [class.bg-white/[0.02]]="activeLighting().id !== light.id"
                  class="p-2.5 rounded-lg border transition-all text-center cursor-pointer hover:text-white flex flex-col items-center gap-1"
                  data-cursor="LIGHT"
                >
                  <span class="font-bold text-[11px]">{{ light.kelvin }}</span>
                  <span class="text-[9px] truncate tracking-tight">{{ light.type }}</span>
                </button>
              </div>
            </div>

            <!-- Material Application Visual Viewport Card -->
            <div class="premium-card overflow-hidden border-white/[0.14] bg-black shadow-2xl relative group">
              
              <!-- Image Container with Simulated Dynamic Lighting Filter -->
              <div class="relative aspect-[16/10] overflow-hidden bg-black">
                <img 
                  [src]="selectedMaterial().projectImage" 
                  [alt]="selectedMaterial().name"
                  class="w-full h-full object-cover transition-all duration-700 block"
                  [style.filter]="activeLighting().filterStyle"
                />

                <!-- Dynamic Lighting Tone Overlay -->
                <div 
                  class="absolute inset-0 pointer-events-none transition-colors duration-700"
                  [style.background]="activeLighting().colorTone"
                ></div>

                <!-- Top Technical Badges -->
                <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                  <span class="bg-[#07080a]/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[#c5a880] border border-white/15 font-bold">
                    SPECIMEN: {{ selectedMaterial().name.toUpperCase() }}
                  </span>

                  <span class="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                    {{ activeLighting().kelvin }} &bull; CORONA 11
                  </span>
                </div>

                <!-- Bottom Floating Project Info -->
                <div class="absolute bottom-3 left-3 right-3 bg-[#07080a]/90 backdrop-blur-md p-3 rounded-lg border border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div class="text-[9px] font-mono text-[#c5a880] uppercase tracking-wider">
                      Verified Studio Deployment:
                    </div>
                    <div class="text-xs sm:text-sm font-bold text-white font-display">
                      {{ selectedMaterial().projectApplication }}
                    </div>
                  </div>
                  <div class="text-[10px] font-mono text-[#9aa0ae] text-right">
                    {{ selectedMaterial().projectLocation }}
                  </div>
                </div>
              </div>

              <!-- PBR Shader Technical Parameter Strip -->
              <div class="p-5 bg-[#090b11] border-t border-white/[0.08] font-mono text-xs">
                <div class="text-[10px] font-bold text-[#c5a880] uppercase tracking-wider mb-3">
                  Corona PBR Material Specifications:
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                  <div class="p-2.5 rounded bg-white/[0.02] border border-white/[0.05]">
                    <span class="text-[#7e879b] block text-[9px]">ALBEDO / COLOR</span>
                    <span class="text-white font-medium">{{ selectedMaterial().pbrDetails.albedo }}</span>
                  </div>
                  <div class="p-2.5 rounded bg-white/[0.02] border border-white/[0.05]">
                    <span class="text-[#7e879b] block text-[9px]">ROUGHNESS</span>
                    <span class="text-white font-medium">{{ selectedMaterial().roughness }} (PBR 0–1)</span>
                  </div>
                  <div class="p-2.5 rounded bg-white/[0.02] border border-white/[0.05]">
                    <span class="text-[#7e879b] block text-[9px]">REFLECTANCE / IOR</span>
                    <span class="text-white font-medium">{{ selectedMaterial().pbrDetails.ior }}</span>
                  </div>
                  <div class="p-2.5 rounded bg-white/[0.02] border border-white/[0.05]">
                    <span class="text-[#7e879b] block text-[9px]">SURFACE DETAIL</span>
                    <span class="text-white font-medium">{{ selectedMaterial().pbrDetails.normal }}</span>
                  </div>
                </div>

                <p class="text-xs text-[#9aa0ae] mt-3 font-sans leading-relaxed">
                  {{ selectedMaterial().specs }}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .scrollbar-thin::-webkit-scrollbar {
      width: 4px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.02);
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background: rgba(197, 168, 128, 0.25);
      border-radius: 4px;
    }
  `],
})
export class MaterialLightingStudioComponent {
  parallaxOffset = signal(0);
  private isBrowser = false;

  lightingOptions: LightingEnvironment[] = [
    {
      id: '3000k',
      name: 'Warm Ambience',
      kelvin: '3000K',
      type: 'Cove & Wall Sconce LED',
      description: 'Intimate residential warm illumination accentuating wood grain and brass tones.',
      colorTone: 'rgba(255, 175, 75, 0.08)',
      filterStyle: 'sepia(0.08) saturate(1.05) contrast(1.02)',
    },
    {
      id: '4000k',
      name: 'Neutral Studio',
      kelvin: '4000K',
      type: 'CRI 98 Gallery Spec',
      description: 'Balanced daylight-balanced studio lighting for pure architectural material evaluation.',
      colorTone: 'rgba(255, 255, 255, 0.02)',
      filterStyle: 'saturate(1.0) contrast(1.0)',
    },
    {
      id: '5500k',
      name: 'Natural Daylight',
      kelvin: '5500K',
      type: 'Direct Window Wash',
      description: 'Clean exterior daylight diffusion revealing stone textures and translucent glazing.',
      colorTone: 'rgba(180, 220, 255, 0.06)',
      filterStyle: 'brightness(1.04) saturate(1.02) contrast(1.04)',
    },
    {
      id: '2700k',
      name: 'Night Glow',
      kelvin: '2700K',
      type: 'Architectural Feature Spot',
      description: 'Atmospheric night ambiance with deep shadows and focused backlit niche highlights.',
      colorTone: 'rgba(220, 130, 40, 0.12)',
      filterStyle: 'brightness(0.95) contrast(1.1) saturate(1.1)',
    },
  ];

  activeLighting = signal<LightingEnvironment>(this.lightingOptions[0]);

  materials: MaterialSample[] = [
    {
      id: 'walnut',
      name: 'Natural Smoked Walnut',
      category: 'Exotic Wood Veneer',
      finish: 'Matte Polyurethane 15%',
      colorHex: 'linear-gradient(135deg, #3d291d 0%, #20140e 100%)',
      roughness: 0.42,
      metallic: 0.0,
      specs: 'Deep brown European crown-cut walnut veneer with subtle flame figuring. Applied with moisture-sealed edge-banding for custom wall paneling and TV credenzas.',
      projectApplication: 'Luxury Master Bedroom w/ Fluted Wall & Credenza',
      projectLocation: 'Camara Interiors • Sector 63, Noida',
      projectImage: 'assets/projects/rahul-work/page-08.jpg',
      pbrDetails: {
        albedo: 'Crown-Cut Smoked #2b1d14',
        normal: 'Fine Wood Grain Bump (0.35)',
        roughnessMap: 'Directional Micro-Roughness',
        ior: '1.53 (Dielectric Organic)',
      },
    },
    {
      id: 'calacatta',
      name: 'Calacatta Gold Italian Marble',
      category: 'Natural Stone Slabs',
      finish: 'Mirror Polish 95%',
      colorHex: 'linear-gradient(135deg, #eae5df 0%, #b8af9f 100%)',
      roughness: 0.08,
      metallic: 0.0,
      specs: 'Extra-white Italian marble featuring distinctive grey veins with warm golden caramel rivering. Bookmatched for full-height TV feature wall and credenza top.',
      projectApplication: 'The Opulent Arched Living Lounge & TV Suite',
      projectLocation: 'Camara Interiors • 2025',
      projectImage: 'assets/projects/rahul-work/page-01.jpg',
      pbrDetails: {
        albedo: 'White Dolomitic #f2efe9',
        normal: 'Micro-crystalline flatness (0.05)',
        roughnessMap: 'Specular Sheen Map 0.08',
        ior: '1.58 (Crystalline Calcite)',
      },
    },
    {
      id: 'fluted-glass',
      name: 'Bronze Tinted Fluted Glass',
      category: 'Architectural Glazing',
      finish: '12mm Reeded Profile',
      colorHex: 'linear-gradient(135deg, #4a3b2c 0%, #1a150f 100%)',
      roughness: 0.15,
      metallic: 0.2,
      specs: 'Custom 12mm fluted reeded architectural glass with warm bronze tinting. Transmits 78% concealed backlight while obscuring wardrobe carcass contents.',
      projectApplication: 'Aura Tinted Glass Walk-In Wardrobe & Vanity',
      projectLocation: 'Sector 65, Noida • 2025',
      projectImage: 'assets/projects/rahul-work/page-27.jpg',
      pbrDetails: {
        albedo: 'Bronze Tinted #36281c',
        normal: '12mm Sinusoidal Fluting Normal',
        roughnessMap: 'Smooth Fire-Polished Surface',
        ior: '1.52 (Float Glass)',
      },
    },
    {
      id: 'champagne-brass',
      name: 'Brushed Champagne Brass',
      category: 'Architectural Metalwork',
      finish: 'Directional Brushed Satin',
      colorHex: 'linear-gradient(135deg, #c5a880 0%, #856a47 100%)',
      roughness: 0.24,
      metallic: 0.94,
      specs: 'Precision CNC-machined brass alloy with anisotropic directional grain. Used for chandelier rings, slim metal credenza trims, and concealed Gola profiles.',
      projectApplication: 'Double-Tier Brass Chandelier & Media Accents',
      projectLocation: 'Camara Interiors • Sector 63',
      projectImage: 'assets/projects/rahul-work/page-01.jpg',
      pbrDetails: {
        albedo: 'Champagne Gold #c5a880',
        normal: 'Micro-hairline brush strokes (0.12)',
        roughnessMap: 'Anisotropic Directional 0.24',
        ior: '0.42 + 3.15i (Complex Conductor)',
      },
    },
    {
      id: 'terracotta-velvet',
      name: 'Terracotta Velvet Upholstery',
      category: 'Bespoke Furniture Textiles',
      finish: 'High-Density Microfiber Velvet',
      colorHex: 'linear-gradient(135deg, #944a38 0%, #5c2c20 100%)',
      roughness: 0.75,
      metallic: 0.0,
      specs: 'Rich burnt orange terracotta velvet with subtle directional sheen. Tailored over curved high-density foam for dining armchairs and lounge wingbacks.',
      projectApplication: 'Curved Wingback Lounge & Dining Chairs',
      projectLocation: 'Camara Interiors • Sector 63',
      projectImage: 'assets/projects/rahul-work/page-08.jpg',
      pbrDetails: {
        albedo: 'Terracotta #944a38',
        normal: 'Fine textile weave normal',
        roughnessMap: 'Velvet Sheen Falloff Angle 45°',
        ior: '1.48 (Organic Textile)',
      },
    },
    {
      id: 'sage-laminate',
      name: 'Matte Sage Green Laminate',
      category: 'Modular Kitchen Cabinetry',
      finish: 'Anti-Fingerprint Soft-Touch',
      colorHex: 'linear-gradient(135deg, #627264 0%, #3a453c 100%)',
      roughness: 0.88,
      metallic: 0.0,
      specs: 'Thermal healing nanotech laminate resisting grease and smudges. Paired with concealed Gola channels and warm white quartz countertops.',
      projectApplication: 'Contemporary Sage Green Modular Kitchen',
      projectLocation: 'Sector 65, Noida • 2025',
      projectImage: 'assets/projects/rahul-work/page-13.jpg',
      pbrDetails: {
        albedo: 'Sage Earth #627264',
        normal: 'Zero micro-texture (isotropic)',
        roughnessMap: 'Uniform 0.88 Matte',
        ior: '1.46 (Melamine Polymer)',
      },
    },
    {
      id: 'boiserie-plaster',
      name: 'French Boiserie Lime Plaster',
      category: 'Architectural Wall Finish',
      finish: 'Hand-Troweled Stucco Matte',
      colorHex: 'linear-gradient(135deg, #ded9ce 0%, #b8b2a3 100%)',
      roughness: 0.82,
      metallic: 0.0,
      specs: 'Mineral slaked lime plaster creating subtle organic texture across wall panels. Accented with classic wood molding profiles and 3000K wall washers.',
      projectApplication: 'The Parisian Boiserie Master Suite & TV Unit',
      projectLocation: 'Camara Interiors • 2025',
      projectImage: 'assets/projects/rahul-work/page-02.jpg',
      pbrDetails: {
        albedo: 'French Off-White #ded9ce',
        normal: 'Troweled lime stipple (0.28)',
        roughnessMap: 'Diffuse mineral dispersion',
        ior: '1.51 (Hydrated Lime)',
      },
    },
    {
      id: 'white-oak',
      name: 'Natural White Oak Veneer',
      category: 'Architectural Joinery',
      finish: 'Natural Matte Hardwax Oil',
      colorHex: 'linear-gradient(135deg, #cbab83 0%, #8c6f4a 100%)',
      roughness: 0.38,
      metallic: 0.0,
      specs: 'Straight-grain rift cut white oak veneer. Fabricated into integrated floating study desk, open bookcase joinery, and concealed LED channel housings.',
      projectApplication: 'Executive Study Room & Architectural Bookcase',
      projectLocation: 'Sector 65, Noida • 2025',
      projectImage: 'assets/projects/rahul-work/page-29.jpg',
      pbrDetails: {
        albedo: 'Warm Honey Oak #cbab83',
        normal: 'Rift-cut grain pore indentations',
        roughnessMap: 'Matte Wax Sheen 0.38',
        ior: '1.52 (Hardwood Lignin)',
      },
    },
  ];

  selectedMaterial = signal<MaterialSample>(this.materials[0]);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  selectMaterial(mat: MaterialSample): void {
    this.selectedMaterial.set(mat);
  }

  setLighting(light: LightingEnvironment): void {
    this.activeLighting.set(light);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.parallaxOffset.set(window.scrollY);
  }
}

