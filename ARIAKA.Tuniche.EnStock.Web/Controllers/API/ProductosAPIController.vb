Imports System.Net
Imports System.Web.Http

Namespace Controllers.API
    <RoutePrefix("api/productos")>
    Public Class ProductosAPIController
        Inherits ApiController

        <HttpGet>
        <Route("{id}", Name:="GetProductos")>
        Public Function GetProductos(id As Integer) As IHttpActionResult
            Dim listProduDto As New List(Of Models.ProductosDTO)
            If id < 0 Then
                Return Me.Ok(listProduDto)
            End If
            listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Azadon", .BodegaPalmas = "Las Palmas", .StockActualPalmas = 2, .Categorias = New Models.CategoriaDTO With {.ID = 3, .Nombre = "Herramientas"}}))
            listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Martillo", .BodegaPalmas = "Las Palmas", .StockActualPalmas = 3, .Categorias = New Models.CategoriaDTO With {.ID = 3, .Nombre = "Herramientas"}}))
            listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Cuaderno", .BodegaPalmas = "Las Palmas", .StockActualPalmas = 3, .Categorias = New Models.CategoriaDTO With {.ID = 4, .Nombre = "Oficina"}}))
            listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Hojas Oficio", .BodegaPalmas = "Las Palmas", .StockActualPalmas = 3, .Categorias = New Models.CategoriaDTO With {.ID = 4, .Nombre = "Oficina"}}))
            listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Cuaderno", .BodegaMercedes = "Las Mercedes", .StockActualMercedes = 2, .Categorias = New Models.CategoriaDTO With {.ID = 4, .Nombre = "Oficina"}}))


            Return Me.Ok(listProduDto.Where(Function(p) p.Categorias.ID = id).ToList())
        End Function
    End Class
End Namespace