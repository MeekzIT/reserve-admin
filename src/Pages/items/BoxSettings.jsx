import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/useScreenType";
import GoBack from "../../components/goBack/GoBack";
import ChangeField from "../../components/changeField/ChangeField";
import { editItemCategories } from "../../store/actions/category-action";

const BoxSettings = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id, owner_id, user_id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const location = useLocation();
  const user = useSelector((state) => state.user.single);
  const items = useSelector((state) => state.user.items);
  const [changedData, setChangedData] = useState({});

  const handleChangeData = (name, value) => {
    changedData[name] = value;
    setChangedData(changedData);
  };

  const handleEditData = () => {
    const keys = Object.keys(changedData);
    keys.map((i) =>
      dispatch(
        editItemCategories({
          id: i,
          price: changedData[i],
        })
      )
    );
    setChangedData({});
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "space-around",
      }}
      mt={1}
      mb={1}
    >
      {data?.map((entery) => {
        return (
          <ChangeField
            value={entery.price}
            name={entery.id}
            handleChangeData={handleChangeData}
            title={entery?.Category?.nameEn}
          />
        );
      })}
      <Button variant="outlined" fullWidth onClick={() => handleEditData()}>
        {t("save")}
      </Button>
    </Box>
  );
};

export default BoxSettings;
