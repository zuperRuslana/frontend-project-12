import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px'}}>
            <h1> 404 Page Not Found</h1>
            <p> {t('errors.page_not_exists')}</p>
            <Link to="/"> {t('errors.go_to_chat')}</Link>
        </div>
    )
};
export default NotFound;