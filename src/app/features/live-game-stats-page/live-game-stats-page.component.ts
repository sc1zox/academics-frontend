import {Component, OnInit, Signal} from '@angular/core';
import {LiveGameStatsService} from './live-game-stats.service';
import {LiveGameStats} from '../../shared/interfaces/live-game-stats';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-live-game-stats-page',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatList,
    MatListItem,
    MatDivider,
    MatProgressBar,
  ],
  templateUrl: './live-game-stats-page.component.html',
  styleUrl: './live-game-stats-page.component.css'
})
export class LiveGameStatsPageComponent implements OnInit {
  public liveGameStats!: Signal<LiveGameStats | null>;
  public isLoading!: Signal<boolean>;
  public error!: Signal<string | null>;

  constructor(private liveGameStatsService: LiveGameStatsService) {
  }

  ngOnInit() {
    this.liveGameStats = this.liveGameStatsService.liveGameStats;
    this.isLoading = this.liveGameStatsService.isLoading;
    this.error = this.liveGameStatsService.error;
  }

  public click() {
    console.log(this.liveGameStats());
  }

}
