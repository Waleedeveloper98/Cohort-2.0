import { useDispatch } from "react-redux"
import { setUser, setLoading, setError } from "../state/auth.slice"
import { login, register } from "../service/auth.api"


export const useAuth = () => {
    const dispatch = useDispatch()

    const handleRegister = async ({ fullName, email, contact, password, isSeller }) => {
        try {
            dispatch(setLoading(true))
            const data = await register({ fullName, email, contact, password, isSeller })
            dispatch(setUser(data.user))
            return true
        } catch (error) {
            console.log("Error: ", error)
            dispatch(setError(error?.response?.data?.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async ({ email, password }) => {
        try {
            dispatch(setLoading(true))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
            return true
        } catch (error) {
            console.log("Error: ", error)
            dispatch(setError(error?.response?.data?.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return ({ handleRegister, handleLogin })
}