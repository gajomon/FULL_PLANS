import React from 'react';

import './ListItem.css';

function ListItem({ projeto, display, setProjeto }) {

    // Redireciona para a página de gerenciamento de projetos, passando como parâmetro os dados do projeto que está sendo mostrado no card específico
    function redirecionar() {
        // setProjeto == setProjetoUpdate do App.js
        setProjeto(projeto);
        display('Gerenciar');
    }

    return(
        <li>
            <div className="list-item">
                <div id={projeto._id} className="grid-container">
                    <p>Status:</p>
                    <p>{projeto.status}</p>
                    <p>Cliente: </p>
                    <p>{projeto.cliente}</p>
                    <p>Nome do projeto: </p>
                    <p>{projeto.nomeProjeto}</p>
                    <p>Disciplina mestre</p>
                    <p>{projeto.disciplinaMestre}</p>
                    <p>Número do pedido</p>
                    <p>{projeto.numPedido}</p>
                    <p>Responsável</p>
                    <p>{projeto.responsavel}</p>
                </div>
                <div className="div-buttons">
                    <button
                        type="button"
                        className="btn-editar"
                        onClick={() => redirecionar()}
                    >
                        Gerenciar
                    </button>
                </div>
            </div>
        </li>
    );
}

export default ListItem;