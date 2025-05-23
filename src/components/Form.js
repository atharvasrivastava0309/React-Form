import React, { useState } from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  showPassword: false,
  phoneCode: '',
  phoneNumber: '',
  country: '',
  city: '',
  pan: '',
  aadhar: ''
};

const countries = {
  India: ['Mumbai', 'Delhi', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago']
};

const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

function Form() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First Name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last Name is required';
    if (!form.username.trim()) errs.username = 'Username is required';
    if (!form.email.includes('@')) errs.email = 'Valid email is required';
    if (!form.password.trim()) errs.password = 'Password is required';
    if (!form.phoneCode.trim()) errs.phoneCode = 'Country code required';
    if (!form.phoneNumber.trim()) errs.phoneNumber = 'Phone number required';
    if (!form.country) errs.country = 'Country is required';
    if (!form.city) errs.city = 'City is required';
    if (!form.pan.trim()) errs.pan = 'PAN is required';
    if (!form.aadhar.trim()) errs.aadhar = 'Aadhar is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      navigate('/summary', { state: form });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
      {['firstName','lastName','username','email','pan','aadhar'].map((field) => (
        <div key={field}>
          <label>{formatLabel(field)}:</label>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
          />
          {errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>}
        </div>
      ))}

      <div>
        <label>{formatLabel('password')}:</label>
        <div className="password-container">
            <input
            type={form.showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            />

            <div className="checkbox-inline">
            <input
                type="checkbox"
                name="showPassword"
                checked={form.showPassword}
                onChange={handleChange}
                id="showPassword"
            />
            <label htmlFor="showPassword">Show Password</label>
            </div>
        </div>
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>



      <div>
        <label>{formatLabel('phoneNumber')}:</label>
        <div className='cblock'>
          <input
            name="phoneCode"
            placeholder="Code"
            value={form.phoneCode}
            onChange={handleChange}
            style={{ width: '60px' }}
          />
          <input
            name="phoneNumber"
            placeholder="Number"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          {(errors.phoneCode || errors.phoneNumber) && (
            <p style={{ color: 'red' }}>{errors.phoneCode || errors.phoneNumber}</p>
          )}
        </div>
      </div>

      <div>
        <label>{formatLabel('country')}:</label>
        <select name="country" value={form.country} onChange={handleChange}>
          <option value="">--Select--</option>
          {Object.keys(countries).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
      </div>

      <div>
        <label>{formatLabel('city')}:</label>
        <select name="city" value={form.city} onChange={handleChange}>
          <option value="">--Select--</option>
          {(countries[form.country] || []).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
      </div>

      <button type="submit" disabled={Object.keys(validate()).length > 0}>
        Submit
      </button>
    </form>
  );
}

export default Form;
