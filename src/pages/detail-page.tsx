import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Expense } from "../utils/models/expense";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import Stack from "@mui/material/Stack/Stack";
import { category } from "../utils/constant";
import Chip from "@mui/material/Chip/Chip";
import dayjs from "dayjs";

export const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as Expense[];

  return (
    <div id="DetailPage">
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        color="inherit"
      >
        Back
      </Button>

      <Typography variant="h4" fontWeight={600} sx={{ width: "50%" }}>
        Detail Expense
      </Typography>

      {state.length ? (
        <Chip
          label={`${
            category.find((val) => val.id === state[0].category)?.value ?? "-"
          }`}
          color="primary"
          sx={{ color: "white" }}
        />
      ) : null}

      {state.length ? (
        <Stack id="DetailItems" spacing={2}>
          {state.map((e, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                <Typography variant="caption" color={"GrayText"}>
                  {dayjs(e.date).format("DD/MM/YYYY, HH:mm:ss")}
                </Typography>
                <Typography variant="h5">{`Rp. ${e.amount}`}</Typography>
                <Typography variant="body1">{e.desc}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography>Data belum ada</Typography>
      )}
    </div>
  );
};
