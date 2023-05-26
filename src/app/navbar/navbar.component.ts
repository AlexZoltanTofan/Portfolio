import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  mobileMenu: boolean = false;

  selectedTab: string = '';

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  toggleMobileMenu(): void {
    this.mobileMenu = !this.mobileMenu;
  }
}
