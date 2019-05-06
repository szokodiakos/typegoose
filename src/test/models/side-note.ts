import { prop } from '../../prop';

export class SideNote {
  @prop()
  content: string;
  @prop()
  link?: string;
}
