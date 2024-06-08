import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importamos el hook useParams de React Router
import '../propietario.css';

const Randomuser = () => {
  const { id } = useParams(); // Extraemos el ID de la URL utilizando el hook useParams

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Utilizamos el ID extraído de la URL en la solicitud Fetch
    //fetch(`http://localhost:8080/QRs/132`)
    fetch(`https://myinventorytfg.azurewebsites.net/QRs/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const UserData = {
          name: data.nombreQR,
          propietario:data.propietario,
          descripcion: data.descripcion,
          email: data.emailCliente,
          telefono: data.telefono,
          direccion: data.direccion,
          recompensa: data.recompensa,
          picture: data.qrImagePath,
        };
        setUser(UserData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  // Renderiza la respuesta
  return (
    <div className="card">
      {user ? (
        <div className="card1">
                  <h2>¡GRACIAS POR ENCONTRAR MI OBJETO!</h2>
                  <div className='imagen'>
                    <img src={user.picture} alt="profile-image"></img>             
                  </div>
                  <div className='introduccion'>
                      <p className="p1"><strong>{user.name}</strong></p>
                      <p className="p1">Este objeto pertenece a <strong>{user.propietario}</strong></p>
                      <p className="descripcionText">{user.descripcion}</p>
                  </div>
                <div className='datosContacto'>
                  <div class="linea"><label>Direccion: </label><p className="p2"><strong>{user.direccion}</strong></p></div>
                  <div class="linea"><label>Direccion: </label>
                      {user.direccion && (// si la dirección no es nula la mostramos
                    <p className="p2"><strong>{user.direccion}</strong></p>
                      )}
                  </div><div class="linea"><label>Email: </label>
                      {user.email && (// si el email no es nulo lo mostramos
                    <p className="p2"><strong>{user.email}</strong></p>
                      )}
                  </div>
                  <div class="linea"><label>Telefono: </label>
                      {user.telefono && (// si el telefono no es nulo lo mostramos
                    <p className="p2"><strong>{user.telefono}</strong></p>
                      )}
                  </div>
                  <p className="recompensa">Recompensa: <strong>{user.recompensa} €</strong></p>
                </div>
              <div className="botones">
                <a href={`https://wa.me/+34${user.telefono}?text=Hola%20desde%20mi%20web`} target="¡He encontrado tu objeto!">
                  <button>Iniciar conversación en WhatsApp</button>
                </a>
                <a href="mailto:correo@example.com" target="¡He encontrado tu objeto!">
                  <button>Enviar Email</button>
                </a>
                <a href="tel:+1234567890">
                   <button>Llamar</button>
                </a>
              </div>
              <div>
          </div>
        </div>
       
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Randomuser;
