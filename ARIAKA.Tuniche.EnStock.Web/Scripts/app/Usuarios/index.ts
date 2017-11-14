/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Usuarios {
    'use strict';
	export class UsuariosIndexViewModel {

		public usuarios: KnockoutObservableArray<any> = ko.observableArray<any>();
        
        constructor() {
            $.ajax({
                type: 'GET',
                url: 'api/usuarios',
                success: (data: any): void => {
                    for (var i: number = 0; i < data.length; i++) {
                        let users = {
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
            columns: ['Nombre', 'Run', 'NickName', 'Rol','Password']
		}

		buttonOptionsAdd: any = {
			text: "Agregar",
			icon: "plus"
		}
		buttonOptionsEdit: any = {
			text: "Editar",
			icon: "edit",
			disabled: true
		}
		buttonOptionsDelete: any = {
			text: "Borrar",
			icon: "remove",
			disabled: true
		}

    }
}