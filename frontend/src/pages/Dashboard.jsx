import { useState, useEffect } from "react";
import axios from "axios";
import { Balance } from "../components/Balance"
import { Friends } from "../components/Friends"
import { Appbar } from "../components/Appbar"
import { SendMoney } from "../components/SendMoney";

export function Dashboard() {
    const [balance, setBalance] = useState(0)
    const [friends, setFriends] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const token = localStorage.getItem("token")
    
    useEffect(()=>{ async function displayBalance(){
        const response = await axios.get("http://localhost:8080/api/v1/account/balance", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setBalance(response.data.balance)
    }
    displayBalance()
    }, [])

    useEffect(() =>{async function displayFriends(){
        const response = await axios.get("http://localhost:8080/api/v1/user/all", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setFriends(response.data.users)
    }
    displayFriends()
    }, [])

    const onClose = ()=>{
        setIsOpen(false);
        setSelectedUser(null);
    }

    return ( <>
    <Appbar />
    <Balance value={balance}/> 
    <Friends users={friends}/>
    {isOpen && <SendMoney isOpen={isOpen} selectedUser={selectedUser} onClose={onClose}/>}

    </>)
}
