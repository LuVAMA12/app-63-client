import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GeneralContext } from "../../context/GeneralContext";

const FormField = ({ label, name, type = "text", onChange, value, data, placeholder= '' }) => {
  const [slotOptions, setSlotOptions] = useState(null);
  const [locationOptions, setLocationOptions] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [loading, setLoading] = useState(null);
  const { tokenStorage } = useContext(AuthContext);
  const { getAvailablesSlots, getAvailableCapacity, getAvailablesLocations } =
    useContext(GeneralContext);

  const fetchSlots = async () => {
    const availablesSlots = await getAvailablesSlots(data, setLoading);
    setSlotOptions(availablesSlots);
  };
  const fetchMaxCapacity = async () => {
    const maxCapacity = await getAvailableCapacity(data, setLoading);
    setCapacity(maxCapacity);
  };
  const fetchLocations = async () => {
    const locations = await getAvailablesLocations(data, setLoading);
    setLocationOptions(locations);
  };
  useEffect(() => {
    if (tokenStorage && data) {
      if (name === "time" && data.date !== "") {
        fetchSlots();
      } else if (name === "numberOfPeople") {
        if (data.date !== "" && data.timeSlotId !== "") {
          fetchMaxCapacity();
        }
      } else if (name === "location") {
        if (data.numberOfPeople !== ""&& data.date !== "" && data.timeSlotId !== "") {
          fetchLocations();
        }
      }
    }
  }, [data]);

  if (name === "time") {
    return (
      <fieldset className="form-field">
        <label htmlFor={name} className="user-label">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value.id}
          onChange={(e) =>
            onChange({
              target: {
                name,
                value: {
                  ...value,
                  slot: e.target.value,
                  id: e.target.value,
                },
              },
            })
          }
          required
          className="input"
        >
          <option value="">-- Choisir une heure --</option>
          {!loading &&
            slotOptions &&
            slotOptions.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.startTime.slice(0, 5)}
              </option>
            ))}
        </select>
      </fieldset>
    );
  }

  if (name === "location") {
    if (!locationOptions || locationOptions.length === 0) {
      setLocationOptions([value]);
    }
    return (
      <fieldset className="form-field">
        <label htmlFor={name} className="user-label">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="input"
        >
          <option value="">-- Choisir une lieu --</option>
          {!loading &&
            locationOptions &&
            locationOptions.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
        </select>
      </fieldset>
    );
  }
  if (name === "numberOfPeople") {
    if ((value.capacity && !capacity) || value.capacity > capacity) {
      setCapacity(value.capacity);
    }
    return (
      <fieldset className="form-field">
        <legend htmlFor={name} className="user-label">
          {label}
        </legend>

        {capacity ? (
          <div className="capacity-group">
            {Array.from({ length: capacity }, (_, i) => {
              const currentValue = i + 1;
              return (
                <button
                  key={currentValue}
                  type="button"
                  name={name}
                  value={currentValue}
                  className={`capacity ${
                    Number(value.numberOfPeople) === currentValue
                      ? "current-value"
                      : ""
                  }`}
                  onClick={onChange}
                >
                  {currentValue}
                </button>
              );
            })}
          </div>
        ) : (
          <p>Aucune place disponible</p>
        )}
      </fieldset>
    );
  }

  return (
    <fieldset className="form-field">
      {name === "date" && (
        <label htmlFor={name} className="user-label">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        autoComplete="off"
        className="input"
      />
      {name !== "date" && (
        <label htmlFor={name} className="user-label">
          {label}
        </label>
      )}
    </fieldset>
  );
};

export default FormField;
