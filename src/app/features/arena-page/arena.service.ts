import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Augment} from '../../shared/interfaces/augment';

@Injectable({providedIn: 'root'})
export class ArenaService {
  private _augments = signal<Augment[]>([]);
  public readonly augments = this._augments.asReadonly();

  private _isLoading = signal(false);
  public readonly isLoading = this._isLoading.asReadonly();

  private _error = signal<string | null>(null);
  public readonly error = this._error.asReadonly();

  private api = 'augment';

  constructor(private http: HttpClient) {
  }

  public getAllAugments(): void {
    this.http.get<Augment[]>(this.api).subscribe({
      next: (res) => this._augments.set(res),
      error: (err) => console.error("Load failed", err)
    });
  }
}
