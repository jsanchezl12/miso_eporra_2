import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { EventoDeportivo } from '../evento-deportivo';
import { EventoDeportivoService } from '../evento-deportivo.service';

@Component({
  selector: 'app-evento-deportivo-create',
  templateUrl: './evento-deportivo-create.component.html',
  styleUrls: ['./evento-deportivo-create.component.css']
})
export class EventoDeportivoCreateComponent implements OnInit {

  userId: number
  token: string
  eventodFrom: FormGroup
  constructor(
    private edService: EventoDeportivoService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.eventodFrom = this.formBuilder.group({
        nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
        tipo: ["", [Validators.required]],
        competidores: new FormArray([])
      });
      this.competidorformArray.push(this.createCompetidorForm());
    }
  }

  get eventoFormControls() {
    return this.eventodFrom.controls;
  }

  get competidorformArray() {
    return this.eventoFormControls.competidores as FormArray;
  }

  private createCompetidorForm(item?: any): FormGroup {
    return this.formBuilder.group({
      competidor: [item == null ? '' : item.competidor, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
      probabilidad: [item == null ? '' : item.probabilidad, [Validators.required, Validators.min(0), Validators.max(1)]]
    });
  }
  onAddCompetidor() {
    this.competidorformArray.push(this.createCompetidorForm());
  }

  onRemoveCompetidor(index: number) {
    this.competidorformArray.removeAt(index);
  }

  cancelCreate() {
    this.eventodFrom.reset();
    //this.routerPath.navigate([`/${this.userId}/${this.token}`])
    location.reload();
  }

  createEventoD(newEventoD: EventoDeportivo) {
    this.edService.crearEventoDeportivo(this.userId, this.token, newEventoD)
      .subscribe(eventod => {
        this.showSuccess(eventod)
        this.eventodFrom.reset()
        //this.routerPath.navigate([`/eventosd/${this.userId}/${this.token}`])
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
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(ed: EventoDeportivo) {
    this.toastr.success(`El evento deportivo ${ed.nombre_EventoDeportivo} fue creado`, "Creación exitosa");
  }


  ValidatorSumProb() {
    let sum = 0;
    for (let i = 0; i < this.competidorformArray.length; i++) {
      sum += this.competidorformArray.at(i).value.probabilidad
    }
    return sum
  }

}
