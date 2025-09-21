import {effect, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Course} from '../../shared/interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public courses = signal<Course[]>([]);
  private api = "course";

  constructor(private http: HttpClient) {
    effect(() => {
      const sorted = [...this.courses()].sort((a, b) => a.section.localeCompare(b.section));

      if (sorted.some((c, i) => c._id !== this.courses()[i]?._id)) {
        this.courses.set(sorted);
      }
    });

  }

  public getAllCourses(): void {
    this.http.get<Course[]>(this.api).subscribe({
      next: (res) => this.courses.set(res),
      error: (err) => console.error("Load failed", err)
    });
  }

  public create(course: Partial<Course>): void {
    this.http.post<Course>(this.api, course).subscribe({
      next: (res) => this.courses.update((curr) => [...curr, res]),
      error: (err) => console.error("Create failed", err)
    });
  }

  public update(id: string, course: Partial<Course>): void {
    this.http.put<Course>(`${this.api}/${id}`, course).subscribe({
      next: (res) =>
        this.courses.update((curr) => curr.map((c) => c._id === id ? res : c)),
      error: (err) => console.error("Update failed", err)
    });
  }

  public delete(id: string): void {
    this.http.delete(`${this.api}/${id}`).subscribe({
      next: () =>
        this.courses.update((curr) => curr.filter((c) => c._id !== id)),
      error: (err) => console.error("Delete failed", err)
    });
  }
}
