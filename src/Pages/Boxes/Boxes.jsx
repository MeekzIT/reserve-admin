import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  changeBoxSettings,
  getBoxes,
  getSingleBox,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
import Table from "@mui/material/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ImageIcon from "@mui/icons-material/Image";
import EditIcon from "@mui/icons-material/Edit";
import { useIsMobile } from "../../hooks/useScreenType";
import { addBox, destroyBox, getBoxImages } from "../../store/actions/box";
import CloseIcon from "@mui/icons-material/Close";
import GoBack from "../../components/goBack/GoBack";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import BoxesImages from "./BoxesImages";

const Boxes = () => {
  const { id, user_id, owner: ownerParam } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const location = useLocation();
  const user = useSelector((state) => state.user.single);
  const owner = useSelector((state) => state.user.owner);
  const data = useSelector((state) => state.user.boxes);
  const boxInfo = useSelector((state) => state.user.boxInfo);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState(null);
  const [geo, setGeo] = useState(null);
  const [interval, setInterval] = useState(null);
  const [timeZone, setTimeZone] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const [pinCoordinates, setPinCoordinates] = useState([40.18111, 44.51361]); // Initial coordinates

  const handleCloseDelete = () => setOpenDelete(false);

  const handlePinDrag = (e) => {
    const newCoordinates = e.get("target").geometry.getCoordinates();
    setPinCoordinates(newCoordinates);
    console.log("Pin dragged to:", {
      lat: newCoordinates[0],
      lng: newCoordinates[1],
    });
  };

  const handleMapClick = (e) => {
    const clickedCoordinates = e.get("coords");
    setPinCoordinates(clickedCoordinates);
    console.log("Map clicked at:", {
      lat: clickedCoordinates[0],
      lng: clickedCoordinates[1],
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 800,
    bgcolor: "background.paper",
    border: "3px solid #008491",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: isMobile ? "100vh" : "600px",
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
    overflowY: "scroll",
  };
  useEffect(() => {
    dispatch(getSingleUser(user_id));
    dispatch(getBoxes(id));
  }, []);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
  }, [user]);

  return (
    <div>
      <Box m={3}>
        <GoBack prevPath={location.pathname} />
      </Box>

      <Box m={3}>
        <Box>
          <h1>
            {owner?.firstName} {owner?.lastName}
          </h1>
          <h4>{owner?.email}</h4>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => setOpenAdd(true)}
          >
            {t("add-object")}
          </Button>
        </Box>
        <hr />
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("name")}</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            dispatch(getSingleBox(row.id));
                            dispatch(getBoxes(id, row.id));
                            navigate(
                              `/user/${user_id}/owner/${row?.ownerId}/item/${row.id}`
                            );
                          }}
                        >
                          <RemoveRedEyeIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="left">{row.geolocation}</TableCell>

                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setName(row.name);
                            setGeo(row.desc);
                            setPinCoordinates([row.lat, row.lng]);
                            setInterval(row.interval);
                            setTimeZone(row.timeZone);
                            setCurrentId(row.id);
                            setOpen(true);
                          }}
                        >
                          <EditIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            dispatch(
                              getBoxImages({
                                boxId: row.id,
                              })
                            );
                            setCurrentId(row.id);
                            setOpenImage(true);
                          }}
                        >
                          <ImageIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={() => {
                            setOpenDelete(true);
                            setCurrentId(row.id);
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
      </Box>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setGeo("");
          setName("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("edit")}
          </Typography>
          <div
            className="mobile-modal-close-btn"
            onClick={() => {
              setOpen(false);
              setGeo("");
              setInterval("");
              setTimeZone("");
            }}
          >
            <CloseIcon fontSize="large" />
          </div>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={t("name")}
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("desc")}
                  variant="outlined"
                  fullWidth
                  value={geo}
                  onChange={(e) => setGeo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("interval")}
                  variant="outlined"
                  fullWidth
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("interval")}
                  variant="outlined"
                  fullWidth
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <YMaps>
                  <Map
                    defaultState={{ center: pinCoordinates, zoom: 12 }}
                    style={{
                      width: "100%",
                      height: "300px",
                      background: "red",
                    }}
                    onClick={handleMapClick}
                    controls={["smallMapDefaultSet"]}
                  >
                    <ZoomControl options={{ float: "right" }} />
                    <Placemark
                      geometry={pinCoordinates}
                      options={{ draggable: true }}
                      onDrag={handlePinDrag}
                    />
                  </Map>
                </YMaps>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  className="btnsBox"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <div>
                    <Button variant="outlined" onClick={() => setOpen(false)}>
                      {t("cancel")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ color: "white" }}
                      onClick={() => {
                        dispatch(
                          changeBoxSettings({
                            id: currentId,
                            name,
                            desc: geo,
                            interval,
                            lat: pinCoordinates[0],
                            lng: pinCoordinates[1],
                          })
                        );
                        setOpen(false);
                        setGeo("");
                        setName("");
                        setPinCoordinates([40.18111, 44.51361]);
                      }}
                    >
                      {/* 40.17482788135482, lng: 44.56592630820124} */}
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
          setOpenAdd(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("add-object")}
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={t("name")}
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("desc")}
                  variant="outlined"
                  fullWidth
                  value={geo}
                  onChange={(e) => setGeo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("interval")}
                  variant="outlined"
                  fullWidth
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t("interval")}
                  variant="outlined"
                  fullWidth
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <YMaps>
                  <Map
                    defaultState={{ center: pinCoordinates, zoom: 12 }}
                    style={{
                      width: "100%",
                      height: "300px",
                      background: "red",
                    }}
                    onClick={handleMapClick}
                    controls={["smallMapDefaultSet"]}
                  >
                    <ZoomControl options={{ float: "right" }} />
                    <Placemark
                      geometry={pinCoordinates}
                      options={{ draggable: true }}
                      onDrag={handlePinDrag}
                    />
                  </Map>
                </YMaps>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  className="btnsBox"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenAdd(false)}
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ color: "white" }}
                      onClick={() => {
                        dispatch(
                          addBox({
                            ownerId: id,
                            name,
                            desc: geo,
                            interval,
                            lat: pinCoordinates[0],
                            lng: pinCoordinates[1],
                          })
                        );
                        setOpenAdd(false);
                        setGeo("");
                        setName("");
                        setPinCoordinates([40.18111, 44.51361]);
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
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("delete")} ?
          </Typography>
          <Typography
            className="btnsBox"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <div>
              <Button
                variant="contained"
                onClick={handleCloseDelete}
                sx={{ color: "white" }}
              >
                No
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(destroyBox({ id: currentId }));
                  handleCloseDelete();
                }}
              >
                Yes
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
      <BoxesImages
        open={openImage}
        setOpen={setOpenImage}
        current={currentId}
      />
    </div>
  );
};

export default Boxes;
