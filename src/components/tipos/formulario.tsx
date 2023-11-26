import Entrada from "./entrada";
import { useState } from "react";
import Botao from "./botao";
import Tipo from "@/core/Tipo";



interface FormularioProps {
   tipo: Tipo
   tipoMudou?: (tipo: Tipo) => void
   cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
   const id = props.tipo?.id
   const [id_tipo, setidtipo] = useState(props.tipo?.id_tipo)
   const [desc_tipo, setdesctipo] = useState(props.tipo?.desc_tipo)

   return (<div>
      {id ? (<Entrada texto="id" valor={id} somenteLeitura ></Entrada>) : false}
      <Entrada texto="id_tipo" valor={id_tipo} onChange={setidtipo}></Entrada>
      <Entrada texto="des_tipo" valor={desc_tipo} onChange={setdesctipo}></Entrada>
      <div className="flex justify-end mt-5" >

         <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700"
            onClick={() => props.tipoMudou?.(new Tipo(
               id, id_tipo, desc_tipo))}>

            {id ? 'Alterar' : 'Salvar'}
         </Botao>
         <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700"
            onClick={props.cancelado}>Cancelar

         </Botao>
      </div>
   </div>
   )
}
