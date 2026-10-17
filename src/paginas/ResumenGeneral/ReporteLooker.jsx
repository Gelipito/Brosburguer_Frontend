import React from "react";
import "./ReporteLooker.css";

const ReporteLooker = () => {
    return (
        <div className="reporte-looker-container">
            <iframe
                title="Reporte Looker Studio"
                className="reporte-looker-iframe"
                src="https://datastudio.google.com/embed/reporting/a9503137-f71e-4868-93cf-0b89f05eb925/page/p_810bk50e8d"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
        </div>
    );
};

export default ReporteLooker;