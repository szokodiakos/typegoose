import { mapProp, Typegoose } from '../../typegoose';
import { SideNote } from './side-note';

enum ProjectValue {
  WORKING = 'working',
  UNDERDEVELOPMENT = 'underdevelopment',
  BROKEN ='broken',
}
class InternetUser extends Typegoose {
  @mapProp({of: String, mapDefault: {}})
  socialNetworks?: Map<string, string>;

  @mapProp({of: SideNote})
  sideNotes?: Map<string, SideNote>;

  @mapProp({of: String, enum: ProjectValue})
  projects: Map<string, ProjectValue>
}

export const model = new InternetUser().getModelForClass(InternetUser);
