import { Component, computed } from '@angular/core';
import { UserService } from '../../user.service';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
})
export class UserListComponent {
  users = computed(() => this.userService.users());

  constructor(private userService: UserService) { }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.userService.deleteUser(userId);
    }
  }
  getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getAvatarColor(id: number): string {
    const colors = [
      '#8B5CF6', '#EC4899', '#10B981', '#F59E0B',
      '#3B82F6', '#EF4444', '#14B8A6', '#F97316'
    ];
    return colors[id % colors.length];
  }
}
