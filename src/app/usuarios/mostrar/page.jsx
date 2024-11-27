
'use client';

import axios from "axios";
import BorrarUsuario from "@/componentes/borrar";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

export default function UsuariosPage() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState([]); 
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); 

    useEffect(() => {
        const fetchUsuarios = async () => {
            const url = "http://localhost:3000/";
            try {
                const response = await axios.get(url);
                setUsuarios(response.data); 
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsuarios(); 
    }, []);

    const mostrarDetalles = (usuario) => {
        console.log("ID del usuario seleccionado:", usuario.id); 
        if (usuarioSeleccionado && usuarioSeleccionado.id === usuario.id) {
            setUsuarioSeleccionado(null); 
        } else {
            setUsuarioSeleccionado(usuario); 
        }
    };

    const redirigirAgregarUsuario = () => {
        router.push('/usuarios/crear');
    };

    return (
        <div className="container">
            <h1>Lista de Usuarios</h1>
            <button onClick={redirigirAgregarUsuario} className="btn btn-primary mb-3">
                Agregar usuario
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th> {}
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={usuario.id}>
                            <td>{index + 1}</td>
                            {}
                            <td>
                                <a
                                    href="#!"
                                    onClick={() => mostrarDetalles(usuario)}
                                    className="text-primary"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {usuario.nombre}
                                </a>
                            </td>
                            <td>
                                <Link href={`/usuarios/editarUsuario/${usuario.id}`}>
                                    <button className="btn btn-primary btn-sm" onClick={() => console.log("ID enviado para edición:", usuario.id)}>Editar</button>
                                </Link>

                                <BorrarUsuario id={usuario.id} /> {}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {usuarioSeleccionado && (
                <div className="mt-4">
                    <h2>Detalles del Usuario</h2>
                    <p><strong>ID:</strong> {usuarioSeleccionado.id}</p>
                    <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
                    <p><strong>Usuario:</strong> {usuarioSeleccionado.usuario}</p>
                    <p><strong>Tipo de Usuario:</strong> {usuarioSeleccionado.tipoUsuario}</p>
                </div>
            )}
        </div>
    );
}

