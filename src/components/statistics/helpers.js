export function getDaysInGivenMonth(givenMonth) {
	const currentDate = givenMonth
		? new Date(new Date().getFullYear(), parseInt(givenMonth, 10), 1)
		: new Date()

	const year = currentDate.getFullYear()
	const month = currentDate.getMonth() + 1

	const lastDayOfMonth = new Date(year, month, 0)

	const daysAndMonthsArray = []
	for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
		const formattedDate = `${(day < 10 ? "0" : "") + day.toString()}`
		daysAndMonthsArray.push(formattedDate)
	}

	return daysAndMonthsArray
}

export function getDatesInRange(startDate, endDate) {
	const dateArray = []
	let currentDate = new Date(startDate)

	const finalDate = endDate ? new Date(endDate) : new Date()

	while (currentDate <= finalDate) {
		dateArray.push(currentDate.toISOString().slice(8, 10))
		currentDate.setDate(currentDate.getDate() + 1)
	}

	return dateArray
}
