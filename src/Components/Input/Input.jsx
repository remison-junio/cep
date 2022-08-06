import React from 'react'

import './Input.css'

function Input(props) {

	let classes = `label ${props.classes}`

	let valido = props.valido ? '' : 'erro'
	let estiloInput = `input ${valido}`

	return (
		<div className={classes}>
			<span className="span">{props.name}</span>
			<input value={props.valor} onChange={props.acao} type={props.tipo} className={estiloInput} readOnly={props.readOnly} />
		</div>
	) 
}

export default Input