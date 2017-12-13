@Code
    ViewData("Title") = "Stock"
End Code


<div class="long-title"><h3>Stock Online</h3></div>
<div class="row">
    <div id="form-container">
        <div id="form-stock" data-bind="dxForm: formOptions"></div>
    </div>
</div>
<br />
<br />
<div class="long-title"><h3>Detallles Producto</h3></div>
<div id="grid-detalle" data-bind="dxDataGrid: dataGridProduOptions"></div>
<div class="long-title"><h3>Detallles Ubicación</h3></div>
<div id="grid-locacion" data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Inout/stock.js"></script>
    <script>
        ko.applyBindings(new Inout.InoutStockViewModel())
    </script>
End Section
