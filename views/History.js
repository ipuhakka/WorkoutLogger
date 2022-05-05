import React, { useEffect } from 'react';
import { Button, Card, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Accordion from '../components/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { WeightExerciseType, ExerciseTypes } from '../constansts';
import { getWorkoutHistory } from '../middlewares/workoutMiddleware';

const ExerciseContent = ({exercise, index}) =>
{
    if (exercise.exerciseType === ExerciseTypes.cardioExercise)
    {
        let content = `${exercise.exercise}`;

        if (exercise.time > 0)
        {
            content += ` ${exercise.time}min`;
        }

        if (exercise.distance > 0)
        {
            content += ` ${exercise.distance}m`;
        }

        if (exercise.sets > 1)
        {
            content += ` x ${exercise.sets}`;
        }

        return <Paragraph key={`exercise-${index}-history`}>{content}</Paragraph>
    }
    else
    {
        return exercise.type === WeightExerciseType.custom
            ? exercise.sets.map((set, j) => <Paragraph key={`history-workout-custom-set-${index}-${j}`}>{`${set.reps} x ${set.weight}kg`}</Paragraph>)
            : <Paragraph key={`exercise-${index}-history`}>{`${exercise.sets} x ${exercise.reps} x ${exercise.weight ? exercise.weight : 0}kg`}</Paragraph>;
    }
}

const WorkoutHistory = ({ workout }) =>
{
    return <Accordion title={workout.date}>
        {workout.exercises.map((exercise, i) =>
            <Card key={`exercise-card-${i}`}>
                <Card.Title title={exercise.exercise} />
                <Card.Content>
                    <ExerciseContent exercise={exercise} index={i}></ExerciseContent>  
                </Card.Content>
            </Card>)}
    </Accordion>;
}

const History = () =>
{
    const dispatch = useDispatch();

    const workouts = useSelector((state) => state.workout.workoutHistory);

    useEffect(() =>
    {
        dispatch(getWorkoutHistory());
    }, []);

    return (
        <ScrollView>
            {workouts.map((workout, i) => <WorkoutHistory key={`workout-history-${i}`} workout={workout} />)}
            {/* <Button color='blue'>Lataa lisää edeltäviä harjoituksia</Button> */}
        </ScrollView>
    );
};

export default History;