import { Box, CircularProgress, Button, Typography } from "@mui/material"
import { useIsMobile } from "../../hooks/useScreenType"
import { useTransition } from "react"
import { useTranslation } from "react-i18next"

const CurrentState = ({ data, currency }) => {
	const isMobile = useIsMobile()
	const { t } = useTranslation()

	return (
		<Box m={2}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					color: "#008491",
				}}
			>
				<Typography variant='h4'>{t("Current State")}</Typography>
			</Box>

			{data ? (
				<Box
					sx={{
						display: "flex",
						alignItems: "end",
						gap: "20px",
						justifyContent: "space-between",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							color: "#055abb",
						}}
					>
						<Typography variant='h3'>{data.priceCounter}</Typography>
						<Typography variant='p'>{t("Price")}</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							color: "#008491",
						}}
					>
						<Typography variant='h1'>{data.all}</Typography>
						<Typography variant='p'>{t("Orders count")}</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							color: "#FFA500",
						}}
					>
						<Typography variant='h3'>{data.workerCounter}</Typography>
						<Typography variant='p'>{t("Worker counter")}</Typography>
					</Box>
				</Box>
			) : (
				<CircularProgress />
			)}
		</Box>
	)
}

export default CurrentState
