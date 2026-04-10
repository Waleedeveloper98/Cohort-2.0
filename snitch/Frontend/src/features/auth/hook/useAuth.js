import { useDispatch } from "react-redux"
import { setUser, setLoading, setError } from "../state/auth.slice"
import { register } from "../service/auth.api"


export const useAuth = () => {
    const dispatch = useDispatch()

    const handleRegister = async ({ fullName, email, contact, password, isSeller }) => {
        try {
            dispatch(setLoading(true))
            const data = await register({ fullName, email, contact, password, isSeller })
            console.log(data)
            dispatch(setUser(data.user))
        } catch (error) {
            console.log("Error: ", error)
            dispatch(setError(error?.response?.data?.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return { handleRegister }
}