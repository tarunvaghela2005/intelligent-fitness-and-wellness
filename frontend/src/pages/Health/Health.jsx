import BMICalculator from "./components/BMICalculator";
import BMRCalculator from "./components/BMRCalculator";
import BodyFatCalculator from "./components/BodyFatCalculator";
import TDEECalculator from "./components/TDEECalculator";
function Health() {
    return (
        <div className="space-y-8">

            {/* Page Header */}
            <div>
                <p className="text-sm font-medium text-[var(--color-brand)]">
                    Health Calculator
                </p>

                <h1 className="mt-1 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                    Health Calculators
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                    Use these calculators to understand important health
                    and wellness measurements.
                </p>
            </div>

            {/* BMI Calculator */}
            <BMICalculator />

            {/* BMR Calculator */}
            <BMRCalculator />

            {/**Body Fat Calculator */}
            <BodyFatCalculator />

            {/* TDEE Calculator*/}
            <TDEECalculator />


        </div>
    );
}

export default Health;