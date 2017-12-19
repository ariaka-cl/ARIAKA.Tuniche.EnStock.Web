/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Inout {
	'use strict';
	export class InoutRetornoViewModel {
		public productos: KnockoutObservableArray<any> = ko.observableArray<any>();
		public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
		public bodegas: KnockoutObservableArray<App.IBodega> = ko.observableArray<App.IBodega>();
		public retornos: KnockoutObservableArray<any> = ko.observableArray<any>();

		constructor() {
			this.getProductos();
			this.getBodegas();
			this.getUser();
			this.getRetornos();
		}	

		getProductos(): void {
			this.productos([]);
			let url = window.location.origin + '/api/productos/tools';
			$.ajax({
				type: 'GET',
				url: url,
				success: (data: any): void => {
					for (var i: number = 0; i < data.length; i++) {
						let produ: any = {
							ID: data[i].id,
							Codigo: data[i].codigo,
							Nombre: data[i].nombre,
							Unidad: data[i].unidad,
							StockMinimo: data[i].stockMinimo
						}
						this.productos.push(produ);
					}
				}
			});
		}

		getUser(): void {
			this.usuarios([]);
			let url = window.location.origin + '/api/usuarios/autorizador'
			$.ajax({
				type: 'GET',
				url: url,
				success: (data: any): void => {
					for (var i: number = 0; i < data.length; i++) {
						let users = {
							ID: data[i].id,
							Nombre: data[i].nombre,
							Run: data[i].run,
							NickName: data[i].nickName,
							Password: data[i].password
						}
						this.usuarios.push(users);
					}
				}
			});
		}

		getBodegas(): void {
			this.bodegas([]);
			let url = window.location.origin + '/api/productos/bodegas';
			$.ajax({
				type: 'GET',
				url: url,
				success: (data: any): void => {
					for (var i: number = 0; i < data.length; i++) {
						let bodega: App.IBodega = {
							ID: data[i].id,
							Nombre: data[i].nombre
						}
						this.bodegas.push(bodega);
					}
				}
			});
		}

		getRetornos(): void {
			this.retornos([]);
			let url = window.location.origin + '/api/inout/retornos';
			$.ajax({
				type: 'GET',
				url: url,
				success: (data: any): void => {
					for (var i: number = 0; i < data.length; i++) {
						let retorn = {
							ID: data[i].id,
							Articulo: data[i].producto.nombre,
							NumeroDocumento: data[i].numeroDocumento,
							Cantidad: data[i].cantidad,
							Fecha: data[i].fechas,
							Autorizador: data[i].autorizador.nombre
						}
						this.retornos.push(retorn);
					}
				}
			});
		}
		registrarRetorno(): void {
			let formData: any = $('#form-return').dxForm('option').formData;
			let url = window.location.origin + '/api/inout/retorno'
			$.ajax({
				type: 'POST',
				url: url,
				data: {
					Producto: formData.Articulos,
					Fechas: formData.Fecha,
					Cantidad: formData.Cantidad,					
					NumeroDocumento: formData.NumeroDocumento,
					Autorizador: formData.Autorizador,
					Bodega: formData.Bodega
				},
				success: (data: any): void => {
					DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
				}

			}).done((result) => {
				this.getRetornos();
				let grid = $('#grid-return').dxDataGrid('instance');
				grid.refresh();
				grid.repaint();
			}).fail((result) => {
				DevExpress.ui.notify(result.responseText, "error", 2000);
			});
		}		
		
		formOptions: any = {
			formData: [],
			labelLocation: "top",
			items: [{
				itemType: "group",
				colCount: 3,
				items: [{
					dataField: "Fecha",
					editorType: "dxDateBox",
					editorOptions: {
						type: "date"
					}
				}, {
					dataField: "NumeroDocumento",
					editorType: "dxTextBox",
					editorOptions: {
						width: 200
					}
				}]
			}, {
				itemType: "group",
				colCount: 3,
				items: [{
					dataField: "Articulos",
					editorType: "dxLookup",
					editorOptions: {
						displayExpr: 'Nombre',
						dataSource: this.productos,
						closeOnOutsideClick: true
					}
				}, {

					dataField: "Bodega",
					editorType: "dxLookup",
					editorOptions: {
						displayExpr: 'Nombre',
						dataSource: this.bodegas,
						closeOnOutsideClick: true
					}
				},{
					dataField: "Cantidad",
					editorType: "dxTextBox",
					editorOptions: {
						width: 200
					}
				}]
			}, {
				itemType: "group",
				colCount: 2,
				items: [{
					dataField: "Autorizador",
					editorType: "dxLookup",
					editorOptions: {
						displayExpr: 'Nombre',
						dataSource: this.usuarios,
						closeOnOutsideClick: true
					}
				}]
			}]
		};

		buttonOptionsAdd: any = {
			text: "Agregar",
			icon: "plus",
			onClick: () => {
				this.registrarRetorno();
			}
		}
		buttonOptionsClean: any = {
			text: "Limpiar",
			icon: "clear",
			onClick: () => {				
				$('#form-return').dxForm('instance').resetValues();

			}
		}

		buttonOptionsDelete: any = {
			text: "Eliminar",
			icon: "clear",
			onClick: () => {
				//this.detalle([]);
				//let grid = $('#grid-return').dxDataGrid('instance');
				//grid.option('dataSource', []);
				//grid.refresh();
				//grid.repaint();
				//$('#form-return').dxForm('instance').resetValues();

			}
		}

		dataGridOptions: any = {
			dataSource: this.retornos,
			columns: [{ dataField: 'Fecha', format: 'yyyy-MM-dd', dataType: 'date' }, 'Articulo', 'Cantidad', 'NumeroDocumento','Autorizador'],
			editing: {
				texts: {
					confirmDeleteMessage: 'Esta seguro en eliminar registro?'
				}
			},
			export: {
				allowExportSelectedData: true,
				enabled: true,
				fileName: 'retornos'
			},
			grouping: {
				allowCollapsing: true
			}, groupPanel: {
				allowColumnDragging: true,
				visible: true,
				emptyPanelText: 'Arrastre algunas columnas para agrupar'
			}, columnChooser: {
				allowSearch: true,
				enabled: true
			}, scrolling: {
				mode: 'virtual'
			}, showBorders: true
			, rowAlternationEnabled: true
			, showRowLines: true
			, showColumnLines: false
			, filterRow: {
				visible: true,
				showOperationChooser: false
			}
		}
	}
}