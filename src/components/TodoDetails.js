import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function TodoDetails({ index, item, deleteTodo, update }) {
	const [isEditing, setIsEditing] = useState(false)
	const [updateData, setUpdateData] = useState('')

	const handleUpdate = () => {
		update(index, updateData)
		setIsEditing(false)
	}

	return (
		<li>
			{isEditing ? (
				<>
					<input
						value={updateData}
						onChange={(e) => setUpdateData(e.target.value)}
					/>
					<button onClick={() => handleUpdate()}>Save</button>
				</>
			) : (
				<Link to={`${item.id}`}>
					<span>{item.id}. </span>
					<span
						style={{
							padding: 12,
							minWidth: '120px',
							display: 'inline-block',
							fontWeight: 500,
						}}
					>
						{item.data}
					</span>
					<span style={{ floatRight: 'right' }}>
						{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}
					</span>
				</Link>
			)}
			<div>
				<button onClick={() => setIsEditing(true)}>
					<i className="far fa-edit"></i>
				</button>
				<button onClick={() => deleteTodo()}>
					<i className="far fa-times"></i>
				</button>
			</div>
		</li>
	)
}

export default TodoDetails
