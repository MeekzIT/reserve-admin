import { Box, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { getCurrency } from "../../hooks/helpers";
import Filters3 from "./components/Filters3";
const ItemFilters = ({
  active,
  filtredDates,
  countryId,
  item,
  itemCurrentValue,
}) => {
  return (
    <Box>
      {filtredDates ? (
        <>
          {active === 1 ? (
            <>
              {" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                }}
              >
                <MonetizationOnIcon sx={{ color: "#008491" }} />
                <Typography>
                  {filtredDates?.MonetizationOnIcon}
                  {getCurrency(countryId)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                }}
              >
                <LocalAtmIcon sx={{ color: "#008491" }} />
                <Typography>
                  {filtredDates?.LocalAtmIcon}
                  {getCurrency(countryId)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "15px",
                }}
              >
                <CreditScoreIcon sx={{ color: "#008491" }} />
                <Typography>
                  {filtredDates?.CreditScoreIcon}
                  {getCurrency(countryId)}
                </Typography>
              </Box>
            </>
          ) : active === 3 ? (
            <Filters3 />
          ) : null}
        </>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
            }}
          >
            <MonetizationOnIcon sx={{ color: "#008491" }} />
            <Typography>
              {itemCurrentValue?.MonetizationOnIcon} {getCurrency(countryId)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
            }}
          >
            <LocalAtmIcon sx={{ color: "#008491" }} />
            <Typography>
              {itemCurrentValue?.LocalAtmIcon}{" "}
              {/* {Number(item?.p17) * Number(item?.p11)} */}
              {getCurrency(countryId)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
            }}
          >
            <CreditScoreIcon sx={{ color: "#008491" }} />
            <Typography>
              {itemCurrentValue?.CreditScoreIcon}{" "}
              {/* {Number(item?.p18) * Number(item?.p12)} */}
              {getCurrency(countryId)}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ItemFilters;
