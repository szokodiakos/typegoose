import { arrayProp, Typegoose } from '../../src/typegoose';

export class ArrayValidators extends Typegoose {
  // @ts-ignore
  @arrayProp({ items: String, maxlength: 3 })
  public maxLength: string[];

  // @ts-ignore
  @arrayProp({ items: String, minlength: 10 })
  public minLength: string[];

  // @ts-ignore
  @arrayProp({ items: String, trim: true })
  public trimmed: string[];

  // @ts-ignore
  @arrayProp({ items: String, uppercase: true })
  public uppercased: string[];

  // @ts-ignore
  @arrayProp({ items: String, lowercase: true })
  public lowercased: string[];

  @arrayProp({ items: String, enum: ['one', 'two', 'three'] })
  public enumed: string[];

  // @ts-ignore
  @arrayProp({ items: String, default: ['hello'], lowercase: true })
  public defaulted: string[];
}

export const model = new ArrayValidators().getModelForClass(ArrayValidators);
