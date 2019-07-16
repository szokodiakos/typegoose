import { buildDiscriminator, prop, Typegoose } from '../../src/typegoose';

export class DisMain extends Typegoose {
    @prop({ required: true })
    public main1: string;
}

export class DisAbove extends DisMain {
    @prop({ required: true })
    public above1: string;
}

export const DisMainModel = new DisMain().getModelForClass(DisMain);
export const DisAboveModel = buildDiscriminator(
    DisMainModel, 'id_hello', new DisAbove().buildSchema(DisAbove), new DisAbove()
);
