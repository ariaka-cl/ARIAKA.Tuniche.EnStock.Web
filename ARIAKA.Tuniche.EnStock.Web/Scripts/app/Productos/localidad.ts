/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Productos {
	'use strict';
	export class ProductosLocalidadViewModel {
		public bodegas: KnockoutObservableArray<App.IBodega> = ko.observableArray<App.IBodega>();
		public lugares: KnockoutObservableArray<any> = ko.observableArray<any>();
		public obj: KnockoutObservableArray<any> = ko.observableArray<any>();

		constructor() {
			this.getBodegas();
			this.getLugares();
			this.setRol();
		}
		getLugares(): void {
			this.lugares([]);
			let url = window.location.origin + '/api/productos/lugares';
			$.ajax({
				type: 'GET',
				url: url
			}).done((data): void => {			
				for (var i: number = 0; i < data.length; i++) {
					let lugar: any = {
						ID: data[i].id,
						Nombre: data[i].producto.nombre,
						[data[i].bodega.nombre]: data[i].stock						
					}
					this.lugares.push(lugar);
				}				
			});
		}


		getBodegas(): void {
			this.bodegas([]);
			let url = window.location.origin + '/api/productos/bodegas';
			$.ajax({
				type: 'GET',
				url: url
			}).done((data): void => {
				for (var i: number = 0; i < data.length; i++) {
					//let bodega: App.IBodega = {
					//	ID: data[i].id,
					//	Nombre: data[i].nombre
					//}
					this.bodegas.push(data[i].nombre);
				}
			});
		}
		

		dataGridOptions: any = {
			dataSource: this.lugares,
			columns: [{ dataField: 'Nombre', groupIndex: 0 }],
			loadPanel: {
				enabled: true,
				text: 'Cargando datos...'
			},			
			customizeColumns: (result) => {
				if (this.bodegas().length > 0) {
					//let bo: any = this.bodegas();
					for (var i: number = 0; i < this.bodegas().length; i++) {
						//result.push(bo[i].Nombre)
						result.push(this.bodegas()[i])
					}

				}
			},
			editing: {
				texts: {
					confirmDeleteMessage: 'Esta seguro en eliminar registro?'
				}
			}, grouping: {
				allowCollapsing: true
			}, groupPanel: {
				allowColumnDragging: true,
				visible: true,
				emptyPanelText: 'Arrastre algunas columnas para agrupar'
			}, export: {
				allowExportSelectedData: true,
				enabled: true,
				fileName: 'stock-bodegas'
			}, columnChooser: {
				allowSearch: true
			},
			onRowClick: (e) => {
				//this.enable(false);
				//let cateData: App.Categoria = {
				//	ID: e.data.ID,
				//	Nombre: e.data.Nombre
				//}
				//this.idRow(cateData.ID);
				//this.idRowIndex(e.rowIndex);
			},
			onRowPrepared: (rowInfo) => {
			//	if (this.productos().length > 0) {
			//		if (rowInfo.rowType !== 'header') {
			//			if (rowInfo.data.StockMinimo == rowInfo.data.StockActual)
			//				rowInfo.rowElement.css('background', 'yellow');
			//			else if (rowInfo.data.StockMinimo > rowInfo.data.StockActual && rowInfo.data.StockActual !== 0)
			//				rowInfo.rowElement.css('background', 'red');
			//		}

			//	}
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