import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const url = 'https://relace.dev';

    return (
        <AppContext.Provider
            value={{ user, setUser, url }}
        >
            {children}
        </AppContext.Provider>
    )
};

export { AppContext, AppProvider };