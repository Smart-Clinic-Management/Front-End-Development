import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-website-layout',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './website-layout.component.html',
  styleUrls: [
    '../../../../assets/website/css/bootstrap.min.css',
    '../../../../assets/website/css/owl.carousel.min.css',
    '../../../../assets/website/css/magnific-popup.css',
    '../../../../assets/website/css/font-awesome.min.css',
    '../../../../assets/website/css/themify-icons.css',
    '../../../../assets/website/css/nice-select.css',
    '../../../../assets/website/css/flaticon.css',
    '../../../../assets/website/css/gijgo.css',
    '../../../../assets/website/css/animate.css',
    '../../../../assets/website/css/slicknav.css',
    '../../../../assets/website/css/style.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class WebsiteLayoutComponent {}
