@Code
    ViewData("Title") = "Salidas"
End Code


<div class="long-title"><h3>Salidas</h3></div>
<div id="form-container">
    <div data-bind="dxForm: formOptions"></div>
</div>
<br />
<br />
<div data-bind="dxDataGrid: dataGridOptions"></div>


@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Inout/salidas.js"></script>
    <script>
        ko.applyBindings(new Inout.InoutSalidasViewModel())
    </script>
End Section




