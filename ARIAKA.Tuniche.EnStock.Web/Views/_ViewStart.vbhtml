@Code

    Dim controller As String = HttpContext.Current.Request.RequestContext.RouteData.Values("Controller").ToString
    Dim clayout As String = ""
    If controller = "login" Then
        clayout = "~/Views/Shared/_LoginPartial.vbhtml"

    Else
        clayout = "~/Views/Shared/_Layout.vbhtml"
    End If
    Layout = clayout
End Code