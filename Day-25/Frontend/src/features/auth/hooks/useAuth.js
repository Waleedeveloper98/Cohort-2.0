import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../AuthProvider'
import { getMe, login, logout, register } from '../services/auth.api'

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

    const handleLogin = async ({ usernameOrEmail, password }) => {
        setLoading(true);
        try {
            const data = await login({ usernameOrEmail, password });
            setUser(data.user);
            return data.user;
        } finally {
            setLoading(false);
        }
    };

    const handleGetMe = async () => {
        try {
            const data = await getMe()
            setUser(data.user)
            return data.user
        } catch (error) {
            setUser(null)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        // setLoading(true)
        try {
            await logout();
            setUser(null)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return (
        { user, loading, handleRegister, handleLogin, handleLogout }
    )
}

export default useAuth