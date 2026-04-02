"use client";

import { useState } from "react";

export default function HomePage() {
    const [repoUrl, setRepoUrl] = useState("https://github.com/vercel/next.js");
    const [ref, setRef] = useState("canary");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<unknown>(null);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/repos/ingest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    repoUrl,
                    ...(ref.trim() ? { ref: ref.trim() } : {})
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error?.message ?? "Request failed.");
            }

            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
            <h1>Quescade Stage 2</h1>

            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
                <label>
                    Repo URL
                    <input
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
                    />
                </label>

                <label>
                    Ref (optional)
                    <input
                        value={ref}
                        onChange={(e) => setRef(e.target.value)}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
                    />
                </label>

                <button type="submit" disabled={loading} style={{ width: 180, padding: 10 }}>
                    {loading ? "Submitting..." : "Ingest repo"}
                </button>
            </form>

            {error ? (
                <pre style={{ marginTop: 24, color: "crimson", whiteSpace: "pre-wrap" }}>{error}</pre>
            ) : null}

            {result ? (
                <pre style={{ marginTop: 24, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
            ) : null}
        </main>
    );
}