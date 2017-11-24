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
                    $('#form-user').dxForm('instance').resetValues();
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

        contructor() {
            this.getCategoria();
            //this.getProductos();
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
                        displayExpr: 'Nombre',
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
                items: ["Envase", "PrecioUnitario", "DESC"]
			}, {
				itemType: "group",
				colCount: 3,
                items: [{
                    dataField: "StockActualMercedes",
                    editorType: "dxTextBox",
                    editorOptions: {
                        width: 200
                    }
                }, {
                    dataField: "StockActualPalmas",
                    editorType: "dxTextBox",
                    editorOptions: {
                        width: 200
                    }
                    }, "Stock"]
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