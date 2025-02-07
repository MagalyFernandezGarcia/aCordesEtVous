import { useEffect, useState } from "react";
import {
  fetchPackageList,
  fetchScheduleList,
} from "../../Services/getServices";
import { Horaire } from "../../Types/horaires";
import "./guinguette.css";
import { Package } from "../../Types/package";

const Guinguette = ({
  onSetCurrentPage,
}: {
  onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [schedules, setSchedule] = useState<Horaire[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    onSetCurrentPage("Guinguette");
    const fetchData = async () => {
      let ignore = false;

      const resultSchedule = await fetchScheduleList();
      const resultPackages = await fetchPackageList();
      if (!ignore) {
        setSchedule(resultSchedule);
        setPackages(resultPackages);
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
        <h3 key={schedule.id} className="subTitle">
          {schedule.precision}
        </h3>
      );
    } else if (schedule.jours === "Dimanche") {
      return (
        <div key={schedule.id} className=" scheduleContainer dimanche">
          <p className="days">{schedule.jours}</p>
          <p>
            {schedule.precision} {schedule.heure.slice(0, -3)}
          </p>
        </div>
      );
    } else {
      return (
        <div key={schedule.id} className="scheduleContainer">
          <p className="days">{schedule.jours}</p>
          <p>
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
        <p>{packages.composition}</p>
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
      <h2 >Forfaits</h2>
      <div className="schedule ">{displayPackage}</div>
      </section>
      <img src="/bar.jpg" alt="bar" className="barImg" />
    </main>
  );
};

export default Guinguette;
