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
  }, []);

  const displaySchedule = schedules.map((schedule) => {
    if (schedule.precision !== "A partir de") {
      return (
        <React.Fragment key={schedule.id}>
          <img
            src={schedule.image_de_lhoraire.guid}
            alt="horaire"
            className="scheduleImg"
            
          />
          <div className="updateContainer">
            <h3 className="subTitle">{schedule.precision}</h3>
            {auth === "admin" && (
              <Link
                to="/updateSchedule"
                onClick={() => onsetPodId(schedule.id)}
              >
                <img src="/pen.svg" alt="update icon" className="updateIcon" />
              </Link>
            )}
          </div>
        </React.Fragment>
      );
    } else if (schedule.jours === "Dimanche") {
      return (
        <div key={schedule.id} className=" scheduleContainer dimanche">
          <div className="updateContainer">
            <p className="days">• {schedule.jours}</p>
            {auth === "admin" && (
              <Link
                to="/updateSchedule"
                onClick={() => onsetPodId(schedule.id)}
              >
                <img src="/pen.svg" alt="update icon" className="updateIcon" />
              </Link>
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
          <div className="updateContainer">
            <p className="days">• {schedule.jours}</p>
            {auth === "admin" && (
              <Link
                to="/updateSchedule"
                onClick={() => onsetPodId(schedule.id)}
              >
                <img src="/pen.svg" alt="update icon" className="updateIcon" />
              </Link>
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
        <div className="updateContainer">
          <p>{packages.composition}</p>
          {auth === "admin" && (
            <Link to="/updatePackages" onClick={() => onsetPodId(packages.id)}>
              <img src="/pen.svg" alt="update icon" className="updateIcon" />
            </Link>
          )}
        </div>

        <p className="price">{packages.prix} €</p>
      </div>
    );
  });

  return (
    <main className="guinguette">
      <section className="section">
        <h2 className="titleSchedule">Horaires d'ouverture</h2>
        <div className="schedule">{displaySchedule}</div>
        <p className="textSchedule">Privatisation sur demande</p>
      </section>
      <section className="section desktopOnly">
        <h2>Forfaits</h2>
        <div className="schedule ">{displayPackage}</div>
      </section>
      <img src="/bar.jpg" alt="bar" className="barImg mobileOnly" />
    </main>
  );
};

export default Guinguette;
