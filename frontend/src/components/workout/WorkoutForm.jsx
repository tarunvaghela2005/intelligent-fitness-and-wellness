import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function WorkoutForm() {
    // ==========================================
    // FORM STATE
    // ==========================================

    const [workoutName, setWorkoutName] = useState("");
    const [workoutGoal, setWorkoutGoal] = useState("");
    const [workoutDifficulty, setWorkoutDifficulty] = useState("");
    const [workoutDuration, setWorkoutDuration] = useState("");

    // ==========================================
    // FORM HANDLERS
    // ==========================================

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log({
            workoutName,
            workoutGoal,
            workoutDifficulty,
            workoutDuration,
        });
    };

    const handleReset = () => {
        setWorkoutName("");
        setWorkoutGoal("");
        setWorkoutDifficulty("");
        setWorkoutDuration("");
    };

    // ==========================================
    // UI
    // ==========================================

    return (
        <Card>
            <div>
                {/* ========================================== */}
                {/* HEADER */}
                {/* ========================================== */}

                <div className="mb-6">
                    <p className="text-sm font-medium text-[var(--color-brand)]">
                        Workout Planning
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                        Create Workout
                    </h2>

                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        Create a personalized workout plan based on your
                        fitness goals and preferences.
                    </p>
                </div>

                {/* ========================================== */}
                {/* FORM */}
                {/* ========================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* Workout Name */}

                    <div>
                        <label
                            htmlFor="workoutName"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Workout Name
                        </label>

                        <input
                            id="workoutName"
                            type="text"
                            value={workoutName}
                            onChange={(event) =>
                                setWorkoutName(event.target.value)
                            }
                            placeholder="e.g. Full Body Strength"
                            className="
                                w-full
                                rounded-[var(--radius-md)]
                                border
                                border-[var(--border-color-default)]
                                bg-[var(--color-surface)]
                                px-4
                                py-3
                                text-[var(--color-text-primary)]
                                outline-none
                                transition
                                focus:border-[var(--border-color-focus)]
                                focus:ring-2
                                focus:ring-[var(--border-color-focus)]
                            "
                        />
                    </div>

                    {/* Goal */}

                    <div>
                        <label
                            htmlFor="workoutGoal"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Fitness Goal
                        </label>

                        <select
                            id="workoutGoal"
                            value={workoutGoal}
                            onChange={(event) =>
                                setWorkoutGoal(event.target.value)
                            }
                            className="
                                w-full
                                rounded-[var(--radius-md)]
                                border
                                border-[var(--border-color-default)]
                                bg-[var(--color-surface)]
                                px-4
                                py-3
                                text-[var(--color-text-primary)]
                                outline-none
                                transition
                                focus:border-[var(--border-color-focus)]
                                focus:ring-2
                                focus:ring-[var(--border-color-focus)]
                            "
                        >
                            <option value="">
                                Select your goal
                            </option>

                            <option value="strength">
                                Build Strength
                            </option>

                            <option value="muscle_gain">
                                Muscle Gain
                            </option>

                            <option value="weight_loss">
                                Weight Loss
                            </option>

                            <option value="endurance">
                                Improve Endurance
                            </option>

                            <option value="general_fitness">
                                General Fitness
                            </option>
                        </select>
                    </div>

                    {/* Difficulty */}

                    <div>
                        <label
                            htmlFor="workoutDifficulty"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Difficulty Level
                        </label>

                        <select
                            id="workoutDifficulty"
                            value={workoutDifficulty}
                            onChange={(event) =>
                                setWorkoutDifficulty(event.target.value)
                            }
                            className="
                                w-full
                                rounded-[var(--radius-md)]
                                border
                                border-[var(--border-color-default)]
                                bg-[var(--color-surface)]
                                px-4
                                py-3
                                text-[var(--color-text-primary)]
                                outline-none
                                transition
                                focus:border-[var(--border-color-focus)]
                                focus:ring-2
                                focus:ring-[var(--border-color-focus)]
                            "
                        >
                            <option value="">
                                Select difficulty
                            </option>

                            <option value="beginner">
                                Beginner
                            </option>

                            <option value="intermediate">
                                Intermediate
                            </option>

                            <option value="advanced">
                                Advanced
                            </option>
                        </select>
                    </div>

                    {/* Duration */}

                    <div>
                        <label
                            htmlFor="workoutDuration"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[var(--color-text-primary)]
                            "
                        >
                            Workout Duration
                        </label>

                        <div className="relative">
                            <input
                                id="workoutDuration"
                                type="number"
                                min="10"
                                max="180"
                                step="5"
                                value={workoutDuration}
                                onChange={(event) =>
                                    setWorkoutDuration(event.target.value)
                                }
                                placeholder="Enter duration"
                                className="
                                    w-full
                                    rounded-[var(--radius-md)]
                                    border
                                    border-[var(--border-color-default)]
                                    bg-[var(--color-surface)]
                                    px-4
                                    py-3
                                    pr-16
                                    text-[var(--color-text-primary)]
                                    outline-none
                                    transition
                                    focus:border-[var(--border-color-focus)]
                                    focus:ring-2
                                    focus:ring-[var(--border-color-focus)]
                                "
                            />

                            <span
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-sm
                                    text-[var(--color-text-muted)]
                                "
                            >
                                min
                            </span>
                        </div>
                    </div>

                    {/* ========================================== */}
                    {/* ACTIONS */}
                    {/* ========================================== */}

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>

                        <Button type="submit">
                            Create Workout
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

export default WorkoutForm;