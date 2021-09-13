import React, { useEffect, useState } from "react";
import QrReader from './QRCodeScanner';

const LogEntry = (props, match) => {
    
    const [isLogin, setLogin] = useState(false);
    useEffect(() => {
        
        setLogin(props.match.params.value == 'welcome' ? true : false);
        
    }, [isLogin]);

    return (
        <div>
            <QrReader isLogin={isLogin} ></QrReader>
        </div>
    ); 
}

export default LogEntry;