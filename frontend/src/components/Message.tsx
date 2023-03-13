import './Message.css';

const Message = ({message, messageType}) => {
		return (
				<div className={`message ${messageType}`}>
					<p>{message}</p>
				</div>
		)
}

export default Message