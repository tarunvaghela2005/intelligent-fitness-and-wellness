import { useState } from "react";
import { calculateBodyFat as calculateBodyFatUtil } from "../../../utils/health/bodyFatUtils";
function BodyFatCalculator() {
    // ==========================================
    // BODY FAT STATE
    // ==========================================

    const [bodyFatAge, setBodyFatAge] = useState("");
    const [bodyFatGender, setBodyFatGender] = useState("");
    const [bodyFatHeight, setBodyFatHeight] = useState("");
    const [bodyFatWeight, setBodyFatWeight] = useState("");
    const [bodyFatWaist, setBodyFatWaist] = useState("");
    const [bodyFatTriceps, setBodyFatTriceps] = useState("");

    const [bodyFatResult, setBodyFatResult] = useState(null);
    const [bodyFatError, setBodyFatError] = useState("");


    // ==========================================
    // BODY FAT CALCULATOR
    // ASIAN INDIAN METHOD
    // ==========================================

    const handleCalculateBodyFat = () => {
        setBodyFatError("");
        setBodyFatResult(null);

        const response = calculateBodyFatUtil(
            bodyFatAge,
            bodyFatGender,
            bodyFatHeight,
            bodyFatWeight,
            bodyFatWaist,
            bodyFatTriceps
        );

        if (!response.success) {
            setBodyFatError(response.error);
            return;
        }

        setBodyFatResult(response.data);
    };


    // ==========================================
    // RESET
    // ==========================================

    const resetBodyFat = () => {
        setBodyFatAge("");
        setBodyFatGender("");
        setBodyFatHeight("");
        setBodyFatWeight("");
        setBodyFatWaist("");
        setBodyFatTriceps("");
        setBodyFatResult(null);
        setBodyFatError("");
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
                    Body Composition
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">
                    Body Fat Calculator
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Estimate your body fat percentage using an
                    anthropometric equation developed for Asian Indian
                    populations.
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

                    {/* Age */}

                    <div>

                        <label
                            htmlFor="bodyFatAge"
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
                                id="bodyFatAge"
                                type="number"
                                min="13"
                                max="120"
                                value={bodyFatAge}
                                onChange={(event) => {
                                    setBodyFatAge(event.target.value);
                                    setBodyFatError("");
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
                            htmlFor="bodyFatGender"
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
                            id="bodyFatGender"
                            value={bodyFatGender}
                            onChange={(event) => {
                                setBodyFatGender(event.target.value);
                                setBodyFatError("");
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
                            htmlFor="bodyFatHeight"
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
                                id="bodyFatHeight"
                                type="number"
                                min="50"
                                max="300"
                                step="0.1"
                                value={bodyFatHeight}
                                onChange={(event) => {
                                    setBodyFatHeight(event.target.value);
                                    setBodyFatError("");
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
                            htmlFor="bodyFatWeight"
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
                                id="bodyFatWeight"
                                type="number"
                                min="10"
                                max="500"
                                step="0.1"
                                value={bodyFatWeight}
                                onChange={(event) => {
                                    setBodyFatWeight(event.target.value);
                                    setBodyFatError("");
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


                    {/* Waist */}

                    <div>

                        <label
                            htmlFor="bodyFatWaist"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Waist Circumference
                        </label>

                        <div className="relative">

                            <input
                                id="bodyFatWaist"
                                type="number"
                                min="40"
                                max="250"
                                step="0.1"
                                value={bodyFatWaist}
                                onChange={(event) => {
                                    setBodyFatWaist(event.target.value);
                                    setBodyFatError("");
                                }}
                                placeholder="Enter waist circumference"
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


                    {/* Triceps */}

                    <div>

                        <label
                            htmlFor="bodyFatTriceps"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Triceps Skinfold
                        </label>

                        <div className="relative">

                            <input
                                id="bodyFatTriceps"
                                type="number"
                                min="1"
                                max="100"
                                step="0.1"
                                value={bodyFatTriceps}
                                onChange={(event) => {
                                    setBodyFatTriceps(event.target.value);
                                    setBodyFatError("");
                                }}
                                placeholder="Enter triceps skinfold"
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
                                mm
                            </span>

                        </div>

                    </div>


                    {/* ========================================== */}
                    {/* ERROR */}
                    {/* ========================================== */}

                    {bodyFatError && (
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
                            {bodyFatError}
                        </div>
                    )}


                    {/* ========================================== */}
                    {/* BUTTONS */}
                    {/* ========================================== */}

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={handleCalculateBodyFat}
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
                            Calculate Body Fat
                        </button>

                        <button
                            type="button"
                            onClick={resetBodyFat}
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

                    {!bodyFatResult ? (

                        <div className="text-center">

                            <div className="text-5xl">
                                📊
                            </div>

                            <h3
                                className="
                                    mt-4
                                    text-lg
                                    font-semibold
                                    text-[var(--color-text-primary)]
                                "
                            >
                                No Body Fat result yet
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-relaxed
                                    text-[var(--color-text-secondary)]
                                "
                            >
                                Enter your measurements to estimate
                                your body fat percentage.
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
                                Estimated Body Fat
                            </p>

                            <p
                                className="
                                    mt-3
                                    text-5xl
                                    font-bold
                                    text-[var(--color-text-primary)]
                                "
                            >
                                {bodyFatResult.percentage}%
                            </p>


                            {/* Category */}

                            <div
                                className={`
                                    mt-5
                                    rounded-[var(--radius-lg)]
                                    px-5
                                    py-4
                                    font-semibold
                                    ${bodyFatResult.category.includes(
                                    "Above"
                                )
                                        ? "bg-red-100 text-red-700"
                                        : "bg-green-100 text-green-700"
                                    }
                                `}
                            >
                                {bodyFatResult.category}
                            </div>


                            {/* Description */}

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
                                    What does this mean?
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-relaxed
                                        text-[var(--color-text-secondary)]
                                    "
                                >
                                    {bodyFatResult.description}
                                </p>

                            </div>


                            {/* Asian Indian Reference */}

                            <div
                                className="
                                    mt-5
                                    rounded-[var(--radius-lg)]
                                    border
                                    border-[var(--border-color-default)]
                                    bg-[var(--color-surface)]
                                    p-4
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
                                    Asian Indian Reference
                                </h3>

                                <div className="mt-3 space-y-2 text-sm">

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            rounded-md
                                            bg-[var(--color-slate-50)]
                                            px-3
                                            py-2
                                        "
                                    >
                                        <span>
                                            Male
                                        </span>

                                        <span>
                                            25.5%
                                        </span>
                                    </div>

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            rounded-md
                                            bg-[var(--color-slate-50)]
                                            px-3
                                            py-2
                                        "
                                    >
                                        <span>
                                            Female
                                        </span>

                                        <span>
                                            38%
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>


            {/* ========================================== */}
            {/* INFORMATION */}
            {/* ========================================== */}

            <div
                className="
                    mt-6
                    rounded-[var(--radius-lg)]
                    bg-[var(--color-slate-50)]
                    p-4
                "
            >

                <p
                    className="
                        text-xs
                        leading-relaxed
                        text-[var(--color-text-muted)]
                    "
                >
                    This calculator uses an anthropometric predictive
                    equation developed for Asian Indian populations.
                    The result is an estimate and should not be considered
                    a medical diagnosis. Accurate triceps skinfold
                    measurement requires appropriate technique and a
                    skinfold caliper.
                </p>

            </div>

        </section>
    );
}

export default BodyFatCalculator;

