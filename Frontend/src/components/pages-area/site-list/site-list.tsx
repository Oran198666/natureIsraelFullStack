import React, { useEffect, useState } from "react";
import "./site-list.css";
import { notify } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";
import { SitesModelFront } from "../../../models/sites-model-front";
import { RegionsModelFront } from "../../../models/RegionsModelFront";
import { Spinner } from "../../shared-area/spinner/spinner";
import { natureServiceFront } from "../../../services/NatureServiceFront";

export function SiteList() {
    const [sites, setSites] = useState<SitesModelFront[]>([]);
    const [regions, setRegions] = useState<RegionsModelFront[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        natureServiceFront.getAllRegions()
            .then(r => setRegions(r))
            .catch(err => notify.error(err))
    }, [])

    async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setLoading(true);
        try {
            const sites = await natureServiceFront.getSitesByRegion(+e.target.value)
            setSites(sites)
        } catch (err: any) {
            notify.error(err);
        } finally {
            setLoading(false)
        }
    }

    async function remove(siteId: number) {
        setLoading(true);
        try {
            await natureServiceFront.deleteSite(siteId);
            setSites(sites.filter(s => s.siteId !== siteId));

        } catch (err: any) {
            notify.error(err);
        } finally {
            setLoading(false)
        }
    };

    function update(siteId: number) {
        navigate("/UpdateSite/" + siteId);
    }

    return (
        <div className="SiteList">
            <select onChange={handleChange}>
                <option value="">Select region</option>
                {regions.map(r => (
                    <option key={r.regionId} value={r.regionId}>{r.regionName}</option>
                ))}
            </select>
            {loading && <Spinner />}
            <table>
                <thead>
                    <tr>
                        <th>Site Name</th>
                        <th>Site Description</th>
                        <th>Region Name</th>
                        <th>Entry Price</th>
                        <th>Child Entry Price</th>
                        <th>User Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map(s => (
                        <tr key={s.siteId}>
                            <td>{s.siteName}</td>
                            <td>{s.siteDescription}</td>
                            <td>{s.regionName}</td>
                            <td>{s.entryPrice}</td>
                            <td>{s.childEntryPrice}</td>
                            <td>
                                <button onClick={() => remove(s.siteId!)}>Delete</button>
                                {" | "}
                                <button onClick={() => update(s.siteId!)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
