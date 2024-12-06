import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  name: string;

  @Prop({ minlength: 6 })
  password: string;

  @Prop()
  phone_num: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  address: string;
  @Prop()
  gender: string;

  @Prop()
  dob: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
});
