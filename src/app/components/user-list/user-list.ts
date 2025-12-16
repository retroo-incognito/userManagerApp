import { Component, computed, signal } from '@angular/core';
import { UserService, user } from '../../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
})
export class UserListComponent {
  users = computed(() => this.userService.users());
  editingUser = signal<user | null>(null);

  constructor(private userService: UserService) { }

  startEdit(user: user) {
    this.editingUser.set({ ...user });
  }

  cancelEdit() {
    this.editingUser.set(null);
  }

  saveEdit() {
    const user = this.editingUser();
    if (user) {
      if (!user.username || !user.fullName || !user.email) {
        alert('Username, Full Name, and Email are required');
        return;
      }
      this.userService.updateUser(user.id, user);
      this.editingUser.set(null);
      alert('✅ Contact updated!');
    }
  }

  deleteUser(userId: number) {
    if (confirm('Delete this contact?')) {
      this.userService.deleteUser(userId);
    }
  }

  getInitials(fullName: string): string {
    return fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getAvatarColor(id: number): string {
    const colors = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#14B8A6', '#F97316'];
    return colors[id % colors.length];
  }
}