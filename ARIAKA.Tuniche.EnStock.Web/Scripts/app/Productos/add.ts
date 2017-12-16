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
		public subCategorias: KnockoutObservableArray<any> = ko.observableArray<any>(); 
		public nombre: KnockoutObservable<String> = ko.observable("");
    
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

        getSubCategoria(): void {
            this.subCategorias([]);
            let url = window.location.origin + '/api/categorias/sub';
            $.ajax({
                type: 'GET',
                url: url,
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let subcate = {
                            ID: data[i].id,
                            Nombre: data[i].nombre,
                            Categoria: data[i].categoria.nombre
                        }
                        this.subCategorias.push(subcate);
                    }
                }
            });
        }

        addProducto(): void {
			let formData: any = $('#form-productos').dxForm('option').formData;
			if (formData.Tipo === null) {
				let sub = { ID: 0, Nombre: "" };
				formData.Tipo = sub;
			}
            let url = window.location.origin + '/api/productos';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    Codigo: formData.Codigo,
                    Nombre: formData.Nombre,
                    Unidad: formData.Unidad.name,
                    StockMinimo: formData.StockMinimo,
					Categorias: formData.Categorias,
					StockActual: formData.StockActual,					
					Tipo: formData.Tipo.Nombre

                },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
					$('#form-productos').dxForm('instance').resetValues();					
                }
			}).done((result) => {
				this.getProductos();
				let grid = $('#grid-productos').dxDataGrid('instance');
				grid.refresh();
				grid.repaint();
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

		getProductos(): void {
			this.productos([]);
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
							StockActual: data[i].stockActual,
							Categorias: data[i].categorias.nombre,
							Tipo: data[i].tipo
						}
						this.productos.push(produ);
					}
				}
			});
		} 

        constructor() {
            this.getCategoria();
			this.getSubCategoria();
			this.getProductos();
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
				items: ["Codigo", {
					dataField: 'Nombre',
					editorType: 'dxTextBox',
					editorOptions: {
						value: this.nombre
					}
				}, {
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
                        editorType: "dxLookup",
                        editorOptions: {
                            displayExpr: 'Nombre',
                            dataSource: this.subCategorias                            
                        }
                    }]
				}, {
					itemType: "group",
					colCount: 3,
					items: ["StockActual"]
			}]
        };	

		dataGridOptions: any = {
			dataSource: this.productos,
			loadPanel: {
				enabled: true,
				text: 'Cargando datos...'
			},
			columns: [{ dataField: 'id', visible: false }, 'Codigo', 'Nombre', 'StockMinimo', 'StockActual', 'Unidad', 'Categorias','Tipo'],
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
				fileName: 'ingresos'
			}, columnChooser: {
				allowSearch: true
			},
			onRowClick: (e) => {
				this.enable(false);
				let produData: App.Categoria = {
					ID: e.data.ID,
					Nombre: e.data.Nombre
				}
				this.idRow(produData.ID);
				this.idRowIndex(e.rowIndex);
				this.nombre(produData.Nombre);
			}
		}

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