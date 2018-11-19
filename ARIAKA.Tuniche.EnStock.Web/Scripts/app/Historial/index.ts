/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../App.ts" />

namespace Historial {
	'use strict';
	export class HistorialIndexViewModel {

		public historico: KnockoutObservableArray<any> = ko.observableArray<any>();

		getHistorial(): void {
			this.historico([]);
			let url = window.location.origin + '/api/historial';
			$.ajax({
				type: 'GET',
				url: url,
				success: (data: any): void => {
					for (var i: number = 0; i < data.length; i++) {
						let historial: any = {
							ID: data[i].id,
							Nombre: data[i].usuario.nombre,
							Accion: data[i].accion,
							Fecha: moment.utc(new Date(data[i].fechaAccion.replace("Z", ""))),
						}
						this.historico.push(historial);
					}
				}
			}).done((result) => {
				let grid = $('#grid-historial').dxDataGrid('instance');
				grid.refresh();
				grid.repaint();
				});
		}

		constructor() {
			this.setRol();
			this.getHistorial();
		}

		dataGridOptions: any = {
			dataSource: this.historico,
			loadPanel: {
				enabled: true,
				text: 'Cargando datos...'
			},
			columns: [{ dataField: 'Fecha', format: 'dd-MM-yyyy hh:mm', dataType: 'date' }, 'Nombre', 'Accion'],
			editing: {
				texts: {
					confirmDeleteMessage: 'Esta seguro en eliminar registro?'
				}
			},
			export: {
				allowExportSelectedData: true,
				enabled: true,
				fileName: 'historial'
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
			}, showBorders: true
			, rowAlternationEnabled: true
			, showRowLines: true
			, showColumnLines: false
			, filterRow: {
				visible: true,
				applyFilter: "auto"
			}
			, paging: {
				pageSize: 10,
				pageIndex: 19
			}
			, pager: {
				showPageSizeSelector: true,
				allowedPageSizes: [5, 10, 20],
				showInfo: true
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