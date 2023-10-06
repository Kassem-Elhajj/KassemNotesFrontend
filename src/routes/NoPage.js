import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Alert } from 'react-bootstrap'; // Import Bootstrap components

function NotPage() {
  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <h4 className="alert-heading">404 - Page Not Found</h4>
        <p>The page you are looking for does not exist.</p>
      </Alert>
    </Container>
  );
}

export default NotPage;
