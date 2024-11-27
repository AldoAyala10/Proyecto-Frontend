'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Asumiendo que estás usando Next.js

export default function EditarUsuario({ idUsuario }) { // Se pasa el id del usuario a editar
    const [usuario, setUsuario] = useState({
        nombre: '',
        usuario: '',
        password: ''
    });
    const router = useRouter();

    // Obtener los datos del usuario cuando se monta el componente
    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:3000/usuarios/${idUsuario}`);
                setUsuario(respuesta.data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error);
            }
        };
        obtenerUsuario();
    }, [idUsuario]);

    const editarUsuario = async (e) => {
        e.preventDefault();

        try {
            const url = `http://localhost:3000/editarUsuario/${idUsuario}`;
            await axios.put(url, usuario);
            alert("Usuario actualizado con éxito");
            router.push("/usuarios"); // Redirigir después de la actualización
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            alert("Hubo un error al actualizar el usuario");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({
            ...usuario,
            [name]: value
        });
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={editarUsuario} action="" method="post">
                <div className="card">
                    <div className="card-header">
                        <h1>Editar Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input 
                            id="nombre" 
                            name="nombre" 
                            placeholder="Nombre" 
                            autoFocus 
                            className="form-control mb-3" 
                            type="text" 
                            value={usuario.nombre} 
                            onChange={handleChange}
                            required 
                        />
                        <input 
                            id="usuario" 
                            name="usuario" 
                            placeholder="Usuario" 
                            className="form-control mb-3" 
                            type="text" 
                            value={usuario.usuario} 
                            onChange={handleChange}
                            required 
                        />
                        <input 
                            id="password" 
                            name="password" 
                            placeholder="Password" 
                            className="form-control mb-3" 
                            type="password" 
                            value={usuario.password} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success col-12 mt-3 mb-3" type="submit">Actualizar usuario</button>
                    </div>
                </div>
            </form>
        </div>
    );
}