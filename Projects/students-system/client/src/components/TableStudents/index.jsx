import { Container } from "./style"
import { useState, useEffect } from "react"
import axios from "axios";
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"


export function TableStudents() {
    const [listStudents, setListStudents] = useState([]);
    const [searchStudent, setSearchStudent] = useState('');

    const filterStudents = listStudents.filter((student) => {
        return (
            String(student.id).toLowerCase().includes(searchStudent.toLowerCase()) ||
            student.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
            student.cpf.toLowerCase().includes(searchStudent.toLowerCase()) ||
            student.email.toLowerCase().includes(searchStudent.toLowerCase())
        );
    })
    
    const API = "http://localhost:3000/students/"
    
    function listEstudents() {
        axios.get(API)
        .then((res) => setListStudents(res.data))
        .catch((error) => console.error(error));
    }

    function deleteEstudent(ID) {
        axios.delete(API + ID)
        .then((res) => alert(res.data))
        .catch((error) => console.error(error))
        .finally(() => listEstudents());
    }

    useEffect(() => {
        listEstudents();
    }, []);
    
    return (
        <Container>
            <article>
                <section className="titleSearch">
                    <h1>Alunos</h1>
                    <div className="inputSection">
                        <input
                            id="inputSearchStudent" 
                            type="text"
                            placeholder=" " 
                            onChange={(event) => setSearchStudent(event.target.value)}
                        />
                        <label htmlFor="inputSearchStudent" className="labelInputSearch">Buscar aluno</label>
                        <BsSearch className="searchIcon"/>
                    </div>
                </section>

                <section className="tableStudents">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            { listStudents &&
                                filterStudents.map((student, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{student.id}</td>
                                            <td>{student.name}</td>
                                            <td>{student.phone}</td>
                                            <td onClick={() => deleteEstudent(student.id)}>
                                                <BiEdit className="editIcon"/>
                                            </td>
                                        </tr>
                                    )
                                }) 
                            }
                        </tbody>
                    </Table>  
                </section>
            </article>
        </Container>
    )
}