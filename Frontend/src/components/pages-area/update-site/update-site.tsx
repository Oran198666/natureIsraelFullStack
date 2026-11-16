import "./update-site.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../utils/notify";
import { SitesModelFront } from "../../../models/sites-model-front";
import { RegionsModelFront } from "../../../models/RegionsModelFront";
import { natureServiceFront } from "../../../services/NatureServiceFront";



export function UpdateSite() {
    const { register, handleSubmit, reset } = useForm<SitesModelFront>();
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [regions, setRegions] = useState<RegionsModelFront[]>([]);


    useEffect(() => {
        natureServiceFront.getAllRegions()
            .then(r => setRegions(r))
            .catch(err => notify.error(err));

        natureServiceFront.getOneSite(+params.siteId!)
            .then(s => reset(s))
            .catch(err => notify.error(err));
    }, []);


    async function send(site: SitesModelFront) {
        setLoading(true);
        try {
            await natureServiceFront.updateSite(+params.siteId!, site)
            notify.success("site updated");
            navigate("/siteList");
        } catch (err: any) {
            notify.error(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="UpdateSite">
            <form onSubmit={handleSubmit(send)}>
                <label>Site Name</label>
                <input type="text" {...register("siteName")} required minLength={2} maxLength={100} />

                <label>Region Select</label>
                <select {...register("regionId", { valueAsNumber: true })} required>
                    <option value="">Select Region</option>
                    {regions.map(r => (
                        <option key={r.regionId} value={r.regionId}>{r.regionName}</option>
                    ))}
                </select>

                <label>Site Description</label>
                <input type="text" {...register("siteDescription")} required minLength={2} maxLength={2000} />

                <label>Entry Price</label>
                <input type="number" step="0.01" {...register("entryPrice", { valueAsNumber: true })} required min={0} max={10000} />

                <label>Child Entry Price</label>
                <input type="number" step="0.01" {...register("childEntryPrice", { valueAsNumber: true })} required min={0} max={10000} />
                <button disabled={loading}>update Site</button>
            </form>
        </div>
    );
}
