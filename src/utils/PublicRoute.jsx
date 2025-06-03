import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Routers } from '../Routes/Routers';

const PublicRoute = ({ children }) => {
    const { token, role } = useSelector((state) => state.auth);

    if (token) {
        if (role === 'ADMIN') return <Navigate to={Routers.ADMIN_DASHBOARD} />;
        if (role === 'USER') return <Navigate to={Routers.DASHBOARD} />;

    }

    return children;
};

export default PublicRoute;
