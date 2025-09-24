import {Component, OnInit, Signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ArenaService} from './arena.service';
import {Augment} from '../../shared/interfaces/augment';
import {AugmentPipe} from '../../shared/pipes/Augment.pipe';

@Component({
  selector: 'app-arena-page',
  imports: [
    MatButton,
    AugmentPipe,
  ],
  templateUrl: './arena-page.component.html',
  styleUrl: './arena-page.component.css'
})
export class ArenaPageComponent implements OnInit {
  public augments!: Signal<Augment[]>;
  public isLoading!: Signal<boolean>;
  public error!: Signal<string | null>;

  constructor(private arenaService: ArenaService) {
  }

  ngOnInit() {
    this.augments = this.arenaService.augments;
    this.isLoading = this.arenaService.isLoading;
    this.error = this.arenaService.error;
  }

  public click() {
    console.log(this.augments());
  }

}
