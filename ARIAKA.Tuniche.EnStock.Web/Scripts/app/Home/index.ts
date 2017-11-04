/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />

namespace Home {
    'use strict';
    export class HomeIndexViewModel {
        Options: DevExpress.ui.dxButtonOptions = {
            text: 'Click me',
            onClick: function () {
                alert("por fin!!!");
            }
        }
    }
}