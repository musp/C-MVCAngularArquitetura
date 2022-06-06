import { Component } from '@angular/core';
import { DadosDeConexao } from '../modelos/dadosDeConexao';
import { InicioService } from '../../../services/inicio.service';
import { Usuario } from '../modelos/usuario';
import { Menu } from '../modelos/menu';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  Corpo: string;
  htmlTrust: string;
  Url: string;
  DadosMenu: [Menu];
  dadosDeConexao: DadosDeConexao;
  DetalheUsuarioAberto: boolean;
  CarregaMenu: boolean;
  estiloRotacao: string;
  menuAplicativoAberto: boolean;
  constructor(public inicioServico: InicioService) {
    this.dadosDeConexao = new DadosDeConexao;
    this.menuAplicativoAberto = false;
    this.dadosDeConexao.expandido = false;
    this.DetalheUsuarioAberto = false;
    this.dadosDeConexao.notificacoes = [];
    debugger;
    this.dadosDeConexao.usuario = new Usuario();
    debugger;
    this.dadosDeConexao.usuario.token = {
      codigoToken: window.location.href.slice(window.location.href.indexOf('?') + 1).split('&').toString().split('=')[1],
      localidade: { altitude: '', latitude: '', longitude: '' },
      ativo: window.location.href.slice(window.location.href.indexOf('?') + 1).split('=')[2] == "False"
    };
    this.dadosDeConexao.usuario.login = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[1].split('=')[1];
    this.inicioServico.getPosition().then(pos => {
      debugger;
      this.dadosDeConexao.usuario.token.localidade = { latitude: pos.lat.toString(), longitude: pos.lng.toString(), altitude: '' };
      if (this.dadosDeConexao.usuario.token) {
        this.valideConexao();
      }
    });
  }
  valideConexao() {
    this.inicioServico.ValideConexao(this.dadosDeConexao.usuario).subscribe(res => {
      this.dadosDeConexao.usuario = res;
      if (this.dadosDeConexao.usuario.codigo > 0) {
        this.inicioServico.RetornaFuncionalidades().subscribe(res => {
          this.DadosMenu = res;
        });
      }
    });
  }
  SelecaoFuncionalidade(retorno:Menu) {
    this.CarregaMenu = false;
    debugger;
    window.open(retorno.url + '&token=' + this.dadosDeConexao.usuario.token.codigoToken);
  }
  AplicaAcaoRotacao() {
    for (var indice = 1; indice <= 4; indice++) {
      switch (indice) {
        case 1: {
          this.estiloRotacao = 'fa-rotate-90';
          break;
        }
        case 2: {
          this.estiloRotacao = 'fa-rotate-180';
          break;
        }
        case 3: {
          this.estiloRotacao = 'fa-rotate-270';
          break;
        }
        default: {
          this.estiloRotacao = '';
          break;
        }
      }
    }
  };
}

