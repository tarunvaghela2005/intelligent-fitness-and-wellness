import Card from "../ui/Card";
import Badge from "../ui/Badge";

function WorkoutHistoryCard() {
    const workoutHistory = [
        {
            name: "Upper Body Strength",
            date: "24 Aug 2026",
            duration: "40 min",
            calories: "280 kcal",
            status: "Completed",
        },
        {
            name: "Lower Body Workout",
            date: "22 Aug 2026",
            duration: "45 min",
            calories: "320 kcal",
            status: "Completed",
        },
        {
            name: "Full Body Workout",
            date: "20 Aug 2026",
            duration: "35 min",
            calories: "250 kcal",
            status: "Completed",
        },
    ];

    return (
        <Card>
            <div>
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Workout History
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Your recently completed workouts.
                    </p>
                </div>

                <div className="space-y-4">
                    {workoutHistory.map((workout) => (
                        <div
                            key={`${workout.name}-${workout.date}`}
                            className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {workout.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {workout.date}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Duration
                                    </p>

                                    <p className="text-sm font-medium text-gray-900">
                                        {workout.duration}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Calories
                                    </p>

                                    <p className="text-sm font-medium text-gray-900">
                                        {workout.calories}
                                    </p>
                                </div>

                                <Badge variant="success">
                                    {workout.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default WorkoutHistoryCard;