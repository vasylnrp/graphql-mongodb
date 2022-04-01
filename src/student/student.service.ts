import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async createStudent(studentInput: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create({
      ...studentInput,
      id: uuid(),
    });
    await this.studentRepository.save(student);
    return student;
  }

  // TODO getStudent and students
}
