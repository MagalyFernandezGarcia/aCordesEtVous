const NewDisplay = () => {
	return (
		<form className="formUpdate">
			<h1 className="formTitle">Créer une ambiance </h1>
			<div>
				<label htmlFor="wpTitle">Titre pour WordPress : </label>
				<input type="text" id="wpTitle" name="wpTitle" />
			</div>
			<div>
				<label htmlFor="podTitle">Nom de l'ambiance : </label>
				<input type="text" id="podTitle" name="podTitle" />
			</div>

			<div>
				<label htmlFor="photos">Ajouter une photo : </label>
				<input
					type="file"
					id="photos"
					name="photos"
					multiple

					// onChange={handleFileChange}
				/>
			</div>
			<button type="submit" className="formSubmit">
				valider
			</button>
		</form>
	);
};

export default NewDisplay;
