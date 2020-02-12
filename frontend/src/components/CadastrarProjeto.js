import React, { useState } from 'react';

import './CadastrarProjeto.css';

function CadastrarProjeto({ onSubmit }) {
    const [cliente, setCliente] = useState('');
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [projetista, setProjetista] = useState('');
    const [verificador, setVerificador] = useState('');
    const [numPedido, setNumPedido] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [tipoEngenharia, setTipoEngenharia] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            cliente,
            nomeProjeto,
            projetista,
            verificador,
            numPedido,
            responsavel,
            tipoEngenharia
        });
    }

    return(

        <div className="cadastrar">
            <h2>
                <strong>CADASTRO</strong>
            </h2>
            <form onSubmit={handleSubmit}>

                <div className="input-block">
                    <label htmlFor="cliente">
                        Cliente
                    </label>
                    <input 
                        type="text" 
                        name="cliente"
                        id="cliente"
                        required
                        value={cliente}
                        onChange={e => setCliente(e.target.value)}
                    />
                </div>
                
                <div className="input-block">
                    <label htmlFor="nomeProjeto">
                        Nome do projeto
                    </label>
                    <input 
                        type="text" 
                        name="nomeProjeto"
                        id="nomeProjeto"
                        value={nomeProjeto}
                        onChange={e => setNomeProjeto(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="projetista">
                        Projetista
                    </label>
                    <input 
                        type="text" 
                        name="projetista"
                        id="projetista"
                        value={projetista}
                        onChange={e => setProjetista(e.target.value)}
                    />
                </div>
                
                <div className="input-block">
                    <label htmlFor="verificador">
                        Verificador
                    </label>
                    <input 
                        type="text" 
                        name="verificador"
                        id="verificador"
                        value={verificador}
                        onChange={e => setVerificador(e.target.value)} 
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="numPedido">
                        Número do pedido
                    </label>
                    <input 
                        type="text" 
                        name="numPedido"
                        id="numPedido"
                        value={numPedido}
                        onChange={e => setNumPedido(e.target.value)} 
                    />
                </div>
                
                <div className="input-block">
                    <label htmlFor="responsavel">
                        Responsável
                    </label>
                    <input 
                        type="text" 
                        name="responsavel"
                        id="responsavel"
                        value={responsavel}
                        onChange={e => setResponsavel(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="tipoEngenharia">
                        Tipo de engenharia
                    </label>
                    <input 
                        type="text" 
                        name="tipoEngenharia"
                        id="tipoEngenharia"
                        value={tipoEngenharia}
                        onChange={e => setTipoEngenharia(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Cadastrar novo projeto
                </button>
            </form>
        </div>
        
    );
}

export default CadastrarProjeto;