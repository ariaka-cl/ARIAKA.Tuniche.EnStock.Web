@Code
    ViewData("Title") = "Salidas"
End Code


<div class="long-title"><h3>Salidas</h3></div>
<div id="form-container">
    <div id="form-out" data-bind="dxForm: formOptions"></div>
</div>
<br />
<br />
<div class="btn-group" role="group">
    <div data-bind="dxButton: buttonOptionsAdd"></div>
    <div data-bind="dxButton: buttonOptionsDelete"></div>
    <div data-bind="dxButton: buttonOptionsPrint"></div>
</div>
<br />
<br />
<div data-bind="dxPopup: popUpOptions"></div>

<div id="grid-out" data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Inout/salidas.js"></script>
    <script>        
        ko.applyBindings(new Inout.InoutSalidasViewModel())
    </script>
End Section




