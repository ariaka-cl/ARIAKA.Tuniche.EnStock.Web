/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Inout {
    'use strict';
    export class InoutIndexViewModel {                                                                          
        
        public productos: KnockoutObservableArray<App.IProductos> = ko.observableArray<App.IProductos>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
        public categorias: KnockoutObservableArray<any> = ko.observableArray<any>();
        public bodegas: KnockoutObservableArray<App.IBodega> = ko.observableArray<App.IBodega>();
        public detalle: KnockoutObservableArray<any> = ko.observableArray<any>();


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



        addProducto(): void {
            let formData: any = $('#form-in').dxForm('option').formData;
            $.ajax({
                type: 'POST',
                url: 'api/inout',
                data: {
                    Nombre: formData.Articulos.name,
                    BodegaPalmas: formData.BodegaPalmas,
                    StockActualPalmas: formData.StockActualPalmas,
                    BodegaMercedes: formData.BodegaMercedes,
                    StockActualMercedes: formData.StockActualMercedes,
                    Categorias: formData.Categorias,
                    Codigo: formData.Codigo,
                    Stock: formData.Stock,
                    PrecioUnitario: formData.PrecioUnitario,
                    TipoDocumento: formData.TipoDocumento.name,
                    NumeroDocumento: formData.NumeroDocumento,
                    Comentario: formData.Proveedor.name
                },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
                    $('#form-in').dxForm('instance').resetValues();
                }


            }).done((result) => {
               // this.getUser();
                let grid = $('#grid-in').dxDataGrid('instance');
                grid.refresh();
                grid.repaint();
            });
        }

        getProductos(): void {
            let produ = {
                ID: null,
                Nombre: null,
                BodegaPalmas: null,
                BodegaMercedes: null,
                Categorias: null,
                StockActualPalmas: null,
                StockActualMercedes: null,
                Codigo: null,
                Stock: null,
                PrecioUnitario: null,
                TipoDocumento: "",
                NumeroDocumento: "",
                Comentario: null
            }
            this.productos.push(produ);
        }

        constructor() {
            this.getCategoria();
            this.getBodegas();
        }

                
		proveedor = [{ "name": "SEÑORES AGRO ARICA SA" }, { "name": "COMERCIAL ARICA SA" }];
		articulos = [{ "name": "Azadilla" }, { "name": "Alicate Universal" }];
        tipoDocu = [{ "name": "Guia" }, { "name": "Factura" }];

        formOptions: any = {
			formData: this.productos,
			labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 3,
                items: [{
                    dataField: "Fecha",
                    editorType: "dxDateBox",
                    editorOptions: {
                        type: "date",
                        value: new Date(2017, 2, 16)
                    }
                }, {
                    dataField: "TipoDocumento",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: 'name',
                        dataSource: new DevExpress.data.DataSource({
                            store: this.tipoDocu
                        }),
                        items: ["Guia", "Factura"],
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
						displayExpr: 'name',
						dataSource: new DevExpress.data.DataSource({
							store: this.proveedor
						})
					}
				}, {
					dataField: "Articulos",
					editorType: "dxLookup",
					editorOptions: {
						displayExpr: 'name',
						dataSource: new DevExpress.data.DataSource({
							store: this.articulos
						})
					}
                    }, {
                        dataField: "Categorias",
                        editorType: "dxLookup",
                        editorOptions: {
                            displayExpr: 'text',
                            dataSource: this.categorias
                        }
                    }]
			},{
                itemType: "group",
                colCount: 3,
                items: ["Envase", "PrecioUnitario", "Stock"]
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
                                let detalleStock = {
                                    Nombre: formData.Bodega.Nombre,
                                    Stock: formData.Stock
                                }
                                this.detalle.push(detalleStock);
                                let grid = $('#dataGrid').dxDataGrid('instance');
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
                        $("<div id='dataGrid'>")
                            .appendTo($itemElement)
                            .dxDataGrid({
                                dataSource: this.detalle,
                                columns: ['Nombre', 'Stock'],
                                rowAlternationEnabled: true
                            });
                    }
                 }]
            }]
        };

        dataGridOptions: any = {
            dataSource: this.productos,
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            columns: ['Fecha', 'TipoDocumento', 'NumeroDocumento', 'Proveedor', 'Stock', 'Envase', 'PrecioUnitario', 'StockActualMercedes', 'StockActualPalmas'],
            editing: {
                texts: {
                    confirmDeleteMessage: 'Esta seguro en eliminar registro?'
                }
            },
            grouping: {
                allowCollapsing: true
            }, groupPanel: {
                allowColumnDragging: true,
                visible: true,
                emptyPanelText: 'Arrastre algunas columnas para agrupar'
            }, columnChooser: {
                allowSearch: true
            }, scrolling: {
                mode:'virtual'
            }
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


                $('#form-in').dxForm('instance').resetValues(); 
            }
        } 
    }
}