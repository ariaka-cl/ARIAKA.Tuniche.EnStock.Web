@Code
    ViewData("Title") = "Traslados"
End Code

<div class="long-title"><h3>Traspasos</h3></div>
<div class="row">
    <div id="form-container">
        <div id="form-traspasos" data-bind="dxForm: formOptions"></div>
    </div>
    <br />
    <div class="btn-group" role="group">
        <div data-bind="dxButton: buttonOptionsAdd"></div>      
    </div>
</div>
<br />
<br />

<div id="grid-traspaso" data-bind="dxDataGrid: dataGridOptions"></div>

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Inout/traspasos.js"></script>
    <script>
        ko.applyBindings(new Inout.InoutTraspasosViewModel())
    </script>
End Section


