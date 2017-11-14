Imports System.Net
Imports System.Web.Http

Namespace Controllers.API
    <RoutePrefix("api/categorias")>
    Public Class CategoriasAPIController
        Inherits ApiController
        <HttpGet>
        <Route("", Name:="GetCategorias")>
        Public Function GetCategorias() As IHttpActionResult
            Return Me.Ok("todo ok")
        End Function
    End Class
End Namespace