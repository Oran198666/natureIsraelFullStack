import { RegionsModel } from "../models/regions-model";
import { SitesModel } from "../models/sites-model";
import { dal } from "../utils/dal";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";
import { OkPacketParams } from "mysql2";


// Logic:
class NatureService {
    public async getAllRegions(): Promise<RegionsModel[]> {
        const sql = "SELECT * FROM regions";
        const regions = await dal.execute(sql) as RegionsModel[];
        return regions;
    }

    public async getSitesByRegion(regionId: number): Promise<SitesModel[]> {
        const sql = `SELECT s.*, r.regionName FROM sites AS s
                 JOIN regions AS r ON s.regionId = r.regionId
                 WHERE s.regionId = ?
                 ORDER BY s.siteName`;
        const sites = await dal.execute(sql, [regionId]) as SitesModel[];
        return sites;
    }

    public async getOneSite(siteId:number):Promise<SitesModel>{
        const sql = "select * from sites where siteId = ?";
        const site = await dal.execute(sql,[siteId]) as SitesModel[];
        if(site.length ===0){
            throw new ClientError(StatusCode.NotFound, `site not found`);
        }
        return site[0];
    }

    public async addSite(site:SitesModel):Promise<SitesModel>{
        site.validate();
        const sql = `INSERT INTO sites (regionId, siteName, siteDescription, entryPrice, childEntryPrice) VALUES (?,?,?,?,?)`;
        const values = [site.regionId, site.siteName, site.siteDescription, site.entryPrice, site.childEntryPrice];
        const info = await dal.execute(sql,values) as OkPacketParams;
        return await this.getOneSite(info.insertId!);
    }

    public async updateSite(siteId:number, site:SitesModel):Promise<SitesModel>{
        const model = new SitesModel(site);
        model.validate();
        const sql = "UPDATE sites SET regionId = ?, siteName = ?, siteDescription = ?, entryPrice = ?, childEntryPrice = ? WHERE siteId = ?";
        const values = [site.regionId, site.siteName, site.siteDescription, site.entryPrice, site.childEntryPrice, siteId];
        await dal.execute(sql,values);
        return await this.getOneSite(siteId);
    }

    public async deleteSite(siteId:number):Promise<void>{
        const sql = "DELETE FROM sites WHERE siteId = ?";
        const info = await dal.execute(sql,[siteId]) as OkPacketParams;
        if(info.affectedRows===0){
            throw new ClientError(StatusCode.NotFound, "site not found");
        }
    }
}

export const natureService = new NatureService();
