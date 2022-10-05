const calcBMI = (heightCM: number, massKG: number ) : string => {
    const res = massKG / Math.pow(heightCM / 100, 2)

    switch (true){
        case (res < 16):
            return "Underweight (Severe thinness)";
        case (res < 17):
            return "Underweight (Moderate thinness)";
        case (res< 18.5):
            return "Underweight (Mild thinness)";
        case (res < 25):
            return "Normal range";
        case (res< 30):
            return "Overweight (Pre-obese)";
        case (res < 35):
            return "Obese (Class I)";
        case (res < 40):
            return "Obese (Class II)";
        default:
            return "Obese (Class III)";
    }
}

module.exports = calcBMI
