import React from "react";
import { Link } from "react-router-dom";

function NavBarcontent() {
    return(
        <div>
        <Link to="/">Feed</Link>
        <Link to="/record/">record</Link>
        <Link to="report/">report</Link>
        </div>
    );
};

export default NavBarcontent;