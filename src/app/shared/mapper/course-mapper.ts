import {FormControl, FormGroup} from '@angular/forms';
import {Course} from '../interfaces/course';

export type CourseFormControls = {
  [K in keyof Course]: FormControl<Course[K] | null>;
};

export class CourseMapper {
  public static courseFormToCourse(formGroup: FormGroup<CourseFormControls>): Course {
    console.log("FORM", formGroup);
    return {
      _id: formGroup.controls._id?.value!,
      name: formGroup.controls.name.value!,
      code: formGroup.controls.code.value!,
      ects: formGroup.controls.ects.value!,
      grade: formGroup.controls.grade.value!,
      section: formGroup.controls.section.value!,
    };
  }
}
