import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name, placeholder, value, error, icon, onChange, type, loading,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
      </div>
      <input type={type} className={classnames(
        "form-control form-control-lg",
        {
          "is-invalid": error && !loading
        }
      )} placeholder={placeholder} name={name} value={value} onChange={onChange}  />
      {error && !loading ? <div className="invalid-feedback">
        {error}
      </div> : null}
    </div>
  )
};


InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  loading: PropTypes.bool
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup; 