import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../store/actions/users-action"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import AddIcon from "@mui/icons-material/Add"
import { makeArray } from "../../hooks/makeArray"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { useNavigate } from "react-router-dom"
import {
	activityMember,
	destroyMember,
	getMembers,
} from "../../store/actions/members-action"
import BlockIcon from "@mui/icons-material/Block"
import DeleteIcon from "@mui/icons-material/Delete"
import { useIsMobile } from "../../hooks/useScreenType"
import { themePallete } from "../.."
import CloseIcon from "@mui/icons-material/Close"

const Members = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isMobile = useIsMobile()
	const [current, setCurrent] = useState(null)
	const [page, setPage] = useState(0)
	const [pages, setPages] = useState([])
	const [openDel, setOpenDel] = useState(false)
	const [openActivity, setOpenActivity] = useState(false)
	const [activity, setActivity] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState(null)
	const [activityFilter, setActivityFilter] = useState(null)
	const data = useSelector(state => state.members.members)
	const count = useSelector(state => state.members.count)
	const isSuper = useSelector(state => state.auth.isSuper)

	useEffect(() => {
		dispatch(getMembers({ phoneNumber, activity: activityFilter }))
	}, [count, openActivity, phoneNumber, activityFilter])

	useEffect(() => {
		if (count) {
			setPages(makeArray(Math.ceil(count / 12)))
		}
	}, [count])
	console.log(activity, "data")

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: isMobile ? "100%" : 400,
		bgcolor: "background.paper",
		border: `3px solid ${themePallete}`,
		boxShadow: 24,
		p: 4,
		borderRadius: "10px",
		minHeight: isMobile ? "100vh" : null,
		display: isMobile && "flex",
		justifyContent: isMobile && "center",
		alignItems: isMobile && "center",
		flexDirection: isMobile && "column",
		gap: isMobile && "20px",
	}
	return (
		<Box m={3}>
			<Box mb={2}>
				<h1>{t("Members")}</h1>
				<FormControl>
					<InputLabel id='demo-simple-select-label'>{t("activity")}</InputLabel>
					<Select
						sx={{
							minWidth: "200px",
							marginRight: "15px",
						}}
						label={t("active")}
						value={activityFilter}
						onChange={e => {
							setActivityFilter(e.target.value)
						}}
					>
						<MenuItem value={true}>{t("active")}</MenuItem>
						<MenuItem value={false}>{t("blocked")}</MenuItem>
					</Select>
				</FormControl>
				<FormControl
					sx={{
						marginRight: "15px",
					}}
				>
					<TextField
						placeholder={t("phone")}
						variant='outlined'
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
				</FormControl>
				{(phoneNumber !== "" || activityFilter !== null) && (
					<Button
						variant='outlined'
						size='large'
						onClick={() => {
							setPhoneNumber("")
							setActivityFilter(null)
						}}
						sx={{
							marginLeft: "5px",
						}}
					>
						clear filters
					</Button>
				)}
			</Box>
			<Box sx={{ overflow: "auto" }}>
				<Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>{t("name")}</TableCell>
									<TableCell align='left'>{t("email")}</TableCell>
									<TableCell align='left'>{t("country")}</TableCell>
									<TableCell align='left'>{t("active")}</TableCell>
									<TableCell align='left'>{t("delete")}</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.map(row => (
									<TableRow
										key={row.id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component='th' scope='row'>
											{row.firstName} {row.lastName}
										</TableCell>
										<TableCell align='left'>{row.email}</TableCell>
										<TableCell align='left'>{row.Country.name}</TableCell>
										<TableCell align='left'>
											{row.activity ? (
												<span
													style={{
														color: "green",
													}}
												>
													{t("active")}
												</span>
											) : (
												<span
													style={{
														color: "red",
													}}
												>
													{t("block")}
												</span>
											)}
											<Button
												variant='outlined'
												onClick={() => {
													setActivity(row.activity)
													setCurrent(row.id)
													setOpenActivity(true)
												}}
												sx={{
													marginLeft: "5px",
												}}
											>
												<BlockIcon />
											</Button>
										</TableCell>
										<TableCell align='left'>
											<Button
												variant='contained'
												onClick={() => {
													setOpenDel(true)
													setCurrent(row.id)
												}}
											>
												<DeleteIcon sx={{ color: "white" }} />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
			<Box>
				<div className='pagBox'>
					<div className='arrowBack'>
						{pages.length - 1 == page ? (
							<ArrowBackIcon
								onClick={() => {
									setPage(page - 1)
								}}
							/>
						) : null}
					</div>
					{pages.length > 1 &&
						pages.map((s, index) => {
							return (
								<div
									key={index}
									className={page === s ? "ActivePagItem" : "pagItem"}
									onClick={() => {
										setPage(s)
									}}
									style={{
										cursor: "pointer",
									}}
								>
									{s + 1}
								</div>
							)
						})}
					<div className='arrowBack'>
						{pages.length - 1 == page ? null : (
							<ArrowForwardIcon
								onClick={() => {
									setPage(page + 1)
								}}
							/>
						)}
					</div>
				</div>
			</Box>
			<Modal
				open={openDel}
				onClose={() => {
					setOpenDel(false)
					setCurrent(null)
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{t("delete")} ?
					</Typography>
					<Typography
						className='btnsBox'
						id='modal-modal-description'
						sx={{ mt: 2 }}
					>
						<div>
							<Button
								variant='contained'
								onClick={() => {
									setOpenDel(false)
									setCurrent(null)
								}}
								sx={{ color: "white" }}
							>
								No
							</Button>
						</div>
						<div>
							<Button
								variant='outlined'
								onClick={() => {
									dispatch(destroyMember({ id: current }))
									setOpenDel(false)
									setCurrent(null)
								}}
							>
								Yes
							</Button>
						</div>
					</Typography>
				</Box>
			</Modal>

			<Modal
				open={openActivity}
				onClose={() => {
					setOpenActivity(false)
					setCurrent(null)
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<div
						className='mobile-modal-close-btn'
						onClick={() => setOpenActivity(false)}
					>
						<CloseIcon fontSize='large' />
					</div>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{t("Activity")}
					</Typography>
					<Typography
						className='btnsBox'
						id='modal-modal-description'
						sx={{ mt: 2 }}
					>
						<FormControl fullWidth>
							<Select
								value={activity}
								defaultValue={activity}
								onChange={e => {
									setActivity(e.target.value)
									dispatch(
										activityMember({
											id: current,
											activity: e.target.value,
										})
									)
								}}
							>
								<MenuItem value={true}>{t("active")}</MenuItem>
								<MenuItem value={false}>{t("blocked")}</MenuItem>
							</Select>
						</FormControl>
					</Typography>
				</Box>
			</Modal>
		</Box>
	)
}

export default Members
