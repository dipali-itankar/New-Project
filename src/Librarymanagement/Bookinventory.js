import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
  InputGroup,
} from "react-bootstrap";

const Bookinventory = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    isbn: "",
    edition: "",
    publisher: "",
    year: "",
    category: "",
    language: "",
    copies: 1,
    shelf: "",
    image: null,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]); // Array of books
  const [editIndex, setEditIndex] = useState(null); // null = add mode

  // Handlers
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updated = [...books];
      updated[editIndex] = bookData;
      setBooks(updated);
      setEditIndex(null);
    } else {
      setBooks([...books, bookData]);
    }
    setBookData({
      title: "",
      author: "",
      isbn: "",
      edition: "",
      publisher: "",
      year: "",
      category: "",
      language: "",
      copies: 1,
      shelf: "",
      image: null,
    });
  };

  const handleEdit = (index) => {
    setBookData(books[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      const updated = [...books];
      updated.splice(index, 1);
      setBooks(updated);
    }
  };

  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.isbn, book.category, book.publisher]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Container fluid className="p-2">
      <h2 className="mb-2">📘 Book Inventory Dashboard</h2>

      {/* Add / Edit Book */}
      <Card className="mb-2">
        <Card.Header>{editIndex !== null ? "Edit Book" : "Add New Book"}</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" value={bookData.title} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Author(s)</Form.Label>
                  <Form.Control name="author" value={bookData.author} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control name="isbn" value={bookData.isbn} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Edition</Form.Label>
                  <Form.Control name="edition" value={bookData.edition} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control name="publisher" value={bookData.publisher} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Publication Year</Form.Label>
                  <Form.Control name="year" value={bookData.year} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Category/Subject</Form.Label>
                  <Form.Control name="category" value={bookData.category} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Language</Form.Label>
                  <Form.Control name="language" value={bookData.language} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Number of Copies</Form.Label>
                  <Form.Control
                    name="copies"
                    type="number"
                    value={bookData.copies}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Shelf Location</Form.Label>
                  <Form.Control name="shelf" value={bookData.shelf} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Book Image</Form.Label>
                  <Form.Control name="image" type="file" onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3" onClick={handleAddOrUpdate}>
              {editIndex !== null ? "Update Book" : "Add Book"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Search */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by Title, Author, ISBN, Category, Publisher"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* Book List */}
      <Card>
        <Card.Header>📖 Book Inventory</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Edition</th>
                <th>Publisher</th>
                <th>Year</th>
                <th>Category</th>
                <th>Language</th>
                <th>Copies</th>
                <th>Shelf</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td>{book.edition}</td>
                    <td>{book.publisher}</td>
                    <td>{book.year}</td>
                    <td>{book.category}</td>
                    <td>{book.language}</td>
                    <td>{book.copies}</td>
                    <td>{book.shelf}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(index)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Bookinventory;
