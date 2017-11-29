/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Inout {
	'use strict';
	export class InoutStockViewModel {
        
        public productos: KnockoutObservable<App.IConsultaStock> = ko.observable(null);
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
        public selectedTab: KnockoutObservable<number> = ko.observable(-1);

        producto: App.IConsultaStock = {
            ID: null,
            Nombre: null,
            StockMinimo: null,           
            Codigo: null,
            Unidad:null,
            Categoria: null
        }
	
        getProductos(id: string): void {
            this.productos();
            let url = window.location.origin + '/api/inout/stock/' + id;            
            $.ajax({
                type: 'GET',
                url: url,
                success: (data: any): void => {
                        let produ = {
                            ID: data.id,
                            Nombre: data.nombre,
                            StockMinimo: data.stockMinimo,
                            Codigo: data.codigo,
                            Unidad: data.unidad,
                            Categoria: null
                            
                        }
                        this.productos(produ);                   
                },
                error: (data: any): void => {
                    DevExpress.ui.notify("No se encontro producto", "warning", 2000);
                }
            });
        } 
		
		formOptions: any = {
			formData: this.productos(this.producto),
			labelLocation: "top",
			items: [{
				itemType: "group",
				colCount: 3,
                items: ["Codigo",{					
					editorType: "dxButton",
					editorOptions: {
						text: "Buscar",
						type: "success",
						icon: "search",
                        onClick: () => {
                            let form: any = $('#form-stock').dxForm('instance');
                            this.getProductos(form.option("formData").Codigo);
                            form.option().formData = this.productos;
                            form.repaint();
						}
					}
				}]
			}, {
				itemType: "group",
				colCount: 2,
                items: ['Nombre']
			}, {
				itemType: "group",
				colCount: 3,
                items: ["StockMinimo", "Unidad", "Categoria"]
			}]
		};		
	}
}