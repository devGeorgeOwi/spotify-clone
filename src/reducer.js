// create an initialState of the datalayer
export const initialState = {
	user: null,
	playlists: [],
	playing: false,
	item: null,

	// Remove the authentication everytime we login
	// Note: delete it after finished developing...
	// token:
	// "BQAMGd1phXLc6PsCsyCe6PwOT4gtGlxOxugRV4psSMK3oZirFxF9xkjIwKyO2rknvlu7Z12mJyHSyI9RGqkT-4a85ve5s0b6_heQcD1_goM6fL2I7EVY1OosSi5tGS4vK6WBOoxmapHwqSPPibK5onxT7vjkQZBlOXHZkRcTquxa9CAEFZ8o",
};

const reducer = (state, action) => {
	// tip - always console log the action useful for debugging
	console.log(action);

	// action -> type, [payload]

	switch (action.type) {
		// we use reducer to listen to the dispatched action
		case "SET_USER":
			return {
				// takes the existing state/props
				...state,
				// change the existing user state/props to current action of user
				user: action.user,
			};

		case "SET_TOKEN":
			return {
				// existing props of state
				...state,
				// change the value of token
				token: action.token,
			};

		case "SET_PLAYLISTS":
			return {
				...state,
				playlists: action.playlists,
			};
		default:
			// reutrns the state if there's anyother action unchanged
			return state;
	}
};

export default reducer;
