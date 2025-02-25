
import "./modalEvents.css";
const ModalEvent = ({
  imgEvent,
  onOpenModal,
}: {
  imgEvent: string;
  onOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <section className="modalEvent" onClick={()=> onOpenModal(false)}>
      <span className="closeEvent" onClick={() => onOpenModal(false)}>
        &times;
      </span>
      <img src={imgEvent} alt="event" className="modalEventContent"/>
    </section>
  );
};

export default ModalEvent;
