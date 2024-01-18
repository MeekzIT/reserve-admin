import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "../../hooks/useScreenType";
import { useEffect, useState } from "react";
import {
  getBoxes,
  getItemSingle,
  getSingleOwners,
} from "../../store/actions/users-action";
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { compareWithUTC } from "../../hooks/helpers";
import GoBack from "../../components/goBack/GoBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getItemCategories } from "../../store/actions/category-action";
import BoxSettings from "./BoxSettings";

const Single = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, owner_id, user_id, single } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [filterOn, setFilterOn] = useState(false);

  const data = useSelector((state) => state.user.singleItem);
  const isSuper = useSelector((state) => state.auth.isSuper);
  const user = useSelector((state) => state.user.single);
  const itemCategories = useSelector((state) => state.category.itemCategories);
  const newCategories = useSelector((state) => state.category.newCategories);

  useEffect(() => {
    // dispatch(getSingleUser(user_id));
    dispatch(getBoxes(owner_id));
    dispatch(getItemSingle(single));
    dispatch(
      getItemCategories({
        id: single,
      })
    );
  }, []);

  useEffect(() => {
    user && dispatch(getSingleOwners(id));
  }, [user, data]);

  return (
    <Box p={2}>
      <Box p={2}>
        <GoBack prevPath={location.pathname} />
      </Box>
      <Grid
        spacing={1}
        sx={{
          padding: "0",
        }}
        container
      >
        <Grid p={2}>
          <Typography id="modal-modal-title" variant="h3" component="h1">
            {t("device")}
            {compareWithUTC(data?.datatime) ? (
              <span className="online">{t("online")}</span>
            ) : (
              <span className="offline">{t("offline")}</span>
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid p={2}>
        <Button
          variant="contained"
          size="large"
          sx={{
            color: "white",
            fontSize: "20px",
          }}
          onClick={() => setFilterOn(!filterOn)}
        >
          {filterOn ? <VisibilityOffIcon /> : <VisibilityIcon />}
          {filterOn ? t("hide") : t("set-parametrs")}
        </Button>
        <Box>{filterOn && <BoxSettings data={itemCategories} />} </Box>
      </Grid>
    </Box>
  );
};

export default Single;
