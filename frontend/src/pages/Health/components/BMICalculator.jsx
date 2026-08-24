import { useState } from "react";

function BMICalculator() {
    // ==========================================
    // BMI STATE
    // ==========================================

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const [result, setResult] = useState(null);
    const [error, setError] = useState("");


    // ==========================================
    // BMI CALCULATOR
    // ==========================================

    const calculateBMI = () => {
        setError("");
        setResult(null);

        const heightValue = Number(height);
        const weightValue = Number(weight);

        // Required fields
        if (!height.trim() || !weight.trim()) {
            setError("Please enter both height and weight.");
            return;
        }

        // Numeric validation
        if (
            !Number.isFinite(heightValue) ||
            !Number.isFinite(weightValue)
        ) {
            setError("Please enter valid numeric values.");
            return;
        }

        // Height validation
        if (heightValue <= 0) {
            setError("Height must be greater than 0 cm.");
            return;
        }

        if (heightValue < 50 || heightValue > 300) {
            setError("Please enter a height between 50 cm and 300 cm.");
            return;
        }

        // Weight validation
        if (weightValue <= 0) {
            setError("Weight must be greater than 0 kg.");
            return;
        }

        if (weightValue < 10 || weightValue > 500) {
            setError("Please enter a weight between 10 kg and 500 kg.");
            return;
        }

        // ==========================================
        // BMI FORMULA
        // ==========================================

        const heightInMeters = heightValue / 100;

        const bmi =
            weightValue /
            (heightInMeters * heightInMeters);

        // ==========================================
        // BMI CATEGORY
        // ==========================================

        let category = "";
        let description = "";

        if (bmi < 18.5) {
            category = "Underweight";

            description =
                "Your BMI is below the standard healthy range. Consider discussing your nutrition and health goals with a qualified professional.";
        } else if (bmi < 25) {
            category = "Healthy Weight";

            description =
                "Your BMI is within the standard healthy range. Continue maintaining balanced nutrition and regular physical activity.";
        } else if (bmi < 30) {
            category = "Overweight";

            description =
                "Your BMI is above the standard healthy range. Consider focusing on balanced nutrition and regular physical activity.";
        } else {
            category = "Obesity";

            description =
                "Your BMI is in the obesity range. Consider discussing your health and wellness goals with a qualified professional.";
        }

        // ==========================================
        // STORE RESULT
        // ==========================================

        setResult({
            bmi: bmi.toFixed(1),
            category,
            description,
        });
    };


    // ==========================================
    // RESET
    // ==========================================

    const handleReset = () => {
        setHeight("");
        setWeight("");
        setResult(null);
        setError("");
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
                    Health Measurement
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[var(--color-text-primary)]">
                    BMI Calculator
                </h2>

                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    Calculate your Body Mass Index using your height
                    and weight.
                </p>

            </div>


            {/* ========================================== */}
            {/* MAIN GRID */}
            {/* ========================================== */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* ========================================== */}
                {/* BMI FORM */}
                {/* ========================================== */}

                <div className="space-y-5">

                    {/* Height */}

                    <div>

                        <label
                            htmlFor="height"
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
                                id="height"
                                type="number"
                                min="50"
                                max="300"
                                step="0.1"
                                value={height}
                                onChange={(event) => {
                                    setHeight(event.target.value);
                                    setError("");
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
                            htmlFor="weight"
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
                                id="weight"
                                type="number"
                                min="10"
                                max="500"
                                step="0.1"
                                value={weight}
                                onChange={(event) => {
                                    setWeight(event.target.value);
                                    setError("");
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

                    {error && (
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
                            {error}
                        </div>
                    )}


                    {/* ========================================== */}
                    {/* BUTTONS */}
                    {/* ========================================== */}

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={calculateBMI}
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
                            Calculate BMI
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
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
                {/* BMI RESULT */}
                {/* ========================================== */}

                <div
                    className="
                        flex
                        flex-col
                        justify-center
                        rounded-[var(--radius-lg)]
                        bg-[var(--color-slate-50)]
                        p-6
                    "
                >

                    {!result ? (

                        <div className="text-center">

                            <div className="text-5xl">
                                ⚖️
                            </div>

                            <h3
                                className="
                                    mt-4
                                    text-lg
                                    font-semibold
                                    text-[var(--color-text-primary)]
                                "
                            >
                                No BMI result yet
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-[var(--color-text-secondary)]
                                "
                            >
                                Enter your height and weight to
                                calculate your BMI.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {/* BMI VALUE */}

                            <div
                                className="
                                    rounded-[var(--radius-lg)]
                                    bg-[var(--color-brand-light)]
                                    p-6
                                    text-center
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-[var(--color-brand)]
                                    "
                                >
                                    Your BMI
                                </p>

                                <p
                                    className="
                                        mt-2
                                        text-5xl
                                        font-bold
                                        text-[var(--color-text-primary)]
                                    "
                                >
                                    {result.bmi}
                                </p>

                            </div>


                            {/* CATEGORY */}

                            <div
                                className={`
                                    rounded-[var(--radius-lg)]
                                    px-5
                                    py-4
                                    text-center
                                    font-semibold
                                    ${result.category === "Underweight"
                                        ? "bg-blue-100 text-blue-700"
                                        : result.category === "Healthy Weight"
                                            ? "bg-green-100 text-green-700"
                                            : result.category === "Overweight"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                    }
                                `}
                            >
                                {result.category}
                            </div>


                            {/* DESCRIPTION */}

                            <div>

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
                                    {result.description}
                                </p>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}

export default BMICalculator;

