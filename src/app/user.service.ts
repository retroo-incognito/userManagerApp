import { Injectable, signal, effect } from '@angular/core';


export interface user {
  id: number;

  // Required fields
  username: string;
  fullName: string;
  email: string;

  // Optional fields
  phone?: string;
  address?: string;
  company?: string;
  jobTitle?: string;
  dateOfBirth?: string;
  avatar?: string;
  notes?: string;
}
@Injectable({ providedIn: 'root' })

export class UserService {
  private readonly STORAGE_KEY = 'users';

  users = signal<any[]>(this.loadUsersFromStorage());

  constructor() {
    effect(() => {
      console.log('Saving users:', this.users()); // Debug
      this.saveUsersToStorage(this.users());
    });
  }

  private loadUsersFromStorage(): any[] {
    try {
      const storedUsers = localStorage.getItem(this.STORAGE_KEY);
      console.log('Loaded users:', storedUsers); // Debug
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
      return [];
    }
  }

  private saveUsersToStorage(users: any[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }


  addUser(newUser: Omit<user, 'id'>) {
    const userWithId: user = {
      ...newUser,
      id: Date.now()
    };
    this.users.update(list => [...list, userWithId]);
  }

  updateUser(userId: number, updatedUser: user) {
    this.users.update(list =>
      list.map(user => (user.id === userId ? { ...user, ...updatedUser } : user))
    );
  }
  deleteUser(userId: any) {
    this.users.update(list => list.filter(user => user.id !== userId));
  }

  clearAllUsers() {
    this.users.set([]);
  }
}