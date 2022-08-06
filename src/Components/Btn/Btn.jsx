import React from 'react'

import './Btn.css'

function Btn(props) {
	return (
		<button onClick={props.acao} className="btn">{props.name}</button>
	)
}

export default Btn