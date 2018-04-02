/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Categorias {
    'use strict';
    export class CategoriasIndexViewModel {
        		
        public categorias: KnockoutObservableArray<any> = ko.observableArray<any>();
        public subCategorias: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
		public nombre: KnockoutObservable<String> = ko.observable("");
		public subCateNombre: KnockoutObservable<String> = ko.observable("");
		public idRowSub: KnockoutObservable<number> = ko.observable(0);
		public idRowIndexSub: KnockoutObservable<number> = ko.observable(-1);
		public nombreCateSub: KnockoutObservable<String> = ko.observable("");

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

        addSubCategoria(): void {
            let formData: any = $('#form-sub-cate').dxForm('option').formData;
            $.ajax({
                type: 'POST',
                url: 'api/categorias/sub',
                data: {
                    ID: this.idRowSub,
                    Nombre: formData.Nombre,
					Categoria: { ID: formData.Categorias().ID, Nombre: formData.Categorias().Nombre }
                },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
                    $('#text-nombre').dxTextBox('instance').repaint();
                }
            }).done((result) => {
                this.getSubCategoria();
                let grid = $('#grid-sub-cate').dxDataGrid('instance');
                grid.refresh();
                grid.repaint();
            });
        }

        getSubCategoria(): void {
            this.subCategorias([]);
            $.ajax({
                type: 'GET',
                url: 'api/categorias/sub',
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

		deleteSubCategoria(id: number): void {
			
			$.ajax({
				type: 'DELETE',
				url: 'api/categorias/sub/' + id,
				success: (data: any): void => {
					let grid = $('#grid-sub-cate').dxDataGrid('instance');
					grid.refresh();
					grid.repaint();
				}
			});


		}

		postHistorial(): void {
			let url = window.location.origin + '/api/historial';
			$.ajax({
				type: 'POST',
				url: url,
				data: {
					UserID: localStorage.getItem('id'),
					Accion: 'Editar Categorias'
				}
			})
		}


		constructor() {
			this.postHistorial();
            this.getCategoria();
			this.getSubCategoria();
			this.setRol();
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

        formOptions: any = {
            formData: this.subCategorias,
            labelLocation: "top",            
            items: [{
                itemType: "group",
                colCount: 3,
                items: [{
                    dataField: "Categorias",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: 'Nombre',
						dataSource: this.categorias,
						value: this.nombreCateSub
                    }
				}, {
					dataField: "Nombre",
					editorType: "dxTextBox",
					editorOptions: {
						width: 200,
						label: "Nombre",
						showClearButton: true,
						value: this.subCateNombre
					}
					}]
            }]
        };

        dataGridOptionsSubCate: any = {
            dataSource: this.subCategorias,
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            columns: [{dataField: 'Categoria', groupIndex: 0}, 'Nombre'],
            editing: {
                texts: {
                    confirmDeleteMessage: 'Esta seguro en eliminar registro?'
                }
            }, groupPanel: {
                visible: true
            },
            onRowClick: (e) => {
                this.enable(false);
                let subCateData: any = {
                    ID: e.data.ID,
					Nombre: e.data.Nombre,
					Categoria: e.data.Categoria
                }
				this.idRowSub(subCateData.ID);
                this.idRowIndexSub(e.rowIndex);
				this.subCateNombre(subCateData.Nombre);
				this.nombreCateSub(subCateData.Categoria);
            }
        }

        buttonOptionsAddSub: any = {
            text: "Guardar",
            icon: "save",
            onClick: () => {
                this.addSubCategoria();
            }
        }

        buttonOptionsDeleteSub: any = {
            text: "Borrar",
            icon: "remove",
            disabled: this.enable,
            onClick: () => {
				let grid = $('#grid-sub-cate').dxDataGrid('instance');
                let index = this.idRowSub();
                grid.deleteRow(this.idRowIndexSub());
                grid.repaint();
				this.deleteSubCategoria(index);
            }
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