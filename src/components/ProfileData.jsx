import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const ProfileData = (props) => {
    return (
        <div id="profile-div">
            <p><strong>Email: </strong> {props.profileData.preferred_username}</p>
            <p><strong>Role: </strong> {props.profileData.role}</p>
        </div>
    );
};
