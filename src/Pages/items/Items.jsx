import React, { useEffect, useState } from "react";
import BoxSettings from "./BoxSettings";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GoBack from "../../components/goBack/GoBack";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "../../hooks/useScreenType";
import { compareWithUTC } from "../../hooks/helpers";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import {
  getBoxes,
  getSingleOwners,
  getSingleUser,
  changeName,
} from "../../store/actions/users-action";
import {
  addItemCategories,
  delItemCategories,
  getItemCategories,
} from "../../store/actions/category-action";
import {
  addItemType,
  delItemType,
  getItemType,
} from "../../store/actions/type-action";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const Items = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, owner_id, user_id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const location = useLocation();
  const user = useSelector((state) => state.user.single);
  const items = useSelector((state) => state.user.items);
  const itemCategories = useSelector((state) => state.category.itemCategories);
  const newCategories = useSelector((state) => state.category.newCategories);
  const itemTypes = useSelector((state) => state.category.itemTypes);
  const newTypes = useSelector((state) => state.category.newTypes);
  const [current, setCurrent] = useState(null);
  const [name, setName] = useState("");
  const [access, setAccess] = useState();
  const [openName, setOpenName] = useState(false);
  const [openMode, setOpenMode] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const styleName = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 600,
    bgcolor: "background.paper",
    border: "3px solid #008491",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    minHeight: isMobile ? "100vh" : null,
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
  };
  useEffect(() => {
    dispatch(getSingleUser(user_id));
    dispatch(getBoxes(owner_id, id));
  }, [openName]);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
  }, [user]);
  return (
    <div>
      <Box m={2}>
        <GoBack prevPath={location.pathname} />
      </Box>
      <hr />
      <Box m={2}>
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {items?.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {compareWithUTC(row.datatime) ? (
                          <span className="online">
                            <CircleIcon />
                          </span>
                        ) : (
                          <span className="offline">
                            <CircleIcon />
                          </span>
                        )}
                        {row.access ? (
                          <CheckBoxIcon sx={{ color: "primary.main" }} />
                        ) : (
                          <IndeterminateCheckBoxIcon
                            sx={{ color: "primary.main" }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography> N {row.name}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={() => {
                            // navigate(`/admin-user/${row.id}`);
                            navigate(`/owner/${owner_id}/item/${id}/${row.p2}`);
                          }}
                        >
                          <RemoveRedEyeIcon
                            sx={{
                              color: "white",
                            }}
                          />
                        </Button>
                      </TableCell>

                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={() => {
                            setCurrent(row.p2);
                            dispatch(
                              getItemCategories({
                                id: row.p2,
                              })
                            );
                            setOpenMode(true);
                          }}
                        >
                          {t("add-modes")}
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={() => {
                            setCurrent(row.p2);
                            dispatch(
                              getItemType({
                                id: row.p2,
                              })
                            );
                            setOpenType(true);
                          }}
                        >
                          {t("add-type")}
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={() => {
                            setCurrent(row.p2);
                            setName(row.name);
                            setAccess(row.access);
                            setOpenName(true);
                          }}
                        >
                          {t("edit")}
                        </Button>
                      </TableCell>
                      <TableCell align="left">ID-{row.p2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <div>
        <Modal
          open={openMode}
          onClose={() => {
            setOpenMode(false);
          }}
        >
          <Box sx={styleName}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("mode")}
            </Typography>
            <div
              className="mobile-modal-close-btn"
              onClick={() => {
                setOpenMode(false);
              }}
            >
              <CloseIcon fontSize="large" />
            </div>

            <Box mt={2}>
              <Stack direction="row" spacing={1}>
                {itemCategories?.map((i) => {
                  return (
                    <Chip
                      label={i?.Category?.nameEn}
                      variant="outlined"
                      sx={{
                        borderColor: "#008491",
                      }}
                      onDelete={() => {
                        dispatch(
                          delItemCategories({
                            id: i.id,
                            p2: current,
                          })
                        );
                        dispatch(
                          getItemCategories({
                            id: current,
                          })
                        );
                      }}
                    />
                  );
                })}
              </Stack>
              <hr />
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {newCategories?.map((i) => {
                  return (
                    <Chip
                      label={i.nameEn}
                      sx={{
                        cursor: "pointer",
                        borderColor: "#008491",
                      }}
                      variant="outlined"
                      onClick={() =>
                        dispatch(
                          addItemCategories({
                            id: current,
                            modeId: i.id,
                          })
                        )
                      }
                    />
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={openType}
          onClose={() => {
            setOpenType(false);
          }}
        >
          <Box sx={styleName}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("add-type")}
            </Typography>
            <div
              className="mobile-modal-close-btn"
              onClick={() => {
                setOpenType(false);
              }}
            >
              <CloseIcon fontSize="large" />
            </div>

            <Box mt={2}>
              <Stack direction="row" spacing={1}>
                {itemTypes?.map((i) => {
                  return (
                    <Chip
                      label={i?.Type?.nameEn}
                      variant="outlined"
                      sx={{
                        borderColor: "#008491",
                      }}
                      onDelete={() => {
                        dispatch(
                          delItemType({
                            id: i.id,
                            p2: current,
                          })
                        );
                        dispatch(
                          getItemType({
                            id: current,
                          })
                        );
                      }}
                    />
                  );
                })}
              </Stack>
              <hr />
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {newTypes?.map((i) => {
                  return (
                    <Chip
                      label={i.nameEn}
                      sx={{
                        cursor: "pointer",
                        borderColor: "#008491",
                      }}
                      variant="outlined"
                      onClick={() =>
                        dispatch(
                          addItemType({
                            id: current,
                            typeId: i.id,
                          })
                        )
                      }
                    />
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={openName}
          onClose={() => {
            setOpenMode(false);
          }}
        >
          <Box sx={styleName}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("Index of post")}
            </Typography>
            <div
              className="mobile-modal-close-btn"
              onClick={() => {
                setOpenName(false);
              }}
            >
              <CloseIcon fontSize="large" />
            </div>
            <Box>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={access}
                      onChange={(e) => setAccess(e.target.checked)}
                    />
                  }
                  label="Disable Reserve"
                />
              </FormGroup>
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(changeName({ name, id: current, access }));
                  dispatch(getBoxes(owner_id, id));
                  setName("");
                  setAccess();
                  setOpenName(false);
                }}
              >
                {t("save")}
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={openSettings}
          onClose={() => {
            setOpenMode(false);
          }}
        >
          <Box sx={styleName}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("settings")}
            </Typography>
            <div
              className="mobile-modal-close-btn"
              onClick={() => {
                setOpenSettings(false);
              }}
            >
              <CloseIcon fontSize="large" />
            </div>

            <BoxSettings data={itemCategories} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Items;
