import React, { useEffect, useState } from "react";
import axios from "axios";
import getTeamLogoPath from "../utils/getTeamLogoPath";
import "./injuries.css";

const Injuries = () => {
    const [injuries, setInjuries] = useState([]);

    useEffect(() => {
        const fetchInjuries = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/injuries");
                setInjuries(response.data);
            } catch (error) {
                console.error("Error fetching injury data:", error);
            }
        };

        fetchInjuries();
    }, []);

    return (
        <div className="injuries-container">
            <h2>NBA Injury Report</h2>
            <div className="injury-list">
                {injuries.map((team) => (
                    <div key={team.teamName} className="team-injury-card">
                        <div className="team-header">
                            <img src={getTeamLogoPath(team.teamName)} alt={team.teamName} className="team-logo" />
                            <h3>{team.teamName}</h3>
                        </div>
                        <ul>
                            {team.players.map((player, index) => (
                                <li key={index} className="injury-item">
                                    <span className="player-name">{player.playerName} ({player.position})</span>
                                    <span className="injury-status">{player.injuryStatus}</span>
                                    <span className="injury-details">{player.injuryDetails}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Injuries;