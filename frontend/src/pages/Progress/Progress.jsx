import { useState, useEffect, useCallback } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    Legend,
} from "recharts";
import { getProgressRecords, logProgressRecord } from "../../services/fitnessService";
import { getProgressAnalysis } from "../../services/aiService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

// ==========================================
// HELPERS
// ==========================================

function formatDate(dateStr) {
    if (!dateStr) return "—";
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    } catch {
        return dateStr;
    }
}

function computeChange(records, field) {
    if (!records || records.length < 2) return null;
    const first = records[0]?.[field];
    const last = records[records.length - 1]?.[field];
    if (first == null || last == null) return null;
    return (last - first).toFixed(1);
}

// ==========================================
// CUSTOM RECHARTS TOOLTIP
// ==========================================

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || payload.length === 0) return null;
    return (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
            <p className="mb-1 text-xs font-semibold text-gray-500">{label}</p>
            {payload.map((entry) => (
                <p key={entry.dataKey} className="text-sm font-bold" style={{ color: entry.color }}>
                    {entry.name}: {entry.value} {entry.unit}
                </p>
            ))}
        </div>
    );
}

// ==========================================
// COMPONENT
// ==========================================

function Progress() {

    // ==========================================
    // STATE
    // ==========================================

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

    // ==========================================
    // DATA LOADING
    // ==========================================

    const fetchAiAnalysis = useCallback(async (startW, currentW) => {
        try {
            setAiLoading(true);
            const analysis = await getProgressAnalysis({
                startWeight: startW || 75.0,
                currentWeight: currentW || 72.0,
            });
            setAiAnalysis(analysis);
        } catch (e) {
            console.error("Error fetching AI analysis:", e);
        } finally {
            setAiLoading(false);
        }
    }, []);

    const fetchProgress = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getProgressRecords();
            const sorted = Array.isArray(data)
                ? [...data].sort(
                      (a, b) =>
                          new Date(a.date || a.createdAt || 0) -
                          new Date(b.date || b.createdAt || 0)
                  )
                : [];
            setRecords(sorted);
            if (sorted.length >= 2) {
                fetchAiAnalysis(sorted[0].weightKg, sorted[sorted.length - 1].weightKg);
            }
        } catch (e) {
            console.error("Error loading progress:", e);
        } finally {
            setLoading(false);
        }
    }, [fetchAiAnalysis]);

    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    // ==========================================
    // LOG FORM
    // ==========================================

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

            setMessage("✅ Progress entry logged!");
            setWeight("");
            setBodyFat("");
            setNotes("");
            await fetchProgress();
        } catch (err) {
            console.error("Error logging progress:", err);
            setError("Failed to record progress. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // CHART DATA
    // ==========================================

    const chartData = records.map((r) => ({
        date: formatDate(r.date || r.createdAt),
        weight: r.weightKg ?? null,
        bodyFat: r.bodyFatPercentage ?? null,
    }));

    // ==========================================
    // STATS
    // ==========================================

    const weightChange = computeChange(records, "weightKg");
    const fatChange = computeChange(records, "bodyFatPercentage");
    const latestWeight = records.length > 0 ? records[records.length - 1].weightKg : null;
    const latestFat =
        records.length > 0 ? records[records.length - 1].bodyFatPercentage : null;

    const inputCls =
        "mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-color-default)] bg-[var(--color-surface)] p-2.5 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--border-color-focus)] focus:ring-2 focus:ring-[var(--border-color-focus)]/30";

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="space-y-8">

            {/* ============================= */}
            {/* PAGE HEADER                  */}
            {/* ============================= */}

            <div>
                <p className="text-sm font-medium text-[var(--color-brand)]">
                    Tracking &amp; Analytics
                </p>
                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    Progress Tracker
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">
                    Record your body weight, metrics, and view AI-powered
                    transformation insights.
                </p>
            </div>

            {/* ============================= */}
            {/* STAT SUMMARY CARDS           */}
            {/* ============================= */}

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                    {
                        label: "Current Weight",
                        value: latestWeight != null ? `${latestWeight} kg` : "—",
                        icon: "⚖️",
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                    },
                    {
                        label: "Current Body Fat",
                        value: latestFat != null ? `${latestFat}%` : "—",
                        icon: "📊",
                        color: "text-purple-600",
                        bg: "bg-purple-50",
                    },
                    {
                        label: "Total Logs",
                        value: records.length,
                        icon: "📋",
                        color: "text-green-600",
                        bg: "bg-green-50",
                    },
                    {
                        label: "Weight Change",
                        value:
                            weightChange != null
                                ? `${Number(weightChange) > 0 ? "+" : ""}${weightChange} kg`
                                : "—",
                        icon: Number(weightChange) > 0 ? "📈" : "📉",
                        color:
                            weightChange == null
                                ? "text-gray-500"
                                : Number(weightChange) <= 0
                                ? "text-green-600"
                                : "text-red-500",
                        bg:
                            weightChange == null
                                ? "bg-gray-50"
                                : Number(weightChange) <= 0
                                ? "bg-green-50"
                                : "bg-red-50",
                    },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-[var(--border-color-default)] bg-[var(--color-surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div
                            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-xl ${stat.bg}`}
                        >
                            {stat.icon}
                        </div>
                        <p className="text-xs text-[var(--color-text-secondary)]">
                            {stat.label}
                        </p>
                        <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* ============================= */}
            {/* CHARTS                       */}
            {/* ============================= */}

            {chartData.length >= 2 && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    {/* Weight Chart */}
                    <Card>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                                Weight Progress
                            </h2>
                            <p className="text-xs text-[var(--color-text-secondary)]">
                                Body weight over time (kg)
                            </p>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart
                                data={chartData}
                                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient
                                        id="weightGrad"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#6366f1"
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#6366f1"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 11 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 11 }}
                                    tickLine={false}
                                    axisLine={false}
                                    domain={["auto", "auto"]}
                                    tickFormatter={(v) => `${v}kg`}
                                />
                                <Tooltip
                                    content={
                                        <CustomTooltip />
                                    }
                                    formatter={(v) => [`${v} kg`, "Weight"]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="weight"
                                    name="Weight"
                                    unit=" kg"
                                    stroke="#6366f1"
                                    strokeWidth={2.5}
                                    fill="url(#weightGrad)"
                                    dot={{ r: 4, fill: "#6366f1" }}
                                    activeDot={{ r: 6 }}
                                    connectNulls
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Body Fat Chart */}
                    {chartData.some((d) => d.bodyFat != null) && (
                        <Card>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                                    Body Fat %
                                </h2>
                                <p className="text-xs text-[var(--color-text-secondary)]">
                                    Body fat percentage over time
                                </p>
                            </div>
                            <ResponsiveContainer width="100%" height={220}>
                                <AreaChart
                                    data={chartData}
                                    margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="fatGrad"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#f59e0b"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#f59e0b"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0f0f0"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 11 }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 11 }}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={["auto", "auto"]}
                                        tickFormatter={(v) => `${v}%`}
                                    />
                                    <Tooltip
                                        formatter={(v) => [`${v}%`, "Body Fat"]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="bodyFat"
                                        name="Body Fat"
                                        unit="%"
                                        stroke="#f59e0b"
                                        strokeWidth={2.5}
                                        fill="url(#fatGrad)"
                                        dot={{ r: 4, fill: "#f59e0b" }}
                                        activeDot={{ r: 6 }}
                                        connectNulls
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Card>
                    )}
                </div>
            )}

            {/* ============================= */}
            {/* AI INSIGHT                   */}
            {/* ============================= */}

            <Card>
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                        🤖
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                                AI Coach Progress Evaluation
                            </h2>
                            <button
                                onClick={() =>
                                    fetchAiAnalysis(
                                        records[0]?.weightKg,
                                        records[records.length - 1]?.weightKg
                                    )
                                }
                                disabled={aiLoading}
                                className="text-xs font-semibold text-purple-600 hover:text-purple-800 disabled:opacity-50"
                            >
                                {aiLoading ? "Analyzing..." : "🔄 Refresh"}
                            </button>
                        </div>
                        <div className="mt-3 whitespace-pre-line rounded-xl border border-purple-100 bg-purple-50/50 p-4 text-sm leading-relaxed text-gray-700">
                            {aiLoading ? (
                                <div className="flex items-center gap-2 text-purple-600">
                                    <Loader size="sm" /> Generating AI insights…
                                </div>
                            ) : aiAnalysis ? (
                                aiAnalysis
                            ) : (
                                "Log your weight entries to generate customized AI progress milestones and recommendations."
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            {/* ============================= */}
            {/* LOG FORM + HISTORY           */}
            {/* ============================= */}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                {/* Log Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                            Log Today's Weight
                        </h2>
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                            Track continuous weekly progress.
                        </p>

                        <form onSubmit={handleLogProgress} className="mt-5 space-y-4">
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}

                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-primary)]">
                                    Weight (kg) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="30"
                                    max="300"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="e.g. 74.2"
                                    className={inputCls}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-primary)]">
                                    Body Fat % <span className="text-xs font-normal text-gray-400">(Optional)</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="3"
                                    max="60"
                                    value={bodyFat}
                                    onChange={(e) => setBodyFat(e.target.value)}
                                    placeholder="e.g. 15.5"
                                    className={inputCls}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text-primary)]">
                                    Notes <span className="text-xs font-normal text-gray-400">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="e.g. Post-workout weigh-in"
                                    className={inputCls}
                                />
                            </div>

                            <Button
                                type="submit"
                                loading={submitting}
                                className="w-full"
                            >
                                💾 Save Progress Record
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* History Table */}
                <div className="lg:col-span-2">
                    <Card>
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                                Progress History
                            </h2>
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                                {records.length} {records.length === 1 ? "log" : "logs"}
                            </span>
                        </div>

                        {records.length === 0 ? (
                            <EmptyState
                                icon="📈"
                                title="No progress logged yet"
                                description="Use the form on the left to record your first weight entry."
                                size="sm"
                            />
                        ) : (
                            <div className="space-y-3">
                                {[...records].reverse().map((r, idx) => {
                                    const prev =
                                        records.length - idx - 2 >= 0
                                            ? records[records.length - idx - 2]
                                            : null;
                                    const change =
                                        prev && r.weightKg != null && prev.weightKg != null
                                            ? (r.weightKg - prev.weightKg).toFixed(1)
                                            : null;

                                    return (
                                        <div
                                            key={r.id || idx}
                                            className="flex items-center justify-between rounded-xl border border-[var(--border-color-default)] bg-[var(--color-bg)] p-4 transition hover:border-blue-200 hover:shadow-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-base">
                                                    ⚖️
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[var(--color-text-primary)]">
                                                        {r.weightKg} kg
                                                    </p>
                                                    <p className="text-xs text-[var(--color-text-secondary)]">
                                                        {formatDate(r.date || r.createdAt)}
                                                        {r.notes ? ` · ${r.notes}` : ""}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-right">
                                                {r.bodyFatPercentage != null && (
                                                    <div>
                                                        <p className="text-xs text-gray-400">
                                                            Body Fat
                                                        </p>
                                                        <p className="font-semibold text-purple-600">
                                                            {r.bodyFatPercentage}%
                                                        </p>
                                                    </div>
                                                )}
                                                {change != null && (
                                                    <div>
                                                        <p className="text-xs text-gray-400">
                                                            Change
                                                        </p>
                                                        <p
                                                            className={`text-sm font-bold ${
                                                                Number(change) <= 0
                                                                    ? "text-green-600"
                                                                    : "text-red-500"
                                                            }`}
                                                        >
                                                            {Number(change) > 0 ? "+" : ""}
                                                            {change} kg
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Progress;