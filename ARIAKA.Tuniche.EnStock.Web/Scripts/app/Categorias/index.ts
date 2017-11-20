/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Categorias {
    'use strict';
    export class CategoriasIndexViewModel {

		//cate = [{ "name": "Herramientas" }, { "name": "Agroquimicos" }];
  //      categorias = { "Nombre": "" };

        public categorias: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
        public nombre: KnockoutObservable<String> = ko.observable("");

        getCategoria(): void {
            this.categorias([]);
            $.ajax({
                type: 'GET',
                url: 'api/categorias',
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let cate = {
                            ID: data[i].id,
                            Nombre: data[i].nombre                            
                        }
                        this.categorias.push(cate);
                    }
                }
            });
        }

        addCategoria(): void {
            let formData: any = $('#text-nombre').dxTextBox('option').value;
            $.ajax({
                type: 'POST',
                url: 'api/categorias',
                data: {                 
                    ID: this.idRow,
                    Nombre: formData                  
                },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
                    $('#text-nombre').dxTextBox('instance').repaint();
                }
            }).done((result) => {
                this.getCategoria();
                let grid = $('#grid-cate').dxDataGrid('instance');
                grid.refresh();
                grid.repaint();
            });
        }

        deleteCategoria(id: number): void {
            $.ajax({
                type: 'DELETE',
                url: 'api/categorias/' + id,
                success: (data: any): void => {
                    $('#text-nombre').dxTextBox('instance').reset();
                    let grid = $('#grid-cate').dxDataGrid('instance');
                    grid.refresh();
                    grid.repaint();
                }
            });


        }

        constructor() {
            this.getCategoria();
        }

        textBoxOptions: any = {
            width: 200,
            label: "Nombre",
            showClearButton: true,
            value: this.nombre
        }


        dataGridOptions: any = {
            dataSource: this.categorias,
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            columns: [{ dataField: 'ID', visible: false }, 'Nombre'],
        editing: {
            texts: {
                confirmDeleteMessage: 'Esta seguro en eliminar registro?'
            }
        },
        onRowClick: (e) => {
                this.enable(false);                
                let cateData: App.Categoria = {
                                            ID: e.data.ID,
                                            Nombre: e.data.Nombre
                }
                this.idRow(cateData.ID);
                this.idRowIndex(e.rowIndex);
                this.nombre(cateData.Nombre);
        }   
    }          			

        buttonOptionsAdd: any = {
            text: "Guardar",
            icon: "save",
            onClick: () => {
                this.addCategoria();
            }
        }
        
        buttonOptionsDelete: any = {
            text: "Borrar",
            icon: "remove",
            disabled: this.enable,
            onClick: () => {
                let grid = $('#grid-cate').dxDataGrid('instance');
                let index = this.idRow();
                grid.deleteRow(this.idRowIndex());
                grid.repaint();
                this.deleteCategoria(index);
            }
        } 
    }
}