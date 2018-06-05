import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name, placeholder, value, error, info, onChange, loading, options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))
  return (
    <div className="form-group">
      <select className={classnames(
        "form-control form-control-lg",
        {
          "is-invalid": error && !loading
        }
      )} name={name} value={value} onChange={onChange} >
        { selectOptions }
      </select>
      {error && !loading ? <div className="invalid-feedback">
        {error}
      </div> : info && <small className="form-text text-muted">
        {info}
      </small>}
    </div>
  )
};


SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  loading: PropTypes.bool,
  options: PropTypes.array.isRequired
};


export default SelectListGroup; 