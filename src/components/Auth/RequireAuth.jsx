
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth ({isLogged , children}) {

    
    const location=useLocation()
    console.log(location)

    if (!isLogged ) {
        
        return <Navigate to="/login" state={{from:location}} replace></Navigate>

    } else {

        return children

    } 

}

export default RequireAuth