import React from 'react'
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StarRating = ({rating, text}) => {
    if (text !== undefined){
        return(
            <>
            <div className='rating balloon-tooltip' style = {{display:'flex'}} aria-label={`out of ${text} reviews`} data-balloon-pos="down">
                <div>
                {rating < 1 && rating > 0 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 1 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
                {rating < 2 && rating > 1 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 2 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
                {rating < 3 && rating > 2 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 3 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
                {rating < 4 && rating > 3 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 4 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
                {rating < 5 && rating > 4 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 5 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
                    

                        
    
                </div>
            </div>
            </>
        )
    } else {
        return(
            <>
            <div className='rating' style = {{display:'flex'}}>
                <div>
                {rating < 1 && rating > 0 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 1 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
                {rating < 2 && rating > 1 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 2 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
                {rating < 3 && rating > 2 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 3 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
                {rating < 4 && rating > 3 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 4 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
                {rating < 5 && rating > 4 ? (<FontAwesomeIcon icon = {faStarHalfAlt} className='icon-red'></FontAwesomeIcon>) : rating >= 5 ? (<FontAwesomeIcon icon = {faStar} className='icon-red'></FontAwesomeIcon>) : (null)}
    
                </div>
            </div>
            </>
        )

    }
    
}

export default StarRating