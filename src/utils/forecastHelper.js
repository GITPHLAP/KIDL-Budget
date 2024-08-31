export const calculateForecast = (actualSum) => {
    // Get the current month number
    const d = new Date();
    const monthNumber = d.getMonth() + 1 // getMonth() returns month index

    // actualSum for each month * 12 months give a proximity for the ending value
    return (actualSum / monthNumber) * 12
}