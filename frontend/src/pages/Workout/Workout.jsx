import WorkoutCard from "../../components/workout/WorkoutCard";
import WorkoutQuickAction from "../../components/workout/WorkoutQuickAction";
import WorkoutHistoryCard from "../../components/workout/WorkoutHistoryCard";

function Workout() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Workout
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Plan, track, and manage your workouts.
                </p>
            </div>

            {/* Today's Workout */}
            <WorkoutCard />

            {/* Quick Actions */}
            <WorkoutQuickAction />

            {/* Workout History */}
            <WorkoutHistoryCard />
        </div>
    );
}

export default Workout;