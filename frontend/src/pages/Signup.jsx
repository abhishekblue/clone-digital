import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useState } from "react";


export function Signup(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return ( <> 
        <Heading label={"Signup"} />
        <Subheading label={'Enter your details to create an account'} />
        <InputBox label={"First name"} placeholder={"Jon"} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <InputBox label={"Last name"} placeholder={"Doe"} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <InputBox label={"Username"} placeholder={"username@example.com"} value={username} onChange={(e) => setUsername(e.target.value)}/>
        <InputBox label={"Password"} placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button label={"Submit"} onClick={async ()=> { 
                if (!firstName || !lastName || !username || !password) {
                    alert("Please fill all fields");
                    return;
                }
            // console.log("Debug:", firstName, lastName, username, password);
            const response = await axios.post('http://localhost:8080/api/v1/user/signup', {
                                                firstName,
                                                lastName,
                                                username,
                                                password
                                            },{
                                                headers: {
                                                  'Content-Type': 'application/json'
                                                }
                                              });
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")
                }} />
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </>
)}