import { Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'id-1234',
      name: 'Test lesson',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
