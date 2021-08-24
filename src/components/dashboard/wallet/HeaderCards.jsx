import React from "react";

// reactstrap components
import {Card, CardBody, CardTitle, Container, Row, Col} from "reactstrap";
import {useTranslation} from "react-i18next";
import {CircularProgress, LinearProgress} from "@material-ui/core";

const Header = ({tokensNumber, dataLoaded}) => {
    const {t} = useTranslation();
    return (
        <>
            <div className="header pb-8 pt-5 pt-md-8" style={{backgroundColor: "#ffffff"}}>
                <Container fluid>
                    <div className="header-body">
                        <Row>
                            <Col lg="12" xl="12">
                                <Card className="card-stats mb-4 mb-xl-0 bg-gradient-default">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h6"
                                                    className="text-uppercase text-muted mb-0 text-light"
                                                >
                                                    {t('Dashboard.Index.Wallet.Header.TokensAmount')}
                                                </CardTitle>
                                                <span className="h5 font-weight-bold mb-0 text-light">
                                                    {
                                                        dataLoaded ?
                                                            tokensNumber.toString().slice(0, tokensNumber.toString().length - 6) + "." + tokensNumber.toString().slice(tokensNumber.toString().length - 6)
                                                            :
                                                            (<LinearProgress style={{marginTop: 10, color: "white"}} />)
                                                    }
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                    <i className="fas fa-users"/>
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
