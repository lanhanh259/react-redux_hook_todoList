import moment from 'moment'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { addTodo, deleteTodo, updateTodo } from '../actions/index'
import TodoDetails from './TodoDetails'

function Todo() {
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef()

	const list = useSelector((state) => state.todoReducers.list || [])
	const dispatch = useDispatch()

	function nextTodoId(list) {
		const maxId = list.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
		return maxId + 1
	}

	//action
	const update = (index, newData) => {
		const listTodo = [...list]
		listTodo[index].data = newData
		listTodo[index].date = moment()

		dispatch(updateTodo(listTodo))
	}

	const handleAddTodo = (e) => {
		const trimInput = inputValue.trim()

		if (trimInput) {
			const listTodo = [...list]
			const item = {
				id: nextTodoId(list),
				data: trimInput,
				date: moment(),
			}

			listTodo.push(item)

			dispatch(addTodo(listTodo))
			setInputValue('')
		}
		inputRef.current.focus()
	}

	const handleDelete = (index) => {
		const listTodo = [...list]
		listTodo.splice(index, 1)
		dispatch(deleteTodo(listTodo))
	}

	return (
		<>
			<h1 style={{ padding: '10px 0' }}> Todo List</h1>
			<div className="add-job">
				<input
					value={inputValue}
					placeholder="Add jobs"
					ref={inputRef}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<i
					style={{ padding: 10, fontSize: '18px', cursor: 'pointer' }}
					className="fal fa-plus-circle"
					onClick={handleAddTodo}
				></i>
			</div>
			<ul className="listTodo">
				{list.map((item, index) => (
					<TodoDetails
						key={index}
						index={index}
						item={item}
						deleteTodo={() => handleDelete(index)}
						update={update}
					/>
				))}
			</ul>
			<Outlet />
		</>
	)
}
export default Todo
