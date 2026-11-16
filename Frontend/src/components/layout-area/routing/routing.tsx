import { Navigate, Route, Routes } from "react-router-dom";
import { AddSite } from "../../pages-area/add-site/add-site";
import { SiteList } from "../../pages-area/site-list/site-list";
import { Home } from "../../pages-area/home/home";
import { Page404 } from "../../pages-area/page404/page404";
import { UpdateSite } from "../../pages-area/update-site/update-site";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/home" element={<Home />} />

            <Route path="/siteList" element={<SiteList />} />

            <Route path="/addSite" element={<AddSite />} />

            <Route path="/UpdateSite/:siteId" element={<UpdateSite  />} />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
