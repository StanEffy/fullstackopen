// arguments should be given in an order target_number *one space and then numbers_of_hours_per_day, using comma
// without any space
// 2 1,0,0,4,2,7


type rateDescription = "Dead possum could do better" | "Pathetic" | "Not too bad but could be better";
type rating = 1 | 2 | 3;

interface exerciseStatistics  {
    days: number,
    trained_days: number,
    success: boolean,
    target: number,
    avg_time: number,
    rating: rating,
    ratingDescription: rateDescription
}

export const calculateExercises = (trainingsArray: number[], target: number):exerciseStatistics => {

    const calcRate = (days:number, trainingDays:number):rateDescription => {
        const res = trainingDays / days;

        return res >= 0.7 ? "Not too bad but could be better" : res >= 0.5 ? "Pathetic" : "Dead possum could do better";
    };

    return {
        days: trainingsArray.length,
        trained_days: trainingsArray.filter(t => t > 0).length,
        success: trainingsArray.reduce((acc, next) => acc + next, 0) /  trainingsArray.length >= target,
        avg_time: trainingsArray.reduce((acc, next) => acc + next, 0) /  trainingsArray.length,
        rating: 3,
        target: target,
        ratingDescription: calcRate(trainingsArray.length, trainingsArray.filter(t => t > 0).length)
    };

};

