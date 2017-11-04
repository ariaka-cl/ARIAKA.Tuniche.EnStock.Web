Imports System.Net
Imports System.Web.Http

Namespace Controllers.API
    <RoutePrefix("api/inout")>
    Public Class InoutApiController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetIngresos")>
        Public Function GetIngresos() As IHttpActionResult
            Return Me.Ok("todo ok")
        End Function
    End Class
End Namespace