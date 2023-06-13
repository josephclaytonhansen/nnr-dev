import { Alert } from 'react-bootstrap'
export default function Message({ variant='info', style ={transition:'all 0s'}, children }) {
    return (
        <>
            <Alert className='' style = {style} variant={variant}>{children}</Alert>
        </>
    )
}