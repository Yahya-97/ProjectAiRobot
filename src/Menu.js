import React from 'react'
import { SocialIcon } from 'react-social-icons'
import './Menu.css'
import { Link } from 'react-router-dom'
import home from "./22.png";
import Common from './Common';


function Menu() {
    
    return ( 
      <>
            <Common 
                name='Name project : ' 
                imgsrc={home} 
                isCompName={true}
                compName="Mobile robot using Deep learning (TF.js)"
                visit='/Mleraning' 
                btnname="Get Started or Test project" 
            />
        </>
    );
}

export default Menu