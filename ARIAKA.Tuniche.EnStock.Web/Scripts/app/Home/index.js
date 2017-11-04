/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/knockout/knockout.d.ts" />
/// <reference path="../../typings/devextreme/devextreme.d.ts" />
var Home;
(function (Home) {
    'use strict';
    var HomeIndexViewModel = (function () {
        function HomeIndexViewModel() {
            this.Options = {
                text: 'Click me',
                onClick: function () {
                    alert("por fin!!!");
                }
            };
        }
        return HomeIndexViewModel;
    }());
    Home.HomeIndexViewModel = HomeIndexViewModel;
})(Home || (Home = {}));
//# sourceMappingURL=index.js.map