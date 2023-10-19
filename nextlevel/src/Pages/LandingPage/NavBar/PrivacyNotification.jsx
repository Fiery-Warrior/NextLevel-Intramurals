import React, { useState } from "react";
import { Button } from '@material-ui/core';

const PrivacyNotification = () => {
    const [acknowledged, setAcknowledged] = useState(false);

    const handleAcknowledgement = () => {
        setAcknowledged(true);
    };

    if (acknowledged) {
        return null;
    }

    return (
        <div
            style={{
                backgroundColor: "black",
                color: "white",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 16,
                fontFamily: 'Roboto',
                fontWeight: '400',
                lineHeight: 3,
            }}
        >
            <p style={{ margin: 0 }}>
                Privacy setting — This site uses third-party website tracking
                technologies to provide and continually improve our services. By
                continued use of this site you understand and agree with these uses.
            </p>
            {/* <button onClick={handleAcknowledgement} style = {{marginRight: "20px",}}>Acknowledge</button> */}
            <Button onClick={handleAcknowledgement} style={{ marginRight: "20px", backgroundColor: 'white', color: 'black', textTransform: 'none'  }}>Acknowledge</Button>
        </div>
    );
};

export default PrivacyNotification;
