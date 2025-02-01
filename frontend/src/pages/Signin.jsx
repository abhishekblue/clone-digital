import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { useNavigate } from "react-router-dom"
import { useState } from "react";   
import axios from "axios";



export function Signin(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return (
        <>
        <Heading label={"Signin"} />
        <Subheading label={'Enter your credentials to access your account'} />
        <InputBox label={"Username"} placeholder={"username@example.com"}  onChange={(e) => setUsername(e.target.value)}/>
        <InputBox label={"Password"} placeholder={"Password"}  onChange={(e) => setPassword(e.target.value)}/>
        <Button label={"Sign In"} onClick={async()=>{
            const response = await axios.post('http://localhost:8080/api/v1/user/signin', {
                                            username,
                                            password
                                            });
            localStorage.setItem("token", response.data.token)
            navigate('/dashboard')
            }} />
        <BottomWarning label={"Dont have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </>
    )
}