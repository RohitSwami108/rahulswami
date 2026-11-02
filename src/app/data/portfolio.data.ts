import {
  ContactInfo,
  Education,
  Experience,
  Project,
  RenderVaultItem,
  Service,
  SkillGroup,
} from '../models/portfolio.models';

export const CONTACT_INFO: ContactInfo = {
  name: 'Rahul Swami',
  title: 'Interior Designer & 3D Visualizer',
  location: 'Jangpura, New Delhi, India',
  email: 'rahul627q@gmail.com',
  phone: '+91 9717379245',
  phoneRaw: '9717379245',
  whatsappUrl: 'https://wa.me/919717379245?text=Hello%20Rahul,%20I%20viewed%20your%20Interior%20Design%20%26%203D%20Visualization%20portfolio%20and%20would%20love%20to%20discuss%20a%20project.',
  summary:
    'Creative and detail-oriented Interior Designer and 3D Visualizer with 2 years of professional experience in residential interior design, 3D modeling, photorealistic rendering, and 2D technical drawings. Skilled in designing bedrooms, wardrobes, feature walls, furniture, and interior elevations. Proficient in 3ds Max, Corona Renderer, and AutoCAD, with a strong understanding of space planning, material selection, lighting, and modern interior aesthetics.',
  stats: {
    experienceYears: '2+',
    projectsCompleted: '35+',
    photorealisticRenders: '50+ Real Works',
    autocadPrecision: '100%',
  },
};

export const EXPERIENCES: Experience[] = [
  {
    company: 'Camara Interiors',
    location: 'Sector 63, Noida',
    role: 'Interior Designer & 3D Visualizer',
    period: '04/2025 - Present',
    current: true,
    badge: 'Current Studio',
    summary:
      'Spearheading 3D photorealistic visualization, space planning, and AutoCAD technical detailing for premium residential interior projects across NCR.',
    responsibilities: [
      'Created 3D interior models and photorealistic renders for high-end residential interior projects using 3ds Max & Corona Renderer.',
      'Prepared 2D layouts, working drawings, carpentry elevations, and plumbing/electrical coordination using AutoCAD.',
      'Designed master bedrooms, modular wardrobe units, feature TV walls, and customized furniture.',
      'Developed holistic interior design concepts with precision material selection, PBR texture mapping, and atmospheric lighting setup.',
      'Produced realistic visual client presentations to communicate spatial concepts and finishes with maximum fidelity.',
      'Managed furniture layouts, ergonomic space utilization, and aesthetic detailing from schematic design to on-site execution.',
    ],
    tools: ['3ds Max', 'Corona Renderer', 'AutoCAD 2025', 'Material Curation', 'Veneers & Marble'],
  },
  {
    company: 'Ettore Interior',
    location: 'Gagan Vihar, Delhi',
    role: 'Interior Designer',
    period: '11/2024 - 04/2025',
    current: false,
    badge: 'Interior Studio',
    summary:
      'Collaborated on luxury interior concepts, spatial development, and technical AutoCAD drafting for residential clients.',
    responsibilities: [
      'Assisted in developing residential interior design concepts, mood boards, and 3D visualizations.',
      'Prepared accurate 2D CAD architectural drawings, electrical plans, and detailed interior elevations.',
      'Designed bedroom interiors, modular wardrobe layouts, fluted paneling, and decorative wall features.',
      'Created bespoke furniture concepts and systematically explored tactile material and color combinations.',
      'Supported the development of functional, ergonomic, and visually balanced residential interior spaces.',
    ],
    tools: ['AutoCAD', '3ds Max', 'Corona', 'Space Planning', 'Detail Drafting'],
  },
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: 'National Institute of Open Schooling',
    degree: 'Senior Secondary Certification',
    location: 'New Delhi',
    year: '05/2022',
    field: 'History, Political Science, Sociology',
  },
  {
    institution: 'Kaviraj Khazan Chand Quetta D.A.V',
    degree: 'Secondary School Education',
    location: 'Nizamuddin East, New Delhi',
    year: '03/2021',
    field: 'General Subjects & Creative Arts',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    categoryName: '3D Modeling & Photorealistic Rendering',
    icon: 'cube',
    description: 'Transforming architectural blueprints into hyper-realistic atmospheric renders.',
    skills: [
      { name: 'Autodesk 3ds Max', level: 95, levelText: 'Mastery', experienceYears: '2+ yrs', tags: ['Hard Surface', 'Polygonal Modeling', 'Furniture Details'] },
      { name: 'Corona Renderer 11', level: 95, levelText: 'Mastery', experienceYears: '2+ yrs', tags: ['Corona Physical Cam', 'Tone Mapping', 'LightMix', 'PBR Shaders'] },
      { name: 'Lighting Setup & Design', level: 94, levelText: 'Advanced', experienceYears: '2+ yrs', tags: ['IES Profiles', 'Sun & Sky', 'Concealed LED Coves', '3000K Warm Ambience'] },
      { name: 'Camera Setup & Composition', level: 92, levelText: 'Advanced', experienceYears: '2+ yrs', tags: ['Focal Length 24-50mm', 'Two-Point Perspective', 'Depth of Field'] },
      { name: 'Material & Texture Application', level: 94, levelText: 'Advanced', experienceYears: '2+ yrs', tags: ['PBR Shading', 'Fluted Slats', 'Calacatta Veins', 'Bouclé Fabrics'] },
    ],
  },
  {
    categoryName: '2D Technical Drafting & Working Drawings',
    icon: 'drafting-compass',
    description: 'Precision on-site execution drawings with millimeters accuracy.',
    skills: [
      { name: 'AutoCAD (2D Drafting)', level: 94, levelText: 'Mastery', experienceYears: '2+ yrs', tags: ['Working Drawings', 'Elevations', 'Sections', 'Joinery Details'] },
      { name: 'Space Planning & Layouts', level: 92, levelText: 'Advanced', experienceYears: '2+ yrs', tags: ['Circulation Pathways', 'Vastu Principles', 'Ergonomics'] },
      { name: 'False Ceiling Layout Plans', level: 92, levelText: 'Advanced', experienceYears: '2+ yrs', tags: ['Levels & Steps', 'Cove Lights', 'Recessed Spots', 'Linear Diffusers'] },
      { name: 'Carpentry & Elevation Detailing', level: 94, levelText: 'Advanced', experienceYears: '2+ yrs', tags: ['Gola Profiles', 'Hardware Specs', 'Section Markers'] },
    ],
  },
  {
    categoryName: 'Specialized Interior Modules',
    icon: 'layout',
    description: 'Bespoke residential modules tailored for contemporary Indian & global luxury.',
    skills: [
      { name: 'Bedroom Interior Design', level: 95, levelText: 'Mastery', experienceYears: '2+ yrs', tags: ['Curved Headboards', 'Acoustic Slats', 'Wingback Beds', 'Mood Lighting'] },
      { name: 'Modular Wardrobe & Vanity Design', level: 95, levelText: 'Mastery', experienceYears: '2+ yrs', tags: ['Fluted Glass Closets', 'PIR Sensors', 'Two-Tone Finishes', 'Vanity Desks'] },
      { name: 'Feature Wall & TV Unit Design', level: 94, levelText: 'Mastery', experienceYears: '2+ yrs', tags: ['Arched Backdrops', 'Boiserie Moldings', 'Floating Credenzas'] },
      { name: 'Modular Kitchens & Pantries', level: 92, levelText: 'Advanced', experienceYears: '2+ yrs', tags: ['Gola Profiles', 'Lift-up Fluted Glass', 'Quartz Countertops'] },
      { name: 'Exterior Facade Visualization', level: 90, levelText: 'Advanced', experienceYears: '2+ yrs', tags: ['Villa Facades', 'Stone Cladding', 'Pergola Terraces', 'Illuminated Gates'] },
    ],
  },
];

export const SERVICES_DATA: Service[] = [
  {
    id: '3d-rendering',
    title: '3D Photorealistic Rendering',
    subtitle: 'Corona Renderer & 3ds Max 4K Visuals',
    description:
      'High-resolution, photorealistic 3D interior & exterior renderings with accurate physical lighting, depth of field, realistic textures, and architectural camera framing.',
    icon: 'sparkles',
    deliverables: ['Multiple 4K UHD Render Views', 'Day & Night Lighting Options', 'Material Samples Close-up Renders', 'Color Mood Board Alignments'],
    software: ['Autodesk 3ds Max', 'Corona Renderer', 'Photoshop Post-Production'],
    turnaround: '3 - 5 Days',
  },
  {
    id: 'bedroom-design',
    title: 'Master Bedroom & Suite Design',
    subtitle: 'Sanctuaries of Comfort & Luxury',
    description:
      'Custom luxury bedroom concepts with fluted feature walls, curved upholstered headboards, ambient cove lighting, bedside pendants, and integrated wardrobe solutions.',
    icon: 'bed',
    deliverables: ['3D Views from 3 Angles', 'Headboard Elevation Drawing', 'Color & Fabric Palette Schedule', 'Lighting Circuit Concept'],
    software: ['3ds Max', 'Corona', 'AutoCAD'],
    turnaround: '4 - 6 Days',
  },
  {
    id: 'modular-wardrobes',
    title: 'Custom Modular Wardrobe & Vanity Systems',
    subtitle: 'Precision Millwork & Internal Carcass Detailing',
    description:
      'Ergonomic walk-in and sliding wardrobes with aluminum profile tinted glass, concealed LED sensor hanging rods, accessory organizer drawers, and vanity dressers.',
    icon: 'cabinet',
    deliverables: ['Front Elevation w/ Finishes', 'Internal Carcass Section Drawing', 'Hettich/Hafele Hardware Schedule', '3D Photorealistic Exterior/Interior Views'],
    software: ['AutoCAD 2025', '3ds Max', 'Corona Renderer'],
    turnaround: '3 - 5 Days',
  },
  {
    id: 'kitchen-cabinetry',
    title: 'Modular Kitchen Architecture',
    subtitle: 'Ergonomic Precision & Contemporary Aesthetics',
    description:
      'High-end modular kitchens with handle-less Gola profiles, lift-up fluted glass shutters, integrated under-cabinet LED task lighting, and seamless quartz backsplashes.',
    icon: 'kitchen',
    deliverables: ['Plan & Elevation AutoCAD Drawings', '3D Photorealistic Render Perspectives', 'Appliance & Hardware Fitment Plan'],
    software: ['AutoCAD 2025', '3ds Max', 'Corona'],
    turnaround: '3 - 5 Days',
  },
  {
    id: 'tv-feature-walls',
    title: 'Feature Wall & TV Unit Architecture',
    subtitle: 'Sculptural Statement Pieces & Arched Lounges',
    description:
      'Bespoke media walls combining arched backdrops with warm perimeter LEDs, classical boiserie moldings, fluted columns, and floating acoustic consoles.',
    icon: 'tv',
    deliverables: ['Detailed Fabrication Drawing', 'Stone & Wood Material Specs', 'Concealed Cable Management Plan', '3D Visual Render Presentations'],
    software: ['3ds Max', 'Corona', 'AutoCAD'],
    turnaround: '3 - 4 Days',
  },
  {
    id: 'autocad-working-drawings',
    title: '2D Technical Working Drawings',
    subtitle: 'Zero-Error Site Execution Blueprints',
    description:
      'Comprehensive on-site execution drawing sets in AutoCAD with exact millimeter dimensions, sectional elevations, false ceiling stepped levels, and electrical point markers.',
    icon: 'ruler',
    deliverables: ['Furniture & Space Layout Plan', 'False Ceiling & Lighting Plan', 'Carpentry Wall Elevations', 'Flooring & Tiling Pattern Layouts'],
    software: ['AutoCAD 2025 DWG / PDF'],
    turnaround: '2 - 4 Days',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'opulent-arched-lounge',
    title: 'The Opulent Arched Living Lounge & TV Suite',
    category: 'living',
    categoryLabel: 'Living & Dining Lounge',
    subtitle: 'Arched TV Backdrop with Perimeter Warm Cove, Velvet Dining & Bar Cabinet',
    description:
      'A centerpiece open-concept living and dining lounge designed for a luxury residential residence. Features an asymmetric curved feature TV wall with concealed 3000K warm LED glow, a floating natural oak media credenza, arched fluted glass bar cabinetry, terracotta velvet dining chairs, and a statement double-tier brass ring chandelier. Modeled in 3ds Max and rendered with Corona Physical Camera.',
    location: 'Sector 63, Noida',
    studio: 'Camara Interiors',
    year: '2025',
    software: ['Autodesk 3ds Max', 'Corona Renderer 11', 'AutoCAD 2025', 'Photoshop'],
    mainImage: 'assets/projects/rahul-work/page-01.jpg',
    gallery: [
      'assets/projects/rahul-work/page-01.jpg',
      'assets/projects/rahul-work/page-02.jpg',
      'assets/projects/rahul-work/page-28.jpg',
      'assets/projects/rahul-work/page-48.jpg',
      'assets/projects/rahul-work/page-50.jpg',
    ],
    specs: {
      dimensions: '26\' - 0" × 18\' - 6" (Ceiling Height 10\'-6")',
      renderEngine: 'Corona Renderer 11.2 (4K UHD Photorealism)',
      camera: 'Corona Physical Cam 24mm | F/4.0 | ISO 100',
      lighting: '3000K Warm LED Backlight Arc + Brass Ring Chandelier + Natural Window Daylight',
      materials: [
        'Textured Warm Stucco Plaster Arc',
        'Natural White Oak Media Console',
        'Fluted Amber Glass Bar Shutters',
        'Terracotta Bouclé & Velvet Upholstery',
        'Statuario Polished Marble Floor',
      ],
      colorPalette: [
        { name: 'Warm Sand Plaster', hex: '#e8dec8' },
        { name: 'Burnt Terracotta', hex: '#9d3d3d' },
        { name: 'Natural White Oak', hex: '#c9b08b' },
        { name: 'Champagne Brass', hex: '#d4af37' },
      ],
    },
    featured: true,
    highlights: [
      'Custom sweeping arch TV wall with continuous concealed 3000K perimeter LED channel',
      'Arched bar cabinet with vertical fluted glass and interior warm accent illumination',
      'Sculptural floor lamp and matching organic pebble-shaped wall mirrors',
      'Full AutoCAD carpentry drawings prepared for site contractors',
    ],
  },
  {
    id: 'parisian-boiserie-bedroom',
    title: 'The Parisian Boiserie Master Suite & TV Credenza',
    category: 'bedroom',
    categoryLabel: 'Master Bedroom Suite',
    subtitle: 'Classic French Wainscoting, Integrated Wardrobe & Natural Walnut Accents',
    description:
      'Harmonizing classical Parisian architectural elegance with contemporary luxury. The suite features full-height boiserie wall moldings framing a plush wingback king bed, minimalist black linear wall sconces, a complementary TV feature unit with low-profile wooden console, and integrated floor-to-ceiling wardrobes with recessed black hardware. Rendered with natural afternoon sun angles and warm ceiling coves.',
    location: 'Sector 63, Noida',
    studio: 'Camara Interiors',
    year: '2025',
    software: ['3ds Max 2025', 'Corona Renderer', 'AutoCAD', 'Photoshop'],
    mainImage: 'assets/projects/rahul-work/page-08.jpg',
    gallery: [
      'assets/projects/rahul-work/page-08.jpg',
      'assets/projects/rahul-work/page-06.jpg',
      'assets/projects/rahul-work/page-34.jpg',
      'assets/projects/rahul-work/page-40.jpg',
      'assets/projects/rahul-work/page-22.jpg',
    ],
    specs: {
      dimensions: '19\' - 0" × 15\' - 6" (Ceiling Height 10\'-0")',
      renderEngine: 'Corona Renderer 11',
      camera: 'Physical Cam 28mm | Two-Point Perspective',
      lighting: 'Perimeter Stepped Cove (3000K) + Dual Minimalist Sconces + Corona Sun',
      materials: [
        'Classic Boiserie Profile Moldings',
        'Natural Walnut Veneer Doors with Matte Black Accent',
        'Sand Velvet Wingback Headboard',
        'Large Format Calacatta Porcelain Tile',
      ],
      colorPalette: [
        { name: 'Alabaster White', hex: '#f4f3ef' },
        { name: 'Rich Walnut', hex: '#4a3728' },
        { name: 'Marsala Rose', hex: '#7a3b3f' },
        { name: 'Matte Charcoal', hex: '#1c1b1f' },
      ],
    },
    featured: true,
    highlights: [
      'Classic Parisian wall panel moulding layout mapped to AutoCAD elevation grid',
      'Floor-to-ceiling panoramic glass windows with sheer drape light transmission',
      'Integrated wardrobe unit maintaining continuous line with bedroom door entrance',
      'Complementary bedroom TV unit designed as a cohesive stylistic suite',
    ],
  },
  {
    id: 'organic-curved-headboard',
    title: 'The Organic Curved Asymmetric Bedroom Suite',
    category: 'bedroom',
    categoryLabel: 'Contemporary Bedroom',
    subtitle: 'Sweeping Curved Headboard, Fluted Acoustic Slats & Olive Plaster Backdrop',
    description:
      'A striking modern bedroom design featuring an asymmetric sweeping headboard with a continuous glowing LED silhouette. Rahul created multiple design iterations for the client: one with a smooth minimalist backdrop and dual circular disc sconces, and another featuring vertical fluted acoustic slats with an organic olive green plaster accent. Includes integrated cantilevered bedside drawers and marble flooring.',
    location: 'Gagan Vihar, Delhi',
    studio: 'Ettore Interior',
    year: '2025',
    software: ['3ds Max', 'Corona Renderer', 'AutoCAD', 'Photoshop'],
    mainImage: 'assets/projects/rahul-work/page-10.jpg',
    gallery: [
      'assets/projects/rahul-work/page-10.jpg',
      'assets/projects/rahul-work/page-20.jpg',
      'assets/projects/rahul-work/page-26.jpg',
      'assets/projects/rahul-work/page-36.jpg',
      'assets/projects/rahul-work/page-11.jpg',
    ],
    specs: {
      dimensions: '17\' - 6" × 14\' - 0"',
      renderEngine: 'Corona Renderer 11.2',
      camera: 'Physical Cam 30mm | F/4.0 | ISO 100',
      lighting: 'Concealed LED Channel Tracing Headboard Curve + Twin Circular Disc Sconces',
      materials: [
        'Curved Upholstered Nubuck Headboard',
        'Vertical White Fluted Paneling',
        'Textured Olive Sage Micro-Plaster',
        'Natural Oak Floating Nightstands',
      ],
      colorPalette: [
        { name: 'Olive Sage Plaster', hex: '#738363' },
        { name: 'Warm Sand Nubuck', hex: '#cfbca4' },
        { name: 'Fluted White', hex: '#f0ede6' },
        { name: 'Rust Accent Throw', hex: '#8a3324' },
      ],
    },
    featured: true,
    highlights: [
      'Complex polygonal modeling of sweeping curved headboard with continuous LED cove',
      'Presented client with 2 refined design variations (Minimalist vs Fluted Acoustic)',
      'Dual illuminated circular disc sconces generating soft diffused halo lighting',
      'Low platform bed with shadow plinth and integrated dual nightstands',
    ],
  },
  {
    id: 'aura-tinted-glass-wardrobe',
    title: 'Aura Tinted Glass Walk-In Wardrobe & Vanity Suite',
    category: 'wardrobe',
    categoryLabel: 'Custom Wardrobe & Vanity',
    subtitle: 'Bronze Profile Fluted Glass Wardrobe, Backlit Display Niches & Vanity Desk',
    description:
      'A luxury modular master wardrobe and dressing suite designed by Rahul. Features floor-to-ceiling bronze aluminum profile doors with tinted fluted glass and sensor-activated internal illumination. The opposite wall features a floating TV console with fluted side pilasters and illuminated display niches, flanked by a dedicated vanity table with vertical wood slats, upholstered stool, and backlit mirror.',
    location: 'Sector 63, Noida',
    studio: 'Camara Interiors',
    year: '2025',
    software: ['AutoCAD 2025', '3ds Max', 'Corona Renderer'],
    mainImage: 'assets/projects/rahul-work/page-27.jpg',
    gallery: [
      'assets/projects/rahul-work/page-27.jpg',
      'assets/projects/rahul-work/page-44.jpg',
      'assets/projects/rahul-work/page-22.jpg',
      'assets/drawings/cad-wardrobe-detail.svg',
    ],
    wireframeImage: 'assets/drawings/cad-wardrobe-detail.svg',
    cadDrawing: 'assets/drawings/cad-wardrobe-detail.svg',
    specs: {
      dimensions: '16\' - 0" × 13\' - 6" Master Suite Dressing Zone',
      renderEngine: 'Corona Renderer 11',
      camera: 'Physical Cam 22mm Wide Angle',
      lighting: 'Internal 2700K Sensor LED Rods + Backlit Vanity Mirror + Niche Downlights',
      materials: [
        'Bronze Slim Aluminum Profiles',
        'Tinted Smoked Fluted Glass Shutters',
        'Dark Smoked Oak Carcass (18mm BWR)',
        'Vertical Oak Slats & Backlit Mirror',
      ],
      colorPalette: [
        { name: 'Smoked Bronze Glass', hex: '#3b322a' },
        { name: 'Charcoal Fluted Pilasters', hex: '#525458' },
        { name: 'Warm Amber LED', hex: '#e8a946' },
        { name: 'Natural Oak Slat', hex: '#b5926c' },
      ],
    },
    featured: true,
    highlights: [
      'Full height bronze glass wardrobes with internal illuminated hanging rods and accessory drawers',
      'Built-in vanity dressing station with vertical wooden acoustic slats and floating mirror',
      'Floating media console framed by illuminated recessed display cabinets for art pieces',
      'Complete AutoCAD 2D carcass fabrication drawing included in client package',
    ],
  },
  {
    id: 'sage-green-marsala-kitchen',
    title: 'Contemporary Sage Green & Marsala Modular Kitchen',
    category: 'kitchen',
    categoryLabel: 'Modular Kitchen Architecture',
    subtitle: 'Handle-less Gola Profiles, Fluted Glass Lift-ups & Calacatta Quartz',
    description:
      'High-performance modular kitchen designs created for modern apartments. Features two curated color palettes: a soothing Sage Green with fluted glass lift-up upper cabinets, and a bold Marsala Wine Red with white lower drawers. Engineered with continuous black Gola aluminum handle-less channels, integrated under-cabinet LED task lights, slanted chimney hoods, and Calacatta marble wall cladding.',
    location: 'Sector 63, Noida',
    studio: 'Camara Interiors',
    year: '2025',
    software: ['3ds Max', 'Corona Renderer', 'AutoCAD 2025'],
    mainImage: 'assets/projects/rahul-work/page-18.jpg',
    gallery: [
      'assets/projects/rahul-work/page-18.jpg',
      'assets/projects/rahul-work/page-16.jpg',
      'assets/projects/rahul-work/page-25.jpg',
      'assets/projects/rahul-work/page-32.jpg',
      'assets/projects/rahul-work/page-33.jpg',
      'assets/projects/rahul-work/page-04.jpg',
    ],
    specs: {
      dimensions: '14\' - 6" × 10\' - 0" Modular Kitchen Layout',
      renderEngine: 'Corona Renderer 11',
      camera: 'Physical Cam 24mm & 35mm Ortho Views',
      lighting: 'Recessed 3000K Under-Cabinet Task LEDs + Ceiling Gimbal Spots',
      materials: [
        'Matte Sage Green Acrylic Upper Shutters',
        'Matte Marsala PU Painted Cabinets (Alternative Concept)',
        'Calacatta Gold Quartz Countertop & Backsplash',
        'Black Powder-Coated Gola Profile Channels',
      ],
      colorPalette: [
        { name: 'Sage Green', hex: '#6b876d' },
        { name: 'Marsala Wine', hex: '#6e383c' },
        { name: 'Calacatta White', hex: '#f7f6f2' },
        { name: 'Matte Black Gola', hex: '#111111' },
      ],
    },
    featured: true,
    highlights: [
      'Complete modular kitchen detailing including gas burner hub, microwave tower, and pantry storage',
      'Handle-less Gola profile layout preventing protruding handles and maximizing sleek lines',
      'Lift-up fluted glass showcase cabinets with internal warm lighting for glassware',
      'Seamless quartz waterfall countertop edge and floor-to-ceiling tile coordination',
    ],
  },
  {
    id: 'grand-double-height-staircase',
    title: 'The Royal Double-Height Foyer & Stone Staircase',
    category: 'feature-wall',
    categoryLabel: 'Architectural Foyer & Feature Wall',
    subtitle: 'Stone Masonry Cladding, Arched Wrought Iron Balustrades & Brass Chandelier',
    description:
      'A majestic double-height entry foyer and grand staircase designed for a multi-level villa. Rahul developed three distinct wall treatments for client selection: a dramatic rustic grey stone masonry wall, modern geometric architectural panels, and classical boiserie mouldings with walnut doors. Illuminated by a mid-century multi-bulb brass ring chandelier and recessed step lighting.',
    location: 'Sector 63, Noida',
    studio: 'Camara Interiors',
    year: '2025',
    software: ['3ds Max', 'Corona Renderer', 'AutoCAD', 'Photoshop'],
    mainImage: 'assets/projects/rahul-work/page-03.jpg',
    gallery: [
      'assets/projects/rahul-work/page-03.jpg',
      'assets/projects/rahul-work/page-05.jpg',
      'assets/projects/rahul-work/page-07.jpg',
    ],
    specs: {
      dimensions: 'Double-Height Void (Clear Height 21\'-0")',
      renderEngine: 'Corona Renderer 11',
      camera: 'Corona Physical Cam 28mm | Upward Tilt Perspective',
      lighting: 'Multi-Globe Mid-Century Chandelier + Up/Down Sconces + Tread Grazers',
      materials: [
        'Stacked Natural Granite Stone Masonry',
        'Wrought Iron Arched Balustrade with Matte Black Finish',
        'Polished Pink Terrazzo / Granite Treads',
        'Calacatta White Polished Landing Floor',
      ],
      colorPalette: [
        { name: 'Granite Stone Grey', hex: '#7a7d82' },
        { name: 'Wrought Iron Black', hex: '#141416' },
        { name: 'Terrazzo Ochre', hex: '#ba8e75' },
        { name: 'Brass Chandelier', hex: '#d1a84f' },
      ],
    },
    featured: true,
    highlights: [
      'Modeled 3 distinct design schemes for the same double-height space for client presentation',
      'Precision modeling of custom curved arched wrought iron stair balustrade',
      'Double-height PBR stone texture mapping with realistic bump and displacement',
      'Full height lighting calculation ensuring even illumination from ground to upper landing',
    ],
  },
  {
    id: 'khannas-villa-facade',
    title: 'Khanna\'s Villa — 3-Storey Luxury Facade Architecture',
    category: 'exterior',
    categoryLabel: 'Exterior Architectural Visualization',
    subtitle: 'Contemporary Stone Facade, Timber Pergola Terrace & Backlit Compound Wall',
    description:
      'Exterior architectural 3D visualization for a 3-storey private villa. Rahul created two complete architectural iterations: a Contemporary Facade with horizontal stone tiles, timber pergola roof deck, and charcoal slat gates (`page-30.jpg`), and a Neo-Classical Mediterranean Facade with sweeping arched loggias, wrought iron railings, and arched garden wall niches with uplights (`page-29.jpg`).',
    location: 'New Delhi / NCR',
    studio: 'Camara Interiors / Private Commission',
    year: '2025',
    software: ['Autodesk 3ds Max', 'Corona Renderer', 'Photoshop'],
    mainImage: 'assets/projects/rahul-work/page-30.jpg',
    gallery: [
      'assets/projects/rahul-work/page-30.jpg',
      'assets/projects/rahul-work/page-29.jpg',
      'assets/projects/rahul-work/page-31.jpg',
    ],
    specs: {
      dimensions: 'G + 2 Floors Villa Elevation (42\' Width × 36\' Height)',
      renderEngine: 'Corona Renderer 11',
      camera: 'Physical Cam 35mm Exterior Architectural View',
      lighting: 'Corona Physical Sun & Sky + Illuminated Compound Wall LEDs + Sconces',
      materials: [
        'Horizontal Grey Slate Facade Tiles',
        'Natural Teak Wood Pergola & Ceiling Soffits',
        'Powder-Coated Charcoal Slatted Sliding Gate',
        'Lush Terrace Greenery & Planters',
      ],
      colorPalette: [
        { name: 'Slate Stone Grey', hex: '#8a9199' },
        { name: 'Natural Teak Wood', hex: '#ad763e' },
        { name: 'Charcoal Gate', hex: '#26292e' },
        { name: 'Warm Boundary Glow', hex: '#f0c05a' },
      ],
    },
    featured: true,
    highlights: [
      'Designed 2 complete facade philosophies: Contemporary Stone vs Classical Arched Loggia',
      'Custom illuminated compound boundary wall featuring backlit "KHANNA\'S VILLA" typography',
      'Realistic architectural landscaping, balcony planters, and sky lighting simulation',
      'Full exterior material schedule prepared for civil and facade contractors',
    ],
  },
  {
    id: 'executive-study-room',
    title: 'Executive Study Room & Architectural Glass Partition',
    category: 'feature-wall',
    categoryLabel: 'Home Office & Study Architecture',
    subtitle: 'Calacatta Marble Desk, Floor-to-Ceiling Illuminated Bookcase & French Arch',
    description:
      'A dedicated private study and home office integrated into a luxury residential layout. Features a custom floor-to-ceiling natural oak bookcase with warm LED under-shelf lighting, an executive Calacatta marble slab desk with cognac leather swivel seating, and an arched black steel French glazed partition that maintains acoustic privacy while offering spatial connection to the dining room.',
    location: 'Sector 63, Noida',
    studio: 'Camara Interiors',
    year: '2025',
    software: ['3ds Max', 'Corona Renderer', 'AutoCAD'],
    mainImage: 'assets/projects/rahul-work/page-45.jpg',
    gallery: [
      'assets/projects/rahul-work/page-45.jpg',
      'assets/projects/rahul-work/page-48.jpg',
      'assets/projects/rahul-work/page-43.jpg',
      'assets/projects/rahul-work/page-50.jpg',
    ],
    specs: {
      dimensions: '12\' - 0" × 10\' - 6" Executive Office',
      renderEngine: 'Corona Renderer 11',
      camera: 'Physical Cam 28mm',
      lighting: 'Integrated Under-Shelf LED Channels (3000K) + Ceiling Focus Spots',
      materials: [
        'Natural Oak Millwork Bookcase',
        'Calacatta Gold Quartz Executive Desk Slab',
        'Black Metal Arched French Glass Partition',
        'Cognac Leather Ergonomic Chairs',
      ],
      colorPalette: [
        { name: 'Cognac Leather', hex: '#b35624' },
        { name: 'Natural Oak', hex: '#8f7358' },
        { name: 'Calacatta White', hex: '#fcfcfc' },
        { name: 'Matte Black Steel', hex: '#161616' },
      ],
    },
    featured: true,
    highlights: [
      'Full height custom millwork bookcase with integrated wiring channels and LED drivers',
      'Bespoke arched French grid glass partition creating a high-end architectural divider',
      'Visual axis alignment looking through glazed screen into formal dining and lounge',
      'Ergonomically planned workspace with optimal natural and task illumination',
    ],
  },
  {
    id: 'dusty-rose-bedroom',
    title: 'The Dusty Rose & Backlit Pebble Mirror Bedroom',
    category: 'bedroom',
    categoryLabel: 'Master Bedroom',
    subtitle: 'Dusty Rose Boiserie Backdrop, Fluted Slats & Organic Illuminated Mirror',
    description:
      'A romantic contemporary bedroom featuring a curved dusty rose boiserie feature wall flanked by white fluted vertical slats and an asymmetric organic pebble mirror with warm rear LED glow. Includes a suspended gold hoop pendant lamp, tufted vertical channel headboard, and two-tone wardrobe joinery.',
    location: 'Gagan Vihar, Delhi',
    studio: 'Ettore Interior',
    year: '2024',
    software: ['3ds Max', 'Corona Renderer', 'Photoshop'],
    mainImage: 'assets/projects/rahul-work/page-21.jpg',
    gallery: [
      'assets/projects/rahul-work/page-21.jpg',
      'assets/projects/rahul-work/page-12.jpg',
      'assets/projects/rahul-work/page-35.jpg',
      'assets/projects/rahul-work/page-41.jpg',
    ],
    specs: {
      dimensions: '16\' - 6" × 13\' - 6"',
      renderEngine: 'Corona 11',
      camera: 'Physical Cam 28mm | Soft Light Setting',
      lighting: 'Pebble Mirror Halo LED + Brass Ring Pendant + Recessed False Ceiling Coves',
      materials: [
        'Dusty Rose Matte Wall Finish',
        'Vertical White Fluted Wooden Slats',
        'Organic Shaped Backlit Vanity Mirror',
        'Brushed Brass Hoop Luminaire',
      ],
      colorPalette: [
        { name: 'Dusty Rose', hex: '#b87777' },
        { name: 'Fluted White', hex: '#f4f3f0' },
        { name: 'Brushed Brass', hex: '#c5a059' },
        { name: 'Charcoal Grey', hex: '#3b3b3b' },
      ],
    },
    featured: false,
    highlights: [
      'Asymmetric vanity mirror with organic pebble perimeter lighting contour',
      'Vertical fluted paneling accent creating textural contrast with soft matte wall',
      'Suspended minimalist brass hoop pendant providing direct bedside task illumination',
    ],
  },
  {
    id: 'autocad-working-drawings-set',
    title: 'AutoCAD 2025 Architectural Construction & Carpentry Set',
    category: 'drawings',
    categoryLabel: '2D CAD Blueprints',
    subtitle: 'Millimeter-Precise On-Site Execution Packages: Elevations, Carcass & False Ceilings',
    description:
      'Complete technical AutoCAD working drawing packages prepared for carpentry teams, stone fabricators, and site contractors. Includes millimeter-accurate wall elevations, internal wardrobe carcass sections, false ceiling stepped levels, and electrical cove routing corresponding directly to Rahul\'s 3D Corona models.',
    location: 'Sector 63 Noida & Delhi NCR',
    studio: 'Camara Interiors / Ettore Interior',
    year: '2025',
    software: ['AutoCAD 2025 DWG / PDF', 'Architectural Drafting Standards'],
    mainImage: 'assets/drawings/cad-bedroom-elevation.svg',
    gallery: [
      'assets/drawings/cad-bedroom-elevation.svg',
      'assets/drawings/cad-wardrobe-detail.svg',
    ],
    specs: {
      dimensions: 'Standard A3 & A2 Execution Drawing Sheets',
      renderEngine: 'AutoCAD 2025 Vector Precision',
      camera: 'Orthographic 2D Projection',
      lighting: 'Technical Drawing Datum / Standards',
      materials: [
        'Standardized Layer Management (A-WALL, A-DOOR, A-FURN, A-ANNO)',
        'Millimeter Precision Dimensioning',
        'Detailed Material Callouts and Hatch Patterns',
      ],
      colorPalette: [
        { name: 'CAD Cyan', hex: '#00b4d8' },
        { name: 'CAD Blue', hex: '#0077b6' },
        { name: 'CAD Amber', hex: '#ffb703' },
        { name: 'CAD Slate', hex: '#070c14' },
      ],
    },
    featured: true,
    highlights: [
      'Zero-error fabrication drawings utilized directly by carpentry teams on-site',
      'Carcass section details matching Hettich / Hafele soft-close hardware specifications',
      'Step-by-step false ceiling drop details with exact luminaire circuit markers',
    ],
  },
];

export const TESTIMONIALS = [
  {
    client: 'Principal Architect, Camara Interiors',
    role: 'Studio Director, Sector 63 Noida',
    project: 'Luxury Penthouse Renders & AutoCAD Execution Sets',
    feedback:
      'Rahul’s 3D renders possess an extraordinary sense of light, texture, and spatial atmosphere. His work on our arched TV feature walls and double-height foyer gave our clients complete visual confidence. His AutoCAD drawings are accurate and reliable on-site.',
    rating: 5,
  },
  {
    client: 'Design Lead, Ettore Interior',
    role: 'Senior Interior Architect, Delhi',
    project: 'Curved Bedroom Suites & Modular Wardrobes',
    feedback:
      'Rahul combines creative design courage with disciplined technical execution. His curved headboard modeling in 3ds Max and Corona lighting setup are top-tier. Always delivers client-ready renders on tight schedules.',
    rating: 5,
  },
  {
    client: 'Khanna Residence Client',
    role: 'Villa Owner, New Delhi',
    project: 'Khanna\'s Villa 3-Storey Facade & Master Suite',
    feedback:
      'Seeing Rahul\'s 3D visualization of Khanna\'s Villa before breaking ground was incredible. His lighting at twilight and stone texture details helped us finalize the exact stone and wood finishes. A true master of 3D visualization!',
    rating: 5,
  },
];

// Map all 50 real work render images for the Render Vault Gallery
export const RENDER_VAULT_ITEMS: RenderVaultItem[] = Array.from({ length: 50 }, (_, i) => {
  const pageNum = i + 1;
  const pad = pageNum < 10 ? `0${pageNum}` : `${pageNum}`;
  const fileName = `page-${pad}.jpg`;
  const imagePath = `assets/projects/rahul-work/${fileName}`;

  let title = `Architectural Render #${pad}`;
  let category = 'Interior Design';

  if ([1, 2, 28, 48, 50].includes(pageNum)) {
    title = `Arched TV & Living Lounge (Angle ${pad})`;
    category = 'Living & TV Wall';
  } else if ([3, 5, 7].includes(pageNum)) {
    title = `Double-Height Foyer & Staircase (Option ${pad})`;
    category = 'Feature Wall & Foyer';
  } else if ([4, 16, 18, 25, 32, 33].includes(pageNum)) {
    title = `Modular Kitchen Architecture (View ${pad})`;
    category = 'Modular Kitchen';
  } else if ([6, 8, 9, 34, 40].includes(pageNum)) {
    title = `Parisian Boiserie Master Suite (View ${pad})`;
    category = 'Master Bedroom';
  } else if ([10, 11, 20, 26, 36].includes(pageNum)) {
    title = `Curved Asymmetric Bedroom (View ${pad})`;
    category = 'Master Bedroom';
  } else if ([12, 21, 22, 35, 41].includes(pageNum)) {
    title = `Dusty Rose & Wainscoting Suite (View ${pad})`;
    category = 'Bedroom Design';
  } else if ([14, 15].includes(pageNum)) {
    title = `Retail Boutique & Display (View ${pad})`;
    category = 'Commercial';
  } else if ([27, 44].includes(pageNum)) {
    title = `Glass Wardrobe & Vanity Dresser (View ${pad})`;
    category = 'Custom Wardrobe';
  } else if ([29, 30, 31].includes(pageNum)) {
    title = `Khanna's Villa Exterior Facade (Option ${pad})`;
    category = 'Villa Facade';
  } else if ([45, 43].includes(pageNum)) {
    title = `Executive Study & Glass Partition (View ${pad})`;
    category = 'Home Office';
  }

  return {
    id: pageNum,
    fileName,
    imagePath,
    title,
    category,
  };
});
