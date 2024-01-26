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
import { editItemType } from "../../store/actions/type-action";
import { getWord } from "../../hooks/useWord";

const BoxSettings = ({ data, types }) => {
  const dispatch = useDispatch();

  const handleChangeData = (name, value) => {
    dispatch(
      editItemCategories({
        id: name,
        price: value,
      })
    );
  };

  const handleChangeTypesData = (name, value) => {
    dispatch(
      editItemType({
        id: name,
        price: value,
      })
    );
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
      {types?.map((entery) => {
        return (
          <ChangeField
            value={entery.price}
            name={entery.id}
            handleChangeData={handleChangeTypesData}
            title={getWord(entery?.Type)}
          />
        );
      })}
      {data?.map((entery) => {
        return (
          <ChangeField
            value={entery.price}
            name={entery.id}
            handleChangeData={handleChangeData}
            title={getWord(entery?.Category)}
          />
        );
      })}
    </Box>
  );
};

export default BoxSettings;
