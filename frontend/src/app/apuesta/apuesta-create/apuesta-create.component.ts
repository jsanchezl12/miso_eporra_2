import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carrera, Competidor } from 'src/app/carrera/carrera';
import { EventoDeportivoService } from 'src/app/evento-deportivo/evento-deportivo.service';
import { EventoDeportivo } from 'src/app/evento-deportivo/evento-deportivo';
import { Apuesta } from '../apuesta';
import { ApuestaService } from '../apuesta.service';

@Component({
  selector: 'app-apuesta-create',
  templateUrl: './apuesta-create.component.html',
  styleUrls: ['./apuesta-create.component.css']
})
export class ApuestaCreateComponent implements OnInit {

  userId: number
  token: string
  apuestaForm: FormGroup
  eventosd: Array<EventoDeportivo>
  competidores: Array<Competidor>

  constructor(
    private apuestaService: ApuestaService,
    private edService: EventoDeportivoService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.apuestaForm = this.formBuilder.group({
        id_EventoDeportivo: ["", [Validators.required]],
        id_competidor: ["", [Validators.required]],
        valor_apostado: ["", [Validators.required,Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")]]
      })
      this.getEventosD()
    }
  }

  private onEventosDSelect(event: any): void {
    if (event != null && event != "") {
      var eventoSeleccionado = this.eventosd.filter(x => x.id == event)[0]
      this.competidores = eventoSeleccionado.competidores
    }
  }

  private getEventosD(): void {
    this.edService.getEventosDeportivos(this.token)
      .subscribe(eventosd => {
        this.eventosd = eventosd
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

  private createApuesta(newApuesta: Apuesta) {
    this.apuestaService.crearApuesta(newApuesta, this.token, this.userId)
      .subscribe(apuesta => {
        this.showSuccess(apuesta)
        this.apuestaForm.reset()
        //this.routerPath.navigate([`/apuestas/${this.userId}/${this.token}`])
        location.reload();
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
          if(error.error){
            this.showError(error.error)
          }else{
            this.showError("Ha ocurrido un error. " + error.message)
          }
        }
      })
  }

  cancelCreate() {
    this.apuestaForm.reset();
    //this.routerPath.navigate([`/apuestas/${this.userId}/${this.token}`])
    location.reload();
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(apuesta: Apuesta) {
    this.toastr.success(`La apuesta fue creada`, "Creación exitosa");
  }


}
