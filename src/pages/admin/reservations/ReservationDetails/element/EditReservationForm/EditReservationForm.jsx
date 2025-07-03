import { useState } from "react";
import FormField from "../../../../../../components/FormField/FormField";

const EditReservationForm = ({ data, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: data?.User.firstName || "",
    lastName: data?.User.lastName || "",
    email: data?.User.email || "",
    phone: data?.User.phone || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (

    <form action="" method="get"  className="details-card edit-form" >
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
      <div className="actions-btn">
        <button className="confirm">Valider</button>
        <button className="delete" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
};
export default EditReservationForm;
