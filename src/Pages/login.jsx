import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { logIn } from "@/Api/authApi"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault()

    try{
        const response = await logIn(email,password)
        navigate('/home')
    }catch(error){
        console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 p-8 border rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full">
          Login
        </Button>

        <p>Need an account? <Link to='/registration'>Create</Link></p>
      </form>
    </div>
  )
}

export default Login