import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const ChangeField = ({ name, value, handleChangeData, title }) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const changeFieldState = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h3">
        {title}
      </Typography>
      {edit ? (
        <div className="change-field">
          <TextField
            variant="outlined"
            name={name}
            defaultValue={value}
            value={fieldValue || value}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => {
                handleChangeData(name, fieldValue);
                changeFieldState();
              }}
            >
              {t("save")}
            </Button>
            <Button
              onClick={() => {
                setFieldValue(value);
                handleChangeData(name, value);
                changeFieldState();
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div className="change-field">
          <TextField
            variant="standard"
            value={fieldValue ? fieldValue : value}
            disabled
          />
          <Button onClick={changeFieldState}>
            <EditIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChangeField;
