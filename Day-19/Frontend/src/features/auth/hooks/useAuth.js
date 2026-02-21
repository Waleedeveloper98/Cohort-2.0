import { useContext } from "react";
import { AuthContext } from "../Auth.context.jsx";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, loading, setUser, setLoading } = context

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await login(username, password);
            setUser(response.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password);
            setUser(response.user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return { user, loading, handleLogin, handleRegister }
}