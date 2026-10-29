export type ProjectBlock =
  | { type: 'text'; html: string }
  | { type: 'quote'; quote: string; name: string; role: string; image: string }
  | { type: 'image'; src: string; alt: string };

export interface Project { slug: string; poster: string; video: string; logo: string; name: string; year: string; summary: string; service: string; industry: string; liveLabel: string; liveUrl: string; vimeo: string; blocks: ProjectBlock[]; next: string }

export const projects: Project[] = [
  {
    "slug": "visage",
    "poster": "/assets/1Y9A5246-1024x683.jpg",
    "video": "/assets/6840ae36c2dab521d144e25c_case-study-1-transcode.mp4",
    "logo": "/assets/695ec9b0dc241793710ebe5d_logoipsum-317.svg",
    "name": "Aarav & Diya",
    "year": "2025",
    "summary": "A grand Bangalore Palace wedding featuring heartfelt candid moments, traditional rituals, and cinematic 4K highlights.",
    "service": "Wedding Cinema",
    "industry": "Wedding",
    "liveLabel": "Aarav & Diya",
    "liveUrl": "https://thesrpictures.in/",
    "vimeo": "https://player.vimeo.com/video/1091303562?h=d3b206004a&app_id=122963",
    "blocks": [
      {
        "type": "text",
        "html": "<h3>Wedding Story Overview</h3><p>‍</p><p>A sacred union in Bengaluru filled with emotional ceremonies, Vedic muhurtham rituals, and vibrant evening celebrations. Our team provided two days of comprehensive candid photography and cinematic 4K film coverage with multi-angle Sony FX cinema rigs.</p><p>‍</p><ul><li>Traditional Muhurtham &amp; Sangeet multi-camera coverage</li><li>Licensed 4K drone cinematography for venue &amp; baraat</li><li>Custom handcrafted 12x36 flush-mount lay-flat album</li></ul><p>‍</p><p>Every delicate glance, laughter, and tear was captured unobtrusively, preserving the couple's most cherished day into an heirloom film.</p>"
      },
      {
        "type": "image",
        "src": "/assets/1Y9A5246-1024x683.jpg",
        "alt": "Aarav & Diya Wedding by The SR Pictures"
      },
      {
        "type": "quote",
        "quote": "The SR Pictures captured every tear and smile of our wedding. Our film looks like pure cinema.",
        "name": "Diya & Aarav",
        "role": "Wedding Couple, Bengaluru",
        "image": "/assets/1Y9A5246-1024x683.jpg"
      },
      {
        "type": "image",
        "src": "/assets/RSD_8118-1024x683.jpg",
        "alt": "Aarav & Diya Wedding Ceremony"
      },
      {
        "type": "text",
        "html": "<h3>Cinematic Highlights &amp; Colors</h3><p>‍</p><p>Master color grading designed specifically for vibrant Indian wedding palettes—deep marigolds, royal reds, and warm evening golds. Accompanied by bespoke audio mastering of sacred mantras and emotional vows.</p>"
      },
      {
        "type": "image",
        "src": "/assets/RSD_8625-1024x683.jpg",
        "alt": "Traditional Wedding Rituals"
      }
    ],
    "next": "horizon"
  },
  {
    "slug": "horizon",
    "poster": "/assets/RSD_8118-1024x683.jpg",
    "video": "/assets/6776fa0ce62367e64242f0fd_case-video-2-transcode.mp4",
    "logo": "/assets/695ec9b168f333a50648d94d_logoipsum-311.svg",
    "name": "Rohan & Pooja",
    "year": "2024",
    "summary": "An intimate couple story filmed in Bangalore and Nandi Hills with stylized aerial frames and warm sunset hues.",
    "service": "Pre-Wedding",
    "industry": "Couple Story",
    "liveLabel": "Rohan & Pooja",
    "liveUrl": "https://thesrpictures.in/",
    "vimeo": "https://player.vimeo.com/video/1043423802?app_id=122963",
    "blocks": [
      {
        "type": "text",
        "html": "<h3>The Couple Session</h3><p>‍</p><p>Shot across picturesque locations around Bengaluru, this pre-wedding shoot captured the raw connection between Rohan and Pooja. With stylized concept direction and three distinct outfit changes, the visual tone shifted from classic vintage to modern romantic.</p>"
      },
      {
        "type": "image",
        "src": "/assets/RSD_8118-1024x683.jpg",
        "alt": "Rohan & Pooja Pre-Wedding Session"
      },
      {
        "type": "quote",
        "quote": "Their creative vision turned our simple love story into an unforgettable cinematic memory.",
        "name": "Pooja & Rohan",
        "role": "Pre-Wedding Clients",
        "image": "/assets/RSD_8118-1024x683.jpg"
      },
      {
        "type": "image",
        "src": "/assets/1Y9A5246-1024x683.jpg",
        "alt": "Rohan & Pooja Golden Hour"
      }
    ],
    "next": "beyond"
  },
  {
    "slug": "beyond",
    "poster": "/assets/RSD_8625-1024x683.jpg",
    "video": "/assets/6776f8447c59f1e277e1ee94_case-video-03-transcode.mp4",
    "logo": "/assets/695ec9c93918a42aabdbcd31_logoipsum-280.svg",
    "name": "Veda Heritage",
    "year": "2024",
    "summary": "A vibrant housewarming ceremony in Bengaluru, documenting sacred puja customs, warm gatherings, and architectural beauty.",
    "service": "Housewarming",
    "industry": "Ceremony & Griha Pravesha",
    "liveLabel": "Veda Heritage",
    "liveUrl": "https://thesrpictures.in/",
    "vimeo": "https://player.vimeo.com/video/1043424168?app_id=122963",
    "blocks": [
      {
        "type": "text",
        "html": "<h3>Griha Pravesha Celebration</h3><p>‍</p><p>Documenting a family milestone in South Bengaluru. From the early dawn cow puja and homa to the celebratory banquet with family and friends, every moment was cataloged with pristine clarity.</p>"
      },
      {
        "type": "image",
        "src": "/assets/RSD_8625-1024x683.jpg",
        "alt": "Veda Heritage Housewarming"
      },
      {
        "type": "quote",
        "quote": "Flawless coverage from morning rituals to the evening dinner. The photo album is exceptional.",
        "name": "Suresh & Meena",
        "role": "Homeowners, Bengaluru",
        "image": "/assets/RSD_8625-1024x683.jpg"
      }
    ],
    "next": "stride"
  },
  {
    "slug": "stride",
    "poster": "/assets/RSD_1969-1024x683.jpg",
    "video": "/assets/6776f90cc1fa6522b3738b2d_case-video-01-transcode.mp4",
    "logo": "/assets/695ec9d6fbb3c62d106a8b53_logoipsum-323.svg",
    "name": "Haldi Sunburst",
    "year": "2024",
    "summary": "A high-energy Haldi celebration bursting with marigold petals, water splashes, and joyous family bonds.",
    "service": "Haldi & Sangeet",
    "industry": "Wedding Rituals",
    "liveLabel": "Haldi Sunburst",
    "liveUrl": "https://thesrpictures.in/",
    "vimeo": "https://player.vimeo.com/video/1043423383?app_id=122963",
    "blocks": [
      {
        "type": "text",
        "html": "<h3>Vibrant Celebrations</h3><p>‍</p><p>Captured in 120fps slow motion, this Haldi event was a feast of textures, bright turmeric yellows, and contagious laughter. The resulting teaser reel reached over 100k views on Instagram.</p>"
      },
      {
        "type": "image",
        "src": "/assets/RSD_1969-1024x683.jpg",
        "alt": "Haldi Celebration Rituals"
      },
      {
        "type": "quote",
        "quote": "Working with SR Pictures was effortless. They made everyone comfortable and captured the truest smiles.",
        "name": "Kavya R.",
        "role": "Bride, Bengaluru",
        "image": "/assets/RSD_1969-1024x683.jpg"
      }
    ],
    "next": "visage"
  }
];

export const caseStudyItemIds = [
  [
    "w-node-fb6f08c0-bccf-aeab-a33d-45198963fe7b-8963fe69",
    "w-node-fb6f08c0-bccf-aeab-a33d-45198963fe80-8963fe69"
  ],
  [
    "w-node-fb6f08c0-bccf-aeab-a33d-45198963fe97-8963fe69",
    "w-node-fb6f08c0-bccf-aeab-a33d-45198963fe9c-8963fe69"
  ],
  [
    "w-node-fb6f08c0-bccf-aeab-a33d-45198963feb5-8963fe69",
    "w-node-fb6f08c0-bccf-aeab-a33d-45198963feba-8963fe69"
  ],
  [
    "w-node-fb6f08c0-bccf-aeab-a33d-45198963fed1-8963fe69",
    "w-node-fb6f08c0-bccf-aeab-a33d-45198963fed6-8963fe69"
  ]
];