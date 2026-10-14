import { useState, useEffect } from "react";
import { getCurrentUser as getStoredUser } from "../../services/authService";
import { getCurrentUser, updateUserProfile } from "../../services/userService";
import Alert from "../../components/ui/Alert";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

const ACTIVITY_LABELS = {
    SEDENTARY: "Sedentary (desk job, little exercise)",
    LIGHTLY_ACTIVE: "Lightly Active (light exercise 1-3 days/week)",
    MODERATELY_ACTIVE: "Moderately Active (moderate exercise 3-5 days/week)",
    VERY_ACTIVE: "Very Active (hard exercise 6-7 days/week)",
    EXTRA_ACTIVE: "Extra Active (athlete / physical job)",
};

const FITNESS_GOAL_LABELS = {
    WEIGHT_LOSS: "Weight Loss",
    MUSCLE_GAIN: "Muscle Gain",
    GENERAL_FITNESS: "General Fitness",
    ENDURANCE: "Endurance & Stamina",
    FLEXIBILITY: "Flexibility & Mobility",
};

function Profile() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const localUser = getStoredUser();
    const userId = localUser?.userId;

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: "MALE",
        heightCm: "",
        weightKg: "",
        targetWeightKg: "",
        activityLevel: "MODERATELY_ACTIVE",
        fitnessGoal: "GENERAL_FITNESS",
        dietaryPreference: "BALANCED",
    });

    useEffect(() => {
        if (!userId) {
            // Fallback: populate from localStorage
            if (localUser) {
                setForm((prev) => ({
                    ...prev,
                    firstName: localUser.firstName || "",
                    lastName: localUser.lastName || "",
                    email: localUser.email || "",
                }));
            }
            setLoading(false);
            return;
        }

        fetchProfile();
    }, [userId]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getCurrentUser();
            if (data) {
                setForm({
                    firstName: data.firstName || localUser?.firstName || "",
                    lastName: data.lastName || localUser?.lastName || "",
                    email: data.email || localUser?.email || "",
                    age: data.age || "",
                    gender: data.gender || "MALE",
                    heightCm: data.heightCm || "",
                    weightKg: data.weightKg || "",
                    targetWeightKg: data.targetWeightKg || "",
                    activityLevel: data.activityLevel || "MODERATELY_ACTIVE",
                    fitnessGoal: data.fitnessGoal || "GENERAL_FITNESS",
                    dietaryPreference: data.dietaryPreference || "BALANCED",
                });
            }
        } catch (err) {
            console.error("Profile fetch error:", err);
            if (localUser) {
                setForm((prev) => ({
                    ...prev,
                    firstName: localUser.firstName || "",
                    lastName: localUser.lastName || "",
                    email: localUser.email || "",
                }));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (success) setSuccess("");
        if (error) setError("");
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess("");
        setError("");

        try {
            if (!userId) {
                // Store locally if no userId
                const stored = JSON.parse(localStorage.getItem("user") || "{}");
                const updated = { ...stored, firstName: form.firstName, lastName: form.lastName };
                localStorage.setItem("user", JSON.stringify(updated));
                setSuccess("Profile saved locally. Connect to backend to persist changes.");
                return;
            }

            await updateUserProfile(userId, {
                firstName: form.firstName,
                lastName: form.lastName,
                age: form.age ? Number(form.age) : undefined,
                gender: form.gender,
                heightCm: form.heightCm ? Number(form.heightCm) : undefined,
                weightKg: form.weightKg ? Number(form.weightKg) : undefined,
                targetWeightKg: form.targetWeightKg ? Number(form.targetWeightKg) : undefined,
                activityLevel: form.activityLevel,
                fitnessGoal: form.fitnessGoal,
                dietaryPreference: form.dietaryPreference,
            });

            // Update localStorage name too
            const stored = JSON.parse(localStorage.getItem("user") || "{}");
            localStorage.setItem(
                "user",
                JSON.stringify({ ...stored, firstName: form.firstName, lastName: form.lastName })
            );

            setSuccess("Profile updated successfully!");
        } catch (err) {
            console.error("Profile update error:", err);
            setError(
                err?.response?.data?.message || "Failed to update profile. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const inputCls =
        "mt-1.5 w-full rounded-xl border border-[var(--border-color-default)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";
    const labelCls = "block text-sm font-semibold text-[var(--color-text-primary)]";

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
                <p className="text-sm font-medium text-[var(--color-brand)]">Account</p>
                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    Profile & Settings
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    Manage your personal details, fitness goals, and account preferences.
                </p>
            </div>

            {/* Avatar & Quick Info */}
            <div
                className="
                    flex flex-col items-start gap-5 rounded-2xl border border-[var(--border-color-default)]
                    bg-[var(--color-surface)] p-6 shadow-sm sm:flex-row sm:items-center
                "
            >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl font-bold text-white shadow-lg">
                    {(form.firstName?.[0] || "U").toUpperCase()}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                        {form.firstName} {form.lastName}
                    </h2>
                    <p className="text-sm text-[var(--color-text-secondary)]">{form.email}</p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {ACTIVITY_LABELS[form.activityLevel] || form.activityLevel}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Personal Details */}
                <div
                    className="
                        rounded-2xl border border-[var(--border-color-default)]
                        bg-[var(--color-surface)] p-6 shadow-sm
                    "
                >
                    <h2 className="mb-5 text-lg font-bold text-[var(--color-text-primary)]">
                        Personal Details
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className={labelCls}>
                                First Name
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={form.firstName}
                                onChange={handleChange}
                                placeholder="First name"
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className={labelCls}>
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={form.lastName}
                                onChange={handleChange}
                                placeholder="Last name"
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className={labelCls}>
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                readOnly
                                className={`${inputCls} cursor-not-allowed bg-slate-100 opacity-75`}
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className={labelCls}>
                                Age (years)
                            </label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                min="10"
                                max="120"
                                value={form.age}
                                onChange={handleChange}
                                placeholder="e.g. 25"
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className={labelCls}>
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className={inputCls}
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Body Metrics */}
                <div
                    className="
                        rounded-2xl border border-[var(--border-color-default)]
                        bg-[var(--color-surface)] p-6 shadow-sm
                    "
                >
                    <h2 className="mb-5 text-lg font-bold text-[var(--color-text-primary)]">
                        Body Metrics
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div>
                            <label htmlFor="heightCm" className={labelCls}>
                                Height (cm)
                            </label>
                            <input
                                id="heightCm"
                                name="heightCm"
                                type="number"
                                step="0.1"
                                min="100"
                                max="250"
                                value={form.heightCm}
                                onChange={handleChange}
                                placeholder="e.g. 175"
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label htmlFor="weightKg" className={labelCls}>
                                Current Weight (kg)
                            </label>
                            <input
                                id="weightKg"
                                name="weightKg"
                                type="number"
                                step="0.1"
                                min="30"
                                max="300"
                                value={form.weightKg}
                                onChange={handleChange}
                                placeholder="e.g. 72"
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label htmlFor="targetWeightKg" className={labelCls}>
                                Target Weight (kg)
                            </label>
                            <input
                                id="targetWeightKg"
                                name="targetWeightKg"
                                type="number"
                                step="0.1"
                                min="30"
                                max="300"
                                value={form.targetWeightKg}
                                onChange={handleChange}
                                placeholder="e.g. 68"
                                className={inputCls}
                            />
                        </div>
                    </div>
                </div>

                {/* Fitness Preferences */}
                <div
                    className="
                        rounded-2xl border border-[var(--border-color-default)]
                        bg-[var(--color-surface)] p-6 shadow-sm
                    "
                >
                    <h2 className="mb-5 text-lg font-bold text-[var(--color-text-primary)]">
                        Fitness Preferences
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="activityLevel" className={labelCls}>
                                Activity Level
                            </label>
                            <select
                                id="activityLevel"
                                name="activityLevel"
                                value={form.activityLevel}
                                onChange={handleChange}
                                className={inputCls}
                            >
                                {Object.entries(ACTIVITY_LABELS).map(([val, label]) => (
                                    <option key={val} value={val}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fitnessGoal" className={labelCls}>
                                Fitness Goal
                            </label>
                            <select
                                id="fitnessGoal"
                                name="fitnessGoal"
                                value={form.fitnessGoal}
                                onChange={handleChange}
                                className={inputCls}
                            >
                                {Object.entries(FITNESS_GOAL_LABELS).map(([val, label]) => (
                                    <option key={val} value={val}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dietaryPreference" className={labelCls}>
                                Dietary Preference
                            </label>
                            <select
                                id="dietaryPreference"
                                name="dietaryPreference"
                                value={form.dietaryPreference}
                                onChange={handleChange}
                                className={inputCls}
                            >
                                <option value="BALANCED">Balanced</option>
                                <option value="HIGH_PROTEIN">High Protein</option>
                                <option value="VEGETARIAN">Vegetarian</option>
                                <option value="VEGAN">Vegan</option>
                                <option value="KETO">Keto / Low Carb</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button type="submit" loading={saving} size="lg">
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
