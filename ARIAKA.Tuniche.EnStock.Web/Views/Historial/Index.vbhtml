@Code
    ViewData("Title") = "Index"
End Code

<div class="long-title"><h3>Historial</h3></div>

<br />

<div id="grid-historial" data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Historial/index.js"></script>
    <script>
        ko.applyBindings(new Historial.HistorialIndexViewModel())
    </script>
End Section
