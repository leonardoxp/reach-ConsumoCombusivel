import axios from 'axios';
import Tipo from '../core/Tipo';

interface ApiResponse {
    content: Tipo[];
}
const BASE_URL = 'http://localhost:8080';

export const fetchTipos = async (): Promise<Tipo[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/tipos`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar tipos');
  }
};

export const cadastrarTipo = async (tipo: Tipo): Promise<Tipo> => {
    try {
      const response = await axios.post<Tipo>(`${BASE_URL}/tipos`, tipo);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar tipos:", error);
      throw error;
    }
  };

  export const atualizarTipo = async (tipo: Tipo): Promise<Tipo> => {
    try {
      const response = await axios.put<Tipo>(`${BASE_URL}/tipos/${tipo.id}`, tipo);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar tipos:", error);
      throw error;
    }
  };

  export const excluirTipo = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/tipos/${id}`);
    } catch (error) {
      console.error("Erro ao excluir tipo:", error);
      throw error;
    }
  };