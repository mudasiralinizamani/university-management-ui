import { useSnackbar } from "notistack";
import { useState, useEffect, SyntheticEvent } from "react";
import axios from "../../../core/api/axios";
import { FacultyEndpoints, UsersEndpoints } from "../../../core/api/endpoints";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../core/models/IUser.interface";
import { AxiosError } from "axios";

// Importing Components from Material Ui
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface properties {
  facultyId: string;
  setFaculty: any;
}

function FacultyEdit(props: properties) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Form Data
  const [deanId, setDeanId] = useState<string>();

  // Dialog Data
  const [deans, setDeans] = useState<IUser[]>();
  const [open, setOpen] = useState(false);
  const [sureOpen, setSureOpen] = useState(false);

  useEffect(() => {
    const getDeans = async () =>
      await axios
        .get(UsersEndpoints.GetDeans)
        .then((res) => setDeans(res.data))
        .catch((err: AxiosError) => setDeans([]));
    getDeans();
    return () => setDeans([]);
  }, []);

  const defaultProps = {
    options: deans,
    getOptionLabel: (option: IUser) => option.fullName,
  };

  const ChangeDean = async (event: SyntheticEvent) => {
    if (deanId === "" || deanId === null || deanId === undefined)
      return enqueueSnackbar("Plz select a dean", { variant: "error" });
    const model = {
      facultyId: props.facultyId,
      deanId: deanId,
    };
    await axios
      .put(FacultyEndpoints.UpdateDean, model)
      .then((res) => {
        if (res.data.succeeded) {
          props.setFaculty(res.data.faculty);
          setOpen(false);
          return enqueueSnackbar("Faculty Updated", {
            variant: "info",
          });
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
        switch (err.response?.data.code) {
          case "FacultyNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "SameDean":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "DeanNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "UserNotDean":
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

  const onDelete = async (event: SyntheticEvent) => {
    await axios
      .get(FacultyEndpoints.Delete + props.facultyId)
      .then((res) => {
        if (res.data?.succeeded) {
          setSureOpen(false);
          enqueueSnackbar("Faculty Updated", {
            variant: "info",
          });
          return navigate("/admin/faculties", { replace: true });
        }
      })
      .catch((err: AxiosError) => {
        switch (err.response?.data.code) {
          case "NotFound":
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
    <>
      <div className="page2__col page2__col_w65">
        <div className="card1">
          <div className="card1__head">
            <div className="card1__category">Update Faculty</div>
          </div>
          <div className="card1__body">
            <div className="btns">
              <Button variant="outlined">Update</Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginLeft: "7px" }}
                onClick={() => setOpen(true)}
              >
                Change Dean
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginLeft: "7px" }}
                onClick={() => setSureOpen(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Change Faculty dean Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Change Dean</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The Dean will be completely changed.
          </DialogContentText>
          <Autocomplete
            {...defaultProps}
            id="clear-on-escape"
            clearOnEscape
            freeSolo
            onChange={(event, value: any) => setDeanId(value?.id)}
            renderInput={(params) => (
              <TextField {...params} label="Select Dean *" variant="standard" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={ChangeDean}>Update</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Faculty Modal */}
      <Dialog open={sureOpen} onClose={() => setSureOpen(false)}>
        <DialogTitle>Are you sure ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The Faculty will be deleted and Faculty will be removed from
            departments
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSureOpen(false)}>No</Button>
          <Button onClick={onDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FacultyEdit;
