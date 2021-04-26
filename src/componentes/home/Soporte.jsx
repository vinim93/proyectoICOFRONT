import React from 'react';
import Openzepp from "../../images/zeppelin_icon.svg";
import Github from "../../images/github_icon.svg";
import 'bootstrap/dist/css/bootstrap.css';
import "./css/styles.css";
import {useTranslation} from 'react-i18next';

const Soporte = () => {

    const {t} = useTranslation();

    const items = [
        {
            icon: Github,
            title: t('Support.Items.Github.Title'),
            text: t('Support.Items.Github.Text')
        },
        {
            icon: Openzepp,
            title: t('Support.Items.OpenZeppelin.Title'),
            text: t('Support.Items.OpenZeppelin.Text')
        }
    ];

    return (
        <div className="row">
            <div className="col-12 fondoedi">
                <span className="text-soporte">
                    {t('Support.Title')}
                </span>
                <div className="row fondo-opa d-flex justify-content-center pb-5">
                {
                    items.map((value, index) => (
                            <div key={index} className=" img-meto m-4 col-12 col-lg-4 col-md-4">
                                <img src={value.icon} className="img-fluid img-soporte   mt-1 mt-lg-5" alt=""/>
                                <h4 className="mt-3">{value.title}</h4>
                                <p className=" text-zep">
                                    {value.text}
                                </p>
                            </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default Soporte;