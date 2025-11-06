import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from "@angular/service-worker";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('ng-t');

  constructor(private snackBar: MatSnackBar, private swUpdate: SwUpdate) { }

  updateNetworkStatus() {
    if (navigator.onLine) {
      (document.querySelector("body") as any).style = "";
    } 
    else {
      (document.querySelector("body") as any).style = "filter: grayscale(25)";
    }
  }

  appUpdateCheck() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      this.swUpdate.versionUpdates.subscribe(update => {
        if (update.type == "VERSION_READY") {
          const sb = this.snackBar.open("There is an new version available.", "Install now", { duration: 60000 });
          sb.onAction().subscribe(() => {
            // save data before reloading
            location.reload();
          })
        }
      })
    }
  }

  browserAppInstallCheck() {
    if (window.matchMedia('(display-mode: browser').matches) {
      // We are in the browser
      if ('standalone' in navigator) {
        // only available in Safari
        this.snackBar.open("You can install this app, use Share > Add to Home Screen",
          "", { duration: 3000 })
      } 
      else {
        // not Safari
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sb = this.snackBar.open("You can install this app", "Install", { duration: 5000 });
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then((result: any) => {
              console.log(result.outcome == "dismissed")
              console.log(result.outcome)
            })
          });
        })
      }
    }
  }

  ngOnInit() {
    window.addEventListener("online", this.updateNetworkStatus);
    window.addEventListener("offline", this.updateNetworkStatus);
    this.appUpdateCheck();
    this.browserAppInstallCheck();
  }
}
