const FormGroup = ({
  label,
  labelText,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
}) => {
  return (
    <div className="input-box">
      <label htmlFor={label}>{labelText ? labelText : label}</label>
      <div className="inner">
        <Icon size={18} className="icon" />
        <input
          name={label}
          id={label}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormGroup;
