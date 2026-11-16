import "./add-site.css";
import { Spinner } from "../../shared-area/spinner/spinner";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/notify";
import { RegionsModelFront } from "../../../models/RegionsModelFront";
import { natureServiceFront } from "../../../services/NatureServiceFront";
import { SitesModelFront } from "../../../models/sites-model-front";

export function AddSite() {
    const { register, handleSubmit } = useForm<SitesModelFront>();
    const [region, setRegion] = useState<RegionsModelFront[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        natureServiceFront.getAllRegions()
            .then(r => setRegion(r))
            .catch(err => notify.error(err))
    }, []);

    async function send(site: SitesModelFront) {
        setLoading(true);
        try {
            await natureServiceFront.addSite(site);
            notify.success("Site has been added")
            navigate("/siteList")
        } catch (err: any) {
            notify.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="AddSite">
            {loading && <Spinner />}
            <form onSubmit={handleSubmit(send)}>
                <label>Site Name</label>
                <input type="text" {...register("siteName")} required minLength={2} maxLength={100} />

                <label>Region Select</label>
                <select {...register("regionId", { valueAsNumber: true })} required>
                    <option value="">Select Region</option>
                    {region.map(r => (
                        <option key={r.regionId} value={r.regionId}>{r.regionName}</option>
                    ))}
                </select>

                <label>Site Description</label>
                <input type="text" {...register("siteDescription")} required minLength={2} maxLength={2000} />

                <label>Entry Price</label>
                <input type="number" step="0.01" {...register("entryPrice", { valueAsNumber: true })} required min={0} max={10000} />

                <label>Child Entry Price</label>
                <input type="number" step="0.01" {...register("childEntryPrice", { valueAsNumber: true })} required min={0} max={10000} />

                <button disabled={loading}>Add Site</button>
            </form>
        </div>
    );
}