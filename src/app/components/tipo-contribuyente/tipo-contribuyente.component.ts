import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoContribuyente } from 'src/app/models/TipoContribuyente';
import { TipoContribuyenteService } from 'src/app/services/tipo-contribuyente.service';

@Component({
  selector: 'app-tipo-contribuyente',
  templateUrl: './tipo-contribuyente.component.html',
  styleUrls: ['./tipo-contribuyente.component.css']
})
export class TipoContribuyenteComponent implements OnInit {

  descContribuyente: string = 'Listado de Tipo de Contribuyentes';
  contribuyentes: TipoContribuyente[];
  form: FormGroup;
  editForm: FormGroup; //aniadido
  contribuyenteSeleccionado: TipoContribuyente; //aniadido

  constructor(private contribuyenteService: TipoContribuyenteService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: [null, Validators.required],
      estado: [1, Validators.required]
    });

    //aniadidd
    this.editForm = this.fb.group({
      nombre: [null, Validators.required],
      estado: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarContribuyentes();
  }

  cargarContribuyentes(): void {
    this.contribuyenteService.listar().subscribe(contribuyente => this.contribuyentes = contribuyente);
  }

  mostrarConfirmacionEliminar(id: number): void {
    const dialog = document.getElementById('confirmDialog');
    dialog.style.display = 'block';

    const btnSi = document.getElementById('btnSi');
    const btnNo = document.getElementById('btnNo');

    btnSi.onclick = () => {
      dialog.style.display = 'none';
      this.eliminarContribuyente(id);
    };

    btnNo.onclick = () => {
      dialog.style.display = 'none';
    };
  }

  eliminarContribuyente(id: number): void {
    this.contribuyenteService.eliminar(id).subscribe(
      () => {
        this.contribuyentes = this.contribuyentes.filter(contribuyente => contribuyente.id !== id);
      },
      error => {
        console.error('Error al eliminar el Tipo Contribuyente: ', error);
      }
    );
  }

  mostrarAgregarContribuyente(): void {
    const dialog = document.getElementById('addDialog');
    dialog.style.display = 'block';
  }

  agregarContribuyente(): void {
    if (this.form.valid) {
      const nuevo: TipoContribuyente = this.form.value;
      this.contribuyenteService.crear(nuevo).subscribe(
        (contribuyente: TipoContribuyente) => {
          this.contribuyentes.push(contribuyente);
          this.form.reset({ estado: 1 });
          const dialog = document.getElementById('addDialog');
          dialog.style.display = 'none';
        },
        error => {
          console.error('Error al agregar el Tipo Contribuyente: ', error);
        }
      );
    }
  }

  //aniadido
  editarContribuyente(contribuyente: TipoContribuyente): void {
    this.contribuyenteSeleccionado = contribuyente;
    this.editForm.patchValue({
      nombre: contribuyente.nombre,
      estado: contribuyente.estado
    });
    const dialog = document.getElementById('editDialog');
    dialog.style.display = 'block';
  }

  actualizarContribuyente(): void {
    if (this.editForm.valid && this.contribuyenteSeleccionado) {
      const contribuyenteActualizado: TipoContribuyente = this.editForm.value;
      contribuyenteActualizado.id = this.contribuyenteSeleccionado.id;
      this.contribuyenteService.editar(contribuyenteActualizado).subscribe(
        (contribuyente: TipoContribuyente) => {
          const index = this.contribuyentes.findIndex(con => con.id === contribuyente.id);
          if (index !== -1) {
            this.contribuyentes[index] = contribuyente;
          }
          const dialog = document.getElementById('editDialog');
          dialog.style.display = 'none';
        },
        error => {
          console.error('Error al actualizar el Tipo Contribuyente: ', error);
        }
      );
    }
  }
}
