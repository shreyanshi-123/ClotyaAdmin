import { Link } from "react-router-dom"
import MetaData from "./MetaData"
import React from "react";

const PageNotFound = () => {

    return(
        <>
            <MetaData title={"Page Not Found - The Clotya"} />

            <section className="max-w-5xl m-auto py-14 px-2.5 text-center flex flex-col gap-5">
                <h3 className="text-8xl font-semibold text-primary-brown pt-1 text-center">404</h3>
                <p className="text-2xl">Oops! That page can't be found.</p>
                <div className="w-20 h-1 bg-black m-auto"></div>
                <p className="max-w-md mx-auto">We're really sorry but we can't seem to find the page you were looking for.</p>

                <Link to="/" className="w-auto mx-auto text-xs font-semibold capitalize cursor-pointer bg-primary-brown p-2 sm:p-2.5 rounded-md text-white" reloadDocument={true}>Back to home</Link>
            </section>
        </>
    )
}

export default PageNotFound