export interface MenuItem {
  id: number;
  name: string;
  nameEs: string; // Spanish name
  description: string;
  descriptionEs: string; // Spanish description
  price: number;
  category: MenuCategory;
  image: string;
  spiceLevel: number; // 0: Not spicy, 1-3: Mild to Hot
  isVegetarian: boolean;
  isAvailable: boolean;
  isPopular: boolean;
  orderCount?: number; // For tracking popularity
  createdAt: string;
  updatedAt: string;
}

export type MenuCategory = 'appetizer' | 'mainCourse' | 'dessert' | 'beverage';

export interface MenuItemUpdate {
  name?: string;
  nameEs?: string;
  description?: string;
  descriptionEs?: string;
  price?: number;
  category?: MenuCategory;
  image?: string;
  spiceLevel?: number;
  isVegetarian?: boolean;
  isAvailable?: boolean;
  isPopular?: boolean;
}

export interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
} 