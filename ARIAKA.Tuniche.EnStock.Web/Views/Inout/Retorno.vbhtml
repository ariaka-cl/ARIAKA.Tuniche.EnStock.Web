@Code
    ViewData("Title") = "Retorno Herramientas"
End Code


<div class="long-title"><h3>Retorno Herramientas</h3></div>
<div id="form-container">
    <div data-bind="dxForm: formOptions"></div>
</div>
<br />
<br />

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Inout/retorno.js"></script>
    <script>
        ko.applyBindings(new Inout.InoutRetornoViewModel())
    </script>
End Section
