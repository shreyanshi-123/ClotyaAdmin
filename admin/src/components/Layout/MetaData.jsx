import { Helmet } from "react-helmet"
import React from "react";

const MetaData = ({title, description, canonicalUrl}) => {
    return(
        <Helmet>
            <title>{title}</title>
            {description && (
               <meta
                    name="description"
                    content={description}
                /> 
            )}

            {canonicalUrl &&
                <link rel="canonical" href={canonicalUrl ? canonicalUrl : process.env.REACT_APP_API_URL } />
            }
            
        </Helmet>
    )
}

export default MetaData