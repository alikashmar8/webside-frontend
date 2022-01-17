import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading: boolean = true;
  loadingSub: Subscription;
  showMenu: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        loadingService.appLoading(true);
        this.showMenu = false;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        setTimeout(() => {
          this.isLoading = this.loadingService.appLoading(false);
        }, 2000);
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        loadingService.appLoading(false);
        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit(): void {
    this.loadingSub = this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
      this.cdRef.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.isLoading = this.loadingService.appLoading(false);
    }, 0);
  }

  ngOnDestroy() {
    //unsub to avoid leaks
    this.loadingSub.unsubscribe();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
