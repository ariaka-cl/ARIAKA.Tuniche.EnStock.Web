/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Proveedor {
    'use strict';
    export class ProveedorIndexViewModel {

        public proveedores: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
        public nombre: KnockoutObservable<String> = ko.observable("");
        
        getProveedor(): void {
            this.proveedores([]);
            $.ajax({
                type: 'GET',
                url: 'api/proveedores',
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let proveedor = {
                            ID: data[i].id,
                            Nombre: data[i].nombre
                        }
                        this.proveedores.push(proveedor);
                    }
                }
            });
        }

        addProveedor(): void {
            let formData: any = $('#text-nombre').dxTextBox('option').value;
            $.ajax({
                type: 'POST',
                url: 'api/proveedores',
                data: {
                    ID: this.idRow,
                    Nombre: formData
                },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
                    $('#text-nombre').dxTextBox('instance').repaint();
                }
            }).done((result) => {
                this.getProveedor();
                let grid = $('#grid-proveedor').dxDataGrid('instance');
                grid.refresh();
                grid.repaint();
            });
        }

        deleteProveedor(id: number): void {
            $.ajax({
                type: 'DELETE',
                url: 'api/proveedores/' + id,
                success: (data: any): void => {
                    $('#text-nombre').dxTextBox('instance').reset();
                    let grid = $('#grid-proveedor').dxDataGrid('instance');
                    grid.refresh();
                    grid.repaint();
                }
            });
		}

		postHistorial(): void {
			let url = window.location.origin + '/api/historial';
			$.ajax({
				type: 'POST',
				url: url,
				data: {
					UserID: localStorage.getItem('id'),
					Accion: 'Editar Proveedores'
				}
			})
		}

		constructor() {
			this.postHistorial();
			this.getProveedor();
			this.setRol();
        }

        textBoxOptions: any = {
            width: 200,
            label: "Nombre",
            showClearButton: true,
            value: this.nombre
        }

        dataGridOptions: any = {
            dataSource: this.proveedores,
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            columns: [{ dataField: 'ID', visible: false }, 'Nombre'],
            editing: {
                texts: {
                    confirmDeleteMessage: 'Esta seguro en eliminar registro?'
                }
            },
            onRowClick: (e) => {
                this.enable(false);
                let cateData: any = {
                    ID: e.data.ID,
                    Nombre: e.data.Nombre
                }
                this.idRow(cateData.ID);
                this.idRowIndex(e.rowIndex);
                this.nombre(cateData.Nombre);
            }
        }          			

        buttonOptionsAdd: any = {
            text: "Guardar",
            icon: "save",
            onClick: () => {
                this.addProveedor();
            }
        }

        buttonOptionsDelete: any = {
            text: "Borrar",
            icon: "remove",
            disabled: this.enable,
            onClick: () => {
                let grid = $('#grid-proveedor').dxDataGrid('instance');
                let index = this.idRow();
                grid.deleteRow(this.idRowIndex());
                grid.repaint();
                this.deleteProveedor(index);
            }
		} 

		public administrador: KnockoutObservable<boolean> = ko.observable(false);
		public bodeguero: KnockoutObservable<boolean> = ko.observable(false);

		setRol(): void {
			let roleStg: any = localStorage.getItem('rol');
			if (roleStg === 'Administrador') {
				this.administrador(true);
				this.bodeguero(true);
			}
			if (roleStg === 'Bodegueros') {
				this.bodeguero(true);
				this.administrador(false);
			}
		}


    }
}