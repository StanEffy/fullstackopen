// the number of days
// the number of training days
// the original target value
// the calculated average time
// boolean value describing if the target was reached
// a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
//     a text value explaining the rating
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

const calculateExercises = (trainingsArray: number[], target: number):exerciseStatistics => {

    const calcRate = (days:number, trainingDays:number):rateDescription => {
        const res = trainingDays / days

        return res >= 0.7 ? "Not too bad but could be better" : res >= 0.5 ? "Pathetic" : "Dead possum could do better"
    }

    return {
        days: trainingsArray.length,
        trained_days: trainingsArray.filter(t => t > 0).length,
        success: trainingsArray.reduce((acc, next) => acc + next, 0) /  trainingsArray.length >= target,
        avg_time: trainingsArray.reduce((acc, next) => acc + next, 0) /  trainingsArray.length,
        rating: 3,
        target: target,
        ratingDescription: calcRate(trainingsArray.length, trainingsArray.filter(t => t > 0).length)
    }

}

console.log(calculateExercises( [0, 2, 6, 0, 2, 8], 2))
