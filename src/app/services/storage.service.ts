import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    if (!data) {
      return []; // Return an empty array if no data found
    }
  
    try {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        return parsedData.flat(); // Flatten the array if it's an array of arrays
      }
    } catch (error) {
      console.error('Error parsing data from localStorage:', error);
    }
  
    return []; // Return an empty array if parsing fails or data is not an array
  }

  addItem<T>(key: string, item: T): void {
    const items = this.getItem<T>(key);
    items.push(item);
    this.setItem(key, items);
  }

  updateItem<T extends { id: number }>(key: string, item: T): void {
    const items = this.getItem<T>(key);
    const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      items[index] = item;
      this.setItem(key, items);
    }
  }

  deleteItem<T extends { id: number }>(key: string, id: number): void {
    const items = this.getItem<T>(key);
    const filtered = items.filter(item => item.id !== id);
    this.setItem(key, filtered);
  }
}