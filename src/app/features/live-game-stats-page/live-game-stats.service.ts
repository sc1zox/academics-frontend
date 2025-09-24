import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LiveGameStats} from '../../shared/interfaces/live-game-stats';
import {environment} from '../../../../enviroment/environment';
import {catchError, of, Subscription, switchMap, timer} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LiveGameStatsService {
  private _liveGameStats = signal<LiveGameStats | null>(null);
  public readonly liveGameStats = this._liveGameStats.asReadonly();

  private _isLoading = signal(false);
  public readonly isLoading = this._isLoading.asReadonly();

  private _error = signal<string | null>(null);
  public readonly error = this._error.asReadonly();

  private pollSub?: Subscription;

  constructor(private http: HttpClient) {
  }

  public startPolling(intervalMs = 2000) {
    this.stopPolling();

    this.pollSub = timer(0, intervalMs).pipe(
      switchMap(() =>
        this.http.get<LiveGameStats>(environment.leagueApiUrl).pipe(
          catchError(err => {
            this._error.set('API nicht erreichbar');
            this._liveGameStats.set(null);
            return of(null);
          })
        )
      )
    ).subscribe(data => {
      if (data) {
        this._liveGameStats.set(data);
        this._error.set(null);
      }
    });
  }

  stopPolling() {
    this.pollSub?.unsubscribe();
    this.pollSub = undefined;
  }
}
