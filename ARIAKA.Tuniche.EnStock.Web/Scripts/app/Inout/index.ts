/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../App.ts" />

namespace Inout {
    'use strict';
    export class InoutIndexViewModel {                                                                          
        
        public productos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
        public categorias: KnockoutObservableArray<App.Categoria> = ko.observableArray<App.Categoria>();
        public bodegas: KnockoutObservableArray<App.IBodega> = ko.observableArray<App.IBodega>();
        public detalle: KnockoutObservableArray<App.IDetalleStock> = ko.observableArray<App.IDetalleStock>();
        public proveedores: KnockoutObservableArray<any> = ko.observableArray<any>();
        public categoria: KnockoutObservable<App.Categoria> = ko.observable<App.Categoria>();
		public ingresos: KnockoutObservableArray<any> = ko.observableArray<any>();
		public nombreUsuario: KnockoutObservable<string> = ko.observable<string>();
		public accion: KnockoutObservable<string> = ko.observable<string>();
		public fecha: KnockoutObservable<string> = ko.observable<string>();
		public bodegaIngreso: KnockoutObservableArray<any> = ko.observableArray<any>();
           
       	getIngresos(): void {
			this.ingresos([]);
			$.ajax({
				type: 'GET',
				url: 'api/inout',
				success: (data: any): void => {
					for (var i: number = 0; i < data.length; i++) {
						let ingresos = {
							ID: data[i].id,
							Articulo: data[i].nombre,							
							TipoDocumento: data[i].tipoDocumento,
							NumeroDocumento: data[i].numeroDocumento,
							Cantidad: data[i].cantidad,
							Autorizador: data[i].autorizador,
							Fecha: moment.utc(new Date(data[i].fecha.replace("Z", ""))) 
						}
						for (var j: number = 0; j < data[i].bodegas.length; j++) {
							ingresos[this.bodegaIngreso()[j]] = data[i].bodegas[j];
						}
						this.ingresos.push(ingresos);
					}
				}
			});
		}



        getCategoria(): void {
            this.categorias([]);
            $.ajax({
                type: 'GET',
                url: 'api/categorias',
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let cate:App.Categoria = {
                            ID: data[i].id,
                            Nombre: data[i].nombre
                        }
                        this.categorias.push(cate);
                    }
                }
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
					let bodega: App.IBodega = {
                            ID: data[i].id,
                            Nombre: data[i].nombre
                        }
					this.bodegas.push(bodega);
					this.bodegaIngreso.push(data[i].nombre);
				}
			});
        }

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

        getProductos(): void {
            this.productos([]);
            $.ajax({
                type: 'GET',
                url: 'api/productos',
                success: (data: any): void => {                    
                    for (var i: number = 0; i < data.length; i++) {
                        let produ:any = {
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


		getLastUpdate(): void {			
			$.ajax({
				type: 'GET',
				url: 'api/login',
				success: (data: any): void => {
					let lastUpdate: any = {
						Accion: data.accion,
						Usuario: data.usuario.nombre,
						Fecha: data.fechaAccion
					}
					this.nombreUsuario(lastUpdate.Usuario);
					this.accion(lastUpdate.Accion);	
					this.fecha(moment.utc(new Date(lastUpdate.Fecha.replace("Z", ""))).fromNow());
					console.log(lastUpdate.Fecha)
					console.log(moment.utc(new Date(lastUpdate.Fecha.replace("Z",""))).fromNow());
				}
			});
		}
        
        addProducto(): void {
            
            let formData: any = $('#form-in').dxForm('option').formData;
            if (!this.verificaCantidad(formData.Cantidad)) {
                DevExpress.ui.notify("La cantidad no es igual al ingresado", "warning", 2000);
                return;
            }

			let personaID: string = localStorage.getItem("id");
            $.ajax({
                type: 'POST',
                url: 'api/inout',
                data: {
                    ProuctoID: formData.Articulos.ID,
					Fecha: moment(formData.Fecha, 'DD/MM/YYYY', true).format(),
                    Stock: formData.Cantidad,                                        
                    PrecioUnitario: formData.PrecioUnitario,
                    TipoDocumento: formData.TipoDocumento.name,
                    NumeroDocumento: formData.NumeroDocumento,
                    Proveedor: formData.Proveedor,
					DetalleStock: this.detalle(),
					AutorizadorID: personaID
                    
                },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
                    this.detalle([]);
                    let grid = $('#grid-bodega').dxDataGrid('instance');
                    grid.option('dataSource', []);
                    grid.refresh();
                    grid.repaint();
                    $('#form-in').dxForm('instance').resetValues();
                }

            }).done((result) => {              
                this.getIngresos();
                let grid = $('#grid-in').dxDataGrid('instance');
                grid.refresh();
                grid.repaint();
            });
        }
               

        constructor() {
            this.getCategoria();
            this.getBodegas();
            this.getProveedor();
            this.getProductos();
			this.getIngresos();
			this.setRol();
			this.getLastUpdate();
        }                  		
		
        tipoDocu = [{ "name": "Guia" }, { "name": "Factura" }, {"name":"Otro"}];

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
						type: "date",
						displayFormat: "yyyy-MM-dd"
					}
                }, {
                    dataField: "TipoDocumento",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: 'name',
                        dataSource: new DevExpress.data.DataSource({
                            store: this.tipoDocu
                        }),
                        items: ["Guia", "Factura","Otro"],
                        value: ""
                    }
                }, "NumeroDocumento"]
			}, {
				itemType: "group",
				colCount: 3,
				items: [{
					dataField: "Proveedor",
					editorType: "dxLookup",
					editorOptions: {
						displayExpr: 'Nombre',
                        dataSource: this.proveedores
                    }
                }, "Cantidad", {
					dataField: "Articulos",
                    editorType: "dxLookup",
					editorOptions: {
                        displayExpr: 'Nombre',
                        dataSource : this.productos
					}
                 }]
			},{
                itemType: "group",
                colCount: 3,
                items: [{
                    itemType: "group",
                    caption: "Agregar Bodegas y Stock",
                    items: [{
                        editorType: "dxButton",
                        editorOptions: {
                            text: "Agregar",
                            icon: "plus",
                            onClick: () => {
                                let formData: any = $('#form-in').dxForm('option').formData;
                                let detalleStock: App.IDetalleStock = {
                                    ID:0,
                                    Stock: formData.Stock,
                                    Bodega: { ID: formData.Bodega.ID, Nombre: formData.Bodega.Nombre }

                                }
                                this.detalle.push(detalleStock);
                                let grid = $('#grid-bodega').dxDataGrid('instance');                                
                                grid.option('dataSource', this.detalle);
                                grid.refresh()
                                grid.repaint()
                            }
                        }
                    },{

                        dataField: "Bodega",
                        editorType: "dxSelectBox",
                        editorOptions: {
                            displayExpr: 'Nombre',
                            dataSource: this.bodegas
                        }
                    }, {
                        dataField: "Stock",
                        editorType: "dxNumberBox",
                        editorOptions: {
                            min: 1,
                            showSpinButtons: true,
                            showClearButton: true
                        }
                    }]
                },{
                    name: 'DetalleStock',                        
                    visible: true,
                    template: (data, $itemElement) => {
                        $("<div id='grid-bodega'>")
                            .appendTo($itemElement)
                            .dxDataGrid({
                                dataSource: this.detalle,
                                columns: ['Bodega.Nombre', 'Stock'],
								rowAlternationEnabled: true,
								editing: {
									mode: "row",						
									allowDeleting: true,
									allowUpdating: true
								}, 
                            });
                    }
                    },"PrecioUnitario"]
            }]
        };

        dataGridOptions: any = {
            dataSource: this.ingresos,
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
			},
			customizeColumns: (result) => {
				if (this.bodegaIngreso().length > 0) {
					for (var i: number = 0; i < this.bodegaIngreso().length; i++) {
						result.push(this.bodegaIngreso()[i])
					}
				}
			},
			columns: [{ dataField: 'Fecha', format: 'dd-MM-yyyy', dataType: 'date' }, { dataField: 'TipoDocumento', visible: false, dataType: 'string' }, { dataField: 'NumeroDocumento', visible: false, dataType: 'string' },'Cantidad', { dataField:'Articulo', dataType:'string'},'Autorizador'],
            editing: {
                texts: {
                    confirmDeleteMessage: 'Esta seguro en eliminar registro?'
                }
            },
            export: {
                allowExportSelectedData: true,
                enabled: true,
                fileName:'ingresos'
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
			}, columnFixing: {
				enabled: true
			}, allowColumnReordering: true
			, allowColumnResizing: true
        }

        buttonOptionsAdd: any = {
            text: "Agregar",
            icon: "plus",
            onClick: () => {
                this.addProducto();
            }
        }        
        buttonOptionsDelete: any = {
            text: "Limpiar",
            icon: "clear",            
            onClick: () => {
                this.detalle([]);
                let grid = $('#grid-bodega').dxDataGrid('instance');               
                grid.option('dataSource', []);
                grid.refresh();
                grid.repaint();
                $('#form-in').dxForm('instance').resetValues();
                
            }
        }

        public verificaCantidad(cantidad: string):boolean {

            let cont = 0;
            let contAux: string;

            for (let i of this.detalle()) {
                cont = cont + i.Stock;
            }
            contAux = String(cont);
            
            if (cantidad === contAux) {
                return true;
            }
            return false;
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