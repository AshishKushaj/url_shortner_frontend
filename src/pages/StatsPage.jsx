import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { API_BASE } from "../config";

export default function StatsPage() {

    const { code } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect( () => {

        const fetchStats = async () => {

            try {

                setLoading(true);
                setError("");

                const res = await fetch(`${API_BASE}/api/links/${code}`);

                if (!res.ok) {
                    if (res.status === 404) throw new Error("Code not found");
                    throw new Error("Failed to fetch stats");
                }

                const data = await res.json();
                setData(data);

            } 
            catch (e) {
                setError(e.message || "Something went wrong");
            } 
            finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [code]);

    return (
        <Layout>
            <section className="card">

                <h2>Stats for {code}</h2>

                {loading && <p className="status">Loading...</p>}
                {error && <p className="status error">{error}</p>}

                {data && (
                    <>
                        <p>
                            <strong>Target URL: </strong>
                            <a href={data.url} target="_blank" rel="noreferrer">
                                {data.url}
                            </a>
                        </p>
                        
                        <p>
                            <strong>Total clicks: </strong>
                            { data.viewed.length}
                        </p>


                        <h3>Click history</h3>

                        {data.viewed && data.viewed.length > 0 ? (

                            <ul className="list">

                                {data.viewed
                                    .slice()
                                    .reverse()
                                    .map((ts, i) => (
                                        <li key={i}>{new Date(ts).toLocaleString()}</li>
                                    ))}
                            </ul>
                        ) : (
                            <p>No clicks records yet.</p>
                        )}
                    </>
                )}
            </section>
        </Layout>
    );
}
