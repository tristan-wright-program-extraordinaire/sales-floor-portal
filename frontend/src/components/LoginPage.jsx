import { useRef,useState,useEffect } from 'react'
import axios from 'axios';
import { getCookie } from '../utils/cookies';

export default function LoginPage({ setRep,autoLog=true }) {
    const [extensionField,updateExtensionField] = useState("")
    const [passwordField,updatePasswordField] = useState("digital")
    const [needPassword,setNeedPassword] = useState(false)
    const [isDisabled,setIsDisabled] = useState(false)
    const [enteringPassword,setEnteringPassword] = useState(false)
    const [extensionError,setExtensionError] = useState(false)
    const [loggingIn,setLoggingIn] = useState(false)

    const loginRef = useRef()
    const loadingRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        if (autoLog) {
            console.log("HERE")
            getRepInfo()
        }
    },[])

    const getRepInfo = () => {
        var access_token = getCookie('access_token')
        console.log(access_token)
        if (access_token) {
            console.log("AUTO LOGIN")
            setLoggingIn(true)
            var headers = {
                "Authorization": `Bearer ${access_token}`
            }
            axios.get('http://localhost:8000/api/reps/me', { withCredentials: true, headers: headers })
            .then(response => {
                setRep(response.data)
            })
            .catch(error => {
                if (error.status === 401) {
                    refresh()
                }
                console.error(error)
            })
        }
    }

    const refresh = () => {
        var refresh_token = getCookie('refresh_token')
        console.log(refresh_token)
        console.log("REFRESH")
        axios.post('http://localhost:8000/api/token/refresh/', {
            'refresh': refresh_token
        })
        .then(response => {
            document.cookie = `access_token=${response.data.access}; path=/`
            getRepInfo()
        })
        .catch(error => console.error(error))
    }

    const login = () => {
        axios.post('http://localhost:8000/api/token/', {
            'extension_number': extensionField,
            'password': passwordField
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                document.cookie = `access_token=${response.data.access}; path=/`
                document.cookie = `refresh_token=${response.data.refresh}; path=/`
                getRepInfo()
            }
        }).catch(error => {
            if (error.status === 401) {
                updatePasswordField("")
                setNeedPassword(true)
                console.error(error)
            }
        })
    }

    const handleExtensionChange = (event) => {
        updateExtensionField(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        updatePasswordField(event.target.value);
    };

    return (
        <div id="loginArea" ref={loginRef}>
            <h1 id="loginTitle">Enter Your Extension</h1>
            <input id="extensionField" onKeyDown={(e) => {if (e.key === "Enter") login()}} disabled={isDisabled} onChange={handleExtensionChange} value={extensionField} autoFocus></input>
            <input type="text" onKeyDown={(e) => {if (e.key === "Enter") login()}} ref={passwordRef} id="passwordField" className={needPassword ? "" : "hidden"} onChange={handlePasswordChange} value={passwordField}/>
            <button id="loginButton" disabled={isDisabled} onClick={login}>{enteringPassword ? "SUBMIT" : "LOGIN"}</button>
        </div>
    )
}
