Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

Namespace Controllers.API
    <RoutePrefix("api/inout")>
    Public Class InoutApiController
        Inherits ApiController

        <HttpPost>
        <Route("", Name:="PostIngresos")>
        Public Function PostIngresos(model As Models.IngresosDTO) As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                If model Is Nothing OrElse model.ProuctoID = 0 Then
                    Return Me.Content(HttpStatusCode.NotFound, "No se encontraron valores para agregar")
                End If

                Dim ingreso As New Ingresos With {.Fecha = Date.Now.Date,
                                                  .TipoDocumento = model.TipoDocumento,
                                                  .NumeroDocumento = model.NumeroDocumento,
                                                  .PrecioUnitario = model.PrecioUnitario,
                                                  .Cantidad = model.Stock,
                                                  .Proveedor = db.Proveedoreos.Where(Function(p) p.ID = model.Proveedor.ID).SingleOrDefault(),
                                                  .Producto = db.Productoes.Where(Function(p) p.ID = model.ProuctoID).SingleOrDefault()
                }
                db.Ingresos.Add(ingreso)
                db.SaveChanges()
                model.ID = ingreso.ID

                For Each detailDTO As Models.StockProductosDTO In model.DetalleStock
                    Dim detail As New StockProductos With {.Bodega = db.Bodegaeos.Where(Function(b) b.ID = detailDTO.Bodega.ID).SingleOrDefault(),
                                                           .Stock = detailDTO.Stock,
                                                           .Ingresos = ingreso
                    }
                    db.StockProductos.Add(detail)
                    db.SaveChanges()
                    detailDTO.ID = detail.ID
                Next
                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
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
                'Dim bodegas As New List(Of Models.StockProductosDTO)
                'For Each bodega As Bodega In produ.Bodegas
                '    bodegas.Add(New Models.BodegaDTO With {.ID = bodega.ID,
                '                                           .Nombre = bodega.Nombre,
                '                                           .Stock = bodega.Stock})
                'Next
                'TODO: agregar Productos
                If produ Is Nothing Then Return Me.Content(HttpStatusCode.NotFound, "Elemento no encontrado")
                Dim produDto As New Models.ProductosDTO With {.ID = produ.ID,
                                                                    .Codigo = produ.Codigo,
                                                                    .Nombre = produ.Nombre,
                                                                    .Tipo = If(produ.Tipo, ""),
                                                                    .Unidad = If(produ.Unidad, ""),
                                                                    .StockMinimo = produ.StockMinimo}
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

        <HttpGet>
        <Route("", Name:="GetIngresos")>
        Public Function GetIngresos() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listIngresos As List(Of Ingresos) = db.Ingresos.ToList()
                If listIngresos Is Nothing OrElse listIngresos.Count = 0 Then Return Me.Ok(New List(Of Models.IngresosDTO))
                Dim listRol As List(Of Rol) = db.Roleos.ToList()
                Dim listInDto As New List(Of Models.IngresosDTO)
                Dim listProdu As List(Of Productos) = db.Productoes.ToList()
                For Each ingreso As Ingresos In listIngresos
                    Dim produ As Productos = listProdu.Where(Function(p) p.ID = ingreso.Producto.ID).SingleOrDefault()
                    listInDto.Add(New Models.IngresosDTO With {.ID = ingreso.ID,
                                                                .PrecioUnitario = ingreso.PrecioUnitario,
                                                                .TipoDocumento = ingreso.TipoDocumento,
                                                                .NumeroDocumento = ingreso.NumeroDocumento,
                                                                .Stock = ingreso.Cantidad,
                                                                .Fecha = ingreso.Fecha,
                                                                .Producto = New Models.ProductosDTO With {.Nombre = produ.Nombre, .ID = produ.ID}
                                                                })
                Next
                Return Me.Ok(listInDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function


    End Class
End Namespace