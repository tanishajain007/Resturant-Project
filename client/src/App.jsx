import { useEffect } from 'react';
import AppRouter from './AppRouter.jsx'
import AuthStore from './store/AuthStore.js';

const App = () => {
    const { checkAuthApi } = AuthStore();

    useEffect(() => {
        checkAuthApi();
    }, [])

    return <AppRouter />;
}

export default App
