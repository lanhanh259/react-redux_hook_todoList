import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteTodo, updateTodo } from '../actions/index'

function Details() {
	const [isEditing, setIsEditing] = useState(false)
	const [updateData, setUpdateData] = useState('')
	const [updateId, setUpdateId] = useState('')
	// const [index, setIndex] = useState()

	const list = useSelector((state) => state.todoReducers.list)
	const dispatch = useDispatch()

	const params = useParams()
	const navigate = useNavigate()

	const index = list.findIndex((item, index) => index === +params.indexTodo)
	const itemTodo = list[index]

	const handleUpdate = () => {
		const listTodo = [...list]
		if (updateId && typeof +updateId === 'number' && !isNaN(updateId)) {
			listTodo[index].id = +updateId
		}
		if (updateData.trim()) {
			listTodo[index].data = updateData
		}
		listTodo[index].date = moment()

		dispatch(updateTodo(listTodo))
		setIsEditing(false)
	}
	const handleDelete = () => {
		const listTodo = [...list]
		listTodo.splice(index, 1)
		dispatch(deleteTodo(listTodo))
	}

	useEffect(() => {
		if (!itemTodo) navigate('..')
	}, [])

	return (
		<>
			{console.log('render')}
			{itemTodo && (
				<div>
					<h1 style={{ textAlign: 'center' }}>Todo Item</h1>
					<div className="item">
						{isEditing ? (
							<>
								<input
									style={{ width: '40px', marginRight: '4px' }}
									value={updateId}
									onChange={(e) => setUpdateId(e.target.value)}
									placeholder="id"
									required
								/>
								<input
									value={updateData}
									onChange={(e) => setUpdateData(e.target.value)}
									placeholder="job name"
									required
								/>
								<button onClick={handleUpdate}>Save</button>
							</>
						) : (
							<div>
								<span>{itemTodo?.id}. </span>
								<span
									style={{
										padding: 12,
										minWidth: '120px',
										display: 'inline-block',
										fontWeight: 500,
									}}
								>
									{itemTodo?.data}
								</span>
								<span style={{ floatRight: 'right' }}>
									{moment(itemTodo?.date).format('DD/MM/YYYY hh:mm:ss')}
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
			)}
		</>
	)
}

export default Details
