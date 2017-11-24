/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
/// <reference path="../App.ts" />

namespace Inout {
	'use strict';
	export class InoutStockViewModel {
        
        public productos: KnockoutObservable<App.IProductos> = ko.observable<App.IProductos>();
        public enable: KnockoutObservable<boolean> = ko.observable(true);
        public idRow: KnockoutObservable<number> = ko.observable(0);
        public idRowIndex: KnockoutObservable<number> = ko.observable(-1);
        public selectedTab: KnockoutObservable<number> = ko.observable(-1);
        
	
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
                            BodegaPalmas: data.bodegaPalmas,
                            BodegaMercedes: data.bodegaMercedes,
                            Categorias: data.categorias.nombre,
                            StockActualPalmas: data.stockActualPalmas,
                            StockActualMercedes: data.stockActualMercedes,
                            Codigo: data.codigo,
                            Stock: null,
                            PrecioUnitario: null,
                            TipoDocumento: null,
                            NumeroDocumento: null,
                            Comentario: null
                        }
                        this.productos(produ);                   
                },
                error: (data: any): void => {
                    DevExpress.ui.notify("No se encontro producto", "warning", 2000);
                }
            });
        } 
		
		formOptions: any = {
			formData: this.productos,
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
                            this.getProductos(form.option("formData"));
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
				items: ["StockActualPalmas","BodegaPalmas"]
			}, {
				itemType: "group",
				colCount: 3,
                items: ["StockActualMercedes", "BodegaMercedes"]
			}]
		};		
	}
}