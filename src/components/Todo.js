import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, updateTodo } from '../actions/index'
import AddTodo from './AddTodo'
import TodoDetail from './TodoDetail'

function Todo() {
	const list = useSelector((state) => state.todoReducers.list)
	const dispatch = useDispatch()

	const update = (index, newId, newData) => {
		const listTodo = [...list]
		if (newId && typeof +newId === 'number' && !isNaN(newId)) {
			listTodo[index].id = +newId
		}
		if (newData.trim()) {
			listTodo[index].data = newData
		}
		listTodo[index].date = moment()

		dispatch(updateTodo(listTodo))
		//save local storage
		localStorage.setItem('list', JSON.stringify(listTodo))
	}

	const handleDelete = (index) => {
		const listTodo = [...list]
		listTodo.splice(index, 1)
		dispatch(deleteTodo(listTodo))

		//save local storage
		localStorage.setItem('list', JSON.stringify(listTodo))
	}

	return (
		<div className="list">
			<h1 style={{ padding: '10px 0' }}> Todo List</h1>
			<AddTodo />
			<ul className="list-todo">
				{list.map((item, index) => (
					<TodoDetail
						key={index}
						index={index}
						item={item}
						deleteTodo={() => handleDelete(index)}
						update={update}
					/>
				))}
			</ul>
		</div>
	)
}
export default Todo
