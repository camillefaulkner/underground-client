export const ConvertDate = (date) => {
    const dateObj = new Date(`${date}T00:00`)

    const monthNameLong = dateObj.toLocaleDateString("en-US", { month: "long" });

    const dayNumber = dateObj.toLocaleDateString("en-US", { day: "numeric"})
    const weekDay = dateObj.toLocaleDateString("en-US", { weekday: "long"}) 


    return <>
        {weekDay} {monthNameLong} {dayNumber}
        </>
}