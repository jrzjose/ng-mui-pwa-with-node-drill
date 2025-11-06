import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router'
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterModule, RouterOutlet, MatToolbarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
