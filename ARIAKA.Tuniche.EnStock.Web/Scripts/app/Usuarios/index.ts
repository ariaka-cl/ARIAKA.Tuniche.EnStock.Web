/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Usuarios {
    'use strict';   
    export class UsuariosIndexViewModel {

        public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
		public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
		

        formInstance;

        getUser(): void {
            this.usuarios([]);
            $.ajax({
                type: 'GET',
                url: 'api/usuarios',
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let users = {
                            ID: data[i].id,
                            Nombre: data[i].nombre,
                            Run: data[i].run,
                            NickName: data[i].nickName,
                            Password: data[i].password,
                            Rol: data[i].rol.nombre
                        }
                        this.usuarios.push(users);
                    }
                }
            });
        }

        addUsuario(): void {
            let formData: App.Usuario = $('#form-user').dxForm('option').formData;
            $.ajax({
                type: 'POST',
                url: 'api/usuarios',
                data: {
                    ID: formData.ID,
                    Nombre: formData.Nombre,
                    Run: formData.Run,
                    NickName: formData.NickName,
                    Rol: formData.Rol,
                    Password: formData.Password
            },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
                    $('#form-user').dxForm('instance').resetValues();                    
                }
                

            }).done((result) => {
                this.getUser();
                let grid = $('#grid-user').dxDataGrid('instance');
                grid.refresh();
                grid.repaint();
                });
        }

        deleteUsuario(id:number): void {
            $.ajax({
                type: 'DELETE',
                url: 'api/usuarios/'+id,
                success: (data: any): void => {                   
                    $('#form-user').dxForm('instance').resetValues();
                    let grid = $('#grid-user').dxDataGrid('instance');
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
					Accion: 'Editar Usuarios'
				}
			})
		}

		constructor() {
			this.postHistorial();
			this.getUser();
			this.setRol();
        }

        Roles: App.Rol[] = [{ ID: 1, Nombre: "Administrador" }, { ID: 2, Nombre: "Bodegueros" }, { ID: 3, Nombre: "Client Manager" }, { ID:4 , Nombre: "Autorizador" }];


        formOptions: any = {
			formData: this.usuarios,
            labelLocation: "top",
            onInitialized: (e) => {
                this.formInstance = e.component;
            },
            items: [{
                itemType: "group",
                colCount: 3,
                items: ["Nombre", "Run", "NickName"]
            }, {
                itemType: "group",
                colCount: 3,
                items: [{
                    dataField: "Rol",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        displayExpr: 'Nombre',
                        dataSource: new DevExpress.data.DataSource({
                            store: this.Roles
                        })
                    }
                }, {
                    dataField: "Password",
                    editorOptions: {
                        mode: "password",
                        value: ko.observable("")
                    }
                }, {
                    label: {
                        text: "Confirma Password"
                    },
                    editorType: "dxTextBox",
                    editorOptions: {
                        mode: "password"
                    },
                    validationRules: [{
                        type: "required",
                        message: "Confirm Password is required"
                    }, {
                        type: "compare",
                        message: "'Contraseña' y 'Confirma Contraseña' no coinciden",
                        comparisonTarget: () => {
                            return this.formInstance.option("formData").Password;
                        }
                    }]
                }]
			}]
		};				
		
        dataGridOptions: any = {
            dataSource: this.usuarios,
            loadPanel: {
                enabled: true,
                text: 'Cargando datos...'
            },
            columns: [{ dataField: 'ID', visible: false }, 'Nombre', 'Run', 'NickName', 'Rol', 'Password'],
            editing: {
                texts: {
                    confirmDeleteMessage: 'Esta seguro en eliminar registro?'
                }
            },
            onRowClick: (e) => {
                this.enable(false);
                let formData: any = $('#form-user').dxForm('option');
                let userData: App.Usuario = {ID : e.data.ID,
                                            Nombre: e.data.Nombre,
                                            Run :e.data.Run,
                                            NickName: e.data.NickName,
                                            Rol: e.data.Rol,
                                            Password: e.data.Password
                }
                this.idRow(userData.ID);
                this.idRowIndex(e.rowIndex);
                formData.formData = userData;
                let form = $('#form-user').dxForm('instance');
                form.repaint();
            }
		}

		buttonOptionsAdd: any = {
			text: "Guardar",
            icon: "save",
            onClick: () => {
                this.addUsuario();
            }
		}		
		buttonOptionsDelete: any = {
			text: "Borrar",
			icon: "remove",
            disabled: this.enable,
            onClick: () => {
                let grid = $('#grid-user').dxDataGrid('instance');
                let index = this.idRow();
                grid.deleteRow(this.idRowIndex());
                grid.repaint();
                this.deleteUsuario(index);
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