import React, { useEffect, useState } from 'react'
import axios from 'axios'
import imagen from '../../assets/logo_login.png'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(localStorage.getItem(process.env.REACT_APP_TOKENID) || '')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ((user !== '') && (password !== '')) {
            try {
                const res = await axios({
                    method: 'post',
                    withCredentials: true,
                    url: `${process.env.REACT_APP_URL_API}login`,
                    data: {
                        user: user,
                        password: password
                    },
                })
                const data = await res.data
                console.log(data);
                if (data.token !== undefined) {
                    localStorage.setItem(process.env.REACT_APP_TOKENID, data.token)
                    navigate('/')
                } else {
                    alert('Usuario o contrasena invalidos')
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('Usuario o contrasena vacio')
        }
    }

    useEffect(() => {
        setToken(localStorage.getItem(process.env.REACT_APP_TOKENID) || '')
    }, [])

    return (
        <div className='container'>
            {token !== null ?
                navigate('/')
                :
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card mt-5">
                            <img src={imagen} className="card-img-top" alt="Imagen de fondo"/>
                                <div className="card-body p-4">
                                    <h5 className="card-title text-center">Inicio de Sesión</h5>
                                    <form onSubmit={handleSubmit} >
                                        <div className="form-group pb-4">
                                            <label for="email">Usuario:</label>
                                            <input type="text" className="form-control" id="user" placeholder="Ingrese su correo electrónico" onChange={e => setUser(e.target.value)} value={user}/>
                                        </div>
                                        <div className="form-group pb-4">
                                            <label for="password">Contraseña:</label>
                                            <input type="password" className="form-control" placeholder="Ingrese su contraseña" id="password" onChange={e => setPassword(e.target.value)} value={password}/>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block custom-button">Iniciar Sesión</button>
                                    </form>
                                </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    )

}
