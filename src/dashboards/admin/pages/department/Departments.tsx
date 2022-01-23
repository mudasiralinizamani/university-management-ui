import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IDepartment } from "../../../../core/models/IDepartment.interface";

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
import { DepartmentEndpoints } from "../../../../core/api/endpoints";

function Departments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<IDepartment[]>();

  useEffect(() => {
    const getDepartments = async () =>
      await axios
        .get<IDepartment[]>(DepartmentEndpoints.GetAll)
        .then((res) => setDepartments(res.data))
        .catch((err: AxiosError) => setDepartments([]));
    getDepartments();
    return () => setDepartments([]);
  }, []);

  // Grid Data
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width: 210 },
    {
      field: "hodName",
      headerName: "Hod",
      width: 210,
      renderCell: (params: GridRenderCellParams) => (
        <Link
          to={`/admin/users/${params.row.hodId}`}
          style={{ color: "#170f42" }}
        >
          {params.row.hodName}
        </Link>
      ),
    },
    {
      field: "facultyName",
      headerName: "Faculty",
      width: 210,
      renderCell: (params: GridRenderCellParams) => (
        <Link
          to={`/admin/faculties/${params.row.facultyId}`}
          style={{ color: "#170f42" }}
        >
          {params.row.facultyName}
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
          onClick={() => navigate(`/admin/departments/${params.row.id}`)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const rows: GridRowsProp = departments!;

  return (
    <>
      <div className="sorting1">
        <div className="sorting1__row">
          <h1 className="sorting1__title" style={{ fontSize: "18px" }}>
            <Link to="/admin/departments/create">Create Departments</Link>
          </h1>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </>
  );
}

export default Departments;
