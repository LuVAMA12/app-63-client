const FormField = ({ label, name, type = "text", onChange, value="" }) => {
  return (
    <fieldset className="form-field">
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
      <label htmlFor={name} className="user-label">{label}</label>
    </fieldset>
  );
};

export default FormField;
