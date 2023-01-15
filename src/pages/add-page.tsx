import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addData } from "../store/dataExpenseSlice";
import { useAppDispatch } from "../store/hook";
import { category } from "../utils/constant";
import { Expense } from "../utils/models/expense";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";

export default function AddPage() {
  const navigate = useNavigate();

  // const [selectedDate, setSelectedDate] = useState<number>(Date.now());
  const [fieldExpense, setFieldExpense] = useState<Expense>({
    id: Date.now().toString(),
    date: Date.now(),
    category: category[0].id,
    amount: 0,
    desc: "-",
  });

  const dispatch = useAppDispatch();

  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFieldExpense((field): Expense => {
      return {
        ...field,
        [name]: name !== "amount" ? value : parseInt(value),
      };
    });
  };

  const handleChangeDate = (pickedDate: number | null) => {
    setFieldExpense((field): Expense => {
      return {
        ...field,
        date: +dayjs(pickedDate),
      };
    });
  };

  const handelSubmit = () => {
    // console.log(fieldExpense);

    dispatch(addData(fieldExpense));

    navigate("/");
  };

  return (
    <div id="AddPage">
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        color="inherit"
      >
        Back
      </Button>
      <Typography variant="h4" fontWeight={600} sx={{ width: "50%" }}>
        Daily Expense
      </Typography>
      <FormControl id="Form" fullWidth variant="outlined">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            openTo="day"
            // views={["year", "month"]}
            label="Date"
            value={fieldExpense.date}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="category"
          label="Category"
          margin="normal"
          value={fieldExpense.category}
          // helperText="Please select desire category"
          onChange={handleChangeInput}
          type="radio"
          name="category"
          select
          required
        >
          {category.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <FormControl margin="normal" required>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="amount"
            onChange={handleChangeInput}
            type="number"
            name="amount"
            startAdornment={
              <InputAdornment position="start">Rp.</InputAdornment>
            }
            label="Amount"
          />
        </FormControl>
        <TextField
          id="desc"
          label="Description"
          margin="normal"
          onChange={handleChangeInput}
          type="text"
          name="desc"
          multiline
        />
        <Button
          sx={{ mt: "24px" }}
          variant="contained"
          fullWidth
          size="large"
          onClick={handelSubmit}
        >
          add expense
        </Button>
      </FormControl>
    </div>
  );
}
