import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";

// Data Schema:
const SitesSchema = z.object({
    siteId: z.number().int().positive().optional(),
    siteName: z.string().min(2).max(100),
    siteDescription: z.string().min(2).max(2000),
    regionId: z.number().int().positive(),
    entryPrice: z.number().min(0),
    childEntryPrice:z.number().min(0)
});

// Data Interface (I = Interface):
type ISitesModel = z.infer<typeof SitesSchema>;

// Data Model:
export class SitesModel implements ISitesModel {

    public siteId?: number;
    public siteName:string;
    public siteDescription:string;
    public regionId:number;
    public entryPrice:number;
    public childEntryPrice:number;


    public constructor(Site: SitesModel) { // Copy Constructor
        this.siteId = Site.siteId;
        this.siteName = Site.siteName;
        this.siteDescription = Site.siteDescription;
        this.regionId = Site.regionId;
        this.entryPrice = Site.entryPrice;
        this.childEntryPrice = Site.childEntryPrice;
    }

    public validate(): void {
        const result = SitesSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].path + ": " + result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }
}