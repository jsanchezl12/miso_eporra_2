import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompetidorService } from 'src/app/competidor/competidor.service';
import { Competidor, EventoDeportivo } from '../evento-deportivo';
import { EventoDeportivoService } from '../evento-deportivo.service';

@Component({
  selector: 'app-evento-deportivo-detail',
  templateUrl: './evento-deportivo-detail.component.html',
  styleUrls: ['./evento-deportivo-detail.component.css']
})
export class EventoDeportivoDetailComponent implements OnInit {

  @Input() eventoD: EventoDeportivo;
  @Input() competidor: Competidor;

  userId: number;
  token: string;

  constructor(
    private eventoservice: EventoDeportivoService,
    //private competidorService: CompetidorService,
    private toastr: ToastrService,
    private routerPath: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
  }

  getCompetidor(id_competidor: any) {
    var competidor = this.eventoD.competidores.filter(x => x.id == id_competidor)[0]
    return competidor.nombre_competidor
  }


  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(warning: string) {
    this.toastr.success(`La carrera fue eliminada`, "Eliminada exitosamente");
  }

  goToEdit() {
    //this.routerPath.navigate([`/carreras/editar/${this.carrera.id}/${this.userId}/${this.token}`])
    this.showWarningFunction("Editar Evento esta en construcción")
  }

  apostar() {
    //this.routerPath.navigate([`/carreras/apostar/${this.carrera.id}/${this.userId}/${this.token}`])
  }

  eliminarEventoD() {
    // this.carreraService.eliminarCarrera(this.token, this.carrera.id)
    //   .subscribe(carrera => {
    //     window.location.reload();
    //     this.showSuccess();
    //   },
    //     error => {
    //       if (error.statusText === "UNAUTHORIZED") {
    //         this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
    //       }
    //       else if (error.statusText === "UNPROCESSABLE ENTITY") {
    //         this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    //       }
    //       else {
    //         this.showError("Ha ocurrido un error. " + error.message)
    //       }
    //     })
    // this.ngOnInit()
    this.showWarningFunction("Eliminar Evento esta en construcción")
  }

  terminarEventoD() {
    this.eventoservice.terminarEventoDeportivo(this.eventoD.id,  1  , this.token)
    .subscribe(eventod => {
      this.showSuccess("el evento se finalizo correctamante")
  
      //this.routerPath.navigate([`/${this.userId}/${this.token}`])
      location.reload();
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
    //this.routerPath.navigate([`/carreras/terminar/${this.carrera.id}/${this.userId}/${this.token}`])
    //this.showWarningFunction("Terminar Evento esta en construcción")
  }

  showWarningFunction(warning: string) {
    this.toastr.warning(warning, "Funcion fuera se servicio")
  }

}
