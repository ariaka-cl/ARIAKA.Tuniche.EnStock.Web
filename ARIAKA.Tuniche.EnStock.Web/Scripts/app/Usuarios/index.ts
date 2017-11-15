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
                    Rol:{Nombre: formData.Rol },
                    Password: formData.Password
            },
                success: (data: any): void => {
                    DevExpress.ui.notify("Datos Guardados Satisfactoriamente", "success", 2000);
                    $('#form-user').dxForm('instance').resetValues();
                    let grid = $('#grid-user').dxDataGrid('instance');
                    grid.refresh();
                    grid.repaint();
                }
                

            });
        }

        deleteUsuario(id:number): void {
            $.ajax({
                type: 'DELETE',
                url: 'api/usuarios/'+id,
                success: (data: any): void => {
                    //DevExpress.ui.notify("Usuario Eliminado", "success", 2000);
                    $('#form-user').dxForm('instance').resetValues();
                    let grid = $('#grid-user').dxDataGrid('instance');
                    grid.refresh();
                    grid.repaint();
                }
            });


        }
        constructor() {       

            $.ajax({
                type: 'GET',
                url: 'api/usuarios',
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let users = {
                            ID: data[i].id,
                            Nombre: data[i].nombre,
                            Run: data[i].run,
                            NickName: data[i].nickName
                        }
                        this.usuarios.push(users);
                    }
                }
            });
        }

        formOptions: any = {
			formData: this.usuarios,
			labelLocation: "top",
            items: [{
                itemType: "group",
                colCount: 3,
                items: ["Nombre", "Run", "NickName"]
			}, {
				itemType: "group",
				colCount: 3,
				items: ["Rol", "Password","Password_verifica"]
			}]
		};				
		
        dataGridOptions: any = {
			dataSource: this.usuarios,
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
		buttonOptionsEdit: any = {
			text: "Editar",
			icon: "edit",
			disabled: this.enable
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

    }
}