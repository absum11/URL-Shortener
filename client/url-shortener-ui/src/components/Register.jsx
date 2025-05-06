import React from 'react'

export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form className="flex flex-col space-y-4">
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button type="submit" className="btn-primary">Register</button>
          </form>
        </div>
      );
}
