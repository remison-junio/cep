import React, {useState, useEffect} from 'react'

import Input from '../Input/Input'
import Btn from '../Btn/Btn'

import Modal from '../Modal/Modal'

import './Form.css'

function Form(props) {

	const [cep, setCep] = useState('')
	
	const [classesCep, setClassesCep] = useState('cep')

	const [carregando, setCarregando] = useState('')

	const [modal, setModal] = useState('')

	const [estado, setEstado] = useState({
		rua: '',
		complemento: '',
		bairro: '', 
		cidade: '',
		uf: ''
	})

	function limparEndereco() {
		setEstado({
			rua: '',
			complemento: '',
			bairro: '', 
			cidade: '',
			uf: ''
		})
	}

	function buscar() {
		let novoCep = cep.replaceAll('-', '').replaceAll('.', '')
		
		if(novoCep.length === 8 && !isNaN(novoCep)) {

			setCarregando(
				<div className="carregando">
					Carregando...
				</div>
			)

			let link = `https://viacep.com.br/ws/${novoCep}/json/`
			fetch(link)
				.then(resposta => resposta.json())
				.then(dados => {
					if(dados.erro) {
						throw new Error(dados.statusText)
					} else {
						setClassesCep('cep')

						setEstado({
							rua: dados.logradouro,
							complemento: dados.complemento,
							bairro: dados.bairro, 
							cidade: dados.localidade,
							uf: dados.uf
						})

						setCarregando('')
					}
				})
				.catch(()=> {
					setCarregando('')

					setModal(<Modal fechar={()=> setModal('')} texto="Cep não encontrado!" />)

					limparEndereco()
				})

		} else {
			setClassesCep('cep erro')

			setModal(<Modal fechar={()=> setModal('')} texto="Cep inválido!" />)

			limparEndereco()
		}
	}

	useEffect(()=> {
		setClassesCep('cep')
	}, [cep])

	return (
		<div className="form">
			<h2 className="subtitulo">Digite o CEP</h2>
			<Input valor={cep} acao={e => setCep(e.target.value)} name="Cep*" classes={classesCep} valido={true}/>
			<Btn acao={buscar} name="Pesquisar" />
			<Input valor={estado.rua} name="Rua" classes="rua" readOnly />
			<Input valor={estado.complemento} name="Complemento" classes="complemento" readOnly />
			<Input valor={estado.bairro} name="Bairro" classes="bairro" readOnly />
			<Input valor={estado.cidade} name="Cidade" classes="cidade" readOnly />
			<Input valor={estado.uf} name="UF" classes="uf" readOnly />


			{carregando}

			{modal}

		</div>
	)
}

export default Form