import { Usuario } from "./usuario";

export class DadosDeConexao {
  token: string;
  localizacao: string;
  expandido: boolean;
  notificacoes: [];
  usuario:Usuario
}
