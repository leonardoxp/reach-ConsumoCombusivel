'use client';
import Botao from "@/components/tipos/botao";
import Formulario from "@/components/tipos/formulario";
import Layout from "@/components/tipos/layout";
import Tabela from "@/components/tipos/tabela";
import Titulo from "@/components/tipos/titulo";
import Tipo from "@/core/Tipo";
import { atualizarTipo, cadastrarTipo, excluirTipo, fetchTipos } from "@/service/tipoService";
import { useEffect, useState } from "react";

export default function Tipos() {

    //const tipos = Tipo.geraEventosMock()
    const [tipo, setTipo] = useState<Tipo>(Tipo.vazio())
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')


    const [tipos, setTipos] = useState<Tipo[]>([]);

    useEffect(() => {
        if (visivel === 'tabela') {
            const loadTipos = async () => {
                try {
                    const dados = await fetchTipos();
                    setTipos(dados);
                } catch (error) {
                    console.error("Erro ao buscar tipos:", error);
                }
            }

            loadTipos();
        }
    }, [visivel]);



    function tipoSelecionado(tipo: Tipo) {
        setTipo(tipo)
        setVisivel('form')
    }


    async function alterarTipo(tipo: Tipo) {
        try {
            const tipoAtualizado = await atualizarTipo(tipo);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao atualizar evento:", error);
        }
    }

    function salvarOuAlterarTipo(tipo: Tipo) {
        if (tipo.id) {
            alterarTipo(tipo)
        } else {
            salvarTipo(tipo)
        }
    }

    async function tipoExcluido(tipo: Tipo) {
        const confirmacao =
            window.confirm("Tem certeza de que deseja excluir este tipo?");
        if (confirmacao) {
            try {
                if (tipo.id !== null) {
                    await excluirTipo(tipo.id);
                } else {
                    console.error("tipoId é null!");
                }
                setTipos(prevTipos => prevTipos.filter(ev => ev.id !== tipo.id));
                } catch (error) {
                console.error("Erro ao excluir tipo:", error);
            }
        }
    }

    async function salvarTipo(tipo: Tipo) {
        try {
            const novoTipo = await cadastrarTipo(tipo);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao salvar tipo:", error);
        }
    }


    function novoTipo() {
        setTipo(Tipo.vazio())
        setVisivel("form")
    }




    // function novoTipo() {
    //    setTipo(Tipo.vazio())
    //     setVisivel("form")
    // }

    // function salvarTipo(tipo: Tipo) {
    //     console.log(tipo)
    //     setVisivel("tabela")
    // }

    //  function tipoSelecionado1(tipo: Tipo) {
    //      console.log(tipo.desc_tipo)
    //  }
    //  function tipoExcluido(tipo: Tipo) {
    //     console.log(tipo.desc_tipo)
    //}

    return (
        <div className={`
 flex justify-center items-center h-screen
 bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
 text-white`}>

            <Layout titulo="Cadastro de Tipos">
                {visivel === 'tabela' ? (
                    <> <div className="flex justify-end">
                        <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                            onClick={() => novoTipo()}>
                            Novo Tipo </Botao>
                    </div>
                        <Tabela tipos={tipos}
                            tipoSelecionado={tipoSelecionado}
                            tipoExcluido={tipoExcluido}></Tabela>
                    </>
                ) : (<Formulario tipo={tipo}
                    tipoMudou={salvarOuAlterarTipo}
                    cancelado={() => setVisivel('tabela')} />)}
            </Layout>


        </div>


    )
}


