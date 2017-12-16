/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
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
             


        getIngresos(): void {
            this.ingresos([]);
            $.ajax({
                type: 'GET',
                url: 'api/inout',
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let ingresos = {
                            ID: data[i].id,
                            Articulo: data[i].producto.nombre,
                           PrecioUnitario: data[i].precioUnitario,
                           TipoDocumento: data[i].tipoDocumento,
                           NumeroDocumento: data[i].numeroDocumento,
                           Cantidad: data[i].stock,
                           ProductoNombre: data[i].productoNombre,
                           Fecha: data[i].fecha
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
         
        
        addProducto(): void {
            
            let formData: any = $('#form-in').dxForm('option').formData;
            if (!this.verificaCantidad(formData.Cantidad)) {
                DevExpress.ui.notify("La cantidad no es igual al ingresado", "warning", 2000);
                return;
            }

            $.ajax({
                type: 'POST',
                url: 'api/inout',
                data: {
                    ProuctoID: formData.Articulos.ID,
                    Fecha: formData.Fecha,
                    Stock: formData.Cantidad,                                        
                    PrecioUnitario: formData.PrecioUnitario,
                    TipoDocumento: formData.TipoDocumento.name,
                    NumeroDocumento: formData.NumeroDocumento,
                    Proveedor: formData.Proveedor,
                    DetalleStock: this.detalle()
                    
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
                        type: "date"                        
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
            columns: [{ dataField: 'Fecha', format: 'yyyy-dd-MM', dataType: 'date' }, 'TipoDocumento', 'NumeroDocumento', 'Cantidad', { dataField:'Articulo', dataType:'string'},'PrecioUnitario'],
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
            }, scrolling: {
                mode:'virtual'
            }, showBorders: true
            , rowAlternationEnabled: true
            , showRowLines: true
            , showColumnLines: false
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
    }
}