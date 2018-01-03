/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Login {
	'use strict';
	export class LoginIndexViewModel {

		public usuario: KnockoutObservableArray<any> = ko.observableArray<any>();

		PostLogin(): void {
			let formData: any = $("#form-login").dxForm('option').formData;
			let usr: App.Usuario = {ID:0,NickName:"" ,Nombre:"", Password:formData.Password,Rol: null,Run:formData.Run}
			$.ajax({
				type: 'POST',
				url: 'api/login',
				data: usr,
				success: (data: any): void => {
					window.localStorage.setItem('username', data.nickname);
					window.localStorage.setItem('rol', data.rol.nombre);
					window.localStorage.setItem('run', data.run);
					window.localStorage.setItem('nombre', data.nombre);
					window.location.replace(window.location.origin+'/Home');
				},
				error: (data: any): void => {
					DevExpress.ui.notify(data.responseJSON, "error", 3000);
				}
			})
		}


		formInstance;

		formOptions: any = {
			formData: this.usuario,
			labelLocation: "top",
			onInitialized: (e) => {
				this.formInstance = e.component;
			},
			items: [{
				itemType: "group",				
				items: [{
					dataField: "Run",
					editorOptions: {						
						placeholder: "Run"
					}
				}, {
					dataField: "Password",
					editorOptions: {
						mode: "password",
						placeholder:"Contraseña"
					}
				}]
			}]
		};

		buttonOptionsLogin: any = {
			text: "Enviar",
			icon: "key",			
			onClick: () => {
				this.PostLogin();
			}
		}

	}
}