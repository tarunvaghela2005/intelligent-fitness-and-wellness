import Card from "../ui/Card";
import Button from "../ui/Button";

function WorkoutQuickAction() {
    const actions = [
        {
            title: "Start Workout",
            description: "Begin your planned workout session.",
            buttonText: "Start",
        },
        {
            title: "Create Workout",
            description: "Create a custom workout plan.",
            buttonText: "Create",
        },
        {
            title: "View History",
            description: "Check your previous workout sessions.",
            buttonText: "View",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {actions.map((action) => (
                <Card key={action.title}>
                    <div className="flex h-full flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {action.title}
                        </h3>

                        <p className="mt-2 flex-1 text-sm text-gray-500">
                            {action.description}
                        </p>

                        <div className="mt-4">
                            <Button variant="secondary">
                                {action.buttonText}
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default WorkoutQuickAction;