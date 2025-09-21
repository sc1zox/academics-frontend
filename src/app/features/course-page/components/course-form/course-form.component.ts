import {Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {CourseFormControls, CourseMapper} from '../../../../shared/mapper/course-mapper';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, filter, map,} from 'rxjs';
import {Course} from '../../../../shared/interfaces/course';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';

@Component({
  selector: 'app-course-form',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatIcon,
    MatMiniFabButton,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnChanges, OnInit {
  @Input({required: true}) course!: Course;
  @Output() submitted = new EventEmitter<Course>();
  @Output() deleted = new EventEmitter<string>();
  public courseForm = new FormGroup<CourseFormControls>({
    _id: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    grade: new FormControl(0, Validators.required),
    section: new FormControl('', Validators.required),
    ects: new FormControl(0, Validators.required),
  });

  constructor(private destroyRef: DestroyRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['course'] && changes['course'].currentValue) {
      this.patchForm();
    }
  }

  public ngOnInit() {
    this.courseForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => CourseMapper.courseFormToCourse(this.courseForm)),
        debounceTime(2000),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        filter(() => this.courseForm.valid)
      )
      .subscribe((course) => {
        console.log(course);
        this.submitted.emit(course);
      })
  }

  public deleteCourse(): void {
    this.deleted.emit(this.course._id);
  }

  private patchForm(): void {
    this.courseForm.patchValue({
      _id: this.course._id,
      code: this.course.code,
      name: this.course.name,
      grade: this.course.grade,
      section: this.course.section,
      ects: this.course.ects
    }, {emitEvent: false});
  }
}
