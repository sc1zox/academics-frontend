import {ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, output, signal,} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {CourseFormControls, CourseMapper} from '../../../../shared/mapper/course-mapper';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs';
import {Course} from '../../../../shared/interfaces/course';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {SectionEnum} from '../../../../shared/interfaces/section.enum';

@Component({
  selector: 'app-course-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatIcon,
    MatMiniFabButton,
    MatSelect,
    MatOption,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent {
  private destroyRef = inject(DestroyRef);

  public course = input.required<Course>();

  public submitted = output<Course>();
  public deleted = output<string>();

  protected readonly sectionOptions = signal<SectionEnum[]>(Object.values(SectionEnum));

  protected readonly courseForm = new FormGroup<CourseFormControls>({
    _id: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    code: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    grade: new FormControl(0, {nonNullable: true, validators: [Validators.required]}),
    section: new FormControl<SectionEnum | null>(null, {validators: [Validators.required]}),
    ects: new FormControl(0, {nonNullable: true, validators: [Validators.required]}),
  });

  constructor() {
    effect(() => {
      this.patchForm(this.course());
    });

    this.courseForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => CourseMapper.courseFormToCourse(this.courseForm)),
        debounceTime(1000),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        filter(() => this.courseForm.valid)
      )
      .subscribe((course) => {
        console.log(course);
        this.submitted.emit(course);
      });
  }

  protected deleteCourse(): void {
    this.deleted.emit(this.course()._id);
  }

  private patchForm(course: Course): void {
    this.courseForm.patchValue({
      _id: course._id,
      code: course.code,
      name: course.name,
      grade: course.grade,
      section: course.section as SectionEnum,
      ects: course.ects
    }, {emitEvent: false});
  }
}
