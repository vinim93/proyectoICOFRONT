import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import NumberFormat from "react-number-format";

const Header = ({tokensNumber}) => {
    //console.log(tokensNumber);
    return (
        <>
            <div className="header pb-8 pt-5 pt-md-8" style={{backgroundColor: "#ced4da"}}>
                <Container fluid>
                    <div className="header-body">
                        {/* Card stats */}
                        <Row>
                            <Col lg="6" xl="6">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h6"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Número de SUN tokens
                                                </CardTitle>
                                                <span className="h5 font-weight-bold mb-0 text-dark">
                                                     {tokensNumber.toString().slice(0, tokensNumber.toString().length-6) + "." + tokensNumber.toString().slice(tokensNumber.toString().length-6)}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                    <i className="fas fa-users" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="6">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h6"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Costo total (USD)
                                                </CardTitle>
                                                <span className="h5 font-weight-bold mb-0 text-dark">
                                                    {tokensNumber.toString().slice(0, tokensNumber.toString().length-6) + "." + tokensNumber.toString().slice(tokensNumber.toString().length-6)}
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                    <i className="fas fa-percent" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Header;
