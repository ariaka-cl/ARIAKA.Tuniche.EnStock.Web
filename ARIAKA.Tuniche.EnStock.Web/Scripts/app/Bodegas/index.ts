/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Bodegas {
	'use strict';
	export class BodegasIndexViewModel {
		public bodegas: KnockoutObservableArray<any> = ko.observableArray<any>();
		public enable: KnockoutObservable<boolean> = ko.observable(true);
		public idRow: KnockoutObservable<number> = ko.observable(0);
		public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
		public nombre: KnockoutObservable<String> = ko.observable("");

		getBodegas(): void {
			this.bodegas([]);
			$.ajax({
				type: 'GET',
				url: 'api/bodegas',
				success: (data: any): void => {
					for (var i: number = 0; i < data.length; i++) {
						let bodega = {
							ID: data[i].id,
							Nombre: data[i].nombre
						}
						this.bodegas.push(bodega);
					}
				}
			});
		}

		addBodega(): void {
			let formData: any = $('#text-nombre').dxTextBox('option').value;
			$.ajax({
				type: 'POST',
				url: 'api/bodegas',
				data: {
					ID: this.idRow,
					Nombre: formData
				},
				success: (data: any): void => {
					DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
					$('#text-nombre').dxTextBox('instance').repaint();
					this.idRow(0);
					this.idRowIndex(-1);
				}
			}).done((result) => {
				this.getBodegas();
				let grid = $('#grid-bodegas').dxDataGrid('instance');
				grid.refresh();
				grid.repaint();
			});
		}

		deleteBodega(id: number): JQueryPromise<any> {
		return	$.ajax({
				type: 'DELETE',
				url: 'api/bodegas/' + id,
				success: (data: any): void => {
					$('#text-nombre').dxTextBox('instance').reset();
					let grid = $('#grid-bodegas').dxDataGrid('instance');
					grid.refresh();
					grid.repaint();
				}
			}).fail((result) => {
				DevExpress.ui.notify(result.responseText, "error", 2000);
				let grid = $('#grid-bodegas').dxDataGrid('instance');			
				grid.refresh()
				grid.repaint()
				return;
			});
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

		postHistorial(): void {
			let url = window.location.origin + '/api/historial';
			$.ajax({
				type: 'POST',
				url: url,
				data: {
					UserID: localStorage.getItem('id'),
					Accion: 'Editar Bodegas'
				}
			})
		}

		constructor() {
			this.postHistorial();
			this.getBodegas();
			this.setRol();
		}

		textBoxOptions: any = {
			width: 200,
			label: "Nombre",
			showClearButton: true,
			value: this.nombre
		}

		dataGridOptions: any = {
			dataSource: this.bodegas,
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
				let bodeData: any = {
					ID: e.data.ID,
					Nombre: e.data.Nombre
				}
				this.idRow(bodeData.ID);
				this.idRowIndex(e.rowIndex);
				this.nombre(bodeData.Nombre);
			}
		}  


		buttonOptionsAdd: any = {
			text: "Guardar",
			icon: "save",
			onClick: () => {
				this.addBodega();
			}
		}

		buttonOptionsDelete: any = {
			text: "Borrar",
			icon: "remove",
			disabled: this.enable,
			onClick: () => {
				
				let index = this.idRow();
				let bodegaDelete: JQueryPromise<any> = this.deleteBodega(index);
				bodegaDelete.done((data): void => {
					let grid = $('#grid-bodegas').dxDataGrid('instance');
					grid.deleteRow(this.idRowIndex());
					grid.repaint();
				});
				
			}
		} 

	}
}