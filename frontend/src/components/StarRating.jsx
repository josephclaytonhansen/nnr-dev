import React from 'react'
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StarRating = ({rating, text}) => {
    return(
        <>
        <div className='rating balloon-tooltip' style = {{display:'flex'}} aria-label={`out of ${text} reviews`} data-balloon-pos="down">
            <div>
                
                    <FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>
                    <FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>
                    <FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>
                    <FontAwesomeIcon icon = {faStar} ></FontAwesomeIcon>
                    <FontAwesomeIcon icon = {faStar}></FontAwesomeIcon>
                    

            </div>
        </div>
        </>
    )
}

export default StarRating