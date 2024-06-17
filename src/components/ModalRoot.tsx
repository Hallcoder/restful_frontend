import { useEffect } from 'react';

const ModalRoot = () => {
    useEffect(() => {
        const modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);

        return () => {
            document.body.removeChild(modalRoot);
        };
    }, []);

    return null; // This component doesn't render anything visible
};

export default ModalRoot;
