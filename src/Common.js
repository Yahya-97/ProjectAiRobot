import React from 'react';
import { NavLink } from "react-router-dom"

const Common = ({
    name,
    imgsrc,
    isCompName,
    compName,
    visit,
    btnname
}) => {
    return (
        <>
            <section id="header" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row">
                            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                                <h1> 
                                     {name}
                                     {isCompName ? <strong className="brand-name"> {compName}</strong> : ""}
                                    
                                </h1>
                                <h2 className="my-3">
                                <strong><mark style={{color:'red',background:'white'}}>About the project:</mark></strong>                                Taking the movement of the face and then analyzing the face according to the 
                                <br/>
                                    movement right, the robot will move to the right and the same for the rest of the directions.   
                                    by using Tensorflow.js                             
                                </h2>
                                <div className="mt-3">
                                    <NavLink to={visit} className="btn-get-started ">
                                        {btnname}
                                    </NavLink>
                                </div>
                            </div>

                            <div className="col-lg-6 order-1 order-lg-2 header-image">
                                <img src={imgsrc} className="img-fluid animated" alt="Home Img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </>
    )
}

export default Common;