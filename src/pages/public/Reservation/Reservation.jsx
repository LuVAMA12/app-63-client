import { useContext, useState } from "react";
import FormField from "../../../components/FormField/FormField";
import { AuthContext } from "../../../context/AuthContext";
import { GeneralContext } from "../../../context/GeneralContext";

const Reservation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: {
      slot: "",
      id: "",
    },
    numberOfPeople: "",
    capacity: "",
    location: "",
  });
  const { tokenStorage } = useContext(AuthContext);
  const { createReservation } = useContext(GeneralContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfPeople" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      if (tokenStorage){
    addReservation()
  }
  };

    const addReservation = async () => {
    const newReservation = await createReservation(formData);
    alert(newReservation.message)
  };

  return (
    <main id="reservation">
      <h1>Reservation</h1>

      <form
        action=""
        method="post"
        className="details-card form"
        onSubmit={handleSubmit}
      >
        <fieldset className="border-bottom user-info">
          <FormField
            label="Prénom"
            name="firstName"
            placeholder="ex: John"
            value={formData.firstName}
            onChange={handleChange}
          />
          <FormField
            label="Nom"
            name="lastName"
            placeholder="ex: Doe"
            value={formData.lastName}
            onChange={handleChange}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="ex: john.doe@mail.com"
            value={formData.email}
            onChange={handleChange}
          />
          <FormField
            label="Téléphone"
            name="phone"
            type="tel"
            placeholder="ex: +33656869565"
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
            value={{
              numberOfPeople: formData.numberOfPeople,
              capacity: formData.capacity,
            }}
            onChange={handleChange}
          />

          <FormField
            label="Où souhaitez-vous être?"
            name="location"
            data={{
              date: formData.date,
              timeSlotId: formData.time.id,
              numberOfPeople: formData.numberOfPeople,
            }}
            value={formData.location}
            onChange={handleChange}
          />
        </fieldset>
        <div className="actions-btn">
          <button className="confirm" type="submit">
            Valider
          </button>
        </div>
      </form>
    </main>
  );
};

export default Reservation;
