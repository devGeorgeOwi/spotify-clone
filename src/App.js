import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

// create a new instance of spotify web api
const spotify = new SpotifyWebApi();

function App() {
	// create token and setToken variables and set stateto null
	// const [token, setToken] = useState(null);

	// to pull information from the datalayer
	const [{ user, token }, dispatch] = useDataLayerValue();

	// Run code based on a given condition,
	// and we set empty [] to make sure that the dependency only run once
	useEffect(() => {
		const hash = getTokenFromUrl();
		window.location.hash = "";
		const _token = hash.access_token;

		// verify access toekn and get user info from spotify
		if (_token) {
			// send action type of SET_TOKEN & a payload of _token
			dispatch({
				type: "SET_TOKEN",
				token: _token,
			});
			// setToken(_token);

			// sets the value of token from spotify
			spotify.setAccessToken(_token);

			spotify.getMe().then(user => {
				// fires an action of SET_USER to the DataLayer
				dispatch({
					type: "SET_USER",
					user: user,
				});
			});

			spotify.getUserPlaylists().then(playlists => {
				dispatch({
					type: "SET_PLAYLISTS",
					playlists: playlists,
				});
			});
		}
	}, []);

	// returns null by default
	// console.log("🧑", user);
	// console.log("🔑", token);

	return <div className="app">{token ? <Player /> : <Login />}</div>;
}

export default App;
