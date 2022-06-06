import { Pessoa } from "./pessoa";
import { Token } from "./token";

export class Usuario {
  codigo: number;
  login: string;
  email: string;
  tokenId: number;
  tipoUsuarioId: number;
  pessoaId: number;
  pessoa: Pessoa;
  token: Token;
}
