import { useContext, useState } from "react";
import { useParams } from "react-router";
import FormField from "../../../../../../components/FormField/FormField";
import { AuthContext } from "../../../../../../context/AuthContext";
import { ReservationContext } from "../../../../../../context/ReservationContext";

const EditReservationForm = ({ data, onCancel,setIsEditing }) => {
  const {id} =useParams('id')
  const [formData, setFormData] = useState({
    firstName: data?.User.firstName || "",
    lastName: data?.User.lastName || "",
    email: data?.User.email || "",
    phone: data?.User.phone || "",
    date: data?.date.split("T")[0] || "",
    time: {
      slot: data?.TimeSlot.startTime || "",
      id: data?.timeSlotId || "",
    },
    numberOfPeople:  Number(data?.numberOfPeople) || "",
    capacity: data?.Table.capacity || "",
    location: data?.Table.location || "",
  });
  const { tokenStorage } = useContext(AuthContext);
  const { updateReservationById } = useContext(ReservationContext);

  const updateReservation = async () => {
    const updatedReservation = await updateReservationById(id,formData);
    alert(updatedReservation.message)
    setIsEditing(false)
  };
const handleChange = (e) => {
  console.log('e')
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: name === "numberOfPeople" ? Number(value) : value,
  }));
};


const handleSubmit = (e) => {
  e.preventDefault()
  if (tokenStorage){
    updateReservation(formData)
  }

}
  return (
    <form action="" method="post" className="details-card edit-form" onSubmit={handleSubmit}>
      <h2>Modifier la réservation</h2>
      <fieldset className="border-bottom user-info">
        <FormField
          label="Prénom"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <FormField
          label="Nom"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormField
          label="Téléphone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className="flex border-bottom table-info">
        <div className="date-info">
          <FormField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
          <FormField
            label="Horaires"
            name="time"
            data={{ date: formData.date }}
            value={formData.time}
            onChange={handleChange}
          />
        </div>
        <FormField
          label="Pour combien de personnes?"
          name="numberOfPeople"
          type="checkbox"
          data={{ date: formData.date, timeSlotId: formData.time.id }}
          value={{numberOfPeople: formData.numberOfPeople, capacity: formData.capacity}}
          onChange={handleChange}
        />

         <FormField
            label="Où souhaitez-vous être?"
            name="location"
            data={{ date: formData.date, timeSlotId: formData.time.id, numberOfPeople: formData.numberOfPeople }}
            value={formData.location}
            onChange={handleChange}
          />
      </fieldset>
      <div className="actions-btn">
        <button className="confirm" type="submit">Valider</button>
        <button className="delete" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
};
export default EditReservationForm;
