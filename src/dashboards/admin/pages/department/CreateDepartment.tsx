import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../core/api/axios";
import {
  FacultyEndpoints,
  UsersEndpoints,
  DepartmentEndpoints,
} from "../../../../core/api/endpoints";
import { IFaculty } from "../../../../core/models/IFaculty.interface";
import { IUser } from "../../../../core/models/IUser.interface";
import { ICreateDepartment } from "../../models/ICreateDeparment.interface";

function CreateDepartment() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [hods, setHods] = useState<IUser[]>();
  const [faculties, setFaculties] = useState<IFaculty[]>();

  // Form Data
  const [hodId, setHodId] = useState<string>("");
  const [facultyId, setFacultyId] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const getHod = async () =>
      axios
        .get<IUser[]>(UsersEndpoints.GetHods)
        .then((res) => setHods(res.data))
        .catch((err: AxiosError) => setHods([]));
    const getFaculties = async () =>
      axios
        .get<IFaculty[]>(FacultyEndpoints.GetAll)
        .then((res) => setFaculties(res.data))
        .catch((err: AxiosError) => setFaculties([]));
    getHod();
    getFaculties();
    return () => {
      setHods([]);
      setFaculties([]);
    };
  }, []);

  const defaultHodProps = {
    options: hods,
    getOptionLabel: (option: IUser) => option.fullName,
  };

  const defaultFacultyProps = {
    options: faculties,
    getOptionLabel: (option: IFaculty) => option.name,
  };

  const Submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (hodId === "" || hodId == null || hodId == undefined)
      return enqueueSnackbar("Plz select a hod", { variant: "error" });
    else if (facultyId === "" || facultyId == null || facultyId == undefined)
      return enqueueSnackbar("Plz select a faculty", { variant: "error" });
    else if (name === "" || name == null || name == undefined)
      return enqueueSnackbar("Name cannot be empty", { variant: "error" });
    else if (name.length >= 20)
      return enqueueSnackbar("Name cannot be 20 characters long", {
        variant: "error",
      }); 
    let model: ICreateDepartment = {
      facultyId: facultyId,
      hodId: hodId,
      name: name,
    };
    await axios
      .post(DepartmentEndpoints.Create, model)
      .then((res) => {
        if (res.data.succeeded) {
          enqueueSnackbar("Department Created", {
            variant: "success",
          });
          navigate("/admin/departments", { replace: true });
        }
      })
      .catch((err: AxiosError) => {
        switch (err.response?.data.code) {
          case "HodNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "InvalidRole":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "FacultyNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "NameFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "ServerError":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          default:
            enqueueSnackbar("Something went wrong", { variant: "warning" });
            break;
        }
      });
  };

  return (
    <div className="page__wrapper">
      <div className="entry">
        <div className="entry__wrap">
          <div className="entry__title">Create Department</div>
          <form
            className="entry__form"
            onSubmit={(event) => {
              Submit(event);
            }}
          >
            <div className="entry__group">
              <TextField
                sx={{ marginTop: "14px" }}
                id="outlined-basic"
                label="Name *"
                onChange={(e) => setName(e.target.value)}
                fullWidth
                variant="standard"
              />
              <Autocomplete
                {...defaultHodProps}
                id="clear-on-escape"
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setHodId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Hod *"
                    variant="standard"
                  />
                )}
              />
              <Autocomplete
                {...defaultFacultyProps}
                id="clear-on-escape"
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setFacultyId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Faculty *"
                    variant="standard"
                  />
                )}
              />
            </div>
            <button
              className="entry__btn btn btn btn_big btn_wide btn_blue"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDepartment;
