import { useNavigate } from "react-router-dom"
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
	changeBoxSettings,
	getBoxes,
	getSingleBox,
} from "../../store/actions/users-action"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import EditIcon from "@mui/icons-material/Edit"
import { getMe } from "../../store/actions/auth-action"
import GoBack from "../../components/goBack/GoBack"
import { addBox } from "../../store/actions/box"
import {
	getOwnerCurrent,
	getOwnerStatistics,
} from "../../store/actions/statistics-action"
import Statistic from "../../components/statistics/Statistics"
import CurrentState from "../../components/statistics/CurrentState"
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	border: "3px solid #008491",
	boxShadow: 24,
	p: 4,
	borderRadius: "10px",
}

const OwnerBoxes = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const owner = useSelector(state => state.auth.admin)
	const data = useSelector(state => state.user.boxes)
	const statistic = useSelector(state => state.statistics.owner)
	const ownerCurrent = useSelector(state => state.statistics.ownerCurrent)
	const [open, setOpen] = useState(false)
	const [openAdd, setOpenAdd] = useState(false)
	const [currentId, setCurrentId] = useState(null)
	const [name, setName] = useState(null)
	const [geo, setGeo] = useState(null)
	const [start, setStart] = useState()
	const [end, setEnd] = useState()
	useEffect(() => {
		dispatch(getMe())
	}, [])
	useEffect(() => {
		dispatch(getBoxes(owner?.deviceOwner))
	}, [owner])
	useEffect(() => {
		dispatch(getOwnerStatistics({ ownerId: owner?.deviceOwner, start, end }))
		dispatch(getOwnerCurrent({ ownerId: owner?.deviceOwner }))
	}, [start, end])
	return (
		<div>
			<Box m={3}>
				<GoBack />
				<Box>
					<h1>
						{owner?.firstName} {owner?.lastName}
					</h1>
					<h4>{owner?.email}</h4>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Statistic
						data={statistic}
						start={start}
						end={end}
						setStart={setStart}
						setEnd={setEnd}
					/>
					<CurrentState data={ownerCurrent} />
				</Box>
				<Box
					sx={{
						display: "flex",
						gap: "10px",
					}}
				>
					<Button
						variant='contained'
						sx={{ color: "white" }}
						onClick={() => setOpenAdd(true)}
					>
						{t("add-object")}
					</Button>
				</Box>
				<hr />
				<Box>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>{t("name")}</TableCell>
									<TableCell align='left'></TableCell>
									<TableCell align='left'>{t("geolocation")}</TableCell>
									<TableCell align='left'>{t("edit")}</TableCell>
									<TableCell align='left'>{t("difrentExspenses")}</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.map(row => (
									<TableRow
										key={row.id}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell align='left'>{row.name}</TableCell>
										<TableCell align='left'>
											<Button
												variant='outlined'
												onClick={() => {
													dispatch(getSingleBox(row.id))
													navigate(
														`/owner-items/${owner?.deviceOwner}/${row.id}`
													)
												}}
											>
												<RemoveRedEyeIcon />
											</Button>
										</TableCell>
										<TableCell align='left'>{row.geolocation}</TableCell>
										<TableCell align='left'>
											<Button
												variant='outlined'
												onClick={() => {
													setName(row.name)
													setGeo(row.geolocation)
													setCurrentId(row.id)
													setOpen(true)
												}}
											>
												<EditIcon />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
			<Modal
				open={open}
				onClose={() => {
					setOpen(false)
					setGeo("")
					setName("")
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{t("edit")}
					</Typography>
					<Box>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									label={t("name")}
									variant='outlined'
									fullWidth
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label={t("geolocation")}
									variant='outlined'
									fullWidth
									value={geo}
									onChange={e => setGeo(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography
									className='btnsBox'
									id='modal-modal-description'
									sx={{ mt: 2 }}
								>
									<div>
										<Button variant='outlined' onClick={() => setOpen(false)}>
											{t("cancel")}
										</Button>
									</div>
									<div>
										<Button
											variant='contained'
											sx={{ color: "white" }}
											onClick={() => {
												dispatch(
													changeBoxSettings({
														id: currentId,
														name,
														geolocation: geo,
													})
												)
												setOpen(false)
												setGeo("")
												setName("")
											}}
										>
											{t("edit")}
										</Button>
									</div>
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Modal>

			<Modal
				open={openAdd}
				onClose={() => {
					setOpenAdd(false)
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{t("add-object")}
					</Typography>
					<Box>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									label={t("name")}
									variant='outlined'
									fullWidth
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label={t("geolocation")}
									variant='outlined'
									fullWidth
									value={geo}
									onChange={e => setGeo(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography
									className='btnsBox'
									id='modal-modal-description'
									sx={{ mt: 2 }}
								>
									<div>
										<Button
											variant='outlined'
											onClick={() => setOpenAdd(false)}
										>
											{t("cancel")}
										</Button>
									</div>
									<div>
										<Button
											variant='contained'
											sx={{ color: "white" }}
											onClick={() => {
												dispatch(
													addBox({
														ownerId: owner?.deviceOwner,
														name,
														geolocation: geo,
													})
												)
												setOpenAdd(false)
												setGeo("")
												setName("")
											}}
										>
											{t("add")}
										</Button>
									</div>
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Modal>
		</div>
	)
}

export default OwnerBoxes
