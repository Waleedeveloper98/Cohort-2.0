import React, { useContext } from 'react'
import { AuthContext } from '../AuthProvider'
import { login, register } from '../services/auth.api'

const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext)

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        try {
            const data = await register(username, email, password)
            setUser(data.user)
            return data.user
        } catch (error) {
            console.log(error)
            throw error
        }
        finally {
            setLoading(false)
        }
    }

    const handleLogin = async (username, password) => {
        setLoading(true)
        try {
            const data = await login(username, password)
            setUser(data.user)
            console.log(data)
            return data.user
        } catch (error) {
            console.log(error)
            throw error
        }
        finally {
            setLoading(false)
        }
    }

    return (
        { user, loading, handleRegister, handleLogin }
    )
}

export default useAuth