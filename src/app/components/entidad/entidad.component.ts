import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entidad } from 'src/app/models/Entidad';
import { TipoContribuyente } from 'src/app/models/TipoContribuyente';
import { TipoDocumento } from 'src/app/models/TipoDocumento';
import { EntidadService } from 'src/app/services/entidad.service';
import { TipoContribuyenteService } from 'src/app/services/tipo-contribuyente.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {

  descEntidad: string = 'Listado de Tipo de Entidades';
  entidades: Entidad[];
  form: FormGroup;
  editForm: FormGroup;
  entidadSeleccionada: Entidad;
  //para documento
  tiposDocumentos: TipoDocumento[];
  tiposContribuyentes: TipoContribuyente[];

  constructor(private service: EntidadService,private tipoDocumentoService: TipoDocumentoService, private tipoContribuyenteService: TipoContribuyenteService, private fb: FormBuilder) {
    this.form = this.fb.group({
      idTipoDocumento: [1, Validators.required],
      nroDocumento: [null, Validators.required],
      razonSocial: [null, Validators.required],
      nombreComercial: [null, Validators.required],
      idTipoContribuyente: [1, Validators.required],
      direccion: [null, Validators.required],
      telefono: [null, Validators.required],
      estado: [1, Validators.required]
    });

    this.editForm = this.fb.group({
      idTipoDocumento: [1, Validators.required],
      nroDocumento: [null, Validators.required],
      razonSocial: [null, Validators.required],
      nombreComercial: [null, Validators.required],
      idTipoContribuyente: [1, Validators.required],
      direccion: [null, Validators.required],
      telefono: [null, Validators.required],
      estado: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarEntidades();
    this.cargarTiposDocumentos(); //para documentos
    this.cargarTiposContribuyentes(); //para contribuyentes
  }

  cargarEntidades(): void {
    this.service.listar().subscribe(entidades => this.entidades = entidades);
  }

  mostrarConfirmacionEliminar(id: number): void {
    const dialog = document.getElementById('confirmDialog');
    dialog.style.display = 'block';

    const btnSi = document.getElementById('btnSi');
    const btnNo = document.getElementById('btnNo');

    btnSi.onclick = () => {
      dialog.style.display = 'none';
      this.eliminarEntidad(id);
    };

    btnNo.onclick = () => {
      dialog.style.display = 'none';
    };
  }

  eliminarEntidad(id: number): void {
    this.service.eliminar(id).subscribe(
      () => {
        this.entidades = this.entidades.filter(entidad => entidad.id !== id);
      },
      error => {
        console.error('Error al eliminar Entidad: ', error);
      }
    );
  }

  mostrarAgregarEntidad(): void {
    const dialog = document.getElementById('addDialog');
    dialog.style.display = 'block';
  }

  agregarEntidad(): void {
    if (this.form.valid) {
      const nuevaEntidad: Entidad = this.form.value;
      this.service.crear(nuevaEntidad).subscribe(
        (entidad: Entidad) => {
          this.entidades.push(entidad);
          this.form.reset({ estado: 1 });
          const dialog = document.getElementById('addDialog');
          dialog.style.display = 'none';
        },
        error => {
          console.error('Error al agregar Entidad: ', error);
        }
      );
    }
  }

  editarEntidad(entidad: Entidad): void {
    this.entidadSeleccionada = entidad;
    this.editForm.patchValue({
      idTipoDocumento: entidad.idTipoDocumento,
      nroDocumento: entidad.nroDocumento,
      razonSocial: entidad.razonSocial,
      nombreComercial: entidad.nombreComercial,
      idTipoContribuyente: entidad.idTipoContribuyente,
      direccion: entidad.direccion,
      telefono: entidad.telefono,
      estado: entidad.estado
    });
    const dialog = document.getElementById('editDialog');
    dialog.style.display = 'block';
  }

  actualizarEntidad(): void {
    if (this.editForm.valid && this.entidadSeleccionada) {
      const entidadActua: Entidad = this.editForm.value;
      entidadActua.id = this.entidadSeleccionada.id;
      this.service.editar(entidadActua).subscribe(
        (e: Entidad) => {
          const index = this.entidades.findIndex(enti => enti.id === e.id);
          if (index !== -1) {
            this.entidades[index] = e;
          }
          const dialog = document.getElementById('editDialog');
          dialog.style.display = 'none';
        },
        error => {
          console.error('Error al actualizar la Entidad: ', error);
        }
      );
    }
  }

  //para documento
  cargarTiposDocumentos(): void {
    this.tipoDocumentoService.listar().subscribe(tiposDocumentos => {this.tiposDocumentos = tiposDocumentos;});
  }

  //para contribuyentes
  cargarTiposContribuyentes(): void {
    this.tipoContribuyenteService.listar().subscribe(tiposContribuyentes => {this.tiposContribuyentes = tiposContribuyentes;});
  }



}
