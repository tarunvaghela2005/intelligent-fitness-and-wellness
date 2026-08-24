// ==========================================
// TDEE CALCULATION UTILITY
// ==========================================

export function calculateTDEE(bmr, activityLevel) {
    const bmrValue = Number(bmr);

    // ==========================================
    // REQUIRED FIELD VALIDATION
    // ==========================================

    if (!bmr || !activityLevel) {
        return {
            success: false,
            error: "Please enter your BMR and select your activity level.",
        };
    }

    // ==========================================
    // NUMERIC VALIDATION
    // ==========================================

    if (!Number.isFinite(bmrValue)) {
        return {
            success: false,
            error: "Please enter a valid BMR value.",
        };
    }

    // ==========================================
    // BMR RANGE VALIDATION
    // ==========================================

    if (bmrValue < 500 || bmrValue > 5000) {
        return {
            success: false,
            error: "BMR must be between 500 and 5000 kcal/day.",
        };
    }

    // ==========================================
    // ACTIVITY LEVEL VALIDATION
    // ==========================================

    const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        extra_active: 1.9,
    };

    if (!activityMultipliers[activityLevel]) {
        return {
            success: false,
            error: "Please select a valid activity level.",
        };
    }

    // ==========================================
    // ACTIVITY MULTIPLIER
    // ==========================================

    const multiplier = activityMultipliers[activityLevel];

    // ==========================================
    // CALCULATE TDEE
    // ==========================================

    const tdee = bmrValue * multiplier;

    // ==========================================
    // ACTIVITY LABEL
    // ==========================================

    const activityLabels = {
        sedentary: "Sedentary",
        lightly_active: "Lightly Active",
        moderately_active: "Moderately Active",
        very_active: "Very Active",
        extra_active: "Extra Active",
    };

    // ==========================================
    // RETURN RESULT
    // ==========================================

    return {
        success: true,
        data: {
            tdee: Math.round(tdee),
            bmr: bmrValue,
            activityLevel,
            activityLabel: activityLabels[activityLevel],
            multiplier,
        },
    };
}