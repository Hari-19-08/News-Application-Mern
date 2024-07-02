import React, { useState, useEffect } from 'react';
import Nav from '../components/adminNav';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/home.css';

function Home() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [show, setShow] = useState(true);

    const [val, setvalue] = useState({});

    const handleClose = () => setShow(true);
    const handleShow = () => setShow(true);

    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const Login = async () =>{
        const log = await axios.post(`http://localhost:5000/adminlogin`, val);
        if(log.data === "done"){
            navigate(`/admin/dashboard`);
            return;
        }
        else{
            alert("Enter Valid Details")
        }

    }

    return (
        <div>
            <Nav />
            <div className='search-bar'>
                <input
                    type='text'
                    placeholder='Search news'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <label>Username</label>
                            <input name='id' onChange={input} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type='password' name='password' onChange={input} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={Login}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;
