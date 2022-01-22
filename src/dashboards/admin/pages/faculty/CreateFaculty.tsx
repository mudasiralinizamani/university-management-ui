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
} from "../../../../core/api/endpoints";
import { IUser } from "../../../../core/models/IUser.interface";
import { ICreateFaculty } from "../../models/ICreateFaculty.interface";

function CreateFaculty() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [deans, setDeans] = useState<IUser[]>([]);

  // Form Data
  const [deanId, setDeanId] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const getDeans = async () =>
      axios
        .get(UsersEndpoints.GetDeans)
        .then((res) => setDeans(res.data))
        .catch((err) => setDeans([]));
    getDeans();
    return () => setDeans([]);
  }, []);

  const defaultProps = {
    options: deans,
    getOptionLabel: (option: IUser) => option.fullName,
  };

  const Submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (deanId === "" || deanId === null || deanId === undefined)
      return enqueueSnackbar("Plz select a dean", { variant: "error" });
    else if (name === "" || name === null || name === undefined)
      return enqueueSnackbar("Name cannot be empty", { variant: "error" });
    else if (name.length >= 20)
      return enqueueSnackbar("Name cannot be 20 characters longer", {
        variant: "error",
      });
    let model: ICreateFaculty = {
      deanId: deanId,
      name: name,
    };
    await axios
      .post(FacultyEndpoints.Create, model)
      .then((res) => {
        if (res.data.succeeded) {
          enqueueSnackbar("Faculty Created", {
            variant: "success",
          });
          navigate("/admin/faculties", { replace: true });
        }
      })
      .catch((err: AxiosError) => {
        switch (err.response?.data.code) {
          case "DeanNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "InvalidRole":
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
          <div className="entry__title">Create Faculty</div>
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
                {...defaultProps}
                id="clear-on-escape"
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setDeanId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Dean *"
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

export default CreateFaculty;
