import Layout from 'components/Layout'
import Link from 'next/link'
import { FormEvent, FormEventHandler, useState } from 'react'

type Props = {}

export default function Register({ }: Props) {

  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email.trim() && username.trim() && password.trim()) {
      try {

        // insert data
        await fetch(`http://localhost:3000/api/addUser`, {
          method: 'POST',
          body: JSON.stringify({
            email,
            username,
            password
          }),
          headers: {
              Accept: 'application/json, text/plain, */*',
              "Content-Type": "application/json"
          }
        })

        // reset form fields
        formReset()

        // redirect to login page
        window.location.pathname = '/login'

      } catch (e) {
        setErrorMessage('Something went wrong!, Please try again')
        console.error(e)
      }
    } else {
      setErrorMessage('You must fill in all fields')
    }

  }

  const formReset = () => {
    setEmail('')
    setUsername('')
    setPassword('')
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="form m-auto text-center my-24">
        <p className="form-title my-3">Create your account</p>
        <label htmlFor='error-message'  className='text-rose-500 font-bold'>{errorMessage}</label>
        <div className="input-container">
          <input placeholder="Email address" name="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
        </div>
        <div className="input-container">
          <input placeholder="Username" name="username" type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
        </div>
        <div className="input-container">
          <input placeholder="Password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>

        </div>

        <button className="submit" type="submit">
          Create account
        </button>

        <p className="signup-link">
          have an account?
          <Link className='underline' href="/login"> Login</Link>
        </p>
      </form>

      <style jsx>
        {`
      .form {
        background-color: #fff;
        display: block;
        padding: 1rem;
        max-width: 350px;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      
      .form-title {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 600;
        text-align: center;
        color: #000;
      }
      
      .input-container {
        position: relative;
      }
      
      .input-container input, .form button {
        outline: none;
        border: 1px solid #e5e7eb;
        margin: 8px 0;
      }
      
      .input-container input {
        background-color: #fff;
        padding: 1rem;
        padding-right: 3rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        width: 300px;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      }
      
      .input-container span {
        display: grid;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        padding-left: 1rem;
        padding-right: 1rem;
        place-content: center;
      }
      
      .input-container span svg {
        color: #9CA3AF;
        width: 1rem;
        height: 1rem;
      }
      
      .submit {
        display: block;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        background-color: #4F46E5;
        color: #ffffff;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
        width: 100%;
        border-radius: 0.5rem;
        text-transform: uppercase;
      }
      
      .signup-link {
        color: #6B7280;
        font-size: 0.875rem;
        line-height: 1.25rem;
        text-align: center;
      }
      
      .signup-link a {
        text-decoration: underline;
      }
      `}
      </style>

    </Layout>
  )
}