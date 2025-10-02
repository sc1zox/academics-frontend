import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Course} from '../../shared/interfaces/course';
import {catchError, EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private _courses = signal<Course[]>([]);
  public readonly courses = computed(() =>
    [...this._courses()].sort((a, b) => a.section.localeCompare(b.section))
  );
  private readonly api = "course";

  public getAllCourses(): void {
    this.http.get<Course[]>(this.api).pipe(
      catchError((err) => {
        console.error("Load failed", err);
        return EMPTY;
      })
    ).subscribe((res) => this._courses.set(res));
  }

  public create(course: Partial<Course>): void {
    this.http.post<Course>(this.api, course).pipe(
      catchError((err) => {
        console.error("Create failed", err);
        return EMPTY;
      })
    ).subscribe((res) => this._courses.update((curr) => [...curr, res]));
  }

  public update(id: string, course: Partial<Course>): void {
    this.http.put<Course>(`${this.api}/${id}`, course).pipe(
      catchError((err) => {
        console.error("Update failed", err);
        return EMPTY;
      })
    ).subscribe((res) =>
      this._courses.update((curr) => curr.map((c) => c._id === id ? res : c))
    );
  }

  public delete(id: string): void {
    this.http.delete(`${this.api}/${id}`).pipe(
      catchError((err) => {
        console.error("Delete failed", err);
        return EMPTY;
      })
    ).subscribe(() =>
      this._courses.update((curr) => curr.filter((c) => c._id !== id))
    );
  }
}
