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
		public tipo: KnockoutObservable<App.ITipo> = ko.observable<App.ITipo>();
		public categoria: KnockoutObservable<App.Categoria> = ko.observable<App.Categoria>();
		public unidades: KnockoutObservable<App.IUnidad> = ko.observable<App.IUnidad>();
    
		unidad: any = [{ 'Nombre': 'Unidad' }, { 'Nombre': 'Litro' }, { 'Nombre': 'CC' }, { 'Nombre': 'Kilogramo' }, { 'Nombre': 'Gramo' }]

        getCategoria(): void {
            this.categorias([]);
            let url = window.location.origin + '/api/categorias';
            $.ajax({
                type: 'GET',
                url: url,
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
			if (formData.Tipo === null || formData.Tipo == undefined || formData.Tipo == ""  ) {
				let sub = { ID: 0, Nombre: "" };
				formData.Tipo = sub;
			}
			if (formData.Unidad === null || formData.Unidad == undefined) {
				formData.Unidad = { Nombre: "" };
			}
			if (formData.Unidad === null || formData.Unidad == undefined) {
				formData.Unidad = { Nombre: "" };
			}
            let url = window.location.origin + '/api/productos';
            $.ajax({
                type: 'POST',
                url: url,
                data: {
					ID : formData.ID,
					Codigo: formData.Codigo,
                    Nombre: formData.Nombre,
					Unidad: formData.Unidad.Nombre,
                    StockMinimo: formData.StockMinimo,
					Categorias: { ID: formData.Categorias.ID, Nombre: formData.Categorias.Nombre},
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
			let url = window.location.origin + '/api/productos/'+id;
			$.ajax({
                type: 'DELETE',
                url: url
			}).done((result) => {				
				$('#form-productos').dxForm('instance').resetValues();
			});;
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
				},
				error: (data: any): void => {
					DevExpress.ui.notify(data.responseJSON, "error", 3000);
				}
			});
		} 

        constructor() {
            this.getCategoria();
			this.getSubCategoria();
			this.getProductos();
			this.setRol();
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
				items: ["Codigo","Nombre", {
                    dataField: "Unidad",
					editorType: "dxLookup",
                    editorOptions: {
						displayExpr: 'Nombre',
						dataSource: this.unidad,
						closeOnOutsideClick: true
                    }
                }]
            }, {
                itemType: "group",
                colCount: 3,
                items: ["StockMinimo", {
                    dataField: "Categorias",
                    editorType: "dxLookup",
                    editorOptions: {
                        displayExpr: 'Nombre',
						dataSource: this.categorias,
						closeOnOutsideClick: true
                    }
                }, {
                        dataField: "Tipo",
                        editorType: "dxLookup",
                        editorOptions: {
                            displayExpr: 'Nombre',
							dataSource: this.subCategorias,
							closeOnOutsideClick: true
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
			columns: [{ dataField: 'ID', visible: false }, 'Codigo', 'Nombre', 'StockMinimo', 'StockActual', 'Unidad', 'Categorias','Tipo'],
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
			 showBorders: true
			, rowAlternationEnabled: true
			, showRowLines: true
			, showColumnLines: false
			, filterRow: {
				visible: true,
				showOperationChooser: false
			},
			onRowClick: (e) => {
				this.enable(false);
				let formData: any = $('#form-productos').dxForm('option');
				if (e.data.Tipo === null) {
					let tipo: App.ITipo = { ID: 0, Nombre: "" };
					this.tipo(tipo);					
				} else {
					let tipo: App.ITipo = { ID: 0, Nombre: e.data.Tipo.Nombre };
					this.tipo(tipo);
				}

				if (e.data.Unidad === null) {
					let unidad: App.IUnidad = { ID: 0, Nombre: "" };
					this.unidades(unidad);					
				} else {
					let unidad: App.IUnidad = { ID: 0, Nombre: e.data.Unidad };
					this.unidades(unidad);
				}

				if (e.data.Categorias === null) {
					let cate: App.Categoria = { ID: 0, Nombre: "" };
					this.categoria(cate);
				} else {
					let cate: App.Categoria = { ID: 0, Nombre: e.data.Categorias };
					this.categoria(cate);
				}				
				e.data.Categorias = this.categoria();
				e.data.Unidad = this.unidades();
				e.data.Tipo = this.tipo();
				let produData: any = {
					ID: e.data.ID,
					Nombre: e.data.Nombre,
					Codigo: e.data.Codigo,					
					Unidad: e.data.Unidad,
					StockMinimo: e.data.StockMinimo,
					Categorias: e.data.Categorias,					
					Tipo: e.data.Tipo
				}

				this.idRow(produData.ID);
				this.idRowIndex(e.rowIndex);
				formData.formData = produData;
				let form = $('#form-productos').dxForm('instance');
				form.repaint();				
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

		buttonOptionsClean: any = {
			text: "Limpiar",
			icon: "clear",
			disabled: this.enable,
			onClick: () => {
				$('#form-productos').dxForm('instance').resetValues();
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