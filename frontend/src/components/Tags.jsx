import React from "react"
import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"

const Tags = ({ tags }) => {
    return (
        <>
        {tags && (
        <Container className="tag-badge-container">
            

                    {tags.map((tag) => (
                        <Link to={`/tags/${tag}`} className = 'custom-badge tag-badge' key={tag}>{tag}</Link>
                    ))}

           
        </Container>
        )}
        </>
    )
}

export default Tags