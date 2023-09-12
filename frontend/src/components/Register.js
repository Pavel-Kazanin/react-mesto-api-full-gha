import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegisterUser }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterUser(formValue.password, formValue.email);
  }

  return (
    <div className="auth">
      <AuthForm handleSubmit={handleSubmit} title="Регистрация" buttonText="Зарегистрироваться">
        <input id="email-input" className="form-auth__text form-auth__text_value_email" defaultValue={formValue.username} onChange={handleChange} type="text" name="email" placeholder="E-mail" minLength="2" maxLength="30" required />
        <span className="email-input-error form-auth__text-error"></span>
        <input id="password-input" className="form-auth__text form-auth__text_value_password" value={formValue.password} onChange={handleChange} type="password" name="password" placeholder="Пароль" required />
        <span className="password-input-error form-auth__text-error"></span>
      </AuthForm>
      <Link to="/signin" className="form-auth__sign-in">Уже зарегистрированны? Войти</Link>
    </div>
  )
}

export default Register;