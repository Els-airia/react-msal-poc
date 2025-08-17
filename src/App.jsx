import React, {useState} from 'react';

import { PageLayout } from './components/PageLayout';
import { ProfileData } from './components/ProfileData';

import {AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from '@azure/msal-react';
import './App.css';
import Button from 'react-bootstrap/Button';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [profileData, setProfileData] = useState(null);

    const getProfileData = () => {
        instance.acquireTokenSilent({
            scopes: ['api://f6df5759-b340-4bf3-abd3-fcbb6f3b2602/access_as_user'],
            account: accounts[0],
        })
            .then(response => {
                const idToken = response.idToken;
                const decoded = parseJwt(idToken);
                setProfileData({
                    preferred_username: decoded.preferred_username,
                    role: decoded.roles
                });
            });
    }
    const parseJwt = (token) => {
        const base64Payload = token.split('.')[1];
        return JSON.parse(atob(base64Payload));
    }

    return (
        <>
            <h5 className="profileContent">Welcome {accounts[0].name}</h5>
            {profileData ? (
                <ProfileData profileData={profileData} />
            ) : (
                <>
                <Button variant="secondary" onClick={getProfileData}>
                    Fetch User Profile & Role Assigned
                </Button>
                </>
            )}
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
