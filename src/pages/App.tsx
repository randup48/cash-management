import { Button, Fab, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "../styles/index.scss";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { category, filterByCategory, filterMonthYear } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Expense, FilterCategoryExpense } from "../utils/models/expense";
import { useAppDispatch } from "../store/hook";
import { setInitial } from "../store/dataExpenseSlice";
import { SummaryExpenses } from "../components/summary_category";
import DeleteIcon from "@mui/icons-material/Delete";
import { modalDelete } from "../components/modal_delete";
import AddchartIcon from "@mui/icons-material/Addchart";
import { convertEpoch } from "../utils/format_date";
import { setLocalStorage } from "../utils/config_localStorage";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [dataLocal, setDataLocal] = useState<Expense[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(Date.now());
  const [filteredExpense, setFilteredExpense] =
    useState<FilterCategoryExpense | null>(null);
  const [isDelete, setIsDelete] = useState(true);

  const [modalHapusData, setModalHapusData] = useState(false);
  const handelModalHapusUser = () => setModalHapusData(!modalHapusData);

  useEffect(() => {
    const data = localStorage.getItem("DATA_EXPENSE");

    if (data !== null) {
      let parsedData: Expense[] = JSON.parse(data);

      dispatch(setInitial(parsedData));

      setDataLocal(parsedData);

      setFilteredExpense(
        filterByCategory(filterMonthYear(parsedData, selectedDate ?? 0))
      );
    }

    if (isDelete) setIsDelete(true);
  }, [selectedDate, isDelete]);

  const handelDelete = () => {
    const deleteData = dataLocal.filter(
      (element) =>
        !(convertEpoch(element.date) === convertEpoch(selectedDate ?? 0))
    );

    setLocalStorage(deleteData);
    dispatch(setInitial([]));
    setIsDelete(false);
    setModalHapusData(!modalHapusData);
  };

  return (
    <div id="App">
      {/* pop up delete */}
      {modalDelete({
        openModal: modalHapusData,
        closeModal: handelModalHapusUser,
        ontap: () => {
          handelDelete();
        },
      })}

      <div id="HeaderHome">
        <Typography variant="h4" fontWeight={600}>
          Monthly Expense
        </Typography>

        {filteredExpense !== null ? (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon color="primary" />}
            onClick={handelModalHapusUser}
            sx={{ my: 1 }}
          >
            Delete
          </Button>
        ) : (
          <></>
        )}
      </div>

      <div id="MonthAdd">
        <div id="MonthPicker">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              openTo="month"
              views={["year", "month"]}
              label="Year and Month"
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <Button
          id="AddBtn"
          variant="contained"
          startIcon={<AddchartIcon />}
          sx={{ display: "none" }}
          size="large"
          onClick={() => {
            navigate("/add");
          }}
        >
          Add Expense
        </Button>
      </div>

      {filteredExpense !== null ? (
        <div id="ChartSummary">
          <div id="Chart">
            <Doughnut
              data={{
                labels: category.map((e) => e.value),
                datasets: [
                  {
                    label: "# of Votes",
                    data: [
                      filteredExpense.primary.reduce(
                        (before, after) => before + after.amount,
                        0
                      ),
                      filteredExpense.unexpected.reduce(
                        (before, after) => before + after.amount,
                        0
                      ),
                      filteredExpense.hobies.reduce(
                        (before, after) => before + after.amount,
                        0
                      ),
                      filteredExpense.education.reduce(
                        (before, after) => before + after.amount,
                        0
                      ),
                    ],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          <SummaryExpenses
            primary={filteredExpense.primary}
            unexpected={filteredExpense.unexpected}
            education={filteredExpense.education}
            hobies={filteredExpense.hobies}
          />
        </div>
      ) : (
        <Typography>Data Belum ada</Typography>
      )}

      <Fab
        id="FloatBtn"
        color="primary"
        sx={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
        }}
        onClick={() => {
          navigate("/add");
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default App;
