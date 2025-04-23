import { Component, ViewEncapsulation } from '@angular/core';
import { TopHeaderComponent } from "../../shared/top-header/top-header.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [TopHeaderComponent, SidebarComponent, RouterOutlet, FooterComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['../../../../assets/dashboard/css/style.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardLayoutComponent {}