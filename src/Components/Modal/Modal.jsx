import React from 'react'

import './Modal.css'

function Modal(props) {
	return (
		<div className="modal-bg">
			<div className="modal">
				<h3 className="modal-titulo">Erro!</h3>

				<p className="modal-texto">{props.texto}</p>

				<button onClick={props.fechar} className="modal-fechar">Fechar</button>
			</div>
		</div>
	)
}

export default Modal