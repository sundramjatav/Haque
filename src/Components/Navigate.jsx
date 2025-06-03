import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigate = ({ to }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (to) {
            navigate(to);
        }
    }, [to, navigate]);

    return null;
};

export default Navigate;
