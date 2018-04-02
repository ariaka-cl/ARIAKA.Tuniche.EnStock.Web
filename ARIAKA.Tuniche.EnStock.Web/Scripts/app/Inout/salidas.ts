/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../../typings/moment/moment.d.ts" />
/// <reference path="../App.ts" />

namespace Inout {
	'use strict';
    export class InoutSalidasViewModel {

        public productos: KnockoutObservableArray<any> = ko.observableArray<any>();
        public bodegas: KnockoutObservableArray<App.IBodega> = ko.observableArray<App.IBodega>();
        public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
		public salidas: KnockoutObservableArray<any> = ko.observableArray<any>();
		public nombreUsuario: KnockoutObservable<string> = ko.observable<string>();
		public accion: KnockoutObservable<string> = ko.observable<string>();
		public fecha: KnockoutObservable<string> = ko.observable<string>();
		public bodegaSalida: KnockoutObservableArray<any> = ko.observableArray<any>();

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
        //getBodegas(): void {
        //    this.bodegas([]);
        //    let url = window.location.origin + '/api/productos/bodegas';
        //    $.ajax({
        //        type: 'GET',
        //        url: url,
        //        success: (data: any): void => {
        //            for (var i: number = 0; i < data.length; i++) {
        //                let bodega: App.IBodega = {
        //                    ID: data[i].id,
        //                    Nombre: data[i].nombre
        //                }
        //                this.bodegas.push(bodega);
        //            }
        //        }
        //    });
        //}

		getBodegas(): void {
			this.bodegas([]);
			let url = window.location.origin + '/api/productos/bodegas';
			$.ajax({
				type: 'GET',
				url: url
			}).done((data): void => {
				for (var i: number = 0; i < data.length; i++) {
					let bodega: App.IBodega = {
						ID: data[i].id,
						Nombre: data[i].nombre
					}
					this.bodegas.push(bodega);
					this.bodegaSalida.push(data[i].nombre);
				}
			});
		}


        getUser(): void {
            this.usuarios([]);
            let url = window.location.origin + '/api/usuarios/autorizador'
            $.ajax({
                type: 'GET',
                url: url,
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let users = {
                            ID: data[i].id,
                            Nombre: data[i].nombre,
                            Run: data[i].run,
                            NickName: data[i].nickName,
                            Password: data[i].password
                        }
                        this.usuarios.push(users);
                    }
                }
            });
        }

        registrarSalida(): void {
            let formData: any = $('#form-out').dxForm('option').formData;
			let url = window.location.origin + '/api/inout/salidas'
			let personaID: string = localStorage.getItem("id");
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    Producto: formData.Articulos,
					Fechas: moment(formData.Fecha, 'DD/MM/YYYY', true).format(),
                    Cantidad: formData.Cantidad,
                    TipoDocumento: formData.TipoDocumento,
                    NumeroDocumento: formData.NumeroDocumento,
                    Autorizador: formData.Autorizador,
					Bodega: formData.Bodega,
					ModificadorID: personaID

                },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);                    
                }

            }).done((result) => {
                this.getSalidas();
                let grid = $('#grid-out').dxDataGrid('instance');
                grid.refresh();
                grid.repaint();
            }).fail((result) => {
                DevExpress.ui.notify(result.responseText, "error", 2000);
            });
		}

		getSalidas(): void {
			this.salidas([]);
			let url = window.location.origin + '/api/inout/salidas';
			$.ajax({
				type: 'GET',
				url: url,
				success: (data: any): void => {
					for (var i: number = 0; i < data.length; i++) {
						let salidas = {
							ID: data[i].id,
							Articulo: data[i].nombre,							
							TipoDocumento: data[i].tipoDocumento,
							NumeroDocumento: data[i].numeroDocumento,
							Cantidad: data[i].cantidad,
							Fecha: data[i].fecha,
							Autorizador: data[i].autorizador
						}
						for (var j: number = 0; j < data[i].bodegas.length; j++) {
							salidas[this.bodegaSalida()[j]] = data[i].bodegas[j];
						}
						this.salidas.push(salidas);
					}
				}
			});
		}




  //      getSalidas(): void {
  //          this.salidas([]);
  //          let url = window.location.origin + '/api/inout/salidas';
  //          $.ajax({
  //              type: 'GET',
  //              url: url,
  //              success: (data: any): void => {
  //                  for (var i: number = 0; i < data.length; i++) {
  //                      let salidas = {
  //                          ID: data[i].id,
  //                          Articulo: data[i].producto.nombre,
  //                          Unidad: data[i].producto.unidad,
  //                          TipoDocumento: data[i].tipoDocumento,
  //                          NumeroDocumento: data[i].numeroDocumento,
  //                          Cantidad: data[i].cantidad,
		//					Fecha: data[i].fechas,
  //                          Autorizador: data[i].autorizador.nombre
  //                      }
  //                      this.salidas.push(salidas);
  //                  }
  //              }
  //          });
		//}

		getLastUpdate(): void {
			let url = window.location.origin + '/api/login'
			$.ajax({
				type: 'GET',
				url: url,
				success: (data: any): void => {
					let lastUpdate: any = {
						Accion: data.accion,
						Usuario: data.usuario.nombre,
						Fecha: data.fechaAccion
					}
					this.nombreUsuario(lastUpdate.Usuario);
					this.accion(lastUpdate.Accion);
					this.fecha(moment.utc(new Date(lastUpdate.Fecha.replace("Z", ""))).fromNow());					
				}
			});
		}
        constructor() {
            this.getProductos();
            this.getBodegas();
            this.getUser();
			this.getSalidas();
			this.setRol();
			this.getLastUpdate();			
        }

        formOptions: any = {
            formData: [],
            labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 3,
                items: [{
                    dataField: "Fecha",
                    editorType: "dxDateBox",
                    editorOptions: {
						type: "date",
						displayFormat: "yyyy-MM-dd"
                    }
                }, {
                    dataField: "TipoDocumento",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        items: ["Guia", "Movimiento Interno", "Otro"],
                        value: ""
                    }
                }, "NumeroDocumento"]
            }, {
                itemType: "group",
                colCount: 3,
                items: [{
                    dataField: "Cantidad",
                    editorType: "dxTextBox",
                    editorOptions: {
                        width: 200
                    }
                }, {
                    dataField: "Articulos",
                    editorType: "dxLookup",
                    editorOptions: {
                        displayExpr: 'Nombre',
                        dataSource: this.productos
                    }
                }, {

                    dataField: "Bodega",
                    editorType: "dxLookup",
                    editorOptions: {
                        displayExpr: 'Nombre',
						dataSource: this.bodegas,
						closeOnOutsideClick: true
                    }
                }]
            }, {
                itemType: "group",
                colCount: 2,
                items: [{
                    dataField: "Autorizador",
                    editorType: "dxLookup",
                    editorOptions: {
                        displayExpr: 'Nombre',
						dataSource: this.usuarios,
						closeOnOutsideClick: true
                    }
                }]
            }]
        };

        dataGridOptions: any = {
			dataSource: this.salidas,
			loadPanel: {
				enabled: true,
				text: 'Cargando datos...'
			},
			customizeColumns: (result) => {
				if (this.bodegaSalida().length > 0) {
					for (var i: number = 0; i < this.bodegaSalida().length; i++) {
						result.push(this.bodegaSalida()[i])
					}
				}
			},
            columns: [{ dataField: 'Fecha',format:'dd-MM-yyyy', dataType: 'date' }, 'Articulo', 'Cantidad','TipoDocumento', 'NumeroDocumento', 'Autorizador'],
            editing: {
                texts: {
                    confirmDeleteMessage: 'Esta seguro en eliminar registro?'
                }
            },
            export: {
                allowExportSelectedData: true,
                enabled: true,
                fileName: 'salidas'
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
            }, showBorders: true
            , rowAlternationEnabled: true
            , showRowLines: true
            , showColumnLines: false
            , filterRow: {
                visible: true,
				showOperationChooser: false,
				applyFilter: "auto"
			}, paging: {
				pageSize: 10,
				pageIndex: 19
			}
			, pager: {
				showPageSizeSelector: true,
				allowedPageSizes: [5, 10, 20],
				showInfo: true
			}
        }

        buttonOptionsAdd: any = {
            text: "Registrar",
            icon: "plus",
            onClick: () => {
                this.registrarSalida();
            }
        }

        buttonOptionsDelete: any = {
            text: "Limpiar",
            icon: "clear",
            onClick: () => {
                $('#form-out').dxForm('instance').resetValues();

            }
        }

        buttonOptionsPrint: any = {
            text: "Imprimir",
            icon: "doc",
			onClick: () => {
				//this.showInfo(this.employees);			
			}
            
        }

		visiblePopup = ko.observable(false);

		//employees:any = {
		//"ID": 7,
		//"FirstName": "Sandra",
		//"LastName": "Johnson",
		//"Prefix": "Mrs.",
		//"Position": "Controller",
		//"Picture": "images/employees/06.png",
		//"BirthDate": "1974/11/15",
		//"HireDate": "2005/05/11",
		//"Notes": "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
		//"Address": "4600 N Virginia Rd."
		//}

		//employee: any = {};
		//popup: any = null;
		//popUpOptions: any = {
		//	width: 300,
		//	height: 250,
		//	//contentTemplate: function () {
		//	//	return $("<div />").append(
		//	//		$("<p>Full Name: <span>" + this.employees.FirstName +
		//	//			"</span> <span>" + this.employees.LastName + "</span></p>"),
		//	//		$("<p>Birth Date: <span>" + this.employees.BirthDate + "</span></p>"),
		//	//		$("<p>Address: <span>" + this.employees.Address + "</span></p>"),
		//	//		$("<p>Hire Date: <span>" + this.employees.HireDate + "</span></p>"),
		//	//		$("<p>Position: <span>" + this.employees.Position + "</span></p>")
		//	//	);
		//	//},
		//	showTitle: true,
		//	title: "Information",
		//	visible: this.visiblePopup(false),
		//	dragEnabled: false,
		//	closeOnOutsideClick: true
		//};

  //      showInfo():void {
  //        this.visiblePopup(true);
		//};

		  	

				
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