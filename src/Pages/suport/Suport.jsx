import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Switch,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
const Suport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return <Box m={3}>Suport</Box>;
};

export default Suport;
