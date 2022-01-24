import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IDepartment } from "../../../../core/models/IDepartment.interface";
import { SubjectEndpoints } from "../../../../core/api/endpoints";
import { ISubject } from "../../../../core/models/ISubject.interface";

// Importing Material Ui Components
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import axios from "../../../../core/api/axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Subjects() {
  const navigate = useNavigate();
  const [subjects, setSubject] = useState<ISubject[]>();

  useEffect(() => {
    const getSubjects = async () =>
      await axios
        .get(SubjectEndpoints.GetAll)
        .then((res) => setSubject(res.data))
        .catch((err: AxiosError) => setSubject([]));
    getSubjects();
    return () => setSubject([]);
  }, []);

  // Grid Data
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width: 210 },
    {
      field: "teacherName",
      headerName: "Teacher",
      width: 210,
      renderCell: (params: GridRenderCellParams) => (
        <Link
          to={`/admin/users/${params.row.teacherId}`}
          style={{ color: "#170f42" }}
        >
          {params.row.teacherName}
        </Link>
      ),
    },
    {
      field: "departmentName",
      headerName: "Department",
      width: 210,
      renderCell: (params: GridRenderCellParams) => (
        <Link
          to={`/admin/departments/${params.row.departmentId}`}
          style={{ color: "#170f42" }}
        >
          {params.row.departmentName}
        </Link>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          size="large"
          color="info"
          onClick={() => navigate(`/admin/subjects/${params.row.id}`)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const rows: GridRowsProp = subjects!;

  return (
    <>
      <div className="sorting1">
        <div className="sorting1__row">
          <h1 className="sorting1__title" style={{ fontSize: "18px" }}>
            <Link to="/admin/subjects/create">Create Subject</Link>
          </h1>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </>
  );
}

export default Subjects;
