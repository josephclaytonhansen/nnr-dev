import React from 'react'
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StarRating = ({rating, text}) => {
    return(
        <>
        <div className='rating' style = {{display:'flex'}}>
            <div>
                
                    <FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>
                    <FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>
                    <FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>
                    <FontAwesomeIcon icon = {faStar} ></FontAwesomeIcon>
                    <FontAwesomeIcon icon = {faStar}></FontAwesomeIcon>
                    

            </div>
            <span>{ text && text}</span>
        </div>
        </>
    )
}

export default StarRating