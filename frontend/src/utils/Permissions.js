let userPermissions = 'none'

const Permissions = (
    auth, user, setUser, setToken, complete, jwt, BASE_URL, toast
) => {
    
    if (auth && user === "none" && !complete && sessionStorage.getItem("token") != null){
        const decode = jwt(auth)
        const session = decode.session
        const auser = decode.user
        complete = true
        
        
        if (auser && user === "none"){
            fetch(`${BASE_URL}/api/users/${auser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }).then((res) => res.json())
            .then((responseJSON) => {

                    setUser(responseJSON)
                    console.log("Response JSON: ", responseJSON)
                    const userAuthSession = responseJSON[3]
                    if (userAuthSession != session){
                        sessionStorage.removeItem("token")
                        setUser("none")
                        setToken("")
                        if (! toast.isActive('error')){
                            toast.error("Session expired. Please log in again.", {toastId: 'error'})
                        } else {
                            toast.update("Session expired. Please log in again.", {toastId: 'error'})
                        }

                    } else {
                        //validate permissions
                        userPermissions = responseJSON[2]
                        userPermissions = userPermissions.split('.')
                        
                    }

            }).catch(e => {
                if (! toast.isActive('error')){
                toast.error(e.message, {toastId: 'error'})}
            })
            
        }
    }
    return userPermissions
}

export default Permissions