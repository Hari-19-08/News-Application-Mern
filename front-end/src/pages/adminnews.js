import React, { useState, useEffect } from 'react';
import Nav from '../components/adminNav';
import axios from 'axios';
import '../styles/home.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Home() {
    const [books, setBooks] = useState([]);

    const [val, setvalue] = useState({
        image: ''
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

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

    const DeleteBook = async (e) => {
        try {

            const deletebk = await axios.post(`http://localhost:5000/deletebook/${e}/`);
            if (deletebk.data) {
                // navigate(`/manager/${val.id}`);
                window.location.reload();
            } else {
                alert("not")
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const EditBooks = async (e) => {
        try {
            console.log(val)
            const create = await axios.post(`http://localhost:5000/editbooks/${e}`, val);
            if (create.data) {
                // navigate(`/manager/${val.id}`);
                window.location.reload();
            } else if (create.data === "done") {
                alert("not")
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setvalue({ ...val, 'image': reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    return (
        <div>
            <Nav />
            <div className='outer'>
                {books.map((book, index) => (
                    <div className='book'>
                        <div key={index}>
                            <div className='d-flex mt-2 mb-2'>
                                <button className='me-2' onClick={handleShow}>Edit</button>
                                <button onClick={() => { DeleteBook(book._id) }}>Delete</button>
                            </div>
                            <div><img src={book.image} alt='Book' className='image' /></div>
                            <div className='name'>{book.name}</div>
                            <div className='description'>{book.description}</div>
                            <div className='review'>
                                {book.reviews.map((review, index) => (
                                    <div>
                                        <div className='reviewuser'>{review.user}</div>
                                        <div className='reviewcomment'>{review.review}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose} animation={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Book</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                   
                                    <div>
                                        <label>Book Name</label>
                                        <input name='name' onChange={input} />
                                    </div>
                                    <div>
                                        <label>Description</label>
                                        <input name='description' onChange={input} />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => { EditBooks(book._id) }}>
                                    Edit
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default Home;
