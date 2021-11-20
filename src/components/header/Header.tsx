import React, { FC } from "react";
import classes from './Header.module.css'

export const Header: FC = () => {
    return (
        <div className={classes.header}>
            <h1>Star Wars</h1>
        </div>
    )
}