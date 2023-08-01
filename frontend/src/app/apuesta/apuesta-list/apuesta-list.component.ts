import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventoDeportivoService } from 'src/app/evento-deportivo/evento-deportivo.service';
import { EventoDeportivo } from 'src/app/evento-deportivo/evento-deportivo';
import { Apuesta } from '../apuesta';
import { ApuestaService } from '../apuesta.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { Usuario } from '../../usuario/usuario';


@Component({
  selector: 'app-apuesta-list',
  templateUrl: './apuesta-list.component.html',
  styleUrls: ['./apuesta-list.component.css']
})
export class ApuestaListComponent implements OnInit {

  page: number = 1;
  itemPP: number = 5;
  searchText = '';
  constructor(
    private apuestaService: ApuestaService,
    private eventoDService: EventoDeportivoService,
    private userService: UsuarioService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  userId: number
  token: string
  apuestas: Array<Apuesta>
  mostrarApuestas: Array<Apuesta>
  apuestaSeleccionada: Apuesta
  indiceSeleccionado: number = 0
  nombreEventoD: String
  nombreCompetidor: string
  detalleApuesta: Boolean = false
  crearApuesta: Boolean = false
  usuarioBase: Usuario;



  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getApuestas();
      this.obtenerSaldoUser();
    }
  }



  getApuestas(): void {
    this.apuestaService.getApuestas(this.token, this.userId)
      .subscribe(apuestas => {
        this.apuestas = apuestas
        this.mostrarApuestas = apuestas
        this.onSelect(this.mostrarApuestas[0], 0)
      })
  }

  onSelect(apuesta: Apuesta, indice: number) {
    if (apuesta != null) {
      this.indiceSeleccionado = indice
      this.apuestaSeleccionada = apuesta
      this.getInfo()
      this.esDetalleApuesta(true);
    }
  }

  esDetalleApuesta(value: boolean) {
    if(value){
      this.detalleApuesta = value
      this.crearApuesta = false
    }
  }

  esCrearApuesta(value: boolean) {
    if(value){
      this.crearApuesta = value
      this.detalleApuesta = false
    }
  }

  getInfo(): void {
    this.eventoDService.getEventoDeportivo(this.token, this.apuestaSeleccionada.id_EventoDeportivo)
      .subscribe(eventod => {
        this.nombreEventoD = eventod.nombre_EventoDeportivo
        var competidor = eventod.competidores.filter(x => x.id == this.apuestaSeleccionada.id_competidor)[0]
        this.nombreCompetidor = competidor.nombre_competidor
      },
        error => {
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })
  }

  buscarApuesta(busqueda: string) {
    let apuestasBusqueda: Array<Apuesta> = []
    this.apuestas.map(apuesta => {
      if (apuesta.nombre_apostador.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())) {
        apuestasBusqueda.push(apuesta)
      }
    })
    this.mostrarApuestas = apuestasBusqueda
  }

  irCrearApuesta() {
    //this.routerPath.navigate([`/apuestas/crear/${this.userId}/${this.token}`])
    this.esCrearApuesta(true);
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La apuesta fue eliminada`, "Eliminada exitosamente");
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

}
