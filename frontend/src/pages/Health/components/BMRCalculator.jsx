import { useState } from "react";
import { calculateBMR as calculateBMRUtil } from "../../../utils/health/bmrUtils";

function BMRCalculator() {
    // ==========================================
    // BMR STATE
    // ==========================================

    const [bmrAge, setBmrAge] = useState("");
    const [bmrGender, setBmrGender] = useState("");
    const [bmrHeight, setBmrHeight] = useState("");
    const [bmrWeight, setBmrWeight] = useState("");

    const [bmrResult, setBmrResult] = useState(null);
    const [bmrError, setBmrError] = useState("");


    // ==========================================
    // BMR CALCULATOR
    // Mifflin-St Jeor Equation
    // ==========================================

    const handleCalculateBMR = () => {
        setBmrError("");
        setBmrResult(null);

        const response = calculateBMRUtil(
            bmrAge,
            bmrGender,
            bmrHeight,
            bmrWeight
        );

        if (!response.success) {
            setBmrError(response.error);
            return;
        }

        setBmrResult(response.data);
    };

    // ==========================================
    // RESET
    // ==========================================

    const resetBMR = () => {
        setBmrAge("");
        setBmrGender("");
        setBmrHeight("");
        setBmrWeight("");
        setBmrResult(null);
        setBmrError("");
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
                    Metabolism Calculator
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">
                    BMR Calculator
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Calculate your Basal Metabolic Rate to estimate
                    how many calories your body needs while at rest.
                </p>

            </div>


            {/* ========================================== */}
            {/* MAIN GRID */}
            {/* ========================================== */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* ========================================== */}
                {/* BMR FORM */}
                {/* ========================================== */}

                <div className="space-y-5">

                    {/* Age */}

                    <div>

                        <label
                            htmlFor="bmrAge"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Age
                        </label>

                        <div className="relative">

                            <input
                                id="bmrAge"
                                type="number"
                                min="13"
                                max="120"
                                value={bmrAge}
                                onChange={(event) => {
                                    setBmrAge(event.target.value);
                                    setBmrError("");
                                }}
                                placeholder="Enter your age"
                                className="
                                    w-full
                                    rounded-[var(--radius-md)]
                                    border
                                    border-[var(--border-color-default)]
                                    bg-[var(--color-surface)]
                                    px-4
                                    py-3
                                    pr-14
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
                                yrs
                            </span>

                        </div>

                    </div>


                    {/* Gender */}

                    <div>

                        <label
                            htmlFor="bmrGender"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Gender
                        </label>

                        <select
                            id="bmrGender"
                            value={bmrGender}
                            onChange={(event) => {
                                setBmrGender(event.target.value);
                                setBmrError("");
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
                                Select gender
                            </option>

                            <option value="male">
                                Male
                            </option>

                            <option value="female">
                                Female
                            </option>

                        </select>

                    </div>


                    {/* Height */}

                    <div>

                        <label
                            htmlFor="bmrHeight"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Height
                        </label>

                        <div className="relative">

                            <input
                                id="bmrHeight"
                                type="number"
                                min="50"
                                max="300"
                                step="0.1"
                                value={bmrHeight}
                                onChange={(event) => {
                                    setBmrHeight(event.target.value);
                                    setBmrError("");
                                }}
                                placeholder="Enter your height"
                                className="
                                    w-full
                                    rounded-[var(--radius-md)]
                                    border
                                    border-[var(--border-color-default)]
                                    bg-[var(--color-surface)]
                                    px-4
                                    py-3
                                    pr-14
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
                                cm
                            </span>

                        </div>

                    </div>


                    {/* Weight */}

                    <div>

                        <label
                            htmlFor="bmrWeight"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Weight
                        </label>

                        <div className="relative">

                            <input
                                id="bmrWeight"
                                type="number"
                                min="10"
                                max="500"
                                step="0.1"
                                value={bmrWeight}
                                onChange={(event) => {
                                    setBmrWeight(event.target.value);
                                    setBmrError("");
                                }}
                                placeholder="Enter your weight"
                                className="
                                    w-full
                                    rounded-[var(--radius-md)]
                                    border
                                    border-[var(--border-color-default)]
                                    bg-[var(--color-surface)]
                                    px-4
                                    py-3
                                    pr-14
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
                                kg
                            </span>

                        </div>

                    </div>


                    {/* ========================================== */}
                    {/* ERROR */}
                    {/* ========================================== */}

                    {bmrError && (
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
                            {bmrError}
                        </div>
                    )}


                    {/* ========================================== */}
                    {/* BUTTONS */}
                    {/* ========================================== */}

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={handleCalculateBMR}
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
                            Calculate BMR
                        </button>

                        <button
                            type="button"
                            onClick={resetBMR}
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
                {/* BMR RESULT */}
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

                    {!bmrResult ? (

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
                                No BMR result yet
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-relaxed
                                    text-[var(--color-text-secondary)]
                                "
                            >
                                Enter your details and calculate your
                                BMR to estimate your resting calorie
                                needs.
                            </p>

                        </div>

                    ) : (

                        <div className="text-center">

                            {/* BMR VALUE */}

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-[var(--color-brand)]
                                "
                            >
                                Estimated BMR
                            </p>

                            <p
                                className="
                                    mt-3
                                    text-5xl
                                    font-bold
                                    text-[var(--color-text-primary)]
                                "
                            >
                                {bmrResult.bmr}
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


                            {/* INFORMATION */}

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
                                    What does BMR mean?
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-relaxed
                                        text-[var(--color-text-secondary)]
                                    "
                                >
                                    BMR is the estimated number of
                                    calories your body needs each day
                                    to perform essential functions such
                                    as breathing, circulation, and
                                    maintaining body temperature while
                                    at rest.
                                </p>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}

export default BMRCalculator;