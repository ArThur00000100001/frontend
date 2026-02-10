import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout-pages',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-pages.html',
  styleUrl: './layout-pages.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPagesComponent {
  // Signal para controlar el estado del menú lateral
  isSidebarOpen = signal(true);

  // Método simple para alternar el menú (el usuario puede cambiar esto)
  toggleSidebar() {
    this.isSidebarOpen.update((state) => !state);
  }
}
