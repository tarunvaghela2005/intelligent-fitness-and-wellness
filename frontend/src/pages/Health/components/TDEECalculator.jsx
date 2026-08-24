
import { useState } from "react";

function TDEECalculator() {
    // ==========================================
    // TDEE STATE
    // ==========================================

    const [tdeeBmr, setTdeeBmr] = useState("");
    const [tdeeActivity, setTdeeActivity] = useState("");

    const [tdeeResult, setTdeeResult] = useState(null);
    const [tdeeError, setTdeeError] = useState("");


    // ==========================================
    // TDEE CALCULATOR
    // ==========================================

    const calculateTDEE = () => {
        setTdeeError("");
        setTdeeResult(null);

        const bmrValue = Number(tdeeBmr);

        // ==========================================
        // REQUIRED FIELD VALIDATION
        // ==========================================

        if (!tdeeBmr || !tdeeActivity) {
            setTdeeError(
                "Please enter your BMR and select your activity level."
            );
            return;
        }

        // ==========================================
        // NUMERIC VALIDATION
        // ==========================================

        if (!Number.isFinite(bmrValue)) {
            setTdeeError(
                "Please enter a valid BMR value."
            );
            return;
        }

        // ==========================================
        // BMR RANGE VALIDATION
        // ==========================================

        if (bmrValue < 500 || bmrValue > 5000) {
            setTdeeError(
                "BMR must be between 500 and 5000 kcal/day."
            );
            return;
        }

        // ==========================================
        // ACTIVITY MULTIPLIERS
        // ==========================================

        const activityMultipliers = {
            sedentary: 1.2,
            lightly_active: 1.375,
            moderately_active: 1.55,
            very_active: 1.725,
            extra_active: 1.9,
        };

        const multiplier =
            activityMultipliers[tdeeActivity];

        // ==========================================
        // CALCULATE TDEE
        // ==========================================

        const tdee = bmrValue * multiplier;

        setTdeeResult(Math.round(tdee));
    };


    // ==========================================
    // RESET
    // ==========================================

    const resetTDEE = () => {
        setTdeeBmr("");
        setTdeeActivity("");
        setTdeeResult(null);
        setTdeeError("");
    };


    // ==========================================
    // UI
    // ==========================================

    return (
        <section
            className="
                rounded-[var(--radius-xl)]
                border
                border-[var(--border-color-default)]
                bg-[var(--color-surface)]
                p-6
                shadow-[var(--shadow-sm)]
                sm:p-8
            "
        >

            {/* ========================================== */}
            {/* HEADER */}
            {/* ========================================== */}

            <div className="mb-6">

                <p className="text-sm font-medium text-[var(--color-brand)]">
                    Daily Calorie Calculator
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">
                    TDEE Calculator
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Estimate the number of calories you need each day
                    based on your BMR and physical activity level.
                </p>

            </div>


            {/* ========================================== */}
            {/* MAIN GRID */}
            {/* ========================================== */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* ========================================== */}
                {/* FORM */}
                {/* ========================================== */}

                <div className="space-y-5">

                    {/* BMR */}

                    <div>

                        <label
                            htmlFor="tdeeBmr"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            BMR
                        </label>

                        <div className="relative">

                            <input
                                id="tdeeBmr"
                                type="number"
                                min="500"
                                max="5000"
                                step="1"
                                value={tdeeBmr}
                                onChange={(event) => {
                                    setTdeeBmr(event.target.value);
                                    setTdeeError("");
                                }}
                                placeholder="Enter your BMR"
                                className="
                                    w-full
                                    rounded-[var(--radius-md)]
                                    border
                                    border-[var(--border-color-default)]
                                    bg-[var(--color-surface)]
                                    px-4
                                    py-3
                                    pr-20
                                    text-[var(--color-text-primary)]
                                    outline-none
                                    transition
                                    focus:border-[var(--border-color-focus)]
                                    focus:ring-2
                                    focus:ring-[var(--border-color-focus)]
                                "
                            />

                            <span
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-sm
                                    text-[var(--color-text-muted)]
                                "
                            >
                                kcal
                            </span>

                        </div>

                        <p
                            className="
                                mt-2
                                text-xs
                                text-[var(--color-text-muted)]
                            "
                        >
                            You can use the BMR result calculated above.
                        </p>

                    </div>


                    {/* Activity Level */}

                    <div>

                        <label
                            htmlFor="tdeeActivity"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Activity Level
                        </label>

                        <select
                            id="tdeeActivity"
                            value={tdeeActivity}
                            onChange={(event) => {
                                setTdeeActivity(event.target.value);
                                setTdeeError("");
                            }}
                            className="
                                w-full
                                rounded-[var(--radius-md)]
                                border
                                border-[var(--border-color-default)]
                                bg-[var(--color-surface)]
                                px-4
                                py-3
                                text-[var(--color-text-primary)]
                                outline-none
                                transition
                                focus:border-[var(--border-color-focus)]
                                focus:ring-2
                                focus:ring-[var(--border-color-focus)]
                            "
                        >

                            <option value="">
                                Select activity level
                            </option>

                            <option value="sedentary">
                                Sedentary — Little or no exercise
                            </option>

                            <option value="lightly_active">
                                Lightly Active — Exercise 1–3 days/week
                            </option>

                            <option value="moderately_active">
                                Moderately Active — Exercise 3–5 days/week
                            </option>

                            <option value="very_active">
                                Very Active — Exercise 6–7 days/week
                            </option>

                            <option value="extra_active">
                                Extra Active — Very intense exercise
                            </option>

                        </select>

                    </div>


                    {/* ========================================== */}
                    {/* ERROR */}
                    {/* ========================================== */}

                    {tdeeError && (
                        <div
                            className="
                                rounded-[var(--radius-md)]
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                font-medium
                                text-red-700
                            "
                        >
                            {tdeeError}
                        </div>
                    )}


                    {/* ========================================== */}
                    {/* BUTTONS */}
                    {/* ========================================== */}

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={calculateTDEE}
                            className="
                                flex-1
                                rounded-[var(--radius-md)]
                                bg-[var(--color-brand)]
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition-all
                                hover:bg-[var(--color-brand-hover)]
                                hover:-translate-y-0.5
                            "
                        >
                            Calculate TDEE
                        </button>

                        <button
                            type="button"
                            onClick={resetTDEE}
                            className="
                                rounded-[var(--radius-md)]
                                border
                                border-[var(--border-color-default)]
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-[var(--color-text-secondary)]
                                transition-colors
                                hover:bg-[var(--color-slate-100)]
                            "
                        >
                            Reset
                        </button>

                    </div>

                </div>


                {/* ========================================== */}
                {/* RESULT */}
                {/* ========================================== */}

                <div
                    className="
                        flex
                        flex-col
                        justify-center
                        rounded-[var(--radius-lg)]
                        bg-[var(--color-slate-50)]
                        p-6
                        sm:p-8
                    "
                >

                    {!tdeeResult ? (

                        <div className="text-center">

                            <div className="text-5xl">
                                🔥
                            </div>

                            <h3
                                className="
                                    mt-4
                                    text-lg
                                    font-semibold
                                    text-[var(--color-text-primary)]
                                "
                            >
                                No TDEE result yet
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-relaxed
                                    text-[var(--color-text-secondary)]
                                "
                            >
                                Enter your BMR and activity level to
                                estimate your daily calorie needs.
                            </p>

                        </div>

                    ) : (

                        <div className="text-center">

                            {/* Result */}

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-[var(--color-brand)]
                                "
                            >
                                Estimated TDEE
                            </p>

                            <p
                                className="
                                    mt-3
                                    text-5xl
                                    font-bold
                                    text-[var(--color-text-primary)]
                                "
                            >
                                {tdeeResult}
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    font-medium
                                    text-[var(--color-text-secondary)]
                                "
                            >
                                kcal / day
                            </p>


                            {/* Explanation */}

                            <div
                                className="
                                    mt-6
                                    rounded-[var(--radius-lg)]
                                    bg-[var(--color-brand-light)]
                                    p-5
                                    text-left
                                "
                            >

                                <h3
                                    className="
                                        text-sm
                                        font-bold
                                        text-[var(--color-text-primary)]
                                    "
                                >
                                    What does TDEE mean?
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-relaxed
                                        text-[var(--color-text-secondary)]
                                    "
                                >
                                    TDEE (Total Daily Energy Expenditure)
                                    estimates the calories your body uses
                                    each day, including normal body
                                    functions and physical activity.
                                </p>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}

export default TDEECalculator;

