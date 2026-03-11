import {React,useEffect,useState} from 'react';
import LoginPage from './components/LoginPage'
import RepView from './components/RepView'
import ManagerView from './components/ManagerView'
import AdminView from './components/AdminView'
import axios from 'axios';



export default function App() {
    const [rep, setRep] = useState(null)
    const [autoLog, setAutoLog] = useState(true)

    const logout = () => {
        setAutoLog(false)
        setRep(null)
    }

    if (!rep) {
        return (
            <div id="loginPage">
                <LoginPage setRep={setRep} autoLog={autoLog}/>
            </div>
        )
    } else {
        if (rep.role === "rep") {
            return (
                <RepView rep={rep} logout={logout}/>
            )
        } else if (rep.role === "manager") {
            return (
                <ManagerView rep={rep} logout={logout}/>
            )
        } else if (rep.role === "admin") {
            return (
                <AdminView rep={rep} logout={logout}/>
            )
        }
    }
}