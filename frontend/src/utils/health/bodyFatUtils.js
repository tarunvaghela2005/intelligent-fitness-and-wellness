// ==========================================
// BODY FAT CALCULATION UTILITY
// ==========================================

export function calculateBodyFat(
    age,
    gender,
    height,
    weight,
    waist,
    triceps
) {
    const ageValue = Number(age);
    const heightValue = Number(height);
    const weightValue = Number(weight);
    const waistValue = Number(waist);
    const tricepsValue = Number(triceps);

    // ==========================================
    // REQUIRED FIELD VALIDATION
    // ==========================================

    if (
        !age ||
        !gender ||
        !height ||
        !weight ||
        !waist ||
        !triceps
    ) {
        return {
            success: false,
            error: "Please complete all Body Fat fields.",
        };
    }

    // ==========================================
    // NUMERIC VALIDATION
    // ==========================================

    if (
        !Number.isFinite(ageValue) ||
        !Number.isFinite(heightValue) ||
        !Number.isFinite(weightValue) ||
        !Number.isFinite(waistValue) ||
        !Number.isFinite(tricepsValue)
    ) {
        return {
            success: false,
            error: "Please enter valid numeric values.",
        };
    }

    // ==========================================
    // GENDER VALIDATION
    // ==========================================

    if (gender !== "male" && gender !== "female") {
        return {
            success: false,
            error: "Please select a valid gender.",
        };
    }

    // ==========================================
    // AGE VALIDATION
    // ==========================================

    if (ageValue < 13 || ageValue > 120) {
        return {
            success: false,
            error: "Age must be between 13 and 120 years.",
        };
    }

    // ==========================================
    // HEIGHT VALIDATION
    // ==========================================

    if (heightValue < 50 || heightValue > 300) {
        return {
            success: false,
            error: "Height must be between 50 cm and 300 cm.",
        };
    }

    // ==========================================
    // WEIGHT VALIDATION
    // ==========================================

    if (weightValue < 10 || weightValue > 500) {
        return {
            success: false,
            error: "Weight must be between 10 kg and 500 kg.",
        };
    }

    // ==========================================
    // WAIST VALIDATION
    // ==========================================

    if (waistValue < 40 || waistValue > 250) {
        return {
            success: false,
            error:
                "Waist circumference must be between 40 cm and 250 cm.",
        };
    }

    // ==========================================
    // TRICEPS VALIDATION
    // ==========================================

    if (tricepsValue < 1 || tricepsValue > 100) {
        return {
            success: false,
            error:
                "Triceps skinfold must be between 1 mm and 100 mm.",
        };
    }

    // ==========================================
    // ASIAN INDIAN EQUATION
    // ==========================================
    //
    // %BF =
    // 42.42
    // + 0.003 × age
    // + 7.04 × gender
    // + 0.42 × triceps
    // + 0.29 × waist
    // + 0.22 × weight
    // - 0.42 × height
    //
    // Gender:
    // Male = 1
    // Female = 2
    // ==========================================

    const genderValue = gender === "male" ? 1 : 2;

    let bodyFat =
        42.42 +
        0.003 * ageValue +
        7.04 * genderValue +
        0.42 * tricepsValue +
        0.29 * waistValue +
        0.22 * weightValue -
        0.42 * heightValue;

    // ==========================================
    // PRACTICAL RESULT LIMIT
    // ==========================================

    bodyFat = Math.max(0, Math.min(60, bodyFat));

    // ==========================================
    // CATEGORY
    // ==========================================

    let category = "";
    let description = "";

    if (gender === "male") {
        if (bodyFat < 25.5) {
            category = "Below Asian Indian Risk Cutoff";

            description =
                "Your estimated body fat is below the body-fat cutoff reported for cardiovascular-risk assessment in the studied Asian Indian population.";
        } else {
            category = "Above Asian Indian Risk Cutoff";

            description =
                "Your estimated body fat is at or above the body-fat cutoff reported for cardiovascular-risk assessment in the studied Asian Indian population.";
        }
    } else {
        if (bodyFat < 38) {
            category = "Below Asian Indian Risk Cutoff";

            description =
                "Your estimated body fat is below the body-fat cutoff reported for cardiovascular-risk assessment in the studied Asian Indian population.";
        } else {
            category = "Above Asian Indian Risk Cutoff";

            description =
                "Your estimated body fat is at or above the body-fat cutoff reported for cardiovascular-risk assessment in the studied Asian Indian population.";
        }
    }

    // ==========================================
    // RETURN RESULT
    // ==========================================

    return {
        success: true,
        data: {
            percentage: bodyFat.toFixed(1),
            category,
            description,
        },
    };
}