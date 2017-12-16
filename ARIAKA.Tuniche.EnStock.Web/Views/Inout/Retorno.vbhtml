@Code
    ViewData("Title") = "Retorno Herramientas"
End Code


<div class="long-title"><h3>Retorno Herramientas</h3></div>
<div id="form-container">
    <div id="form-return" data-bind="dxForm: formOptions"></div>
</div>
<br />
<br />
<div class="btn-group" role="group">
    <div data-bind="dxButton: buttonOptionsAdd"></div>
    <div data-bind="dxButton: buttonOptionsClean"></div>
    <div data-bind="dxButton: buttonOptionsDelete"></div>
</div>
<br />
<br />
<div id="grid-return" data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Inout/retorno.js"></script>
    <script>
        ko.applyBindings(new Inout.InoutRetornoViewModel())
    </script>
End Section
