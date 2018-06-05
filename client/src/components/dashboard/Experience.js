import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';


class Experience extends Component {

  onDeleteClick = (id) => {
    this.props.deleteExperience(id);
  }
  render() {
   
    const experience = this.props.experiences.map(exp => (
      <tr key={exp._id}>
        <td className="text-dark">{exp.company}</td>
        <td className="text-dark">{exp.title}</td>
    <td className="text-dark">{exp.from === null ? ('') : <Moment format="YYYY/MM/DD">{exp.from}</Moment> } - {exp.to === null ? <p>Current</p> : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        
        </td>
        <td><button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, exp._id)}>Delete</button></td>
      </tr>
    ))
    return <div>
        <h4 className="mb-4 text-dark">Experience/Credentials</h4>
        <table className="table text-info">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {experience}
         </tbody>
        </table>
      </div>;
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience); 