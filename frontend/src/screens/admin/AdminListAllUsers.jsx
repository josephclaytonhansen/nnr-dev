import { useGetUsersQuery } from "../../slices/usersApiSlice"
import { useParams } from "react-router"
import React from "react"
import { Container } from "react-bootstrap"
import Loader from "../../components/Loader"
import AdminList from "./AdminList"
import AdminListUsers from "./AdminListUsers"
import Message from "../../components/Message"

const AdminListAllUsers = () => {
    const {data:users, isLoading, error} = useGetUsersQuery()
    return(
        <main>
            <Container>
            <h1 style = {{marginBottom: "2rem"}}>All users</h1>
                {users ? (
                    <AdminListUsers/>
                ) : isLoading ? (
                    <Loader/>
                ) : error ? (
                    <>
                    <Message variant='dark'>{error.error}{error.data.message}</Message>
                    <AdminListUsers/>
                    </>
                ) : (
                    `error`
                )}

            </Container>
        </main>
    )
}


export default AdminListAllUsers