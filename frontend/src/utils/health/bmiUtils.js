// ==========================================
// BMI CALCULATION UTILITY
// ==========================================

export function calculateBMI(height, weight) {
    const heightValue = Number(height);
    const weightValue = Number(weight);

    // Required fields
    if (!height || !weight) {
        return {
            success: false,
            error: "Please enter both height and weight.",
        };
    }

    // Numeric validation
    if (
        !Number.isFinite(heightValue) ||
        !Number.isFinite(weightValue)
    ) {
        return {
            success: false,
            error: "Please enter valid numeric values.",
        };
    }

    // Height validation
    if (heightValue <= 0) {
        return {
            success: false,
            error: "Height must be greater than 0 cm.",
        };
    }

    if (heightValue < 50 || heightValue > 300) {
        return {
            success: false,
            error: "Please enter a height between 50 cm and 300 cm.",
        };
    }

    // Weight validation
    if (weightValue <= 0) {
        return {
            success: false,
            error: "Weight must be greater than 0 kg.",
        };
    }

    if (weightValue < 10 || weightValue > 500) {
        return {
            success: false,
            error: "Please enter a weight between 10 kg and 500 kg.",
        };
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
    // RETURN RESULT
    // ==========================================

    return {
        success: true,
        data: {
            bmi: bmi.toFixed(1),
            category,
            description,
        },
    };
}