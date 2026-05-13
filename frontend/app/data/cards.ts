export type NamePosition = { x: number; y: number };

export type Card = {
  id: number;
  title: string;
  category: string;
  image?: string;
  namePosition?: NamePosition;
  photoPosition?: { x: number; y: number; size: number };
  premium? : Boolean;
};

export const cards: Card[] = [
  // Wedding
  { id: 1,  title: 'Elegant Wedding',        category: 'wedding', image: '/image2.png', namePosition: { x: 30, y: 58 }, photoPosition: { x: 69, y: 60, size: 42 } },
  { id: 2,  title: 'Floral Wedding',         category: 'wedding', image: '/image4.png', namePosition: { x: 72, y: 54 }, photoPosition: { x: 26, y: 46, size: 38} },
    { id: 3,  title: 'Upgrade to Premium to Unlock',        category: 'wedding', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42}, premium: true  },
  // Birthday
  { id: 5,  title: 'Happy Birthday Balloons', category: 'birthday', image: '/image2.png', namePosition: { x: 30, y: 58 }, photoPosition: { x: 69, y: 60, size: 42 } },
  { id: 7,  title: 'Colorful Birthday',       category: 'birthday', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42} },
  { id: 8,  title: 'Upgrade to Premium to Unlock',       category: 'birthday', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42}, premium: true  },
  // Holi
  { id: 10, title: 'Festival of Colors',      category: 'holi', image: '/image4.png', namePosition: { x: 72, y: 54 }, photoPosition: { x: 26, y: 46, size: 38}  },
  { id: 11, title: 'Happy Holi',              category: 'holi', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42}  },
  { id: 12, title: 'Upgrade to Premium to Unlock',              category: 'holi', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42}, premium: true   },
  // Diwali
  { id: 13, title: 'Diwali Lights',           category: 'diwali', image: '/image2.png', namePosition: { x: 30, y: 58 }, photoPosition: { x: 69, y: 60, size: 42 } },
  { id: 14, title: 'Happy Diwali',            category: 'diwali', image: '/image4.png', namePosition: { x: 72, y: 54 }, photoPosition: { x: 26, y: 46, size: 38}  },
  { id: 15, title: 'Upgrade to Premium to Unlock',      category: 'diwali', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42}, premium: true   },
  // Christmas
  { id: 17, title: 'Merry Christmas',         category: 'christmas', image: '/image2.png', namePosition: { x: 30, y: 58 }, photoPosition: { x: 69, y: 60, size: 42 } },
  { id: 18, title: 'Santa Claus',             category: 'christmas', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42}  },
  { id: 19, title: 'Upgrade to Premium to Unlock',             category: 'christmas', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42}, premium: true   },
  // Anniversary
  { id: 22, title: 'Love Anniversary',        category: 'anniversary', image: '/image4.png', namePosition: { x: 72, y: 54 }, photoPosition: { x: 26, y: 46, size: 38}  },
  { id: 21, title: 'Anniversary Wishes',      category: 'anniversary', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42}  },
  { id: 23, title: 'Upgrade to Premium to Unlock',      category: 'anniversary', image: '/image5.png', namePosition: { x: 27, y: 55 }, photoPosition: { x: 72, y: 48, size: 42}, premium: true   },
];

export const getCardsByCategory = (category: string): Card[] =>
  cards.filter((c) => c.category === category);

export const getCardById = (id: number): Card | undefined =>
  cards.find((c) => c.id === id);
