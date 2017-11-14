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

        <HttpGet>
        <Route("salidas", Name:="GetSalidas")>
        Public Function GetSalidas() As IHttpActionResult
            Return Me.Ok("todo ok")
        End Function

        <HttpGet>
        <Route("stock", Name:="GetStock")>
        Public Function GetStock() As IHttpActionResult
            Return Me.Ok("todo ok")
        End Function

        <HttpPost>
        <Route("retorno", Name:="Retorno")>
        Public Function Retorno() As IHttpActionResult
            Return Me.Ok("todo ok")
        End Function
    End Class
End Namespace