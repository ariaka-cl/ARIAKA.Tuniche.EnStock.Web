@Code
    ViewData("Title") = "Localidad"
End Code

<div class="long-title"><h3>Ver Stock por Bodegas</h3></div>

<div id="grid-productos" data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Productos/Localidad.js"></script>
    <script>
        ko.applyBindings(new Productos.ProductosLocalidadViewModel());
    </script>
End Section




