import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { EventoDeportivo } from '../evento-deportivo';
import { EventoDeportivoService } from '../evento-deportivo.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { Usuario } from '../../usuario/usuario';

//Para instalar la paginacion
//npm install ngx-pagination --save --force
//npm install ngx-pagination@5.1.1
//https://michaelbromley.github.io/ngx-pagination/#/advanced

@Component({
  selector: 'app-evento-deportivo-list',
  templateUrl: './evento-deportivo-list.component.html',
  styleUrls: ['./evento-deportivo-list.component.css']
})
export class EventoDeportivoListComponent implements OnInit {

  page: number = 1;
  itemPP: number = 5;

  constructor(
    private eventoservice: EventoDeportivoService,
    private userService: UsuarioService,
    private routerpath: Router,
    private toastr: ToastrService,
    private router: ActivatedRoute) {
  }


  userId: number
  token: string
  eventosDeportivos: Array<EventoDeportivo> = [];
  searchText = '';
  eventoDeportivoSeleccionado : EventoDeportivo;
  indiceSeleccionado: number;
  detalleEvento: Boolean = false;
  crearEvento: Boolean = false;
  usuarioBase: Usuario;
  display = "none";

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getEventos();
    }
  }

  getEventos():void {
    this.eventoservice.getEventosDeportivos(this.token).subscribe((eventospropios)=>{
      this.eventosDeportivos = eventospropios;
      //console.log(eventospropios);
      this.onSelect(this.eventosDeportivos[0], 0);
      this.obtenerSaldoUser();
    },
    error => {
      //console.log(error)
      if (error.statusText === "UNAUTHORIZED") {
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.showError("Ha ocurrido un error. " + error.message)
      }
    });
  }

  openModal() {
    this.display = "block";
  }
  
  onCloseHandled() {
    this.display = "none";
  }

  addSaldoUs() {
    var saldo = parseInt((<HTMLInputElement>document.getElementById("saldo_add_user")).value);
    var numbers = new RegExp(/^[0-9]+$/);
    if (numbers.test(saldo.toString())) {
      //console.log("Saldo a añadir=>" +saldo);
      if(saldo > 0){
        this.addSaldoUser(saldo);
        this.display = "none";
      }else{
        this.showError("El saldo debe ser mayor a 0.");
        (<HTMLInputElement>document.getElementById("saldo_add_user")).value = "";
      }
    }else{
      this.showError("El saldo debe ser un numero");
      (<HTMLInputElement>document.getElementById("saldo_add_user")).value = "";
      return;
    }

  }

  onSelect(a: EventoDeportivo, index: number) {
    this.indiceSeleccionado = index
    this.eventoDeportivoSeleccionado = a
    //console.log(JSON.stringify(a));
    this.esDetalleEventoD(true);
  }

  esDetalleEventoD(value: boolean) {
    if(value){
      this.detalleEvento = value
      this.crearEvento = false
    }
  }

  esCreaEventoD(value: boolean) {
    if(value){
      this.crearEvento = value
      this.detalleEvento = false
    }
  }

  clearAll() {
    this.searchText = '';
    this.eventoDeportivoSeleccionado = {} as EventoDeportivo;
    this.eventoDeportivoSeleccionado.apuestas = [];
    this.indiceSeleccionado = 0;
    this.getEventos();
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  irCrearED() {
    //this.routerpath.navigate([`/eventosd/crear/${this.userId}/${this.token}`])
    this.esCreaEventoD(true);
  }

  obtenerSaldoUser(){
    this.userService.getUsuario(this.userId, this.token).subscribe((usuario)=>{
      this.usuarioBase = usuario
      //console.log(usuario)
    },
    error => {
      //console.log(error)
      if (error.statusText === "UNAUTHORIZED") {
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.showError("Ha ocurrido un error. " + error.message)
      }
    });
  }

  addSaldoUser(saldoAdd: number){
    this.userService.addSaldo(this.userId, this.token, saldoAdd).subscribe((usuario)=>{
      this.usuarioBase = usuario
      console.log(usuario)
      this.clearAll();
    },
    error => {
      //console.log(error)
      if (error.statusText === "UNAUTHORIZED") {
        this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.showError("Ha ocurrido un error. " + error.message)
      }
    });
  }

}
