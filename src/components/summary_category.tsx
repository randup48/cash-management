import Card from "@mui/material/Card/Card";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import { Stack } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { Expense, FilterCategoryExpense } from "../utils/models/expense";

export const SummaryExpenses = ({
  primary,
  unexpected,
  hobies,
  education,
}: FilterCategoryExpense) => {
  return (
    <Stack spacing={2}>
      <Card variant="outlined">{CompCard("Primary", primary)}</Card>
      <Card variant="outlined">{CompCard("Unexpected", unexpected)}</Card>
      <Card variant="outlined">{CompCard("Hobies / Lifestyle", hobies)}</Card>
      <Card variant="outlined">{CompCard("Education", education)}</Card>
    </Stack>
  );
};

const CompCard = (title: string, data: Expense[]) => {
  const navigate = useNavigate();

  return (
    <CardActionArea
      onClick={() => {
        navigate("/detail", { state: data });
      }}
    >
      <CardContent>
        <Typography variant="caption" color={"GrayText"}>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight={500}>
          {`Rp. ${data.reduce((before, after) => before + after.amount, 0)}`}
        </Typography>
      </CardContent>
    </CardActionArea>
  );
};
