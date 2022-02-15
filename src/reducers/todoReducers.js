const storageList = JSON.parse(localStorage.getItem('list'))
const initialTodo = {
	list: storageList || [],
}

const todoReducers = (state = initialTodo, action) => {
	switch (action.type) {
		case 'ADD_TODO': {
			return {
				...state,
				list: action.payload,
			}
		}
		case 'DELETE_TODO': {
			return {
				...state,
				list: action.payload,
			}
		}
		case 'UPDATE_TODO': {
			return {
				...state,
				list: action.payload,
			}
		}
		default:
			return state
	}
}

export default todoReducers
