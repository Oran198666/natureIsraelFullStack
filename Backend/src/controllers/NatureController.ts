import express, { Request, Response, Router } from "express";
import { natureService } from "../services/nature-service";
import { SitesModel } from "../models/sites-model";
import { StatusCode } from "../models/enums";

// Contains routes, without logic.
class NatureController {

    // Create a router object which can listen on routes:
    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {
        this.router.get("/api/getAllRegions", this.getAllRegions);
        this.router.get("/api/getSitesByRegion/:regionId", this.getSitesByRegion);
        this.router.get("/api/getOneSite/:siteId", this.getOneSite)
        this.router.post("/api/addSite/", this.addSite);
        this.router.put("/api/updateSite/:siteId", this.updateSite);
        this.router.delete("/api/deleteSite/:siteId", this.deleteSite);
    }

    private async getAllRegions(request: Request, response: Response): Promise<void> {
        const regions = await natureService.getAllRegions();
        response.json(regions);
    }

    private async getSitesByRegion(request: Request, response: Response): Promise<void> {
        const regionId = +request.params.regionId;
        const sites = await natureService.getSitesByRegion(regionId);
        response.json(sites);
    }

    private async getOneSite(request: Request, response: Response): Promise<void> {
        const siteId = +request.params.siteId;
        const site = await natureService.getOneSite(siteId);
        response.json(site);
    }

    private async addSite(request: Request, response: Response): Promise<void> {
        const site = new SitesModel(request.body);
        const dbSite = await natureService.addSite(site);
        response.status(StatusCode.Created).json(dbSite);
    }

    private async updateSite(request: Request, response: Response): Promise<void> {
        const siteId = +request.params.siteId;
        const site = new SitesModel(request.body);
        const dbSite = await natureService.updateSite(siteId, site);
        response.status(StatusCode.OK).json(dbSite);
    }

    private async deleteSite(request: Request, response: Response): Promise<void> {
        const siteId = +request.params.siteId;
        await natureService.deleteSite(siteId);
        response.status(StatusCode.NoContent).send();
    }
}

export const natureController = new NatureController();