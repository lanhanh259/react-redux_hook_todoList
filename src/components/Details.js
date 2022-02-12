import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteTodo, updateTodo } from '../actions/index'

function Details() {
	const [isEditing, setIsEditing] = useState(false)
	const [updateData, setUpdateData] = useState('')

	const params = useParams()
	const list = useSelector((state) => state.todoReducers.list)
	const dispatch = useDispatch()

	const itemTodo = list.find((todo) => +params.idTodo === todo.id)
	const index = itemTodo.id

	const handleUpdate = () => {
		update(index, updateData)
		setIsEditing(false)
	}

	const update = (index, newData) => {
		const listTodo = [...list]
		listTodo[index].data = newData
		listTodo[index].date = moment()

		dispatch(updateTodo(listTodo))
	}
	const handleDelete = () => {
		const listTodo = [...list]
		listTodo.splice(index, 1)
		dispatch(deleteTodo(listTodo))
	}

	return (
		<div>
			<h1>Todo Item</h1>
			<div className="item">
				{console.log('render')}
				{isEditing ? (
					<>
						<input
							value={updateData}
							onChange={(e) => setUpdateData(e.target.value)}
						/>
						<button onClick={() => handleUpdate()}>Save</button>
					</>
				) : (
					<div>
						<span>{index}. </span>
						<span
							style={{
								padding: 12,
								minWidth: '120px',
								display: 'inline-block',
								fontWeight: 500,
							}}
						>
							{itemTodo.data}
						</span>
						<span style={{ floatRight: 'right' }}>
							{moment(itemTodo.date).format('DD/MM/YYYY hh:mm:ss')}
						</span>
					</div>
				)}
				<div>
					<button onClick={() => setIsEditing(true)}>
						<i className="far fa-edit"></i>
					</button>
					<button onClick={handleDelete}>
						<i className="far fa-times"></i>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Details
