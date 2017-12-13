/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />
namespace Inout {
    'use strict';
    export class InoutTraspasosViewModel {

        public productos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public lugares: KnockoutObservableArray<any> = ko.observableArray<any>();
        public bodegas: KnockoutObservableArray<App.IBodega> = ko.observableArray<App.IBodega>();
        public cambiosLugar: KnockoutObservableArray<App.IDetalleStock> = ko.observableArray<App.IDetalleStock>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
        public selectedTab: KnockoutObservable<number> = ko.observable(-1);


        constructor() {
            this.getProductos();
            this.getBodegas();
        }

        getProductos(): void {
            this.productos([]);
            let url = window.location.origin + '/api/productos';
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

        getLugares(id:string): void {
            let url = window.location.origin + '/api/inout/traspasos/'+id;
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
                    let grid = $('#grid-traspaso').dxDataGrid('instance');
                    grid.option('dataSource', this.lugares);
                    grid.refresh()
                    grid.repaint()
                }
            }).fail((result) => {
                DevExpress.ui.notify(result.responseText, "error", 2000);
                this.lugares([]);
                let grid = $('#grid-traspaso').dxDataGrid('instance');
                grid.option('dataSource', []);
                grid.refresh()
                grid.repaint()
            });
        }

        saveTraspaso(): void {

            let grid: any = $('#grid-traspaso').dxDataGrid('instance');
            let detalles: any = grid.option("dataSource");
            for (var i: number = 0; i < detalles.length; i++) {
                let stockDetalle: App.IDetalleStock = {
                    ID: 0,
                    Bodega: {ID:0, Nombre: detalles[i].Bodega },
                    Stock: detalles[i].Stock
                }
                this.cambiosLugar.push(stockDetalle);
            }
            let change: any = this.cambiosLugar
            let url = window.location.origin + '/api/inout/traspasos/save';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    DetalleStock: this.cambiosLugar()
                },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
                    this.lugares([]);
                    let grid = $('#grid-traspaso').dxDataGrid('instance');
                    grid.option('dataSource', []);
                    grid.refresh();
                    grid.repaint();
                    $('#form-in').dxForm('instance').resetValues();
                }

            });
        }




        
            formOptions: any = {
            formData: this.productos(),
            labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 3,
                items: [{
                    dataField: "Articulos",
                    editorType: "dxLookup",
                    editorOptions: {
                        displayExpr: 'Nombre',
                        dataSource: this.productos
                    }
                }, {
                    editorType: "dxButton",
                    editorOptions: {
                        text: "Buscar",                       
                        icon: "search",
                        onClick: () => {
                            let form: any = $('#form-traspasos').dxForm('instance');
                            this.getLugares(form.option("formData").Articulos.ID);                            
                        }
                    }
                }]
            }, {
                itemType: "group",
                colCount: 3,
                items: [{

                    dataField: "Bodega",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: 'Nombre',
                        dataSource: this.bodegas
                    }
                }, {
                    editorType: "dxButton",
                    editorOptions: {
                        text: "Agregar",                       
                        icon: "plus",
                        onClick: () => {
                            let form: any = $('#form-traspasos').dxForm('instance');
                            let lugar: any = {
                                Bodega: form.option("formData").Bodega.Nombre,
                                Stock: 0
                            }
                            this.lugares.push(lugar);                                                

                            let grid = $('#grid-traspaso').dxDataGrid('instance');
                            grid.option('dataSource', this.lugares);
                            grid.refresh()
                            grid.repaint()
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
                editing: {
                    texts: {
                        confirmDeleteMessage: 'Esta seguro en eliminar registro?'
                    },
                    allowUpdating: true,
                    allowDeleting: true
                },
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

            buttonOptionsAdd: any = {
                text: "Guardar",
                icon: "save",
                onClick: () => {
                    this.saveTraspaso();
                }
            } 
    }
}