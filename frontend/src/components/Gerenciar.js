import React, { useState, useEffect } from 'react';
import GerenciarInfo from './GerenciarInfo';

import './Gerenciar.css';

function UpdateProjeto({ projeto, onUpdateProjeto, display }) {

    const [cliente, setCliente] = useState(projeto.cliente);
    const [nomeProjeto, setNomeProjeto] = useState(projeto.nomeProjeto);
    const [disciplinaMestre, setDisciplinaMestre] = useState(projeto.disciplinaMestre);
    const [numPedido, setNumPedido] = useState(projeto.numPedido);
    const [responsavel, setResponsavel] = useState(projeto.responsavel);
    const [tipoEngenharia, setTipoEngenharia] = useState(projeto.tipoEngenharia);

    const [arquivado, setArquivado] = useState(projeto.arquivado);
    const [status, setStatus] = useState(projeto.status);

    const [infoProjetos, setInfoProjetos] = useState(projeto.infoProjetos);

    useEffect(() => {

        async function arquivar(id) {

            // Verifica se a propriedade de arquivado mudou em relação à propriedade original
            if (arquivado !== projeto.arquivado) {
                new Promise((resolve, reject) => {
                    const texto = 'Descrição do status:';
                    let novoStatus = window.prompt(texto, "");
                    novoStatus = novoStatus.toUpperCase();
                    resolve(novoStatus);
                })
                .then((novoStatus) => {
                    var body = {
                        cliente,
                        nomeProjeto,
                        disciplinaMestre,
                        numPedido,
                        responsavel,
                        tipoEngenharia,
                        status: novoStatus,
                        infoProjetos,
                        arquivado
                    };

                    return(body);
                })
                .then((body) => {
                    // O problema não está na chamada desta função
                    onUpdateProjeto(id, body);
                })
                .then(() => {
                    decideWhatToDisplay();
                })
                .catch((err) => {
                    console.log('Ocorreu um erro :(');
                    return(err);
                });
            }
            
        }

        arquivar(projeto._id);

    });

    //===========================================================================

    function decideWhatToDisplay() {
        if (arquivado) {
            display('Arquivados');
        } else {
            display('Abertos');
        }
    }

    //===========================================================================

    async function apagarProjeto(id) {

        setInfoProjetos(infoProjetos.filter(infoProjeto => infoProjeto._id !== id));

    }

    //===========================================================================

    async function salvar(id) {
        await onUpdateProjeto(id, {
            cliente,
            nomeProjeto,
            disciplinaMestre,
            numPedido,
            responsavel,
            tipoEngenharia,
            status,
            infoProjetos,
            arquivado
        });
    }

    //===========================================================================

    function updateInfoProjeto(id, data) {

        var index = infoProjetos.findIndex(x => x._id === id);

        data._id = id;
        setInfoProjetos([
        ...infoProjetos.slice(0, index),
        data,
        ...infoProjetos.slice(index+1)
        ]);
    
    }

    //===========================================================================

    async function novosCampos() {

        let novaInfoProjeto = { 
            'disciplinaDesenho': '',
            'revisao': '',
            'numFull': '',
            'numCliente': '',
            'formato': '',
            'descricao': '',
            'projetistaDesenho': '',
            'verificadorDesenho': '',
            'dataInicio': '',
            'dataFinal': ''
        }

        setInfoProjetos([...infoProjetos, novaInfoProjeto]);
        await salvar(projeto._id);
    }

    //===========================================================================

    function defineTextoBotaoArquivar() {
        if (projeto.arquivado) {
            return 'Desarquivar';
        } else {
            return 'Arquivar';
        }
    }

    //===========================================================================

    return(
        <>
        <div className="update-item">
            <div id={projeto._id} className="grid-container">

            <form className="update-form">
                <div className="input-block">
                    <label htmlFor="status">
                        Status
                    </label>
                    <input 
                        type="text" 
                        name="status"
                        required
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="cliente">
                        Cliente
                    </label>
                    <input 
                        type="text" 
                        name="cliente"
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
                        value={nomeProjeto}
                        onChange={e => setNomeProjeto(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="disciplinaMestre">
                        Disciplina mestre
                    </label>
                    <input 
                        type="text" 
                        name="disciplinaMestre"
                        value={disciplinaMestre}
                        onChange={e => setDisciplinaMestre(e.target.value)}
                    />
                </div>

                <div className="input-block">
                    <label htmlFor="numPedido">
                        Número do pedido
                    </label>
                    <input 
                        type="text" 
                        name="numPedido"
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
                        value={tipoEngenharia}
                        onChange={e => setTipoEngenharia(e.target.value)}
                    />
                </div>

                {/*
                 * InfoProjetos
                 */}
                <ol>
                    {infoProjetos.map(informacao => (
                        <GerenciarInfo 
                            key={String(informacao._id)}
                            informacao={informacao}
                            updateInfoProjeto={updateInfoProjeto}
                            apagarProjeto={apagarProjeto}
                        />
                    ))}
                </ol>

            </form>
                
                
{ /* ================================================================================================ */ }

                <div className="div-buttons">

                    {/*
                        Funcionando 
                    Adiciona os campos de input para adicionar novas informações ao projeto que está aberto
                    */}
                    <button
                        type="button"
                        className="btn-adicionarCampos"
                        onClick={() => {
                            novosCampos();
                        }}
                    >
                        Adicionar
                    </button>

                    {/* 
                        Funcionando
                    Quando o usuário clicar neste botão
                    */}
                    <button
                        type="button"
                        className="btn-salvar"
                        onClick={() => {
                            salvar(projeto._id);
                        }}
                    >
                        Salvar
                    </button>

                    {/* 
                        Funcionando 
                    Quando o usuário clicar neste botão ele deve ser redirecionado para a página que estava anteriormente, que pode ser definida com base no valor do estado arquivado.
                    */}
                    <button 
                        type="button"
                        className="btn-cancelar"
                        onClick={() => {
                            decideWhatToDisplay()
                        }}
                    >
                        Cancelar
                    </button>

                    {/*
                        Funcionando
                    Quando este botão for clicado, deve abrir uma janela pop-up para que o usuário possa atualizar o valor do estado de status. 
                     */}
                    <button
                        type="button"
                        className="btn-arquivar"
                        onClick={() => {
                            setArquivado(!projeto.arquivado)
                        }}
                    > 
                        {
                            defineTextoBotaoArquivar()
                        }
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default UpdateProjeto;