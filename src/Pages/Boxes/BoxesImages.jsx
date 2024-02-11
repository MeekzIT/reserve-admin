import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  changeBoxSettings,
  getBoxes,
  getSingleBox,
  getSingleOwners,
  getSingleUser,
} from "../../store/actions/users-action";
import Table from "@mui/material/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ImageIcon from "@mui/icons-material/Image";
import EditIcon from "@mui/icons-material/Edit";
import { useIsMobile } from "../../hooks/useScreenType";
import {
  addBox,
  destroyBox,
  destroyBoxImage,
  getBoxImages,
} from "../../store/actions/box";
import CloseIcon from "@mui/icons-material/Close";
import GoBack from "../../components/goBack/GoBack";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "../../components/cloudinaryUploadWidget/CloudinaryUploadWidget";

const BoxesImages = ({ open, setOpen, current }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const data = useSelector((state) => state.user.images);

  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("b2g");
  // Replace with your own upload preset
  const [uploadPreset] = useState("luyk0lcb");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: false, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    multiple: false, //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 800,
    bgcolor: "background.paper",
    border: "3px solid #008491",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: isMobile ? "100vh" : "600px",
    display: isMobile && "flex",
    justifyContent: isMobile && "center",
    alignItems: isMobile && "center",
    flexDirection: isMobile && "column",
    gap: isMobile && "20px",
    overflowY: "scroll",
  };

  useEffect(() => {
    dispatch(
      getBoxImages({
        boxId: current,
      })
    );
  }, []);
  console.log(data);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <div className="mobile-modal-close-btn" onClick={() => setOpen(false)}>
          <CloseIcon fontSize="large" />
        </div>

        <Box>
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
            current={current}
          />
        </Box>
        <hr />
        <Box>
          {data?.length ? (
            <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {data?.map((i) => {
                return (
                  <div key={i.id} style={{ position: "relative" }}>
                    <img alt={i.name} src={i.image} width="250" height="250" />
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          dispatch(destroyBoxImage({ id: i.id }));
                          dispatch(
                            getBoxImages({
                              boxId: current,
                            })
                          );
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </Box>
          ) : (
            <div>
              <Typography>You havnt images, add images !</Typography>
            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default BoxesImages;
