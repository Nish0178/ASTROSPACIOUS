export interface PremiumArticle {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: string;
  authorAvatar: string;
  publishedDate: string;
  readingTime: string;
  featured: boolean;
  tags: string[];
}

export const mockPremiumArticles: PremiumArticle[] = [
  {
    id: 1,
    slug: "discovery-of-new-exoplanet",
    title: "Astronomers Discover Earth-Like Exoplanet in Habitable Zone",
    excerpt: "A new study reveals a potentially habitable world located just 40 light-years away, possessing atmospheric signatures that hint at liquid water.",
    category: "Exoplanets",
    coverImage: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800",
    author: "Dr. Sarah Jenkins",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    publishedDate: "Aug 1, 2026",
    readingTime: "6 min read",
    featured: false,
    tags: ["exoplanet", "habitable", "discovery"]
  },
  {
    id: 2,
    slug: "mars-rover-finds-organic-compounds",
    title: "Mars Rover Unearths Complex Organic Compounds",
    excerpt: "The latest findings from the Perseverance rover suggest that Mars may have harbored microbial life in its ancient past.",
    category: "Space Missions",
    coverImage: "https://images.unsplash.com/photo-1614729939124-03290b56c9ce?w=800",
    author: "Mark Rover",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    publishedDate: "Jul 28, 2026",
    readingTime: "5 min read",
    featured: false,
    tags: ["mars", "rover", "organics"]
  },
  {
    id: 3,
    slug: "webb-telescope-captures-dying-star",
    title: "James Webb Telescope Captures Breathtaking Image of a Dying Star",
    excerpt: "A stunning new image shows the intricate layers of gas and dust expelled by a dying star, offering new insights into stellar evolution.",
    category: "Astronomy",
    coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
    author: "Emily Chen",
    authorAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    publishedDate: "Jul 25, 2026",
    readingTime: "4 min read",
    featured: false,
    tags: ["jwst", "telescope", "star"]
  },
  {
    id: 4,
    slug: "spacex-launches-next-gen-satellite",
    title: "SpaceX Successfully Deploys Next-Gen Communication Satellite",
    excerpt: "The Falcon Heavy rocket carried the most advanced communication satellite to orbit, promising global high-speed connectivity.",
    category: "Rocket Science",
    coverImage: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800",
    author: "Alex Thompson",
    authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    publishedDate: "Jul 20, 2026",
    readingTime: "3 min read",
    featured: false,
    tags: ["spacex", "satellite", "launch"]
  },
  {
    id: 5,
    slug: "black-hole-merger-detected",
    title: "Gravitational Waves Confirm Massive Black Hole Merger",
    excerpt: "LIGO observatories have detected ripples in spacetime originating from the collision of two supermassive black holes.",
    category: "Black Holes",
    coverImage: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800",
    author: "Dr. Robert Smith",
    authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    publishedDate: "Jul 15, 2026",
    readingTime: "8 min read",
    featured: false,
    tags: ["blackhole", "ligo", "gravity"]
  },
  {
    id: 6,
    slug: "future-of-lunar-colonies",
    title: "The Architecture of Future Lunar Colonies",
    excerpt: "Architects and scientists are collaborating to design sustainable habitats for the upcoming Artemis lunar missions.",
    category: "Space Technology",
    coverImage: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800",
    author: "Laura Mitchell",
    authorAvatar: "https://randomuser.me/api/portraits/women/29.jpg",
    publishedDate: "Jul 10, 2026",
    readingTime: "7 min read",
    featured: false,
    tags: ["moon", "artemis", "habitat"]
  },
  {
    id: 7,
    slug: "understanding-dark-matter",
    title: "New Theories on the Nature of Dark Matter",
    excerpt: "Physicists propose a novel framework that could finally explain the elusive substance making up most of the universe's mass.",
    category: "Cosmology",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    author: "Dr. Kevin Lee",
    authorAvatar: "https://randomuser.me/api/portraits/men/55.jpg",
    publishedDate: "Jul 5, 2026",
    readingTime: "10 min read",
    featured: false,
    tags: ["darkmatter", "cosmology", "physics"]
  },
  {
    id: 8,
    slug: "isro-gaganyaan-update",
    title: "ISRO Provides Crucial Updates on Gaganyaan Mission",
    excerpt: "India's first human spaceflight program is on track, with critical tests for the crew escape system completed successfully.",
    category: "ISRO",
    coverImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800",
    author: "Priya Sharma",
    authorAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
    publishedDate: "Jul 1, 2026",
    readingTime: "5 min read",
    featured: false,
    tags: ["isro", "gaganyaan", "india"]
  }
];
