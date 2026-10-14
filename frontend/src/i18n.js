import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
    en: {
        translation: {
            // Navigation
            dashboard: "Dashboard",
            health: "Health",
            workout: "Workout",
            nutrition: "Nutrition",
            progress: "Progress",
            goals: "Goals",
            aiAssistant: "AI Assistant",
            profile: "Profile",

            // Dashboard
            welcomeBack: "Welcome back",
            todaysOverview: "Today's Overview",
            bmi: "BMI",
            calories: "Calories",
            waterIntake: "Water Intake",
            todaysWorkout: "Today's Workout",
            quickActions: "Quick Actions",
            recentActivity: "Recent Activity",

            // Common
            save: "Save",
            cancel: "Cancel",
            submit: "Submit",
            loading: "Loading...",
            error: "Error",
            success: "Success",
        },
    },
    hi: {
        translation: {
            // Hindi translations (placeholders - can be expanded)
            dashboard: "डैशबोर्ड",
            health: "स्वास्थ्य",
            workout: "वर्कआउट",
            nutrition: "पोषण",
            progress: "प्रगति",
            goals: "लक्ष्य",
            aiAssistant: "AI सहायक",
            profile: "प्रोफ़ाइल",
            welcomeBack: "वापस स्वागत है",
            save: "सहेजें",
            cancel: "रद्द करें",
            submit: "जमा करें",
            loading: "लोड हो रहा है...",
        },
    },
    gu: {
        translation: {
            // Gujarati translations (placeholders - can be expanded)
            dashboard: "ડેશબોર્ડ",
            health: "આરોગ્ય",
            workout: "વર્કઆઉટ",
            nutrition: "પોષણ",
            progress: "પ્રગતિ",
            goals: "લક્ષ્યો",
            aiAssistant: "AI સહાયક",
            profile: "પ્રોફાઇલ",
            welcomeBack: "પાછા સ્વાગત છે",
            save: "સેવ કરો",
            cancel: "રદ કરો",
            submit: "સબમિટ કરો",
            loading: "લોડ થઈ રહ્યું છે...",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // React already escapes by default
        },
    });

export default i18n;
