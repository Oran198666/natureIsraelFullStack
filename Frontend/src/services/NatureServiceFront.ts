import { RegionsModelFront } from "../models/RegionsModelFront";
import { SitesModelFront } from "../models/sites-model-front";
import axios from "axios";
import { appConfig } from "../utils/app-config";


class NatureServiceFront  {

    public async getAllRegions(): Promise<RegionsModelFront[]> {
        const response = await axios.get<RegionsModelFront[]>(appConfig.regionsUrl);
        return response.data;
    }

    public async getSitesByRegion(regionId:number): Promise<SitesModelFront[]> {
        const response = await axios.get<SitesModelFront[]>(appConfig.sitesByRegion + regionId);
        return response.data;
    }

    public async getOneSite(siteId:number): Promise<SitesModelFront> {
        const response = await axios.get<SitesModelFront>(appConfig.getOneSite + siteId);
        return response.data;
    }

    public async addSite(Site:SitesModelFront):Promise<SitesModelFront>{
        const response = await axios.post<SitesModelFront>(appConfig.addSite, Site);
        return response.data;
    }

    public async updateSite(siteId:number,Site:SitesModelFront):Promise<SitesModelFront>{
        const response = await axios.put<SitesModelFront>(appConfig.updateSite + siteId, Site);
        return response.data;
    }

    public async deleteSite(siteId:number):Promise<void>{
        await axios.delete<SitesModelFront>(appConfig.deleteSite + siteId);
    }
}

export const natureServiceFront  = new NatureServiceFront ();
