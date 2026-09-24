import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .email("Enter a valid email address")

const agreeField = z
  .boolean()
  .refine((value) => value === true, { message: "You must accept the privacy terms" })

const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
  agree: agreeField,
})

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: emailField,
  password: z.string().min(6, "Password must be at least 6 characters"),
  agree: agreeField,
})

const LoginPopUp = ({ setShowlogin, redirectTo = "/" }) => {
  const navigate = useNavigate()
  const [currState, setCurrState] = useState("Login")

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: (values, context, options) =>
      zodResolver(currState === "Login" ? loginSchema : signUpSchema)(values, context, options),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agree: false,
    },
  })

  const switchState = (next) => {
    setCurrState(next)
    clearErrors()
  }
  const onSubmit = (data) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || []

    if (currState === "Sign Up") {
      const userExists = existingUsers.some((user) => user.email === data.email)

      if (userExists) {
        alert("An account with this email already exists!")
        return
      }

      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
      }

      existingUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(existingUsers))
      localStorage.setItem("user", JSON.stringify({ name: newUser.name, email: newUser.email }))

      alert("Account created successfully!")
      reset()
      setShowlogin(false)
      navigate(redirectTo)
    } else {
      const foundUser = existingUsers.find(
        (user) => user.email === data.email && user.password === data.password
      )

      if (foundUser) {
        localStorage.setItem("user", JSON.stringify({ name: foundUser.name, email: foundUser.email }))

        alert("Logged in successfully!")
        reset()
        setShowlogin(false)
        navigate(redirectTo)
      } else {
        alert("Invalid email or password!")
      }
    }
  }

  return (
    <div className='login-pop-up'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className='login-pop-up-contener'>
        <img className='icon-group1' src={assets.group1} alt="" />
        <button type='button' className='cross-act' onClick={() => setShowlogin(false)}>❌</button>

        <div className="login-pop-up-title">
          <h1>{currState}</h1>
        </div>

        <div className="login-pop-up-inputs">
          {currState === "Sign Up" && (
            <>
              <input
                autoComplete='off'
                autoFocus
                type="text"
                placeholder='Your Name'
                {...register("name")}
              />
              {errors.name && <p className="error-text">{errors.name.message}</p>}
            </>
          )}

          <input
            autoComplete='off'
            type="email"
            placeholder='Email'
            {...register("email")}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}

          <input
            autoComplete='off'
            type="password"
            placeholder='Password'
            {...register("password")}
          />
          {errors.password && <p className="error-text">{errors.password.message}</p>}
        </div>

        <button type='submit' disabled={isSubmitting}>
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-pop-up-condition">
          <input type="checkbox" {...register("agree")} />
          <p className='agree'>Continuing agree with our privacy</p>
        </div>
        {errors.agree && <p className="error-text">{errors.agree.message}</p>}

        {currState === "Login" ? (
          <p>Create new account? <span onClick={() => switchState("Sign Up")}>click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => switchState("Login")}>login here</span></p>
        )}
      </form>
    </div>
  )
}

export default LoginPopUp