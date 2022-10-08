import React from "react";
import { HealthCheckEntry } from "../types";
import {Card} from "@material-ui/core";
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
export const HealthCheckEntryComponent = ({
                                    entry
                                }: {
    entry: HealthCheckEntry;
}) => {
    const iconType = () => {
        const rating = entry.healthCheckRating;
        switch (rating) {
            case 0: return <FavoriteIcon style={{color: "green"}}/>;
            case 1: return <FavoriteIcon style={{color: "yellow"}}/>;
            case 2: return <FavoriteIcon style={{color: "red"}}/>;
            case 3: return <HeartBrokenIcon />;
            default: return <p>Wrong value for the rate. Probably dead</p>
        }
    };

    return (
    <Card style={{ width: "50rem", padding: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
            <h4>{entry.date}</h4> <BloodtypeIcon/>
        </div>
        <p>{entry.description}</p>
        <p>Diagnose by: {entry.specialist}</p>
        <p style={{ display: "flex", alignItems: "center" }}>Healthcheck rating {iconType()}</p>
    </Card>
)};
