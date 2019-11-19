import React from 'react';

import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

export default () => {
    return (
        <Container>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                        Tanggal Belanja
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control type="date" />
                    </Col>
                </Form.Group>
            </Form>
            <Button>Cari</Button>
            
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Tanggal Belanja</th>
                        <th>Nama Penginput</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>12/09/19</td>
                        <td>Username</td>
                        <td>
                            <Button block>Lihat</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}