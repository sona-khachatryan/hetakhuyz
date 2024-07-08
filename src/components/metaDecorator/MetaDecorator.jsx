import {Helmet} from "react-helmet";
import {address} from "../../repetitiveVariables/variables.js";

const MetaDecorator = ({ title, imageUrl }) => (
    <>
        {imageUrl ?
            <Helmet>
                <title>{'Հետախույզ լրատվական'}</title>
                <meta property="og:title" content='Հետախույզ լրատվական'/>
                <meta name="description" content={title}/>
                <meta property="og:description" content={title}/>
                <meta property="twitter:title" content='Հետախույզ լրատվական'/>
                <meta property="twitter:description" content={title}/>
                <meta property="og:url" content={ 'https://hetakhuyz.am' + window.location.pathname + window.location.search}/>
                <meta property="og:image" content={`${address}/${imageUrl}`}/>
                <meta name="twitter:card" content='summary_large_image'/>
                <meta property="twitter:image" content={`${address}/${imageUrl}`}/>
            </Helmet>
           :
            <Helmet>
                <title>{title}</title>
                <meta property="og:title" content='Հետախույզ լրատվական'/>
                <meta name="description" content={title}/>
                <meta property="og:description" content={title}/>
                <meta property="twitter:title" content='Հետախույզ լրատվական'/>
                <meta property="twitter:description" content={title}/>
                <meta property="og:url" content={ 'https://hetakhuyz.am' + window.location.pathname + window.location.search}/>
            </Helmet>
       }
    </>
);

export default MetaDecorator;