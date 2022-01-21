import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FacultyEndpoints } from "../../../../core/api/endpoints";
import { IFaculty } from "../../../../core/models/IFaculty.interface";

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

function Faculties() {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState<IFaculty[]>();

  useEffect(() => {
    const getFaculties = async () =>
      await axios
        .get<IFaculty[]>(FacultyEndpoints.GetAll)
        .then((res) => setFaculties(res.data))
        .catch((err: AxiosError) => setFaculties([]));
    getFaculties();
    return () => setFaculties([]);
  }, []);

  // Grid Data
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width: 210 },
    {
      field: "deanName",
      headerName: "Dean",
      width: 210,
      renderCell: (params: GridRenderCellParams) => (
        <Link
          to={`/admin/users/${params.row.deanId}`}
          style={{ color: "#170f42" }}
        >
          {params.row.deanName}
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
          onClick={() => navigate(`/admin/faculties/${params.row.id}`)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  const rows: GridRowsProp = faculties!;

  return (
    <>
      <div className="sorting1">
        <div className="sorting1__row">
          <h1 className="sorting1__title" style={{ fontSize: "18px" }}>
            <Link to="/admin/faculties/create">Create Faculty</Link>
          </h1>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </>
  );
}

export default Faculties;
