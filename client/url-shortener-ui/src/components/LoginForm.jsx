import React from 'react'

const LoginForm = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form className="flex flex-col space-y-4">
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button type="submit" className="btn-primary">Login</button>
          </form>
        </div>
      );
}

export default LoginForm;
