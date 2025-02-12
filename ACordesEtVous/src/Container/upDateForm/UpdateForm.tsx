const UpdateForm = ({ auth }: { auth: string }) => {
	if (auth === "admin") {
		return <div>UpdateForm</div>;
	}
	return <div>UpdateForm</div>;
};

export default UpdateForm;
