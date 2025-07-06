import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GeneralContext } from "../../context/GeneralContext";

const FormField = ({
  label,
  name,
  type = "text",
  onChange,
  value = "",
  date,
}) => {
  const [slotOptions, setSlotOptions] = useState(null);
  const [loading, setLoading] = useState(null);
  const { tokenStorage } = useContext(AuthContext);
  const { getAvailablesSlots } = useContext(GeneralContext);

  const fetchSlots = async () => {
    const availablesSlots = await getAvailablesSlots(date, setLoading);
    setSlotOptions(availablesSlots);
  };
  
  useEffect(() => {
    if (tokenStorage) {
      if (name === "time" && date) {
        fetchSlots();
      }
    }
  }, []);
  if (name === "time" || name === "location") {
    return (
      <fieldset className="form-field">
        <label htmlFor={name} className="user-label">{label}</label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="input"

        >
          <option value="">-- Choisir une heure --</option>
          {!loading && slotOptions && slotOptions.map((slot) => (
            <option key={slot.id} value={slot.startTime}>
               {slot.startTime.slice(0, 5)}
            </option>
          ))}
        </select>
      </fieldset>
    );
  }

  return (
    <fieldset className="form-field">
      {name === "date" && <label htmlFor={name} className="user-label">
        {label}
      </label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        required
        autoComplete="off"
        className="input"
      />
      {name !== "date" && <label htmlFor={name} className="user-label">
        {label}
      </label>}
    </fieldset>
  );
};

export default FormField;
