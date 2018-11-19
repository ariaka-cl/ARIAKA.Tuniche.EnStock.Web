/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../App.ts" />

namespace Productos {
    'use strict';   
    export class ProductosIndexViewModel {

        public categorias: KnockoutObservableArray<any> = ko.observableArray<any>();
        public productos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
		public selectedTab: KnockoutObservable<number> = ko.observable(-1);
		public isLoadPanelVisible: KnockoutObservable<boolean> = ko.observable(false);
		public productosGeneral: KnockoutObservableArray<any> = ko.observableArray<any>();
		public bodegas: KnockoutObservableArray<any> = ko.observableArray<any>();
       
        getCategoria(): void {
            this.categorias([]);
            $.ajax({
                type: 'GET',
                url: 'api/categorias',
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let cate = {
                            id: data[i].id,
                            text: data[i].nombre
                        }
                        this.categorias.push(cate);
                    }
                }
            });
        }

        getProductos(id:number): void {
            this.productos([]);
            $.ajax({
                type: 'GET',
                url: 'api/productos/'+id,
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let produ = {
                            ID: data[i].id,
                            Codigo: data[i].codigo,
                            Nombre: data[i].nombre,
                            Unidad: data[i].unidad,
                            StockMinimo: data[i].stockMinimo,                            						
							Tipo: data[i].tipo,
							StockActual: 0
						}
						for (var j: number = 0; j < data[i].bodegas.length; j++) {
							produ[this.bodegas()[j]] = data[i].bodegas[j];
							produ.StockActual = produ.StockActual + parseInt(data[i].bodegas[j]); 
						}
                        this.productos.push(produ);
                    }
                }
            });
        } 

		getStockGeneral(): void {
			$.get('api/productos/gral', (data) => {
				this.productosGeneral([]);
				for (var i: number = 0; i < data.length; i++) {
					let produ = {
						ID: data[i].id,
						Codigo: data[i].codigo,
						Nombre: data[i].nombre,
						Unidad: data[i].unidad,
						StockMinimo: data[i].stockMinimo,
						StockActual: data[i].stockActual,
						Categorias: data[i].categorias.nombre,
						Tipo: data[i].tipo
					}
					this.productosGeneral.push(produ);
				}

			}).done((data): void => {
				let grid: any = $("#grid-all-stock").dxDataGrid('instance');
				this.isLoadPanelVisible(false);
				let gridAllData: JQueryPromise<any> = grid.selectAll();
				gridAllData.done((data): void => {
					grid.exportToExcel(true);
				});				
			});

		}

		getBodegas(): JQueryPromise<any> {
			this.bodegas([]);
			let url = window.location.origin + '/api/productos/bodegas';
			return $.ajax({
				type: 'GET',
				url: url
			}).done((data): void => {
				for (var i: number = 0; i < data.length; i++) {
					this.bodegas.push(data[i].nombre);
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
					Accion: 'Consulta Productos Gral'
				}
			})
		}				
        
		constructor() {
			this.postHistorial();
            this.getCategoria();
			this.getProductos(-1);
			this.setRol();
			this.getBodegas();			
		}

		
        tabOptions = {
            dataSource: this.categorias,
            onItemClick: (e) => {
                let grid = $('#grid-produ').dxDataGrid('instance');
                this.getProductos(e.itemData.id)
                grid.option().dataSource = this.productos;
                grid.refresh();
                grid.repaint();
            }
        }

        dataGridOptions: any = {
            dataSource: this.productos,
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
			},
			customizeColumns: (result) => {
				if (this.bodegas().length > 0) {
					for (var i: number = 0; i < this.bodegas().length; i++) {
						result.push(this.bodegas()[i])
					}
				}
			},
			columns: [{ dataField: 'id', visible: false }, 'Codigo', 'Nombre', 'StockMinimo', 'StockActual','Unidad','Tipo'],
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
				fileName: 'Stock-Categoria-' + moment().format("DD-MM-YYYY")
            }, onRowClick: (e) => {
                this.enable(false);
                let cateData: App.Categoria = {
                    ID: e.data.ID,
                    Nombre: e.data.Nombre
                }
                this.idRow(cateData.ID);
                this.idRowIndex(e.rowIndex);
			},
			onRowPrepared: (rowInfo) =>{
				if (this.productos().length > 0) {
					if (rowInfo.rowType !== 'header' && rowInfo.rowType !== 'filter' ) {				
						if (rowInfo.data.StockMinimo == rowInfo.data.StockActual) 
							rowInfo.rowElement.css('background', 'yellow');
						else if (rowInfo.data.StockMinimo > rowInfo.data.StockActual && rowInfo.data.StockActual !== 0 )
							rowInfo.rowElement.css('background', 'red');
					}				
					
				}
			}, columnChooser: {
				allowSearch: true,
				enabled: true
			}, filterRow: {
				visible: true,
				showOperationChooser: false,
				applyFilter: "auto"
			}, paging: {
				pageSize: 20,
				pageIndex: 19
			}
			, pager: {
				showPageSizeSelector: true,
				allowedPageSizes: [20, 30, 40],
				showInfo: true
			}, columnFixing: {
				enabled: true
			}, allowColumnReordering: true
			,allowColumnResizing: true
		} 

		buttonOptionsDown: any = {
			text: "Descargar Stock Gral",
			icon: "download",
			onClick: () => {
				this.isLoadPanelVisible(true);
				this.getStockGeneral();
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

		dataGridOptionsAll: any = {
			dataSource: this.productosGeneral,
			visible:false,
			loadPanel: {
				enabled: true,
				text: 'Cargando datos...'
			},
			columns: [{ dataField: 'id', visible: false }, 'Codigo', 'Nombre', 'StockMinimo', 'StockActual','Unidad', 'Categorias', 'Tipo'],
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
				enabled: true,
				fileName: 'Stock-General-' + moment().format("DD-MM-YYYY")
			}, columnChooser: {
				allowSearch: true
			},
			onRowClick: (e) => {
				this.enable(false);
				let cateData: App.Categoria = {
					ID: e.data.ID,
					Nombre: e.data.Nombre
				}
				this.idRow(cateData.ID);
				this.idRowIndex(e.rowIndex);
			},
			onRowPrepared: (rowInfo) => {
				if (this.productos().length > 0) {
					if (rowInfo.rowType !== 'header') {
						if (rowInfo.data.StockMinimo == rowInfo.data.StockActual)
							rowInfo.rowElement.css('background', 'yellow');
						else if (rowInfo.data.StockMinimo > rowInfo.data.StockActual && rowInfo.data.StockActual !== 0)
							rowInfo.rowElement.css('background', 'red');
					}

				}
			}
		}


		loadPanelOptions: any = {
			closeOnOutsideClick: true,
			visible: this.isLoadPanelVisible,
			message: 'Descargando...',
			shading: true
		}


    }
}