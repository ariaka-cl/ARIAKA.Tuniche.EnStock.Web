@Code
    ViewData("Title") = "Stock"
End Code


<div class="long-title"><h3>Stock Online</h3></div>
<div id="form-container">
    <div data-bind="dxForm: formOptions"></div>
</div>
<br />
<br />

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Inout/stock.js"></script>
    <script>
        ko.applyBindings(new Inout.InoutStockViewModel())
    </script>
End Section
