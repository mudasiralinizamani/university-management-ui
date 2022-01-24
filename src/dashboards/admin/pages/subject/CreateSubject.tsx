import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Axios, AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../core/api/axios";
import {
  DepartmentEndpoints,
  UsersEndpoints,
  SubjectEndpoints,
} from "../../../../core/api/endpoints";
import { IDepartment } from "../../../../core/models/IDepartment.interface";
import { IUser } from "../../../../core/models/IUser.interface";
import { ICreateFaculty } from "../../models/ICreateFaculty.interface";
import { ICreateSubject } from "../../models/ICreateSubject.interface";

function CreateSubject() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [teachers, setTeachers] = useState<IUser[]>();
  const [departments, setDepartments] = useState<IDepartment[]>();

  // Form Data
  const [teacherId, setTeacherId] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const getTeachers = async () =>
      await axios
        .get(UsersEndpoints.GetTeachers)
        .then((res) => setTeachers(res.data))
        .catch((err: AxiosError) => setTeachers([]));
    const getDepartments = async () =>
      await axios
        .get(DepartmentEndpoints.GetAll)
        .then((res) => setDepartments(res.data))
        .catch((err: AxiosError) => setDepartments([]));
    getTeachers();
    getDepartments();
    return () => {
      setDepartments([]);
      setTeachers([]);
    };
  }, []);

  const defaultTeacherProps = {
    options: teachers,
    getOptionLabel: (option: IUser) => option.fullName,
  };

  const defaultDepartmentProps = {
    options: departments,
    getOptionLabel: (option: IDepartment) => option.name,
  };

  const Submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (teacherId === "" || teacherId == null || teacherId == undefined)
      return enqueueSnackbar("Plz select a teacher", { variant: "error" });
    else if (
      departmentId === "" ||
      departmentId == null ||
      departmentId == undefined
    )
      return enqueueSnackbar("Plz select a department", { variant: "error" });
    else if (name === "" || name == null || name == undefined)
      return enqueueSnackbar("Name cannot be empty", { variant: "error" });
    else if (name.length >= 20)
      return enqueueSnackbar("Name cannot be 20 characters long", {
        variant: "error",
      });
    let model: ICreateSubject = {
      departmentId: departmentId,
      name: name,
      teacherId: teacherId,
    };
    await axios
      .post(SubjectEndpoints.Create, model)
      .then((res) => {
        if (res.data.succeeded) {
          enqueueSnackbar("Subject Created", {
            variant: "success",
          });
          navigate("/admin/subjects", { replace: true });
        }
      })
      .catch((err: AxiosError) => {
        switch (err.response?.data.code) {
          case "TeacherNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "InvalidRole":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "DepartmentNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "NameFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "ServerError":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          default:
            enqueueSnackbar("Something went wrong", { variant: "error" });
            break;
        }
      });
  };

  return (
    <div className="page__wrapper">
      <div className="entry">
        <div className="entry__wrap">
          <div className="entry__title">Create Subject</div>
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
                {...defaultTeacherProps}
                id="clear-on-escape"
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setTeacherId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Hod *"
                    variant="standard"
                  />
                )}
              />
              <Autocomplete
                {...defaultDepartmentProps}
                id="clear-on-escape"
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setDepartmentId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Department *"
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

export default CreateSubject;
