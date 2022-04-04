import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      ...createLessonInput,
      id: uuid(),
      students: [],
    });
    await this.lessonRepository.save(lesson);
    return lesson;
  }

  async lessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ id });
    if (!lesson) throw new NotFoundException();
    return lesson;
  }

  async assignStudentsToLesson(
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    console.log(lessonId, studentIds);

    const lesson = await this.getLesson(lessonId);
    lesson.students = {
      ...lesson.students,
      ...studentIds,
    };
    await this.lessonRepository.save(lesson);
    return lesson;
  }
}
