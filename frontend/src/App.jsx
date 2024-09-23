import Globalstyle from "./assets/styles/global.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "./components/form";
import Grid from "./components/grid";
import axios from "axios";

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const Title = styled.h2``;

function App() {
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8800");
            setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [setUsers]);

    return (
        <div>
            <Container>
                <Title>Usuários</Title>

                <Form
                    onEdit={onEdit}
                    setOnEdit={setOnEdit}
                    getUsers={getUsers}
                />
                <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
            </Container>
            <ToastContainer
                autoClose={3000}
                limit={5}
                position="bottom-left"
                pauseOnHover
                closeOnClick
                theme="colored"
            />
            <Globalstyle />
        </div>
    );
}

export default App;
