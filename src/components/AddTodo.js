import moment from 'moment'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../actions/index'

const AddTodo = () => {
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef()

	const list = useSelector((state) => state.todoReducers.list)
	const dispatch = useDispatch()

	function nextTodoId(list) {
		const maxId = list.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
		return maxId + 1
	}

	const handleAddTodo = (e) => {
		const trimInput = inputValue.trim()

		if (trimInput) {
			const newList = [...list]
			const newItem = {
				id: nextTodoId(list),
				data: trimInput,
				date: moment(),
			}
			newList.push(newItem)
			dispatch(addTodo(newList))

			//save local storage
			localStorage.setItem('list', JSON.stringify(newList))

			setInputValue('')
		}
		inputRef.current.focus()
	}

	return (
		<form>
			<input
				value={inputValue}
				placeholder="Add jobs"
				ref={inputRef}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<i
				style={{ padding: 10, fontSize: '18px', cursor: 'pointer' }}
				className="fal fa-plus-circle add-job"
				onClick={handleAddTodo}
			></i>
		</form>
	)
}

export default AddTodo
