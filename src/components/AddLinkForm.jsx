import { useState } from "react";

export default function AddLinkForm({ onSubmit }) {

    const [url, setUrl] = useState("");
    const [code, setCode] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [localError, setLocalError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLocalError("");

        if (!url.trim()) {
            setLocalError("URL is required");
            return;
        }

        try {
            setSubmitting(true);

            await onSubmit({ url: url.trim(), code: code.trim() || undefined });
            
            setUrl("");
            setCode("");
        } finally {
            setSubmitting(false);
        }
    };

    return (

        <form className="form-grid" onSubmit={handleSubmit}>

            <div className="form-field">

                <label>Target URL *</label>
                <input
                    className="input"
                    type="url"
                    value={url}
                    placeholder="https://example.com"
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />

            </div>

            <div className="form-field">

                <label>Custom code (optional)</label>

                <input
                    className="input"
                    type="text"
                    value={code}
                    placeholder="A-Z a-z 0-9"
                    minLength={6}
                    maxLength={8}
                    onChange={(e) => setCode(e.target.value)}
                />

            </div>
            <div className="form-actions">
                <button className="btn" type="submit" disabled={submitting}>
                    {submitting ? "Adding..." : "Add"}
                </button>
                {localError && <p className="status error">{localError}</p>}
            </div>
        </form>
    );
}
