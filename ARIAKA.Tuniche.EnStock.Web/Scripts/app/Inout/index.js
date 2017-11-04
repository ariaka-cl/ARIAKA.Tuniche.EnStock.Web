/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
var Inout;
(function (Inout) {
    'use strict';
    var InoutIndexViewModel = (function () {
        function InoutIndexViewModel() {
            this.employees = {
                "FECHA": new Date(2017, 2, 16),
                "Tipo_Documento": "Guia",
                "Num_Doc": "188998",
                "BODEGA": "LAS PALMAS",
                "PROVEEDOR": "SEÑORES AGRO ARICA SA",
                "CANTIDAD": "1",
                "EMBASE": "",
                "PRECIOUNIT": "$2.000",
                "DESC": "",
                "PRECIO_UNI": "1.000",
                "PRECIO_TOT": "6000"
            };
            this.formOptions = {
                formData: this.employees,
                //colCount: 3,
                items: [{
                        itemType: "group",
                        colCount: 4,
                        items: ["FECHA", "Tipo_Documento", "Num_Doc", "BODEGA"]
                    }, {
                        dataField: "PROVEEDOR",
                        editorOptions: {
                            disabled: true
                        }
                    }, {}, {
                        itemType: "group",
                        colCount: 4,
                        items: ["CANTIDAD", "EMBASE", "PRECIOUNIT", "DESC"]
                    }]
            };
            this.dataGridOptions = {
                dataSource: this.employees,
                columns: ['FECHA', 'NUMERO', 'CODIGO', 'DESCRIP', 'GUIA', 'BODEGA', 'CANTIDAD', 'PROVEEDOR', 'PRECIO_UNI', 'PRECIO_TO']
            };
        }
        return InoutIndexViewModel;
    }());
    Inout.InoutIndexViewModel = InoutIndexViewModel;
})(Inout || (Inout = {}));
//# sourceMappingURL=index.js.map