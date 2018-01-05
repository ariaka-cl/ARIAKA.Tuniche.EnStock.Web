<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title -  EnStock</title>
    @Styles.Render("~/Content/custom/css")
    @Scripts.Render("~/bundles/modernizr")
</head>
        <body data-spy="scroll" data-target=".onpage-navigation" data-offset="60">
            <main>
                <img id="image-background" src="~/Content/img/tuniche-bg.jpg">
                <section class="main">
                    <div class="content">
                        <div class="container">
                            <div class="content2">
                                <h1>Bienvenido</h1>
                            </div>
                            <div class="subscribe">
                                <div class="row">
                                    <div class="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4 input-group subscribe-box">
                                        <form class="subscribe-form" id="subscription-form">
                                            @RenderBody()
                                        </form>
                                        <div id="subscription-response"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
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


