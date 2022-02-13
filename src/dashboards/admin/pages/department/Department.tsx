import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../core/api/axios";
import {
  DepartmentEndpoints,
  SubjectEndpoints,
} from "../../../../core/api/endpoints";
import { IDepartment } from "../../../../core/models/IDepartment.interface";
import { ISubject } from "../../../../core/models/ISubject.interface";

function Department() {
  const { department_id } = useParams();
  const [department, setDepartment] = useState<IDepartment | null>();
  const [subjects, setSubjects] = useState<ISubject[]>();

  useEffect(() => {
    const getDepartment = async () =>
      await axios
        .get(DepartmentEndpoints.GetById + department_id)
        .then((res) => setDepartment(res.data))
        .catch((err: AxiosError) => {});
    const getSubjects = async () =>
      await axios
        .get(SubjectEndpoints.GetByDepartmentId + department_id)
        .then((res) => setSubjects(res.data))
        .catch((err: AxiosError) => setSubjects([]));
    getDepartment();
    return () => {
      setDepartment(null);
      setSubjects([]);
    };
  }, [department_id]);

  return <>Admin Department</>;
}

export default Department;
