import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Tabs, Tab } from "@mui/material";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBoxWorkers, getBoxes } from "../../store/actions/users-action";
import { useIsMobile } from "../../hooks/useScreenType";
import GoBack from "../../components/goBack/GoBack";
import ItemDetail from "./ItemDetail";
import BoxWorkers from "../items/BoxWorkers";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Items = () => {
  const { id, box_id } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getBoxes(id, box_id));
    dispatch(
      getBoxWorkers({
        id: box_id,
      })
    );
  }, []);

  return (
    <div>
      <Box m={2}>
        <GoBack prevPath={location.pathname} />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Posts" {...a11yProps(0)} />{" "}
            <Tab label="Workers" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ItemDetail />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <BoxWorkers />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default Items;
