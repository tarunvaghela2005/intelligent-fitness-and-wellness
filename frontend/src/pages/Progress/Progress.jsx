import { useState, useEffect } from "react";
import { getProgressRecords, logProgressRecord } from "../../services/fitnessService";
import { getProgressAnalysis } from "../../services/aiService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Loader from "../../components/ui/Loader";

function Progress() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weight, setWeight] = useState("");
    const [bodyFat, setBodyFat] = useState("");
    const [notes, setNotes] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchProgress = async () => {
        try {
            setLoading(true);
            const data = await getProgressRecords();
            setRecords(data);
            if (data.length >= 2) {
                fetchAiAnalysis(data[0].weightKg, data[data.length - 1].weightKg);
            }
        } catch (e) {
            console.error("Error loading progress:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchAiAnalysis = async (startW, currentW) => {
        try {
            setAiLoading(true);
            const analysis = await getProgressAnalysis({
                startWeight: startW || 75.0,
                currentWeight: currentW || 72.0,
            });
            setAiAnalysis(analysis);
        } catch (e) {
            console.error("Error fetching AI progress analysis:", e);
        } finally {
            setAiLoading(false);
        }
    };

    useEffect(() => {
        fetchProgress();
    }, []);

    const handleLogProgress = async (e) => {
        e.preventDefault();
        if (!weight) return;

        try {
            setSubmitting(true);
            setError("");
            setMessage("");

            await logProgressRecord({
                weightKg: Number(weight),
                bodyFatPercentage: bodyFat ? Number(bodyFat) : null,
                notes: notes,
            });

            setMessage("Progress entry logged successfully!");
            setWeight("");
            setBodyFat("");
            setNotes("");
            await fetchProgress();
        } catch (err) {
            console.error("Error logging progress:", err);
            setError("Failed to record progress entry.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <p className="text-sm font-medium text-[var(--color-brand)]">Tracking & Analytics</p>
                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    Progress Tracker
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    Record your body weight, metrics, and view AI-powered transformation insights.
                </p>
            </div>

            {/* AI Progress Insight Banner */}
            <Card>
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                        🤖
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">AI Coach Progress Evaluation</h2>
                            <button
                                onClick={() => fetchAiAnalysis(records[0]?.weightKg, records[records.length - 1]?.weightKg)}
                                disabled={aiLoading}
                                className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                            >
                                {aiLoading ? "Analyzing..." : "🔄 Refresh Analysis"}
                            </button>
                        </div>
                        <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-700 bg-purple-50/50 p-4 rounded-xl border border-purple-100">
                            {aiAnalysis || "Log your weight entries to generate customized AI progress milestones and recommendations."}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Log Progress & History */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <Card>
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Log Today's Weight</h2>
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Track continuous weekly progress</p>

                        <form onSubmit={handleLogProgress} className="mt-5 space-y-4">
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Weight (kg)*</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="30"
                                    max="300"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="e.g. 74.2"
                                    className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Body Fat % (Optional)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="3"
                                    max="60"
                                    value={bodyFat}
                                    onChange={(e) => setBodyFat(e.target.value)}
                                    placeholder="e.g. 15.5"
                                    className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Notes (Optional)</label>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="e.g. Post-workout weigh-in"
                                    className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                                />
                            </div>

                            <Button type="submit" loading={submitting} className="w-full">
                                Save Progress Record
                            </Button>
                        </form>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Progress History</h2>
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                                {records.length} logs
                            </span>
                        </div>

                        {records.length === 0 ? (
                            <div className="mt-8 py-10 text-center text-gray-400">
                                <span className="text-4xl">📈</span>
                                <p className="mt-2 text-sm">No progress recorded yet. Log your weight above!</p>
                            </div>
                        ) : (
                            <div className="mt-5 space-y-3">
                                {records.map((r, idx) => (
                                    <div
                                        key={r.id || idx}
                                        className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-900">{r.weightKg} kg</p>
                                            <p className="text-xs text-gray-500">{r.date} {r.notes ? `• ${r.notes}` : ""}</p>
                                        </div>
                                        {r.bodyFatPercentage && (
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-purple-600">{r.bodyFatPercentage}% Body Fat</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Progress;