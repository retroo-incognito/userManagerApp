import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-add',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-add.html',
})
export class UserAddComponent {
  // UI State
  showOptional = false;

  username = '';
  fullName = '';
  email = '';

  // Optional fields
  phone = '';
  address = '';
  company = '';
  jobTitle = '';
  dateOfBirth = '';
  notes = '';

  constructor(private userService: UserService) { }

  toggleOptional() {
    this.showOptional = !this.showOptional;
  }

  addUser() {
    if (!this.username || !this.fullName || !this.email) {
      alert('Please fill in Username, Full Name, and Email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Please enter a valid email');
      return;
    }

    this.userService.addUser({
      username: this.username,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone || undefined,
      address: this.address || undefined,
      company: this.company || undefined,
      jobTitle: this.jobTitle || undefined,
      dateOfBirth: this.dateOfBirth || undefined,
      notes: this.notes || undefined,
    });

    this.clearForm();
    alert('✅ Contact added successfully!');
  }

  clearForm() {
    this.username = '';
    this.fullName = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.company = '';
    this.jobTitle = '';
    this.dateOfBirth = '';
    this.notes = '';
    this.showOptional = false;
  }
}