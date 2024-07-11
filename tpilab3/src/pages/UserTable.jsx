import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Spinner, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAuth } from '../services/AuthenticationContext';
import './UserTable.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(true);

  const { logout, userRole } = useAuth();

  async function fetchUsers() {
    try {
      const response = await fetch('https://fake-api-nodejs-m072.onrender.com/users');
      const json = await response.json();
      setUsers(json);
      setLoading(false);
      console.log(response)
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }
  async function deleteUser(user) {
    try {
      await fetch(`https://fake-api-nodejs-m072.onrender.com/users/${user.id}`, {
        method: 'DELETE'
      });
    setUpdate(!update);
    } catch (e) {
      console.error(e);
  }
}

  const disableUser = async (user) => {
    try {
      const updatedUser = { ...user, status: false };
      await fetch(`https://fake-api-nodejs-m072.onrender.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
      setUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  const enableUser = async (user) => {
    const updatedUser = { ...user, status: false };
    
    try {
      await fetch(`https://fake-api-nodejs-m072.onrender.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
      setUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  const changeUserRole = async (user, role) => {
    try {
      const updatedUser = { ...user, userRole: role};
      await fetch(`https://fake-api-nodejs-m072.onrender.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
      setUpdate(!update);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchUsers();
    console.log(users)
  }, [update]);


  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container className="mt-5">

        <h1 className="mb-4">Admin Page</h1>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <div>Cargando...</div>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName + " " + user.lastName} </td>
                  <td>{user.email}</td>
                  <td>{user.status ? <p>Activo</p>:<p>Inactivo</p>}</td>
                  <td id='actions'>
                    <Button variant="danger" onClick={()=>deleteUser(user)}>
                      Eliminar
                    </Button>                    
                    <Button variant="danger" onClick={()=>disableUser(user)}>
                      Deshabilitar
                    </Button>
                    <Button variant="success" onClick={() => enableUser(user)}>
                      Habilitar
                    </Button>
                    <select value={user.role} defaultValue={user.userRole} onChange={(e) => changeUserRole(user, e.target.value)}>
                      <option value="admin">Admin</option>                      
                      <option value="seller">Seller</option>
                      <option value="buyer">User</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      <div>
      <button onClick={logout}>Logout</button>
    </div>
      </Container>
      <Footer />
    </div>
  );
};

export default UserTable;