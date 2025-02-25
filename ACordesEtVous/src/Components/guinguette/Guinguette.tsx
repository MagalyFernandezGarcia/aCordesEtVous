import { useEffect, useState } from "react";
import {
  fetchPackageList,
  fetchScheduleList,
} from "../../Services/getServices";
import { Horaire } from "../../Types/horaires";
import "./guinguette.css";
import { Package } from "../../Types/package";
import { fetchCurrentUser } from "../../Services/autServices";
import { Link } from "react-router-dom";
import React from "react";
import { deletePackage, deleteSchedule } from "../../Services/deleteService";
import DeleteModal from "../../Container/DeleteModal/DeleteModal";

const Guinguette = ({
  onSetCurrentPage,
  onsetPodId,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;

  onsetPodId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  const [schedules, setSchedule] = useState<Horaire[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [auth, setAuth] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(0);

  useEffect(() => {
    onSetCurrentPage("Guinguette");
    const fetchData = async () => {
      let ignore = false;

      const resultSchedule = await fetchScheduleList();
      const resultPackages = await fetchPackageList();

      const resultAuth = await fetchCurrentUser();
      if (!ignore) {
        setSchedule(resultSchedule);
        setPackages(resultPackages);
        setAuth(resultAuth?.name ?? "");
      }

      return () => {
        ignore = true;
      };
    };

    fetchData();
  }, [modalDelete]);

  const displaySchedule = schedules.map((schedule) => {
    if (schedule.precision !== "A partir de") {
      return (
        <React.Fragment key={schedule.id}>
          {modalDelete && itemToDelete === schedule.id && (
            <DeleteModal
              onModalDelete={setModalDelete}
              onDelete={() => deleteSchedule(schedule.id)}
            />
          )}
          <img
            src={schedule.image_de_lhoraire.guid}
            alt="horaire"
            className="scheduleImg"
          />
          <div className="updateContainer">
            <h3 className="subTitle">{schedule.precision}</h3>
            {auth === "admin" && (
              <button className="linkBtn">
                <Link
                  to="/updateSchedule"
                  onClick={() => onsetPodId(schedule.id)}
                >
                  <img
                    src="/pen.svg"
                    alt="update icon"
                    className="updateIconDisplay"
                  />
                </Link>
              </button>
            )}
            {auth === "admin" && (
              <button
                className="deleteBtn"
                onClick={() => {
                  setModalDelete(true);
                  setItemToDelete(schedule.id);
                }}
              >
                <img
                  src="/trash.svg"
                  alt="delete icon"
                  className="deleteIcon"
                />
              </button>
            )}
          </div>
        </React.Fragment>
      );
    } else if (schedule.jours === "Dimanche") {
      return (
        <div key={schedule.id} className=" scheduleContainer dimanche">
          {modalDelete && itemToDelete === schedule.id && (
            <DeleteModal
              onModalDelete={setModalDelete}
              onDelete={() => deleteSchedule(schedule.id)}
            />
          )}
          <div className="updateContainer">
            <p className="days">• {schedule.jours}</p>
            {auth === "admin" && (
              <button className="linkBtn">
                <Link
                  to="/updateSchedule"
                  onClick={() => onsetPodId(schedule.id)}
                >
                  <img
                    src="/pen.svg"
                    alt="update icon"
                    className="updateIconDisplay"
                  />
                </Link>
              </button>
            )}
            {auth === "admin" && (
              <button
                className="deleteBtn"
                onClick={() => {
                  setModalDelete(true);
                  setItemToDelete(schedule.id);
                }}
              >
                <img
                  src="/trash.svg"
                  alt="delete icon"
                  className="deleteIcon"
                />
              </button>
            )}
          </div>

          <p className="precision">
            {schedule.precision} {schedule.heure.slice(0, -3)}
          </p>
        </div>
      );
    } else {
      return (
        <div key={schedule.id} className="scheduleContainer">
          {modalDelete && itemToDelete === schedule.id && (
            <DeleteModal
              onModalDelete={setModalDelete}
              onDelete={() => deleteSchedule(schedule.id)}
            />
          )}
          <div className="updateContainer">
            <p className="days">• {schedule.jours}</p>
            {auth === "admin" && (
              <button className="linkBtn">
                <Link
                  to="/updateSchedule"
                  onClick={() => onsetPodId(schedule.id)}
                >
                  <img
                    src="/pen.svg"
                    alt="update icon"
                    className="updateIconDisplay"
                  />
                </Link>
              </button>
            )}
            {auth === "admin" && (
              <button
                className="deleteBtn"
                onClick={() => {
                  setModalDelete(true);
                  setItemToDelete(schedule.id);
                }}
              >
                <img
                  src="/trash.svg"
                  alt="delete icon"
                  className="deleteIcon"
                />
              </button>
            )}
          </div>
          <p className="precision">
            {schedule.precision} {schedule.heure.slice(0, -3)}
          </p>
        </div>
      );
    }
  });

  const sortedPackage = packages.filter((packages) =>
    packages.composition.includes("boissons")
  );

  const displayPackage = sortedPackage.map((packages) => {
    return (
      <div key={packages.id} className="tarifContainer">
        {modalDelete && itemToDelete === packages.id && (
          <DeleteModal
            onModalDelete={setModalDelete}
            onDelete={() => deletePackage(packages.id)}
          />
        )}
        <div className="updateContainer">
          {auth === "admin" && (
            <button className="linkBtn">
              <Link
                to="/updatePackages"
                onClick={() => onsetPodId(packages.id)}
              >
                <img
                  src="/pen.svg"
                  alt="update icon"
                  className="updateIconDisplay"
                />
              </Link>
            </button>
          )}

          {auth === "admin" && (
            <button
              className="deleteBtn"
              onClick={() => {
                setModalDelete(true);
                setItemToDelete(packages.id);
              }}
            >
              <img src="/trash.svg" alt="delete icon" className="deleteIcon" />
            </button>
          )}

          <p>{packages.composition}</p>
        </div>

        <p className="price">{packages.prix} €</p>
      </div>
    );
  });

  return (
    <main className="guinguette">
      <section className="section">
        <h2 className="titleSchedule">
          Horaires d'ouverture{" "}
          {auth === "admin" && (
            <button className="linkBtn">
              <Link to="/updateSchedule" onClick={() => onsetPodId(undefined)}>
                <img src="/plus.svg" alt="update icon" className="addIcon" />
              </Link>
            </button>
          )}
        </h2>
        <div className="schedule">{displaySchedule}</div>
        <p className="textSchedule">Privatisation sur demande</p>
      </section>
      <section className="section desktopOnly">
        <h2>
          Forfaits
          {auth === "admin" && (
            <button className="linkBtn">
              <Link to="/updatePackages" onClick={() => onsetPodId(undefined)}>
                <img src="/plus.svg" alt="update icon" className="addIcon" />
              </Link>
            </button>
          )}
        </h2>
        <div className="schedule ">{displayPackage}</div>
      </section>
      <img src="/bar.jpg" alt="bar" className="barImg mobileOnly" />
    </main>
  );
};

export default Guinguette;
