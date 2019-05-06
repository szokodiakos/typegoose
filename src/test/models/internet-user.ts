import { mapProp, Typegoose } from '../../typegoose';
import { SideNote } from './side-note';

class InternetUser extends Typegoose {
  @mapProp({of: String, default: {}})
  socialNetworks?: Map<string, string>;

  @mapProp({of: SideNote})
  sideNotes?: Map<string, SideNote>;
}

export const model = new InternetUser().getModelForClass(InternetUser);
