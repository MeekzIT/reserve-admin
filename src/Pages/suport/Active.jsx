import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
import {
  getActiveSuports,
  sendAnswer,
} from "../../store/actions/suport-action";
import SendIcon from "@mui/icons-material/Send";
import { useIsMobile } from "../../hooks/useScreenType";
const ActiveSuport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [open, setOpen] = useState(false);
  const initialValues = {
    answer: "",
  };
  const validationSchema = Yup.object().shape({
    answer: Yup.string().required(t("required")),
  });
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

  const data = useSelector((state) => state.suport.suport);
  useEffect(() => {
    dispatch(getActiveSuports());
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(sendAnswer({ ...values, id: current }));
    setOpen(false);
    setCurrentQuestion("");
  };
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
                      <TableCell align="left">
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setCurrent(row.id);
                            setCurrentQuestion(row?.question);
                            setOpen(true);
                          }}
                        >
                          <SendIcon />
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
                      clear, you havnt question
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
            {currentQuestion}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                name="answer"
                as={TextField}
                multiline
                rows={4}
                label="Your answer"
                variant="outlined"
                fullWidth
                placeholder="Type your answer here..."
              />
              <Box className="error-message" sx={{ mt: 1 }}>
                <ErrorMessage name="answer" />
              </Box>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
};

export default ActiveSuport;
