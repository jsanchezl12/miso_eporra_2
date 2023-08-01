import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Competidor } from 'src/app/carrera/carrera';
import { Apuesta } from '../apuesta';
import { ApuestaService } from '../apuesta.service';
import { EventoDeportivo } from 'src/app/evento-deportivo/evento-deportivo';
import { EventoDeportivoService } from 'src/app/evento-deportivo/evento-deportivo.service';

@Component({
  selector: 'app-apuesta-edit',
  templateUrl: './apuesta-edit.component.html',
  styleUrls: ['./apuesta-edit.component.css']
})
export class ApuestaEditComponent implements OnInit {

  userId: number;
  token: string;
  apuestaId: number;
  apuestaForm!: FormGroup;
  eventosd: Array<EventoDeportivo>
  competidores: Array<Competidor>

  constructor(
    private apuestaService: ApuestaService,
    private eventodService: EventoDeportivoService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.apuestaService.getApuesta(this.router.snapshot.params.apuestaId, this.token)
        .subscribe(apuesta => {
          this.apuestaId = apuesta.id
          this.apuestaForm = this.formBuilder.group({
            id_EventoDeportivo: [apuesta.id_EventoDeportivo, [Validators.required]],
            id_competidor: [apuesta.id_competidor, [Validators.required]],
            nombre_apostador: [apuesta.nombre_apostador, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
            valor_apostado: [Number(apuesta.valor_apostado).toFixed(2), [Validators.required]]
          })
          this.getEventosD(apuesta.id_EventoDeportivo)
          this.onEventosDSelect(apuesta.id_EventoDeportivo)
        })
    }
  }

  onEventosDSelect(event: any): void {
    if (event != null && event != "") {
      var eventoSeleccionado = this.eventosd.filter(x => x.id == event)[0]
      this.competidores = eventoSeleccionado.competidores
    }
  }

  getEventosD(id_EventoDeportivo: number): void {
    this.eventodService.getEventosDeportivosUsuario(this.userId, this.token)
      .subscribe(eventosd => {
        this.eventosd = eventosd
        this.onEventosDSelect(id_EventoDeportivo)
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
        })

  }

  cancelCreate() {
    this.apuestaForm.reset()
    this.routerPath.navigate([`/apuestas/${this.userId}/${this.token}`])
  }

  editarApuesta(newApuesta: Apuesta) {
    this.apuestaService.editarApuesta(newApuesta, this.apuestaId, this.token)
      .subscribe(apuesta => {
        this.showSuccess(apuesta)
        this.apuestaForm.reset()
        this.routerPath.navigate([`/apuestas/${this.userId}/${this.token}`])
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

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(apuesta: Apuesta) {
    this.toastr.success(`La apuesta ${apuesta.id} fue editada`, "Edición exitosa");
  }

}
