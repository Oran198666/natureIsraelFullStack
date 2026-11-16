class AppConfig {
	public readonly baseUrl = import.meta.env.VITE_API_URL;
    public readonly regionsUrl = this.baseUrl + "getAllRegions";
    public readonly sitesByRegion = this.baseUrl + "getSitesByRegion/";
    public readonly getOneSite = this.baseUrl + "getOneSite/";
    public readonly addSite = this.baseUrl + "addSite";
    public readonly updateSite = this.baseUrl + "updateSite/";
    public readonly deleteSite  = this.baseUrl + "deleteSite/"
    public readonly recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
}

export const appConfig = new AppConfig();
