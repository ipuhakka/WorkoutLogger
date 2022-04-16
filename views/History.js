import React, { useState, useEffect } from 'react';
import { Button, Card, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Accordion from '../components/Accordion';
import AsyncStorageUtils from '../utils/AsyncStorageUtils';
import { StorageKeys, WeightExerciseType } from '../constansts';

const WorkoutHistory = ({ workout }) =>
{
    return <Accordion title={workout.date}>
        {workout.exercises.map((exercise, i) =>
            <Card>
                <Card.Title title={exercise.exercise} />
                <Card.Content>
                    {exercise.type === WeightExerciseType.custom
                        ? exercise.sets.map((set, j) => <Paragraph key={`history-workout-custom-set-${i}-${j}`}>{`${set.reps} x ${set.weight}kg`}</Paragraph>)
                        : <Paragraph>{`${exercise.sets} x ${exercise.reps} x ${exercise.weight}kg`}</Paragraph>}   
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