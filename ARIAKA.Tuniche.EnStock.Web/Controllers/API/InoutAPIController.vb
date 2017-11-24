Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

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
        <Route("stock/{id}", Name:="GetStock")>
        Public Function GetStock(id As String) As IHttpActionResult
            Dim db As New bdTunicheContext
            Try

                If String.IsNullOrEmpty(id) Then
                    Return Me.Content(HttpStatusCode.NotFound, "Codigo vacío")
                End If
                Dim produ As Productos = db.Productoes.Where(Function(p) p.Codigo = id).SingleOrDefault()
                If produ Is Nothing Then Return Me.Content(HttpStatusCode.NotFound, "Elemento no encontrado")
                Dim produDto As New Models.ProductosDTO With {.ID = produ.ID,
                                                                    .BodegaMercedes = produ.BodegaMercedes,
                                                                    .StockActualMercedes = produ.StockActualMercedes,
                                                                    .BodegaPalmas = produ.BodegaPalmas,
                                                                    .StockActualPalmas = produ.StockActualPalmas,
                                                                    .Codigo = produ.Codigo,
                                                                    .Comentario = produ.Comentario,
                                                                    .Entrada = produ.Entrada,
                                                                    .Nombre = produ.Nombre,
                                                                    .Salida = produ.Salida,
                                                                    .Stock = produ.Stock,
                                                                    .Tipo = produ.Tipo,
                                                                    .Unidad = .Unidad,
                                                                    .Categorias = New Models.CategoriaDTO With {.ID = produ.Categorias.ID,
                                                                                                                .Nombre = produ.Categorias.Nombre}
                }
                Return Me.Ok(produDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function


        <HttpPost>
        <Route("retorno", Name:="Retorno")>
        Public Function Retorno() As IHttpActionResult
            Return Me.Ok("todo ok")
        End Function
    End Class
End Namespace