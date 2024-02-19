import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const filterProducts = (character, buscado) => {
  if (!buscado) return character;

  return character.filter((p) => `${p.modelo}`.toLowerCase().includes(buscado.toLowerCase()));
};


export const Prestados = () => {

  const [buscado, setBuscado] = useState('')

  const [check, setCheck] = useState('sarmiento')

  const [title, setTitle] = useState('')

  const [buttonAddOrEdit, setButtonAddOrEdit] = useState('')

  const [nombre, setNombre] = useState('')

  const [numero, setNumero] = useState('')

  const [modelo, setModelo] = useState('')

  const [razon, setRazon] = useState('')

  const [local, setLocal] = useState('')

  const [id, setId] = useState(0)

  const [op, setOp] = useState(0)

  const [data, setData] = useState([])

  const [token, setToken] = useState(localStorage.getItem('tokensantarosa30') || '')

  const [user, setUser] = useState(localStorage.getItem('user') || '')

  const navigate = new useNavigate()

  const realData = data.filter((p) => (`${p.local}` === check))

  const filteredProducts = filterProducts(realData, buscado);

  const getData = async () => {
    try {
      const res = await axios.get('https://backlacentral.onrender.com/api/prestados', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'user':user
        }
      })
      const dataRes = await res.data
      setData(dataRes)
    } catch (error) {
      console.log(error);
    }
  }

  const openModal = async (op, id, nombre, numero, modelo, razon, local) => {
    try {
      setNombre('')
      setNumero('')
      setModelo('')
      setRazon('')
      setLocal('')
      if (op === 1) {
        setOp(1)
        setTitle('Agregar cliente')
        setButtonAddOrEdit('Agregar')
      } else if (op === 2) {
        setOp(2)
        setTitle('Editar cliente')
        setButtonAddOrEdit('Editar')
        setNombre(nombre)
        setModelo(modelo)
        setNumero(numero)
        setRazon(razon)
        setLocal(local)
        setId(id)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const postAndEdit = async (id, nombre, numero, modelo, razon, local) => {
    if (op === 1) {
      if ((nombre !== '') && (numero !== '') && (modelo !== '') && (razon !== '') && (local !== '') && (numero.length === 10)) {
        const data = {
          nombre: nombre,
          numero: numero,
          modelo: modelo,
          razon: razon,
          local: local
        }
        await axios.post('https://backlacentral.onrender.com/api/prestados',
          data, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'user':user
          }
        })
          .then(alert('Elementos ingresados correctamente'), setNombre(''), setNumero(''), setModelo(''), setRazon(''), setLocal(''))
          .catch(error => alert(`No se pudo ingresar el elemento por el siguiente error ${error}`))
      } else { alert('Complete todos los campos (Recuerde que numero lleva 10 numeros)') }
    } else if (op === 2) {
      const data = {
        nombre: nombre,
        numero: numero,
        modelo: modelo,
        razon: razon,
        local: local
      }
      await axios.put(`https://backlacentral.onrender.com/api/prestados/${id}`, data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'user':user
          }
        })
        .then(alert('Elementos editados correctamente'), setNombre(''), setNumero(''), setModelo(''), setLocal(''), setRazon(''), setId(0))
        .catch(error => alert('No se pudo eliminar el elemento'))
    }
  }

  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://backlacentral.onrender.com/api/prestados/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'user':user
        }
      })
        .then(alert('Elemento eliminado correctamente'))
        .catch(error => alert('No se pudo eliminar el elemento'))
    } catch (error) {
      alert(error)
    }
  }


  useEffect(() => {
    getData()
  }, [data])


  return (

    <div>
      {token !== '' ?
        <div className="container">
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form action="" className='form-modal'>
                    <input type="text" placeholder='Nombre y apellido' onChange={(e) => setNombre(e.target.value)} value={nombre} />
                    <input type="text" placeholder='Numero (si o si 10 numeros)' maxLength={10} minLength={10} onChange={(e) => setNumero(e.target.value)} value={numero} />
                    <input type="text" placeholder='Modelo' onChange={(e) => setModelo(e.target.value)} value={modelo} />
                    <input type="text" placeholder='Razon' onChange={(e) => setRazon(e.target.value)} value={razon} />
                    <select name="" id="local" onChange={(e) => setLocal(e.target.value)} value={local}>
                      <option value="none">Seleccione un local</option>
                      <option value='elisa'>Elisa</option>
                      <option value='sarmiento'>Sarmiento</option>
                      <option value='mitre'>Mitre</option>
                    </select>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="button" className="btn btn-primary" onClick={() => postAndEdit(id, nombre, numero, modelo, razon, local)} >{buttonAddOrEdit}</button>
                </div>
              </div>
            </div>
          </div>

          <div className="top">
            <div className='Check mb-3 mt-3'>
              <select onChange={({ target: { value } }) => setCheck(value)}>
                <option value='sarmiento'>sarmiento</option>
                <option value='mitre'>mitre</option>
                <option value='elisa'>elisa</option>
              </select>
            </div>
            <div className='locales'>
              <button type="button" className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { openModal(1) }}>+</button>
            </div>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Buscar..." value={buscado} onChange={(e) => setBuscado(e.target.value)} />
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nombre y apellido</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Numero</th>
                  <th scope="col">Razon</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(dat => {
                  return (
                    <tr key={dat._id}>
                      <td>{dat.nombre}</td>
                      <td>{dat.modelo}</td>
                      <td>{dat.numero}</td>
                      <td>{dat.razon}</td>
                      <td>{dat.fecha}</td>
                      <td><button type="button" className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => openModal(2, dat._id, dat.nombre, dat.numero, dat.modelo, dat.razon, dat.local)}>?</button></td>
                      <td><button className='btn btn-danger' onClick={() => deleteItem(dat._id)}>-</button></td>
                    </tr>)
                })}

              </tbody>
            </table>
          </div>
        </div>
        : (alert('Inicie sesion'), navigate('/login'))
      }
    </div>
  )
}