import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const RESET_FORM = 'auth/RESET_FORM';

const REGISTER_LOADING = 'auth/REGISTER_LOADING';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const registerLoading = createAction(REGISTER_LOADING);
const registerSuccess = createAction(REGISTER_SUCCESS);
const registerFailure = createAction(REGISTER_FAILURE);

export const registerThunk = ({ username, password }) => async dispatch => {
	dispatch(registerLoading(true));

	try {
		const { data } = await axios.post('/api.v1.0/auth/register', {
			username,
			password
		});
		console.log(data);
		dispatch(registerSuccess(data));
	} catch (e) {
		dispatch(registerFailure(e));
	}
};

export const changeInput = createAction(CHANGE_INPUT, ({ type, key, value }) => ({
	type,
	key,
	value
}));
export const resetForm = createAction(RESET_FORM, type => type);

const initialState = {
	register: {
		username: '',
		password: '',
		passwordConfirm: ''
	},
	login: {
		username: '',
		password: ''
	},
	loading: false,
	data: null,
	error: null
};

export default handleActions(
	{
		[CHANGE_INPUT]: (state, action) => {
			return {
				...state,
				[action.payload.type]: {
					...state[action.payload.type],
					[action.payload.key]: action.payload.value
				}
			};
		},
		[RESET_FORM]: (state, action) => {
			return {
				...state,
				[action.payload]: initialState.register,
				error: null
			};
		},
		[REGISTER_LOADING]: (state, action) => ({
			...state,
			loading: action.payload,
			error: null
		}),
		[REGISTER_SUCCESS]: (state, action) => ({
			...state,
			loading: false,
			data: action.payload,
			error: null
		}),
		[REGISTER_FAILURE]: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		})
	},
	initialState
);
