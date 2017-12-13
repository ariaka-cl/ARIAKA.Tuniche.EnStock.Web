/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Inout {
	'use strict';
	export class InoutStockViewModel {
        
        public productos: KnockoutObservable<App.IConsultaStock> = ko.observable(null);
        public articulos: KnockoutObservableArray<any> = ko.observableArray<any>();   
        public articulo: KnockoutObservableArray<any> = ko.observableArray<any>();
        public lugares: KnockoutObservableArray<any> = ko.observableArray<any>();

        producto: App.IConsultaStock = {
            ID: null,
            Nombre: null,
            StockMinimo: null,           
            Codigo: null,
            Unidad:null,
            Categoria: null
        }
	
        getProductos(): void {           
                     
            let grid = $('#grid-detalle').dxDataGrid('instance');
            grid.option('dataSource', this.articulo());
           // grid.refresh()
           // grid.repaint()


            //let url = window.location.origin + '/api/inout/stock';            
            //$.ajax({
            //    type: 'POST',
            //    url: url,
            //    data: 
            //    success: (data: any): void => {
            //            let produ = {
            //                ID: data.id,
            //                Nombre: data.nombre,
            //                StockMinimo: data.stockMinimo,
            //                Codigo: data.codigo,
            //                Unidad: data.unidad,
            //                Categoria: null
                            
            //            }
            //            this.productos(produ);                   
            //    },
            //    error: (data: any): void => {
            //        DevExpress.ui.notify("No se encontro producto", "warning", 2000);
            //    }
            //});
        } 

        getArticulos(): void {
            this.articulos([]);
            let url = window.location.origin + '/api/productos';
            $.ajax({
                type: 'GET',
                url: url,
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let produ = {
                            ID: data[i].id,
                            Codigo: data[i].codigo,
                            Nombre: data[i].nombre,
                            Unidad: data[i].unidad,
                            StockMinimo: data[i].stockMinimo,
                            StockActual: data[i].stockActual 
                        }
                        this.articulos.push(produ);
                    }
                }
            });
        } 


        getLugares(id: string): void {
            this.lugares([]);
            let url = window.location.origin + '/api/inout/traspasos/' + id;
            $.ajax({
                type: 'GET',
                url: url,
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let lugar: any = {
                            Bodega: data[i].bodega.nombre,
                            Stock: data[i].stock
                        }
                        this.lugares.push(lugar);
                    }
                    let grid = $('#grid-locacion').dxDataGrid('instance');
                    grid.option('dataSource', this.lugares);
                    grid.refresh()
                    grid.repaint()
                }
            }).fail((result) => {
                DevExpress.ui.notify(result.responseText, "error", 2000);
                this.lugares([]);
                let grid = $('#grid-locacion').dxDataGrid('instance');
                grid.option('dataSource', []);
                grid.refresh()
                grid.repaint()
            });
        }


        constructor() {
            this.getArticulos();
        }


		formOptions: any = {
			formData: this.productos(this.producto),
			labelLocation: "top",
			items: [{
				itemType: "group",
				colCount: 3,
                items: [{
                    dataField: "Codigo",
                    editorType: "dxLookup",
                    editorOptions: {
                        displayExpr: 'Codigo',
                        dataSource: this.articulos
                    }
                }, {
                    dataField: "Nombre",
                    editorType: "dxLookup",
                    editorOptions: {
                        displayExpr: 'Nombre',
                        dataSource: this.articulos
                    }
                },{					
					editorType: "dxButton",
					editorOptions: {
						text: "Buscar",						
						icon: "search",
                        onClick: () => {
                            this.articulo([]);
                            let form: any = $('#form-stock').dxForm('instance');
                            let obj: any = {
                                Codigo: form.option("formData").Codigo,
                                Nombre: form.option("formData").Nombre
                            }

                            if (obj.Codigo !== 'undefined') {
                                this.getLugares(obj.Codigo.ID);
                                this.articulo.push(obj.Codigo);
                                this.getProductos();
                            } else {
                                this.getLugares(obj.Nombre.ID);
                                this.articulo.push(obj.Nombre);
                                this.getProductos();
                            }                                                                                              
                           
						}
					}
				}]
			}]
        };


        dataGridOptions: any = {
            dataSource: [],
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            columns: [{ dataField: 'Bodega', dataType: 'string' }, 'Stock'],            
            export: {
                allowExportSelectedData: true,
                enabled: true,
                fileName: 'ingresos'
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
        }

        dataGridProduOptions: any = {
            dataSource: this.articulo,
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            columns: [{ dataField: 'id', visible: false }, 'Codigo', 'Nombre', 'StockMinimo', 'StockActual', 'Unidad'],
            export: {
                allowExportSelectedData: true,
                enabled: true,
                fileName: 'ingresos'
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
        }
	}
}