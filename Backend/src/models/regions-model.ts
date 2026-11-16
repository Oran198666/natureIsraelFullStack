import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";

// Data Schema:
const RegionsSchema = z.object({
    regionId: z.number().int().positive().optional(),
    regionName: z.string().min(2).max(100),

});

// Data Interface (I = Interface):
type IRegionsModel = z.infer<typeof RegionsSchema>;

// Data Model:
export class RegionsModel implements IRegionsModel {

    public regionId?: number;
    public regionName:string;


    public constructor(Region: RegionsModel) { // Copy Constructor
        this.regionId = Region.regionId;
        this.regionName = Region.regionName;
    }

    public validate(): void {
        const result = RegionsSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].path + ": " + result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }
}