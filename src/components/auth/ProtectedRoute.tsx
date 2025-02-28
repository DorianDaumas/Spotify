import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const ProtectedRoute = ({ children }: { children: React.ReactNode  }) => {
    const location = useLocation();
    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}; 