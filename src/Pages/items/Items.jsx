import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GoBack from "../../components/goBack/GoBack";
import { Box, Typography, Tabs, Tab } from "@mui/material";

import ItemDetail from "./ItemDetail";
import BoxWorkers from "./BoxWorkers";
import { useDispatch } from "react-redux";
import { getBoxWorkers } from "../../store/actions/users-action";

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
  const { id, owner_id, user_id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(
      getBoxWorkers({
        id,
      })
    );
  }, []);
  return (
    <div>
      <Box m={2}>
        <GoBack prevPath={location.pathname} />
      </Box>
      <hr />
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
      <div></div>
    </div>
  );
};

export default Items;
