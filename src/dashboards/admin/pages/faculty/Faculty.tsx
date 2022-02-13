import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DepartmentEndpoints,
  FacultyEndpoints,
} from "../../../../core/api/endpoints";
import { IDepartment } from "../../../../core/models/IDepartment.interface";
import { IFaculty } from "../../../../core/models/IFaculty.interface";
import FacultyDetails from "../../components/FacultyDetails";
import "../../../../assets/scss/dashboards/admin/Faculty.scss";
import axios from "../../../../core/api/axios";
import FacultyEdit from "../../components/FacultyEdit";

function Faculty() {
  const { faculty_id } = useParams();
  const [faculty, setFaculty] = useState<IFaculty | null>();
  const [departments, setDepartments] = useState<IDepartment[]>();

  useEffect(() => {
    const getFaculty = async () =>
      await axios
        .get(FacultyEndpoints.GetById + faculty_id)
        .then((res) => setFaculty(res.data))
        .catch((err: AxiosError) => {});
    const getDepartments = async () =>
      await axios
        .get(DepartmentEndpoints.GetByFacultyId + faculty_id)
        .then((res) => {
          setDepartments(res.data);
        })
        .catch((err: AxiosError) => {
          setDepartments([]);
        });
    getFaculty();
    getDepartments();
    return () => {
      setFaculty(null);
      setDepartments([]);
    };
  }, [faculty_id]);

  return (
    <>
      <div className="page2__row">
        <FacultyEdit
          facultyId={faculty_id!}
          setFaculty={setFaculty}
          key={faculty_id}
        />
        {/* Col w35 START - Mudasir Nizamani */}
        <div className="page2__col page2__col_w35">
          <FacultyDetails
            createdAt={faculty?.createAt!}
            deanId={faculty?.deanId!}
            deanName={faculty?.deanName!}
            id={faculty?.id!}
            name={faculty?.name!}
            updatedAt={faculty?.updateAt!}
            key={faculty?.id!}
          />
          <div className="card1 margin-top-1">
            <div className="card1__head">
              <div className="card1__category">Faculty Departments</div>
            </div>
            <div className="card1__body">
              {departments?.map((department) => {
                return (
                  <div className="card1__list faculty_details_card">
                    <Link
                      className="card1__item"
                      to={`/admin/departments/${faculty_id}`}
                    >
                      {department?.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Col w_35 END */}
      </div>
    </>
  );
}

export default Faculty;
