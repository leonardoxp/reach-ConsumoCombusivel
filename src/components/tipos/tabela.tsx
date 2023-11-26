import Tipo from "@/core/Tipo"
import { IconeEdicao, IconeLixo } from "../icones/tabela"



interface TabelaProps {
    tipos: Tipo[]
    tipoSelecionado?: (tipo: Tipo) => void
    tipoExcluido?: (tipo: Tipo) => void
}



export default function Tabela(props: TabelaProps) {
    const exibirAcoes = props.tipoSelecionado || props.tipoExcluido

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">id</th>
                <th className="text-left p-3">id_tipo</th>
                <th className="text-left p-3">desc_tipo</th>

                {exibirAcoes ? <th className="p-3">Ações</th> : false}



            </tr>)
    }
    function renderDados() {
        return props.tipos?.map((tipo, i) => {
            return (
                <tr key={tipo.id}
                    className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-left p-3">{tipo.id}</td>
                    <td className="text-left p-3">{tipo.id_tipo}</td>
                    <td className="text-left p-3">{tipo.desc_tipo}</td>


                    {exibirAcoes ? renderizarAcoes(tipo) : false}
                </tr>)
        })
    }

    function renderizarAcoes(tipo: Tipo) {
        return (
            <td className="flex justify-center">
                {props.tipoSelecionado ? (
                    <button onClick={() => props.tipoSelecionado?.(tipo)} className={`flex justify-center items text-green-600
        rounded-full p-2 m-1 hover:bg-gray-100`}>{IconeEdicao}</button>
                ) : false}
                {props.tipoExcluido
                    ? (<button onClick={() => props.tipoExcluido?.(tipo)}
                        className={`flex justify-center items text-red-600
        rounded-full p-2 m-1 hover:bg-gray-100`}>{IconeLixo}</button>)
                    : false}
            </td>)
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`text-gray-100
        bg-gradient-to-r from-indigo-500 to-indigo-800`}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderDados()}
            </tbody>
        </table>
    )
}