import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PrintIcon from "@material-ui/icons/Print";
import axios from "../../../store/axios";
//import { pdf } from "../../../components/tables/pdf";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

function SbaTable({ rows, classID }) {
  const classes = useStyles();
  const [school, setschool] = useState([]);

  useEffect(() => {
    axios.get("/school").then((res) => {
      setschool(res.data);
    });
  }, []);

  const getTotal = (exams, work) => {
    if (!work && !exams) {
      return "-";
    }
    return Number(exams || 0) + Number(work || 0);
  };

  const getGrade = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    if (num >= 75 && num <= 100) {
      return "A1";
    } else if (num >= 70 && num <= 74) {
      return "B2";
    } else if (num >= 65 && num <= 69) {
      return "B3";
    } else if (num >= 60 && num <= 64) {
      return "C4";
    } else if (num >= 55 && num <= 59) {
      return "C5";
    } else if (num >= 50 && num <= 54) {
      return "C6";
    } else if (num >= 45 && num <= 49) {
      return "D7";
    } else if (num >= 40 && num <= 44) {
      return "E8";
    } else if (num >= 0 && num <= 39) {
      return "F9";
    } else {
      return null;
    }
  };

  const getInterpretation = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    num = Number(num);
    if (num > 75 && num <= 100) {
      return "Excellent";
    } else if (num >= 70 && num <= 74) {
      return "Vert good";
    } else if (num >= 65 && num <= 69) {
      return "Good";
    } else if (num >= 60 && num <= 64) {
      return "Credit";
    } else if (num >= 55 && num <= 59) {
      return "Credit";
    } else if (num >= 50 && num <= 54) {
      return "Credit";
    } else if (num >= 45 && num <= 49) {
      return "Pass";
    } else if (num >= 40 && num <= 44) {
      return "Pass";
    } else if (num >= 0 && num <= 39) {
      return "Failure";
    } else {
      return null;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="content__container">
      <button onClick={handlePrint} className="btn blue__btn float-right">
        Print <PrintIcon />
      </button>
      <div className=" mb-3" id="section-to-print">
        <div className="text-center">
          <h3>{school?.fullName}</h3>
          <p>
            <strong>{school?.motto}</strong>
          </p>
        </div>
        <h3>Results for Class {classID}</h3>
        <TableContainer className="mb-5" component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Course</TableCell>
                <TableRow>
                  <TableCell style={{ width: 160 }} align="left">
                    Name of Student
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    ClassWork (%)
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    Exam (%)
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    Total (%)
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    Grade
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    Interpretation
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="left">
                    Position
                  </TableCell>
                </TableRow>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row?._id}>
                  <TableCell>{row?.course}</TableCell>
                  <TableCell align="left">
                    {row?.students.map((user) => (
                      <TableRow
                        align="left"
                        key={user?._id}
                        className="table-borderless"
                      >
                        <TableCell style={{ width: 160 }}>
                          {user?.name}
                        </TableCell>
                        <TableCell style={{ width: 160 }}>
                          {user?.classWorkPercentage}
                        </TableCell>
                        <TableCell style={{ width: 160 }}>
                          {user?.examPercentage || "-"}
                        </TableCell>
                        <TableCell style={{ width: 160 }}>
                          {getTotal(
                            user?.examPercentage,
                            user?.classWorkPercentage
                          )}
                        </TableCell>
                        <TableCell style={{ width: 160 }}>
                          {getGrade(
                            user?.examPercentage,
                            user?.classWorkPercentage
                          )}
                        </TableCell>
                        <TableCell style={{ width: 160 }}>
                          {getInterpretation(
                            user?.examPercentage,
                            user?.classWorkPercentage
                          )}
                        </TableCell>
                        <TableCell style={{ width: 160 }}>
                          {user?.position}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-danger">
                    No data yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default SbaTable;
