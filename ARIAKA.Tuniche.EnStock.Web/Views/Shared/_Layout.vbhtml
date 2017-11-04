<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title -  EnStock</title>
    @Styles.Render("~/Content/css")
    @Scripts.Render("~/bundles/modernizr")
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-3 col-lg-4 col-md-3">
                <div class="nav-side-menu">
                    <div class="brand">TUNICHE</div>
                    <i class="glyphicon glyphicon-menu-hamburger toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                    <div class="menu-list">

                        <ul id="menu-content" class="menu-content collapse out">
                            <li data-toggle="collapse" data-target="#service" class="collapsed active">
                                <i class="glyphicon glyphicon-dashboard fa-lg"></i>
                                @Html.ActionLink("Ver Ingresos", "Index", "Inout")
                            </li>
                            <li data-toggle="collapse" data-target="#products">
                                <a href="#"><i class="glyphicon glyphicon-gift fa-lg"></i> UI Elements <span class="arrow"></span></a>
                            </li>
                            <ul class="sub-menu collapse" id="products">
                                <li class="active"><a href="#">CSS3 Animation</a></li>
                                <li><a href="#">General</a></li>
                                <li><a href="#">Buttons</a></li>
                                <li><a href="#">Tabs & Accordions</a></li>
                                <li><a href="#">Typography</a></li>
                                <li><a href="#">FontAwesome</a></li>
                                <li><a href="#">Slider</a></li>
                                <li><a href="#">Panels</a></li>
                                <li><a href="#">Widgets</a></li>
                                <li><a href="#">Bootstrap Model</a></li>
                            </ul>

                            <li data-toggle="collapse" data-target="#service" class="collapsed">
                                <a href="#"><i class="glyphicon glyphicon-globe fa-lg"></i> Services <span class="arrow"></span></a>
                            </li>
                            <ul class="sub-menu collapse" id="service">
                                <li>New Service 1</li>
                                <li>New Service 2</li>
                                <li>New Service 3</li>
                            </ul>

                            <li data-toggle="collapse" data-target="#new" class="collapsed">
                                <a href="#"><i class="glyphicon glyphicon-new-window fa-lg"></i> New <span class="arrow"></span></a>
                            </li>
                            <ul class="sub-menu collapse" id="new">
                                <li>New New 1</li>
                                <li>New New 2</li>
                                <li>New New 3</li>
                            </ul>

                            <li>
                                <a href="#">
                                    <i class="glyphicon glyphicon-user fa-lg"></i> Profile
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="glyphicon glyphicon-baby-formula fa-lg"></i> Users
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-9 col-lg-8 col-md-9">
                @RenderBody()
                <hr />  
                <footer>
                    <p>&copy; @DateTime.Now.Year - My ASP.NET Application</p>
                </footer>
            </div>            
        </div>
    </div>
    @Scripts.Render("~/bundles/jquery")
    @Scripts.Render("~/bundles/knockout")
    @Scripts.Render("~/bundles/devextreme")
    @Scripts.Render("~/bundles/bootstrap")
    <script>
       var apiRoot = '@Url.Content("~/")api/';
    </script>
    @RenderSection("scripts", required:=False)
</body>
</html>
