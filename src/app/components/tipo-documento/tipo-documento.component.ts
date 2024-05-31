import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDocumento } from 'src/app/models/TipoDocumento';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {

  descDocumento: string = 'Listado de Tipo de Documentos';
  documentos: TipoDocumento[];
  form: FormGroup;
  editForm: FormGroup; //aniadido
  documentoSeleccionado: TipoDocumento; //aniadido

  constructor(private service: TipoDocumentoService, private fb: FormBuilder) {
    this.form = this.fb.group({
      codigo: [null, Validators.required],
      nombre: [null, Validators.required],
      descripcion: [null],
      estado: [1, Validators.required]
    });

    //aniadidd
    this.editForm = this.fb.group({
      codigo: [null, Validators.required],
      nombre: [null, Validators.required],
      descripcion: [null],
      estado: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDocumentos();
  }

  cargarDocumentos(): void {
    this.service.listar().subscribe(documentos => this.documentos = documentos);
  }

  mostrarConfirmacionEliminar(id: number): void {
    const dialog = document.getElementById('confirmDialog');
    dialog.style.display = 'block';

    const btnSi = document.getElementById('btnSi');
    const btnNo = document.getElementById('btnNo');

    btnSi.onclick = () => {
      dialog.style.display = 'none';
      this.eliminarDocumento(id);
    };

    btnNo.onclick = () => {
      dialog.style.display = 'none';
    };
  }

  eliminarDocumento(id: number): void {
    this.service.eliminar(id).subscribe(
      () => {
        this.documentos = this.documentos.filter(documento => documento.id !== id);
      },
      error => {
        console.error('Error al eliminar el Tipo Documento: ', error);
      }
    );
  }

  mostrarAgregarDocumento(): void {
    const dialog = document.getElementById('addDialog');
    dialog.style.display = 'block';
  }

  agregarDocumento(): void {
    if (this.form.valid) {
      const nuevoDocumento: TipoDocumento = this.form.value;
      this.service.crear(nuevoDocumento).subscribe(
        (documento: TipoDocumento) => {
          this.documentos.push(documento);
          this.form.reset({ estado: 1 });
          const dialog = document.getElementById('addDialog');
          dialog.style.display = 'none';
        },
        error => {
          console.error('Error al agregar el Tipo Documento: ', error);
        }
      );
    }
  }


  //aniadido
  editarDocumento(documento: TipoDocumento): void {
    this.documentoSeleccionado = documento;
    this.editForm.patchValue({
      codigo: documento.codigo,
      nombre: documento.nombre,
      descripcion: documento.descripcion,
      estado: documento.estado
    });
    const dialog = document.getElementById('editDialog');
    dialog.style.display = 'block';
  }

  actualizarDocumento(): void {
    if (this.editForm.valid && this.documentoSeleccionado) {
      const documentoActualizado: TipoDocumento = this.editForm.value;
      documentoActualizado.id = this.documentoSeleccionado.id;
      this.service.editar(documentoActualizado).subscribe(
        (documento: TipoDocumento) => {
          const index = this.documentos.findIndex(doc => doc.id === documento.id);
          if (index !== -1) {
            this.documentos[index] = documento;
          }
          const dialog = document.getElementById('editDialog');
          dialog.style.display = 'none';
        },
        error => {
          console.error('Error al actualizar el Tipo Documento: ', error);
        }
      );
    }
  }
}
