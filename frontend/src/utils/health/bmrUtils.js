// ==========================================
// BMR CALCULATION UTILITY
// Mifflin-St Jeor Equation
// ==========================================

export function calculateBMR(age, gender, height, weight) {
    const ageValue = Number(age);
    const heightValue = Number(height);
    const weightValue = Number(weight);

    // ==========================================
    // REQUIRED FIELDS
    // ==========================================

    if (!age || !gender || !height || !weight) {
        return {
            success: false,
            error: "Please enter all required fields.",
        };
    }

    // ==========================================
    // NUMERIC VALIDATION
    // ==========================================

    if (
        !Number.isFinite(ageValue) ||
        !Number.isFinite(heightValue) ||
        !Number.isFinite(weightValue)
    ) {
        return {
            success: false,
            error: "Please enter valid numeric values.",
        };
    }

    // ==========================================
    // AGE VALIDATION
    // ==========================================

    if (ageValue <= 0) {
        return {
            success: false,
            error: "Age must be greater than 0.",
        };
    }

    if (ageValue < 15 || ageValue > 100) {
        return {
            success: false,
            error: "Please enter an age between 15 and 100 years.",
        };
    }

    // ==========================================
    // HEIGHT VALIDATION
    // ==========================================

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

    // ==========================================
    // WEIGHT VALIDATION
    // ==========================================

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
    // GENDER VALIDATION
    // ==========================================

    if (gender !== "male" && gender !== "female") {
        return {
            success: false,
            error: "Please select a valid gender.",
        };
    }

    // ==========================================
    // BMR FORMULA
    // Mifflin-St Jeor Equation
    // ==========================================

    let bmr;

    if (gender === "male") {
        bmr =
            (10 * weightValue) +
            (6.25 * heightValue) -
            (5 * ageValue) +
            5;
    } else {
        bmr =
            (10 * weightValue) +
            (6.25 * heightValue) -
            (5 * ageValue) -
            161;
    }

    // ==========================================
    // RETURN RESULT
    // ==========================================

    return {
        success: true,
        data: {
            bmr: Math.round(bmr),
            description:
                "Your BMR represents the approximate number of calories your body needs at rest to maintain basic functions such as breathing, circulation, and temperature regulation.",
        },
    };
}