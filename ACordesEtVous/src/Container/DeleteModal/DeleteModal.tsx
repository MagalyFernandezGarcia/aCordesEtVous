const DeleteModal = ({
  onDelete,

  onModalDelete,
}: {
  onDelete: () => void;

  onModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <main className="ModalDelete">
      <section className="ModalDeleteContent">
        <p>Etes vous sur de vouloir supprimer ?</p>
        <div>
          <button
            onClick={async () => {
              await onDelete();
              onModalDelete(false);
            }}
          >
            Supprimer
          </button>
          <button
            onClick={() => {
              onModalDelete(false);
            }}
          >
            Annuler
          </button>
        </div>
      </section>
    </main>
  );
};

export default DeleteModal;
