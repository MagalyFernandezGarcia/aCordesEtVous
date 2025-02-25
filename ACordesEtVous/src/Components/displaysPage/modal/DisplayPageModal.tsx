import { Amenagement } from "../../../Types/amenagements";
import "./displayPageModal.css";

const DisplayPageModal = ({ gallery, onOpenModal }: { gallery: Amenagement , onOpenModal : React.Dispatch<React.SetStateAction<boolean>>}) => {

    
    
    
   const showGallery = gallery.photos.map((photo)=>{
    return (
        <img key={photo.ID} src={photo.guid} alt="aménagement" className="photo" />
    )
   })
  
  const close = ()=>{
    onOpenModal(false)

  }

  return (
    
    <section className="modal" onClick={close}>
        <span className="close" onClick={close}>&times;</span>
      <div className="modalContent">{showGallery}</div>
    </section>
  );
};

export default DisplayPageModal;
