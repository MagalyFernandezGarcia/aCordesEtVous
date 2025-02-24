

const DeleteModal = ({
  onDelete,
  
  onModalDelete,
  id,
}: {
    onDelete: (id: number) =>  void
  
  onModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
    
  return (
    <main className="ModalDelete">
      <section className="ModalDeleteContent">
        <span className="closeDelete">&times;</span>
        <p>Etes vous sur de vouloir supprimer ?</p>
        <div>
          <button
            onClick={async() => {
               await onDelete(id);
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
