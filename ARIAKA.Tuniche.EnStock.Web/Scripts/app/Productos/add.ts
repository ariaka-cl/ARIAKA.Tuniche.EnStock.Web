/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Productos {
    'use strict';
    export class ProductosAddViewModel {

        public productos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
        public categorias: KnockoutObservableArray<any> = ko.observableArray<any>();        
    
        unidad = [{ 'name': 'Unidad' },{ 'name': 'Litro' }, { 'name': 'CC' }, { 'name': 'Kilogramo' }, { 'name': 'Gramo' }]

        getCategoria(): void {
            this.categorias([]);
            let url = window.location.origin + '/api/categorias';
            $.ajax({
                type: 'GET',
                url: url,
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
            let formData: any = $('#form-productos').dxForm('option').formData;
            let url = window.location.origin + '/api/productos';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    Codigo: formData.Codigo,
                    Nombre: formData.Nombre,
                    Unidad: formData.Unidad.name,
                    StockMinimo: formData.StockMinimo,
                    Categorias: formData.Categorias                  
                },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
                    $('#form-productos').dxForm('instance').resetValues();
                }
            });
        }

        deleteProducto(id: number): void {
            $.ajax({
                type: 'DELETE',
                url: 'api/productos/' + id,
                success: (data: any): void => {
                    $('#form-productos').dxForm('instance').resetValues();                   
                }
            });
        }

        constructor() {
            this.getCategoria();
        }
        formInstance;

        formOptions: any = {
            formData: this.productos,
            labelLocation: "top",
            onInitialized: (e) => {
                this.formInstance = e.component;
            },
            items: [{
                itemType: "group",
                colCount: 3,
                items: ["Codigo", "Nombre", {
                    dataField: "Unidad",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: 'name',
                        dataSource: this.unidad
                    }
                }]
            }, {
                itemType: "group",
                colCount: 3,
                items: ["StockMinimo", {
                    dataField: "Categorias",
                    editorType: "dxLookup",
                    editorOptions: {
                        displayExpr: 'text',
                        dataSource: this.categorias
                    }
                }, {
                        dataField: "Tipo",
                        editorType: "dxSelectBox",
                        editorOptions: {
                            displayExpr: 'text',
                            dataSource: this.categorias,
                            visible:false
                        }
                    }]
            }]
        };	

       

        buttonOptionsAdd: any = {
            text: "Guardar",
            icon: "save",
            onClick: () => {
                this.addProducto();
            }
        }    
        buttonOptionsDelete: any = {
            text: "Borrar",
            icon: "remove",
            disabled: this.enable,
            onClick: () => {
                let grid = $('#grid-productos').dxDataGrid('instance');
                let index = this.idRow();
                grid.deleteRow(this.idRowIndex());
                grid.repaint();
                this.deleteProducto(index);
            }
        }       

    }
}