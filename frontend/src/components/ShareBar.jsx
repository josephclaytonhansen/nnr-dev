import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFont, faPrint, faShare } from "@fortawesome/free-solid-svg-icons"
import { FaPinterestP, FaFacebookF, FaTwitter, FaPrint, FaPaperPlane} from "react-icons/fa"
import React from "react"
import {Row, Col} from "react-bootstrap"
import {useState} from "react"
import 'balloon-css'
const ShareBar = () => {

    const plainTextHandler = () => {
        const recipe = JSON.parse(sessionStorage.getItem("recipe"))
        const slug = recipe.slug
        const url = window.location.origin + '/recipes/plain-text/' + slug
        window.location.href = url
    }


    const [show, setShow] = useState(true)
    const [expand, setExpand] = useState(true)

    const delay = (delay) => {
        return new Promise(resolve => setTimeout(resolve, delay))
      }

    const unFurl = async() => {
        const divs = ['pinterest', 'facebook', 'twitter']
        for (let i = 0; i < divs.length; i++){
            await delay(50)
            document.getElementById(divs[i]).style.opacity = 1

        }
    }

    const furl = async() => {
        const divs = ['pinterest', 'facebook', 'twitter'].reverse()
        for (let i = 0; i < divs.length; i++){
            await delay(50)
            document.getElementById(divs[i]).style.opacity = 0

        }
    }

    const expandHander = () => {
        if (expand){
            unFurl()
        }
        else{
            furl()
        }
        setExpand(!expand)
    }


    return(
        <div style = {{position:'fixed'}} className = 'shareBar d-print-none'>
        <Row className = 'd-flex align-items-center gy-2' style = {{flexDirection:'column'}}>
            <Col className = 'flex-shrink-0 flex-grow-0'>
                <div style = {{width: '2.2rem', height: '2.2rem', borderRadius:'100%'}} className = {'d-flex me-auto share-bar-icon balloon-tooltip'} aria-label="Plain text version" data-balloon-pos="right">
                    <FontAwesomeIcon icon = {faFont} style={{fontSize: '1.5rem', marginTop: '.30rem', marginLeft: '.42rem'}} onClick={plainTextHandler}/>
                    </div>
            </Col>
            <Col className = 'flex-shrink-0 flex-grow-0'>
                <div style = {{width: '2.2rem', height: '2.2rem', borderRadius:'100%'}} className = {'d-flex me-auto share-bar-icon balloon-tooltip'} aria-label="Print" data-balloon-pos="right" onClick={() => window.print()}>
                    <FontAwesomeIcon icon = {faPrint} style={{fontSize: '1.5rem', marginTop: '.3rem', marginLeft: '.3rem'}}/>
                    </div>
            </Col>


            <Col className = 'flex-shrink-0 flex-grow-0' >
                <div style = {{width: '2.2rem', height: '2.2rem', borderRadius:'100%', position:''}} className = {'d-flex me-auto share-bar-icon balloon-tooltip'} aria-label="Share" data-balloon-pos="right" id = "share">
                    <FontAwesomeIcon icon = {faShare} style={{fontSize: '1.5rem', marginTop: '.3rem', marginLeft: '.3rem'}}onClick = {expandHander}/>
                    </div>
            </Col>

                <Col className = 'flex-shrink-0 flex-grow-0' style={{opacity:0}} id = 'pinterest'><a href = 
                {`http://pinterest.com/pin/create/button/?url=${window.location.href}`} target='_blank' rel="noopener noreferrer">
                <div style = {{width: '2.2rem', height: '2.2rem', borderRadius:'100%'}} className = {'d-flex me-auto share-bar-icon balloon-tooltip'}>
                    <FaPinterestP style={{fontSize: '1.5rem', marginTop: '.3rem', marginLeft: '.3rem'}}/>
                    </div></a>
            </Col>
             <Col className = 'flex-shrink-0 flex-grow-0' style={{opacity:0}} id = 'facebook'>
             <div style = {{width: '2.2rem', height: '2.2rem', borderRadius:'100%'}} className = {'d-flex me-auto share-bar-icon balloon-tooltip'}>
                 <FaFacebookF style={{fontSize: '1.5rem', marginTop: '.3rem', marginLeft: '.3rem'}}/>
                 </div>
         </Col><Col className = 'flex-shrink-0 flex-grow-0' style={{opacity:0}} id = 'twitter'>
             <a href = {`https://twitter.com/intent/tweet?url=${window.location.href}`} rel="noopener noreferrer"><div style = {{width: '2.2rem', height: '2.2rem', borderRadius:'100%'}} className = {'d-flex me-auto share-bar-icon balloon-tooltip'}>
                 <FaTwitter style={{fontSize: '1.5rem', marginTop: '.4rem', marginLeft: '.35rem'}}/>
                 </div></a>
         </Col>
         
         
        </Row>
        </div>
    )
}

export default ShareBar