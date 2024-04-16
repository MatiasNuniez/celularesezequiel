import React, { useState, useEffect } from 'react'
import imgPrestados from '../../assets/img-celulares-prestados.jpg'
import imgGeneral from '../../assets/img-datos-general.jpg'
import imgRotos from '../../assets/rotos.jpg'
import { useNavigate } from 'react-router-dom'

export const OptionsIndex = () => {

  const [token, setToken] = useState(localStorage.getItem(process.env.REACT_APP_TOKENID) || '')

  useEffect(() => {
    setToken(localStorage.getItem(process.env.REACT_APP_TOKENID) || '')
    console.log(token);
  }, [])

  console.log(token);

  const navigate = new useNavigate()

  return (
    <div>
      {token != '' ?
        <div className='container'>
          <div className='contentIndex'>
            <a className='aCardIndex' href="/Base_de_datos">
              <div className="card" style={{ width: '18rem' }}>
                <img src={imgGeneral} className="card-img-top" style={{ height: '100%' }} alt="Base de datos" />
                <div className="card-body">
                  <p className="card-text">Base de datos</p>
                </div>
              </div>
            </a>

            <a className='aCardIndex' href="/Prestados">
              <div className="card" style={{ width: '18rem' }}>
                <img src={imgPrestados} className="card-img-top" style={{ height: '100%' }} alt="Prestados" />
                <div className="card-body">
                  <p className="card-text">Prestados</p>
                </div>
              </div>
            </a>

            <a className='aCardIndex' href="/Rotos">
              <div className="card" style={{ width: '18rem' }}>
                <img src={imgRotos} className="card-img-top" style={{ height: '100%' }} alt="Prestados" />
                <div className="card-body">
                  <p className="card-text">Rotos</p>
                </div>
              </div>
            </a>

          </div>
        </div>
        : (navigate('/login'), alert(`inicie sesion, dirijase a ${process.env.REACT_APP_LOGIN}`))
      }
    </div>
  )
}