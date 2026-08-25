import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function WorkoutCard() {
    return (
        <Card>
            <div className="flex flex-col gap-5">
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Today's Workout
                        </p>

                        <h2 className="mt-1 text-xl font-semibold text-gray-900">
                            Full Body Strength
                        </h2>
                    </div>

                    <Badge variant="success">
                        Beginner
                    </Badge>
                </div>

                {/* Workout Information */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="mt-1 font-semibold text-gray-900">
                            45 min
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Exercises</p>
                        <p className="mt-1 font-semibold text-gray-900">
                            8
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Calories</p>
                        <p className="mt-1 font-semibold text-gray-900">
                            320 kcal
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Level</p>
                        <p className="mt-1 font-semibold text-gray-900">
                            Beginner
                        </p>
                    </div>
                </div>

                {/* Action */}
                <div className="flex justify-end">
                    <Button>
                        Start Workout
                    </Button>
                </div>
            </div>
        </Card>
    );
}

export default WorkoutCard;