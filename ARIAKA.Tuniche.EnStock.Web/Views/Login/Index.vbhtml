@Code
    ViewData("Title") = "Index"
End Code

<div id="form-container">
    <div id="form-login" data-bind="dxForm: formOptions"></div>
</div>
<br />
<br />
<div class="btn-group" role="group">
    <div data-bind="dxButton: buttonOptionsLogin"></div>   
</div>
<br />
<br />

@Section scripts
    <script type="text/javascript" src="~/Scripts/app/Login/Index.js"></script>
    <script>
        ko.applyBindings(new Login.LoginIndexViewModel());
    </script>
End Section
