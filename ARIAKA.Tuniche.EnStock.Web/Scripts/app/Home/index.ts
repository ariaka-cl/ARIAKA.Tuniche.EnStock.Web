/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Home {
    'use strict';
    export class HomeIndexViewModel {

		public administrador: KnockoutObservable<boolean> = ko.observable(false);
		public bodeguero: KnockoutObservable<boolean> = ko.observable(false);
		public nombreUser: KnockoutObservable<string> = ko.observable("");

		constructor() {  
			this.setRol();
			this.setNameUser();
		}

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

		setNameUser(): void {
			let nombreUsuario: string = localStorage.getItem('nombre');
			this.nombreUser(nombreUsuario);
		}


    }
}