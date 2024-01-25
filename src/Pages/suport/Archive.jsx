import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Switch,
  Typography,
  Tabs,
  Table,
  TableContainer,
  Tab,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  delQuestion,
  getSuportsHistory,
} from "../../store/actions/suport-action";
import { useIsMobile } from "../../hooks/useScreenType";

const ArchiveSuport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const data = useSelector((state) => state.suport.history);
  const [current, setCurrent] = useState(false);
  const [open, setOpen] = useState(false);
  const style = {
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
    dispatch(getSuportsHistory());
  }, []);

  return (
    <Box m={3}>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">{t("name")}</TableCell>
                  <TableCell align="left">{t("email")}</TableCell>
                  <TableCell align="left">{t("date")}</TableCell>
                  <TableCell align="left">{t("question")}</TableCell>
                  <TableCell align="left">{t("answer")}</TableCell>
                  <TableCell align="left">{t("delete")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length > 0 ? (
                  data?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.User?.firstName} {row?.User?.lastName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.User?.email} {row?.User?.lastName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.createdAt.slice(0, 10)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.question}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.answer ? row?.answer : "-"}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setCurrent(row.id);
                            setOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      clear, you havnt archive
                    </Typography>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
                sx={{ color: "white" }}
              >
                No
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(delQuestion({ id: current }));
                  setOpen(false);
                }}
              >
                Yes
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default ArchiveSuport;
