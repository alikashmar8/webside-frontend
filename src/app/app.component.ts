import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
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

  constructor(
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingSub = this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
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
}
