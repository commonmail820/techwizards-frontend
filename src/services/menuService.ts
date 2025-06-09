import type { MenuItem, MenuItemUpdate, MenuCategory } from '../types/menu';

// This will be replaced with actual API calls later
const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Tacos al Pastor',
    nameEs: 'Tacos al Pastor',
    description: 'Marinated pork tacos with pineapple, onions, and cilantro on corn tortillas',
    descriptionEs: 'Tacos de cerdo marinado con piña, cebolla y cilantro en tortillas de maíz',
    price: 12.99,
    category: 'mainCourse',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    spiceLevel: 2,
    isVegetarian: false,
    isAvailable: true,
    isPopular: true,
    orderCount: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Guacamole',
    nameEs: 'Guacamole',
    description: 'Fresh avocado dip with tomatoes, onions, lime, and cilantro. Served with tortilla chips',
    descriptionEs: 'Dip de aguacate fresco con tomates, cebolla, limón y cilantro. Servido con totopos',
    price: 8.99,
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop',
    spiceLevel: 1,
    isVegetarian: true,
    isAvailable: true,
    isPopular: true,
    orderCount: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Burrito Supreme',
    nameEs: 'Burrito Supremo',
    description: 'Large flour tortilla filled with seasoned beef, rice, beans, cheese, lettuce, and sour cream',
    descriptionEs: 'Tortilla de harina grande rellena de carne sazonada, arroz, frijoles, queso, lechuga y crema',
    price: 14.99,
    category: 'mainCourse',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    spiceLevel: 1,
    isVegetarian: false,
    isAvailable: true,
    isPopular: false,
    orderCount: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: 'Quesadilla Grande',
    nameEs: 'Quesadilla Grande',
    description: 'Grilled flour tortilla with melted cheese, peppers, onions, and your choice of chicken or beef',
    descriptionEs: 'Tortilla de harina a la parrilla con queso derretido, pimientos, cebollas y pollo o carne',
    price: 11.99,
    category: 'mainCourse',
    image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop',
    spiceLevel: 1,
    isVegetarian: false,
    isAvailable: true,
    isPopular: true,
    orderCount: 134,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: 'Nachos Supreme',
    nameEs: 'Nachos Supremos',
    description: 'Crispy tortilla chips topped with cheese, jalapeños, beans, sour cream, and guacamole',
    descriptionEs: 'Totopos crujientes cubiertos con queso, jalapeños, frijoles, crema y guacamole',
    price: 10.99,
    category: 'appetizer',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop',
    spiceLevel: 2,
    isVegetarian: true,
    isAvailable: true,
    isPopular: true,
    orderCount: 167,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: 'Chicken Enchiladas',
    nameEs: 'Enchiladas de Pollo',
    description: 'Three corn tortillas filled with seasoned chicken, topped with red sauce and cheese',
    descriptionEs: 'Tres tortillas de maíz rellenas de pollo sazonado, cubiertas con salsa roja y queso',
    price: 13.99,
    category: 'mainCourse',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop',
    spiceLevel: 2,
    isVegetarian: false,
    isAvailable: true,
    isPopular: false,
    orderCount: 78,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: 'Vegetarian Fajitas',
    nameEs: 'Fajitas Vegetarianas',
    description: 'Sizzling bell peppers, onions, and mushrooms served with tortillas and sides',
    descriptionEs: 'Pimientos, cebollas y champiñones chisporroteantes servidos con tortillas y acompañamientos',
    price: 12.49,
    category: 'mainCourse',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
    spiceLevel: 1,
    isVegetarian: true,
    isAvailable: true,
    isPopular: false,
    orderCount: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 8,
    name: 'Churros',
    nameEs: 'Churros',
    description: 'Crispy fried dough sticks dusted with cinnamon sugar, served with chocolate dipping sauce',
    descriptionEs: 'Palitos de masa frita crujientes espolvoreados con azúcar y canela, servidos con salsa de chocolate',
    price: 6.99,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    spiceLevel: 0,
    isVegetarian: true,
    isAvailable: true,
    isPopular: true,
    orderCount: 112,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 9,
    name: 'Tres Leches Cake',
    nameEs: 'Pastel de Tres Leches',
    description: 'Traditional sponge cake soaked in three types of milk, topped with whipped cream',
    descriptionEs: 'Bizcocho tradicional empapado en tres tipos de leche, cubierto con crema batida',
    price: 7.99,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
    spiceLevel: 0,
    isVegetarian: true,
    isAvailable: true,
    isPopular: false,
    orderCount: 67,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 10,
    name: 'Horchata',
    nameEs: 'Horchata',
    description: 'Traditional rice and cinnamon drink, sweet and refreshing',
    descriptionEs: 'Bebida tradicional de arroz y canela, dulce y refrescante',
    price: 3.99,
    category: 'beverage',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    spiceLevel: 0,
    isVegetarian: true,
    isAvailable: true,
    isPopular: true,
    orderCount: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 11,
    name: 'Spicy Margarita',
    nameEs: 'Margarita Picante',
    description: 'Classic margarita with jalapeño-infused tequila, lime juice, and triple sec',
    descriptionEs: 'Margarita clásica con tequila infusionado con jalapeño, jugo de limón y triple sec',
    price: 9.99,
    category: 'beverage',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
    spiceLevel: 3,
    isVegetarian: true,
    isAvailable: true,
    isPopular: true,
    orderCount: 156,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 12,
    name: 'Fish Tacos',
    nameEs: 'Tacos de Pescado',
    description: 'Grilled fish with cabbage slaw, pico de gallo, and chipotle mayo on corn tortillas',
    descriptionEs: 'Pescado a la parrilla con ensalada de repollo, pico de gallo y mayonesa chipotle en tortillas de maíz',
    price: 13.49,
    category: 'mainCourse',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop',
    spiceLevel: 2,
    isVegetarian: false,
    isAvailable: true,
    isPopular: false,
    orderCount: 92,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class MenuService {
  private static instance: MenuService;
  private items: MenuItem[] = mockMenuItems;

  private constructor() {}

  public static getInstance(): MenuService {
    if (!MenuService.instance) {
      MenuService.instance = new MenuService();
    }
    return MenuService.instance;
  }

  // Get all menu items
  async getAllItems(): Promise<MenuItem[]> {
    // This will be replaced with an API call
    return this.items;
  }

  // Get available menu items
  async getAvailableItems(): Promise<MenuItem[]> {
    return this.items.filter(item => item.isAvailable);
  }

  // Get menu items by category
  async getItemsByCategory(category: MenuCategory): Promise<MenuItem[]> {
    return this.items.filter(item => item.category === category);
  }

  // Get a single menu item by ID
  async getItemById(id: number): Promise<MenuItem | null> {
    const item = this.items.find(item => item.id === id);
    return item || null;
  }

  // Add a new menu item (admin only)
  async addItem(item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<MenuItem> {
    const newItem: MenuItem = {
      ...item,
      id: Math.max(...this.items.map(item => item.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.items.push(newItem);
    return newItem;
  }

  // Update a menu item (admin only)
  async updateItem(id: number, update: MenuItemUpdate): Promise<MenuItem | null> {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return null;

    const updatedItem: MenuItem = {
      ...this.items[index],
      ...update,
      updatedAt: new Date().toISOString(),
    };
    this.items[index] = updatedItem;
    return updatedItem;
  }

  // Delete a menu item (admin only)
  async deleteItem(id: number): Promise<boolean> {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
  }

  // Toggle item availability (admin only)
  async toggleAvailability(id: number): Promise<MenuItem | null> {
    const item = await this.getItemById(id);
    if (!item) return null;

    return this.updateItem(id, { isAvailable: !item.isAvailable });
  }

  // Update item price (admin only)
  async updatePrice(id: number, newPrice: number): Promise<MenuItem | null> {
    return this.updateItem(id, { price: newPrice });
  }

  // Get popular items
  async getPopularItems(limit: number = 5): Promise<MenuItem[]> {
    return this.items
      .filter(item => item.isAvailable)
      .sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0))
      .slice(0, limit);
  }
} 