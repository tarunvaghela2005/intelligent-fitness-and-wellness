import WorkoutCard from "../../components/workout/WorkoutCard";
import WorkoutQuickAction from "../../components/workout/WorkoutQuickAction";
import WorkoutHistoryCard from "../../components/workout/WorkoutHistoryCard";
import WorkoutForm from "../../components/workout/WorkoutForm";

function Workout() {
    return (
        <div className="space-y-6">

            {/* ========================================== */}
            {/* PAGE HEADER */}
            {/* ========================================== */}

            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Workout
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Plan, track, and manage your workouts.
                </p>
            </div>


            {/* ========================================== */}
            {/* TODAY'S WORKOUT */}
            {/* ========================================== */}

            <WorkoutCard />


            {/* ========================================== */}
            {/* QUICK ACTIONS */}
            {/* ========================================== */}

            <WorkoutQuickAction />


            {/* ========================================== */}
            {/* CREATE WORKOUT */}
            {/* ========================================== */}

            <WorkoutForm />


            {/* ========================================== */}
            {/* WORKOUT HISTORY */}
            {/* ========================================== */}

            <WorkoutHistoryCard />

        </div>
    );
}

export default Workout;