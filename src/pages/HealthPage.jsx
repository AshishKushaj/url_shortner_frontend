import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { API_BASE } from "../config";

export default function HealthPage() {
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHealth = async () => {

            try {
                setLoading(true);
                setError("");
            
                const res = await fetch(`${API_BASE}/healthz`);
                if (!res.ok) throw new Error("Failed to fetch health");
            
                const data = await res.json();
            
                setData(data);

            } catch (e) {
                setError(e.message || "Something went wrong");
            } finally {
                setLoading(false);
            }

        };

        fetchHealth();
    }, []);

    return (
        
        <Layout>

            <section className="card">

                <h2>Healthcheck</h2>

                {loading && <p className="status">Loading...</p>}
                {error && <p className="status error">{error}</p>}

                {data && (

                    <div className="health-grid">

                        <div>

                            <span className="label">OK</span>
                            <span>{String(data.ok)}</span>

                        </div>

                        <div>
                            <span className="label">Uptime</span>
                            <span>{data.uptime}</span>
                        </div>
                        
                    </div>
                )}
            </section>
        </Layout>
    );
}
