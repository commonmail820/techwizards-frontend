import React, { createContext, useContext, useEffect, useState } from 'react';
import type { MenuItem, MenuState, MenuCategory } from '../types/menu';
import { MenuService } from '../services/menuService';

interface MenuContextType extends MenuState {
  loadItems: () => Promise<void>;
  getItemsByCategory: (category: MenuCategory) => Promise<MenuItem[]>;
  addItem: (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<MenuItem>;
  updateItem: (id: number, updates: Partial<MenuItem>) => Promise<MenuItem | null>;
  deleteItem: (id: number) => Promise<boolean>;
  toggleAvailability: (id: number) => Promise<MenuItem | null>;
  updatePrice: (id: number, newPrice: number) => Promise<MenuItem | null>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MenuState>({
    items: [],
    loading: true,
    error: null,
  });

  const menuService = MenuService.getInstance();

  const loadItems = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const items = await menuService.getAllItems();
      setState(prev => ({ ...prev, items, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load menu items',
      }));
    }
  };

  const getItemsByCategory = async (category: MenuCategory) => {
    return menuService.getItemsByCategory(category);
  };

  const addItem = async (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem = await menuService.addItem(item);
    setState(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
    return newItem;
  };

  const updateItem = async (id: number, updates: Partial<MenuItem>) => {
    const updatedItem = await menuService.updateItem(id, updates);
    if (updatedItem) {
      setState(prev => ({
        ...prev,
        items: prev.items.map(item => (item.id === id ? updatedItem : item)),
      }));
    }
    return updatedItem;
  };

  const deleteItem = async (id: number) => {
    const success = await menuService.deleteItem(id);
    if (success) {
      setState(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id),
      }));
    }
    return success;
  };

  const toggleAvailability = async (id: number) => {
    const updatedItem = await menuService.toggleAvailability(id);
    if (updatedItem) {
      setState(prev => ({
        ...prev,
        items: prev.items.map(item => (item.id === id ? updatedItem : item)),
      }));
    }
    return updatedItem;
  };

  const updatePrice = async (id: number, newPrice: number) => {
    const updatedItem = await menuService.updatePrice(id, newPrice);
    if (updatedItem) {
      setState(prev => ({
        ...prev,
        items: prev.items.map(item => (item.id === id ? updatedItem : item)),
      }));
    }
    return updatedItem;
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        ...state,
        loadItems,
        getItemsByCategory,
        addItem,
        updateItem,
        deleteItem,
        toggleAvailability,
        updatePrice,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}; 