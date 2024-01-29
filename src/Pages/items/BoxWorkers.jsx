import { useState } from "react";
import * as Yup from "yup";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useParams } from "react-router-dom";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { generatePassword } from "../../hooks/generatePassword";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "../../hooks/useScreenType";
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LockResetIcon from "@mui/icons-material/LockReset";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  addWorker,
  resetWorkerPassword,
} from "../../store/actions/users-action";

const BoxWorkers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { id, owner_id, user_id } = useParams();
  const data = useSelector((state) => state.user.workers);
  const [openAdd, setOpenAdd] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [current, setCurrent] = useState(false);
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const signupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    startHour: Yup.string().required("Required"),
    endHour: Yup.string().required("Required"),
  });
  const resetSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    startHour: Yup.string().required("Required"),
    endHour: Yup.string().required("Required"),
  });
  const initialValuesReset = {
    password: "",
    startHour: "",
    endHour: "",
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    startHour: "",
    endHour: "",
  };
  const style = {
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
  console.log(data, "44444444");
  return (
    <Box p={2}>
      <Box>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          <AddIcon />
        </Button>
      </Box>
      <Box>
        {!data?.length ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3">You havnt workers</Typography>
          </Box>
        ) : (
          <Box sx={{ overflow: "auto" }}>
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("name")}</TableCell>
                      <TableCell align="left">{t("activity")}</TableCell>
                      <TableCell align="left">{t("email")}</TableCell>
                      <TableCell align="left">{t("edit")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.firstName} {row.lastName}
                        </TableCell>
                        <TableCell align="left">
                          <Button variant="contained">
                            <VisibilityIcon />
                          </Button>
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setCurrent(row.id);
                              setOpenReset(true);
                            }}
                          >
                            <LockResetIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        )}
      </Box>
      <Modal
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Worker
          </Typography>
          <div
            className="mobile-modal-close-btn"
            onClick={() => {
              setOpenAdd(false);
            }}
          >
            <CloseIcon fontSize="large" />
          </div>
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={(values) => {
                dispatch(addWorker({ ...values, boxId: id }));
                setOpenAdd(false);
              }}
            >
              {({
                formik,
                errors,
                touched,
                values,
                handleChange,
                setFieldValue,
              }) => (
                <Form style={{ padding: "10px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Worker start time">
                          <MobileTimePicker
                            ampm={false}
                            name="startHour"
                            value={values.startHour}
                            defaultValue={dayjs("2022-04-17T10:00")}
                            onChange={(date) =>
                              setFieldValue("startHour", date.format("HH:mm"))
                            }
                          />
                        </DemoItem>
                      </LocalizationProvider>
                      {touched.startTime && errors.startTime && (
                        <div>{errors.startTime}</div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Worker end time">
                          <MobileTimePicker
                            ampm={false}
                            name="endHour"
                            value={values.endHour}
                            defaultValue={dayjs("2022-04-17T21:00")}
                            onChange={(date) =>
                              setFieldValue("endHour", date.format("HH:mm"))
                            }
                          />
                        </DemoItem>
                      </LocalizationProvider>
                      {touched.endTime && errors.endTime && (
                        <div>{errors.endTime}</div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        type="text"
                        variant="outlined"
                        fullWidth
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {values.password.length > 7 && (
                                <IconButton
                                  onClick={() => {
                                    copyToClipboard(values.password);
                                  }}
                                >
                                  <ContentCopyIcon />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        mt={3}
                        mb={3}
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                          setFieldValue("password", generatePassword(8));
                        }}
                      >
                        Genarate Password
                      </Button>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openReset}
        onClose={() => {
          setOpenReset(false);
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {"edit"}
          </Typography>
          <div
            className="mobile-modal-close-btn"
            onClick={() => {
              setOpenReset(false);
            }}
          >
            <CloseIcon fontSize="large" />
          </div>
          <Box>
            <Formik
              initialValues={initialValuesReset}
              validationSchema={resetSchema}
              onSubmit={(values) => {
                dispatch(resetWorkerPassword({ ...values, id: current }));
                setOpenReset(false);
              }}
            >
              {({
                formik,
                errors,
                touched,
                values,
                handleChange,
                setFieldValue,
              }) => (
                <Form style={{ padding: "10px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Worker start time">
                          <MobileTimePicker
                            ampm={false}
                            name="startHour"
                            value={values.startHour}
                            defaultValue={dayjs("2022-04-17T10:00")}
                            onChange={(date) =>
                              setFieldValue("startHour", date.format("HH:mm"))
                            }
                          />
                        </DemoItem>
                      </LocalizationProvider>
                      {touched.startTime && errors.startTime && (
                        <div>{errors.startTime}</div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="Worker end time">
                          <MobileTimePicker
                            ampm={false}
                            name="endHour"
                            value={values.endHour}
                            defaultValue={dayjs("2022-04-17T21:00")}
                            onChange={(date) =>
                              setFieldValue("endHour", date.format("HH:mm"))
                            }
                          />
                        </DemoItem>
                      </LocalizationProvider>
                      {touched.endTime && errors.endTime && (
                        <div>{errors.endTime}</div>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        type="text"
                        variant="outlined"
                        fullWidth
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {values.password.length > 7 && (
                                <IconButton
                                  onClick={() => {
                                    copyToClipboard(values.password);
                                  }}
                                >
                                  <ContentCopyIcon />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        mt={3}
                        mb={3}
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                          setFieldValue("password", generatePassword(8));
                        }}
                      >
                        Genarate Password
                      </Button>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BoxWorkers;
