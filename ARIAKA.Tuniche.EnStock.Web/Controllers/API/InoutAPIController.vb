﻿Imports System.Net
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
                Dim produ As Productos = db.Productoes.Where(Function(p) p.ID = model.ProuctoID).SingleOrDefault()
                produ.StockActual = produ.StockActual + ingreso.Cantidad
                db.SaveChanges()
                model.ID = ingreso.ID

                For Each detailDTO As Models.StockProductosDTO In model.DetalleStock
                    Dim detail As New StockProductos With {.Bodega = db.Bodegaeos.Where(Function(b) b.ID = detailDTO.Bodega.ID).SingleOrDefault(),
                                                           .Stock = detailDTO.Stock,
                                                           .Ingresos = ingreso,
                                                           .Producto = db.Productoes.Where(Function(p) p.ID = model.ProuctoID).SingleOrDefault()
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
            Dim db As New bdTunicheContext
            Try
                Dim listSalidas As List(Of Salidas) = db.Salidaeos.ToList()
                If listSalidas Is Nothing OrElse listSalidas.Count = 0 Then Return Me.Ok(New List(Of Models.SalidasDTO))
                Dim listOutDto As New List(Of Models.SalidasDTO)
                Dim listProdu As List(Of Productos) = db.Productoes.ToList()
                For Each salida As Salidas In listSalidas
                    Dim produ As Productos = listProdu.Where(Function(p) p.ID = salida.Producto.ID).SingleOrDefault()
                    listOutDto.Add(New Models.SalidasDTO With {.ID = salida.ID,
                                                                .TipoDocumento = salida.TipoDocumentoa,
                                                                .NumeroDocumento = salida.NumeroDocumento,
                                                                .Cantidad = salida.Cantidad,
                                                                .Fechas = salida.Fechas,
                                                                .Producto = New Models.ProductosDTO With {.Nombre = produ.Nombre, .ID = produ.ID, .Unidad = produ.Unidad}
                                                                }) '.Autorizador = New Models.UsuariosDTO With {.ID = salida.Autorizador.ID, .Nombre = salida.Autorizador.Nombre},
                Next
                Return Me.Ok(listOutDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("salidas", Name:="PostSalidas")>
        Public Function PostSalidas(model As Models.SalidasDTO) As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                If model Is Nothing OrElse model.Producto.ID = 0 OrElse model.Cantidad = 0 Then
                    Return Me.Content(HttpStatusCode.NotFound, "No se encontraron valores para agregar")
                End If

                If Not ValidaSalida(model) Then
                    Return Me.Content(HttpStatusCode.BadRequest, "Esta eliminando mas de lo que existe en bodega")
                End If

                Dim salida As New Salidas With {.Fechas = Date.Now.Date,
                                                  .TipoDocumentoa = model.TipoDocumento,
                                                  .NumeroDocumento = model.NumeroDocumento,
                                                  .Cantidad = model.Cantidad,
                                                  .Autorizador = db.Usuarieos.Where(Function(u) u.ID = model.Autorizador.ID).SingleOrDefault(),
                                                  .Producto = db.Productoes.Where(Function(p) p.ID = model.Producto.ID).SingleOrDefault(),
                                                  .Bodega = db.Bodegaeos.Where(Function(b) b.ID = model.Bodega.ID).SingleOrDefault()
                }

                If Not UpdateProductos(salida) Then Return Me.Content(HttpStatusCode.BadRequest, "No se puede descontar producto")

                db.Salidaeos.Add(salida)
                Dim produ As Productos = db.Productoes.Where(Function(p) p.ID = model.Producto.ID).SingleOrDefault()
                produ.StockActual = produ.StockActual - model.Cantidad
                db.SaveChanges()
                model.ID = salida.ID

                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
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
                                                                .Producto = New Models.ProductosDTO With {.Nombre = produ.Nombre, .ID = produ.ID, .Unidad = produ.Unidad}
                                                                })
                Next
                Return Me.Ok(listInDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        Public Function UpdateProductos(salida As Salidas) As Boolean
            Dim db As New bdTunicheContext
            Dim contador As Integer = salida.Cantidad
            Try
                Dim listStock As List(Of StockProductos) = db.StockProductos.Where(Function(p) p.Producto.ID = salida.Producto.ID).Where(Function(p) p.Bodega.ID = salida.Bodega.ID).ToList
                If listStock.Count > 0 Then

                    For Each stock As StockProductos In listStock
                        If stock.Stock > salida.Cantidad Then
                            stock.Stock = stock.Stock - salida.Cantidad
                            db.SaveChanges()
                            Exit For
                        Else
                            contador = contador - stock.Stock
                            stock.Stock = 0
                            db.SaveChanges()
                            If contador = 0 Then
                                Exit For
                            End If
                        End If
                    Next

                    Return True
                End If
                Return False
            Catch ex As Exception
                Return False
            Finally
                db.Dispose()
            End Try
        End Function

        Public Function ValidaSalida(salida As Models.SalidasDTO) As Boolean
            Dim db As New bdTunicheContext
            Try
                Dim listStockBodega As List(Of StockProductos) = db.StockProductos.Where(Function(sp) sp.Producto.ID = salida.Producto.ID).Where(Function(sp) sp.Bodega.ID = salida.Bodega.ID).ToList()
                If listStockBodega IsNot Nothing AndAlso listStockBodega.Count = 0 Then Return False
                Dim cantidad As Integer

                For Each stock As StockProductos In listStockBodega
                    cantidad = cantidad + stock.Stock
                Next

                If salida.Cantidad > cantidad Then Return False

                Return True
            Catch ex As Exception
                Return False
            Finally
                db.Dispose()
            End Try
        End Function

    End Class
End Namespace