import { stringParaEntradaDeData } from "@/utils/converters";

export default class Tipo {
    id: number | null;
    id_tipo: number | null;
    desc_tipo: string;

    constructor(
        id: number | null, id_tipo: number | null, desc_tipo: string) {
        this.id = id;
        this.id_tipo = id_tipo;
        this.desc_tipo = desc_tipo;
    }

    static geraEventosMock() {
        return [new Tipo(
            1,
            1,
            "Passeio",
        ),
        new Tipo(
            2,
            2,
            "Utilitario",
        )
        ]
    }

    static vazio(): Tipo {
        return new Tipo(null, null, "");
    }


}
