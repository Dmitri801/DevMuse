import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name, placeholder, value, error, info, onChange, loading, 
}) => {
  return (
    <div className="form-group">
      <textarea className={classnames(
        "form-control form-control-lg",
        {
          "is-invalid": error && !loading
        }
      )} placeholder={placeholder} name={name} value={value} onChange={onChange}  />
      {error && !loading ? <div className="invalid-feedback">
        {error}
      </div> : info && <small className="form-text text-muted">
        {info}
      </small>}
    </div>
  )
};


TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  loading: PropTypes.bool
};


export default TextAreaFieldGroup; 