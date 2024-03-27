import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import zxcvbn from 'zxcvbn';

function AuthenticationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: null
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const result = zxcvbn(e.target.value);
    setPasswordStrength({
      score: result.score,
      feedback: result.feedback.warning
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email and password strength 
    if (validateEmail() && validatePassword()) {
      // Hypothetical: Send data to your backend authentication system
      console.log('Form submitted with:', email, password);
    } 
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    // Adjust these rules based on your requirements
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email} 
            onChange={handleEmailChange} 
            required 
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password} 
            onChange={handlePasswordChange} 
            required 
          />
          {/* Display password strength feedback */}
          {passwordStrength.feedback && ( 
            <p className={`text-${getStrengthClass(passwordStrength.score)}`}>
              {passwordStrength.feedback}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

const getStrengthClass = (score) => {
  if (score <= 2) return 'danger';
  if (score === 3) return 'warning';
  return 'success'; 
}
export default AuthenticationForm;