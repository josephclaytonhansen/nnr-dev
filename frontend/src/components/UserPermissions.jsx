import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield, faUser, faUserPen, faUserSlash, faUserLock, faFlag, faCommentDots, faIdCard, faComment, faCommentSlash, faUserPlus, faUserXmark} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const UserPermissions = ({ permissions }) => {
    let isUser = null
    let isModerator = null
    let isAdmin = null
    let isCommentor = null
    let isBanned = null
    let isSelfEmailEditor = null
    let isSelfDisplayNameEditor = null
    let isSelfCommentEditor = null
    let isFlagger = null
    let isAuthor = null
    let user = null
    let comment = null
    let special = null

    let colors = ['icon-dark-blue', 'icon-dark-blue', 'icon-dark-blue']


    if (permissions.includes('is-user')){
        isUser = faUser
    } else {
        isUser = faUserSlash
    }
    if (permissions.includes('is-moderator')){
        isModerator = faUserShield
    } else {
        isModerator = null
    }
    if (permissions.includes('is-admin')){
         isAdmin = faIdCard
    } else {
         isAdmin = null
    }
    if (permissions.includes('is-commentor')){
         isCommentor = faComment
    } else {
         isCommentor = faCommentSlash
    }
    if (permissions.includes('is-banned')){
         isBanned = faUserXmark
    } else {
         isBanned = null
    }
    if (permissions.includes('is-self-email-editor')){
         isSelfEmailEditor = faUserPen
    } else {
         isSelfEmailEditor = faUserLock
    }
    if (permissions.includes('is-self-display-name-editor')){
         isSelfDisplayNameEditor = faUserPen
    } else {
         isSelfDisplayNameEditor = faUserLock
    }
    if (permissions.includes('is-self-comment-editor')){
         isSelfCommentEditor = faCommentDots
    } else {
         isSelfCommentEditor = null
    }
    if (permissions.includes('is-flagger')){
         isFlagger = faFlag
    } else {
         isFlagger = null
    }
    if (permissions.includes('is-author')){
         isAuthor = faUserPlus
    } else {
         isAuthor = null
    }

    if (isUser !== null && isModerator === null && isAdmin === null){
        user = null
    } else if (isUser !== null && isModerator !== null && isAdmin === null){
        user = isModerator
        colors[0] = 'icon-strong-purple'
    } else if (isUser !== null && isModerator === null && isAdmin !== null){
        user = isAdmin
    }

    if (isAuthor !== null && isAdmin === null){
        user = isAuthor
        colors[0] = 'icon-light-blue'
    } else if (isAuthor !== null && isAdmin !== null){
        user = isAdmin
        colors[0] = 'icon-strong-blue'
    }

    if (isCommentor !== null && isSelfCommentEditor === null){
        comment = isCommentor
    } else if (isCommentor !== null && isSelfCommentEditor !== null){
        comment = isSelfCommentEditor
    }

    if (isBanned !== null){
        special = isBanned
        colors[2] = 'icon-red'
    } else if (isFlagger !== null){
        special = isFlagger
        colors[2] = 'icon-light-purple'
    } else if (isSelfEmailEditor !== null){
        special = isSelfEmailEditor
    }

    const permissionIcons = [
        user,
        comment,
        special,
    ]
    console.log(permissionIcons)
    return(
        <>
        <Row className = 'd-flex g-1'>
            {permissionIcons.map((permissionIcon, index) => {
                if(permissionIcon !== null){
                    return(
                        <Col key = {index} className = 'd-flex justify-content-center flex-grow-0 flex-shrink-0'>
                            <FontAwesomeIcon icon = {permissionIcon} fontSize = {'1.4rem'} className = {`icon ${colors[index]}`} />
                        </Col>
                    )
                }
            })}
        </Row>
        </>
    )
}

export default UserPermissions
