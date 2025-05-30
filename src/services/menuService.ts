import type { MenuItem, MenuItemUpdate, MenuCategory } from '../types/menu';

// This will be replaced with actual API calls later
const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Tacos al Pastor',
    nameEs: 'Tacos al Pastor',
    description: 'Marinated pork tacos with pineapple and onions',
    descriptionEs: 'Tacos de cerdo marinado con piña y cebolla',
    price: 12.99,
    category: 'mainCourse',
    image: '/images/tacos-al-pastor.jpg',
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
    description: 'Fresh avocado dip with tomatoes, onions, and lime',
    descriptionEs: 'Dip de aguacate fresco con tomates, cebolla y limón',
    price: 8.99,
    category: 'appetizer',
    image: '/images/guacamole.jpg',
    spiceLevel: 1,
    isVegetarian: true,
    isAvailable: true,
    isPopular: true,
    orderCount: 200,
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