import React, { useState, useEffect } from 'react';
import { Button, Card, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Accordion from '../components/Accordion';
import AsyncStorageUtils from '../utils/AsyncStorageUtils';
import { StorageKeys, WeightExerciseType, ExerciseTypes } from '../constansts';

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
            : <Paragraph key={`exercise-${index}-history`}>{`${exercise.sets} x ${exercise.reps} x ${exercise.weight}kg`}</Paragraph>;
    }
}

const WorkoutHistory = ({ workout }) =>
{
    return <Accordion title={workout.date}>
        {workout.exercises.map((exercise, i) =>
            <Card>
                <Card.Title title={exercise.exercise} />
                <Card.Content>
                    <ExerciseContent exercise={exercise} index={i}></ExerciseContent>  
                </Card.Content>
            </Card>)}
    </Accordion>;
}

const History = () =>
{
    const [workouts, setWorkouts] = useState([]);

    useEffect(() =>
    {
        const fetchWorkouts = async() =>
        {
            const storedWorkouts = await AsyncStorageUtils.getJsonAsync(StorageKeys.workouts) || [];

            setWorkouts(storedWorkouts.reverse());
        }

        fetchWorkouts();
    }, []);

    return (
        <ScrollView>
            {workouts.map((workout, i) => <WorkoutHistory key={`workout-history-${i}`} workout={workout} />)}
            {/* <Button color='blue'>Lataa lisää edeltäviä harjoituksia</Button> */}
        </ScrollView>
    );
};

export default History;