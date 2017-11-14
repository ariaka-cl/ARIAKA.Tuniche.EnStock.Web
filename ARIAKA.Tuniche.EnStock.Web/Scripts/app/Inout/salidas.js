/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
var Inout;
(function (Inout) {
    'use strict';
    var InoutSalidasViewModel = (function () {
        function InoutSalidasViewModel() {
            this.employees = {
                "FECHA": new Date(2017, 2, 16),
                "Tipo_Documento": "Guia",
                "Num_Doc": "188998",
                "BODEGA": "LAS PALMAS",
                "CANTIDAD": "1",
                "EMBASE": "",
                "PRECIOUNIT": "$2.000",
                "DESC": "",
                "PRECIO_UNI": "1.000",
                "PRECIO_TOT": "6000"
            };
            this.idAuth = [{ "name": "Jorge Escudero" }, { "name": "IVAN CAlle" }];
            this.campAsig = [{ "name": "Dato Ejemplo 1" }, { "name": "Dato ejemplo 2" }];
            this.articulos = [{ "name": "Azadilla" }, { "name": "Alicate Universal" }];
            this.formOptions = {
                formData: this.employees,
                labelLocation: "top",
                items: [{
                        itemType: "group",
                        colCount: 3,
                        items: ["FECHA", {
                                dataField: "Tipo_Documento",
                                editorType: "dxSelectBox",
                                editorOptions: {
                                    items: ["Guia", "Factura"],
                                    value: ""
                                }
                            }, "Num_Doc"]
                    }, {
                        itemType: "group",
                        colCount: 3,
                        items: [{
                                dataField: "CANTIDAD",
                                editorType: "dxTextBox",
                                editorOptions: {
                                    width: 200
                                }
                            }, {
                                dataField: "ARTICULOS",
                                editorType: "dxLookup",
                                editorOptions: {
                                    displayExpr: 'name',
                                    dataSource: new DevExpress.data.DataSource({
                                        store: this.articulos
                                    })
                                }
                            }, "BODEGA"]
                    }, {
                        itemType: "group",
                        colCount: 2,
                        items: [{
                                dataField: "ID_Autorizado",
                                editorType: "dxLookup",
                                editorOptions: {
                                    displayExpr: 'name',
                                    dataSource: new DevExpress.data.DataSource({
                                        store: this.idAuth
                                    })
                                }
                            }, {
                                dataField: "Campo_Asignado",
                                editorType: "dxLookup",
                                editorOptions: {
                                    displayExpr: 'name',
                                    dataSource: new DevExpress.data.DataSource({
                                        store: this.campAsig
                                    })
                                }
                            }]
                    }, {
                        itemType: "group",
                        colCount: 3,
                        items: [{
                                editorType: "dxButton",
                                editorOptions: {
                                    text: "Agregar",
                                    type: "success",
                                    onClick: function () {
                                        DevExpress.ui.notify("Salida Registrada", "success", 2000);
                                    }
                                }
                            }, {
                                editorType: "dxButton",
                                editorOptions: {
                                    text: "Limpiar",
                                    type: "default",
                                    onClick: function () {
                                        DevExpress.ui.notify("Salida Registrada", "success", 2000);
                                    }
                                }
                            }]
                    }]
            };
            this.dataGridOptions = {
                dataSource: this.employees,
                columns: ['FECHA', 'NUMERO', 'CODIGO', 'DESCRIP', 'GUIA', 'BODEGA', 'CANTIDAD', 'PROVEEDOR', 'PRECIO_UNI', 'PRECIO_TO']
            };
        }
        return InoutSalidasViewModel;
    }());
    Inout.InoutSalidasViewModel = InoutSalidasViewModel;
})(Inout || (Inout = {}));
//# sourceMappingURL=salidas.js.map