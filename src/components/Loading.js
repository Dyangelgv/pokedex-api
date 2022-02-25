import React from 'react';
import {Spinner, Row, Col}  from 'react-bootstrap';
const Loading = () => {
    return (
        <div className="d-flex justify-content-center mt-5" 
            style={{ height: '3rem'}}
        >
            <Row>
                <Col>
                    <Spinner className="spinner-border spinner-border-lg"
                        role='status'
                        style={{ height: '2rem', width: '2rem'}}
                    >
                    </Spinner>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="mx-3"> Loading Pokemons</div>
                </Col>
            </Row>
        </div>
    );
};

export default Loading;
