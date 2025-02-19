import { Fragment, useEffect, useState } from "react";
import { Tarifs } from "../../Types/tarifs";
import { fetchPackageList, fetchTarifsList } from "../../Services/getServices";
import { Package } from "../../Types/package";
import "./tarifsPage.css";
import { Link } from "react-router-dom";

const TarifsPage = ({
	onSetCurrentPage,
	onSetPodId,
}: {
	onSetCurrentPage: React.Dispatch<React.SetStateAction<string>>;
	onSetPodId: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
	const [tarifsArray, setTarifsArray] = useState<Tarifs[]>([]);
	const [packageArray, setPackageArray] = useState<Package[]>([]);

	useEffect(() => {
		onSetCurrentPage("Tarifs");
		const fetchData = async () => {
			let ignore = false;

			const resultTarifs = await fetchTarifsList();
			const resultPackage = await fetchPackageList();
			if (!ignore) {
				setTarifsArray(resultTarifs);
				setPackageArray(resultPackage);
			}

			return () => {
				ignore = true;
			};
		};

		fetchData();
	}, []);

	const { forfaits, tarifsGuinguette } = packageArray.reduce<{
		forfaits: Package[];
		tarifsGuinguette: Package[];
	}>(
		(acc, packages) => {
			if (packages.composition.includes("bar")) {
				acc.forfaits.push(packages);
			} else {
				acc.tarifsGuinguette.push(packages);
			}
			return acc;
		},
		{ forfaits: [], tarifsGuinguette: [] }
	);

	const forfaitsDisplay = forfaits.map((tarif) => {
		return (
			<div key={tarif.id} className="tarifsContainer">
				<div className="updateTarifCOntainer">
					<Link to="/updatePackages" onClick={() => onSetPodId(tarif.id)}>
						<img src="/pen.svg" alt="update icon" className="updateIcon" />
					</Link>
					<p>{tarif.duree}</p>
				</div>

				<p>{tarif.prix} €</p>
			</div>
		);
	});
	const guinguette = tarifsGuinguette.map((tarif) => {
		return (
			<div key={tarif.id} className="tarifsContainer">
				<div className="updateTarifCOntainer">
					<Link to="/updateTarifs" onClick={() => onSetPodId(tarif.id)}>
						<img src="/pen.svg" alt="update icon" className="updateIcon" />
					</Link>
					<p>{tarif.composition}</p>
				</div>
				<p>{tarif.prix} €</p>
			</div>
		);
	});

	const salle = tarifsArray.map((tarif) => {
		return (
			<div key={tarif.id} className="tarifsContainer">
				<div className="updateTarifCOntainer">
					<Link to="/updateTarifs" onClick={() => onSetPodId(tarif.id)}>
						<img src="/pen.svg" alt="update icon" className="updateIcon" />
					</Link>
					<p>{tarif.title.rendered}</p>
				</div>
				<p>{tarif.prix} €</p>
			</div>
		);
	});

	return (
		<main className="tarifPage">
			<section>
				<h2 className="tarifPageTitle">Salle</h2>
				{salle}
			</section>
			<section>
				<h2 className="tarifPageTitle">Guinguette</h2>
				{guinguette}
			</section>
			<section>
				<h2 className="tarifPageTitle">Forfaits</h2>
				{forfaitsDisplay}
			</section>
		</main>
	);
};

export default TarifsPage;
