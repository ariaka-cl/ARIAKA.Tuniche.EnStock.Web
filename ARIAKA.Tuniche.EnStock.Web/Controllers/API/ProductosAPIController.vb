Imports System.Net
Imports System.Web.Http

Namespace Controllers.API
    <RoutePrefix("api/productos")>
    Public Class ProductosAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetProductos")>
        Public Function GetProductos() As IHttpActionResult
            Return Me.Ok("todo ok")
        End Function
    End Class
End Namespace