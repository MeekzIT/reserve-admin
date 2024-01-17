import * as React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import {
  getBoxes,
  getSingleOwners,
  getSingleUser,
  changeName,
} from "../../store/actions/users-action";
import { useIsMobile } from "../../hooks/useScreenType";
import { compareWithUTC } from "../../hooks/helpers";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import GoBack from "../../components/goBack/GoBack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  addItemCategories,
  delItemCategories,
  getItemCategories,
} from "../../store/actions/category-action";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
  const [current, setCurrent] = useState(null);
  const [name, setName] = useState("");
  const [openName, setOpenName] = useState(false);
  const [openMode, setOpenMode] = useState(false);
  const [value, setValue] = React.useState(0);
  console.log(itemCategories, newCategories, "-------");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const styleName = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
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
  }, []);

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
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Settings" {...a11yProps(0)} />
            <Tab label="Posts" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
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
                        </TableCell>
                        <TableCell>
                          <Typography> N {row.name}</Typography>
                        </TableCell>

                        <TableCell align="left">
                          <Button
                            variant="contained"
                            onClick={() => {
                              setCurrent(row.p2);
                              setName(row.name);
                              setOpenName(true);
                            }}
                          >
                            {t("edit")}
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
                            {t("add-modessss")}
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
        </CustomTabPanel>
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
              {t("categories")}
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
                      label={i?.Category?.name}
                      onDelete={() =>
                        dispatch(
                          delItemCategories({
                            id: i.id,
                          })
                        )
                      }
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
                      label={i.name}
                      sx={{
                        cursor: "pointer",
                      }}
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
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(changeName({ name, id: current }));
                  dispatch(getBoxes(owner_id, id));
                  setName("");
                  setOpenName(false);
                }}
              >
                {t("save")}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Items;
