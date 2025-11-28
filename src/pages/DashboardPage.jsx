import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AddLinkForm from "../components/AddLinkForm";
import LinkRow from "../components/LinkRow";
import { API_BASE } from "../config";

export default function DashboardPage() {

    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const fetchLinks = async () => {

        try {

            setLoading(true);
            setError("");

            const res = await fetch(`${API_BASE}/api/links`);

            if (!res.ok) throw new Error("Failed to fetch links");

            const data = await res.json();

            setLinks(data);
        } catch (e) {
            setError(e.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);


    const handleAdd = async ({ url, code }) => {

        try {

            setError("");
            const body = { url };

            if(code) body.code = code;

            const res = await fetch(`${API_BASE}/api/links`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.status === 409)
                throw new Error( "Code already exists");

            if (!res.ok) 
                throw new Error("Failed to create link");

            await fetchLinks();
        } catch (e) {
            setError(e.message || "Failed to create link");
        }
    };

    const handleDelete = async (code) => {
        if (!window.confirm(`Delete link with code "${code}"?`)) return;

        try {
            setError("");
            const res = await fetch(`${API_BASE}/api/links/${code}`, {
                method: "DELETE",
            });
            
            if (!res.ok) 
                throw new Error("Failed to delete link");
            
            setLinks((prev) => prev.filter((l) => l.shortUrl !== code));
            
        } catch (e) {
            setError(e.message || "Failed to delete link");
        }
    };

    const filtered = links.filter((link) => {
        const q = search.toLowerCase();
        return (
            link.shortUrl.toLowerCase().includes(q) ||
            link.url.toLowerCase().includes(q)
        );
    });

    return (
        <Layout>
            <section className="card">
                <h2>Add link</h2>
                <AddLinkForm onSubmit={handleAdd} />
            </section>

            <section className="card">
                <div className="card-header-row">
                    <h2>All links</h2>
                    <input
                        className="input"
                        placeholder="Search by code or URL..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>


                {loading && <p className="status">Loading...</p>}
                {error && <p className="status error">{error}</p>}

                <div className="table-wrapper">
                    <table className="table">

                        <thead>
                            <tr>
                                <th>Short code</th>
                                <th>Target URL</th>
                                <th>Total clicks</th>
                                <th>Last clicked</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filtered.length === 0 && !loading ? (

                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        No links.
                                    </td>
                                </tr>

                            ) : (
                                filtered.map((link) => (
                                    <LinkRow
                                        key={link.shortUrl}
                                        link={link}
                                        onDelete={handleDelete}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </Layout>
    );
}
