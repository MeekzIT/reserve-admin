import Chart from "react-apexcharts"
import { Box, CircularProgress, Button } from "@mui/material"
import { useIsMobile } from "../../hooks/useScreenType"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import dayjs from "dayjs"
import { getDatesInRange, getDaysInGivenMonth } from "./helpers"

const Statistic = ({ start, end, setStart, setEnd, data }) => {
	const isMobile = useIsMobile()
	const showDates = getDatesInRange(start, end)
	const days = getDaysInGivenMonth(11)
	const chartData = {
		series: [
			{
				name: "Orders",
				data: data?.map(item => parseFloat(item.price)),
			},
		],
		options: {
			chart: {
				height: 350,
				type: "line",
				zoom: {
					type: "x",
					enabled: true,
					autoScaleYaxis: true,
				},
				toolbar: {
					autoSelected: "zoom",
				},
			},

			dataLabels: {
				enabled: false,
			},
			xaxis: {
				categories: showDates.length ? showDates : days,
			},
			grid: {
				borderColor: "#f1f1f1",
			},
		},
	}
	return (
		<Box m={2}>
			<Box sx={{ display: "flex", gap: "20px" }}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={["DatePicker"]}>
						<DatePicker
							label='start'
							format='YYYY-MM-DD'
							value={start}
							onChange={date => setStart(dayjs(date).format("YYYY-MM-DD"))}
							sx={{ width: "250px" }}
						/>
					</DemoContainer>
					<DemoContainer components={["DatePicker"]}>
						<DatePicker
							label='end'
							value={end}
							format='YYYY-MM-DD'
							onChange={date => setEnd(dayjs(date).format("YYYY-MM-DD"))}
							sx={{ width: "250px" }}
						/>
					</DemoContainer>
				</LocalizationProvider>
				{(start || end) && (
					<Button
						onClick={() => {
							setStart(null)
							setEnd(null)
						}}
					>
						clear filtres
					</Button>
				)}
			</Box>
			{!data?.length ? (
				<CircularProgress />
			) : (
				<Chart
					options={chartData?.options}
					series={chartData?.series}
					type='line'
					width={isMobile ? "100%" : "500"}
				/>
			)}
		</Box>
	)
}

export default Statistic
