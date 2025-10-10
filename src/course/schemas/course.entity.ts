
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true , unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  level: string;

}

export const CourseSchema = SchemaFactory.createForClass(Course);

