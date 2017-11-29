/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
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
                            Categorias: data[i].categorias.nombre                            
                        }
                        this.productos.push(produ);
                    }
                }
            });
        } 
                      
        
        constructor() {       
            this.getCategoria();
            this.getProductos(-1);
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
            columns: [{ dataField: 'id', visible: false }, 'Codigo', 'Nombre', 'StockMinimo','Unidad','Categorias'],
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
            }
        } 

    }
}