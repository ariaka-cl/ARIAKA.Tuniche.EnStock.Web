Imports System.Net
Imports System.Web.Http

Namespace Controllers.API
    <RoutePrefix("api/productos")>
    Public Class ProductosAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetProductos")>
        Public Function GetProductos() As IHttpActionResult
            Return Me.Ok(New Models.ProductosDTO With {.Nombre = "Azadon", .Bodega = "Las Palmas", .Categorias = New Models.CategoriaDTO With {.Nombre = "Herramientas"}})
        End Function
    End Class
End Namespace