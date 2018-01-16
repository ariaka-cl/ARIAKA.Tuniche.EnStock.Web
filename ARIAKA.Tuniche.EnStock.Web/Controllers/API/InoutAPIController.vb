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

                Dim ingreso As New Ingresos With {.Fecha = New Date(CDate(model.Fecha).Year, CDate(model.Fecha).Month, CDate(model.Fecha).Day),
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
                                                                .Fechas = salida.Fechas.ToShortDateString,
                                                                .Producto = New Models.ProductosDTO With {.Nombre = produ.Nombre, .ID = produ.ID, .Unidad = produ.Unidad},
                                                                 .Autorizador = New Models.UsuariosDTO With {.ID = salida.Autorizador.ID, .Nombre = salida.Autorizador.Nombre}
                                   })
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

                Dim salida As New Salidas With {.Fechas = New Date(CDate(model.Fechas).Year, CDate(model.Fechas).Month, CDate(model.Fechas).Day),
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
        Public Function Retorno(model As Models.SalidasDTO) As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                If model Is Nothing Then
                    Return Me.Content(HttpStatusCode.NotFound, "No se encontraron valores para agregar")
                End If
                Dim retorn As New Retorno With {.NumeroDocumento = model.NumeroDocumento,
                                                 .Cantidad = model.Cantidad,
                                                 .Fechas = Date.Now.Date,
                                                 .Autorizador = db.Usuarieos.Where(Function(u) u.ID = model.Autorizador.ID).SingleOrDefault(),
                                                  .Producto = db.Productoes.Where(Function(p) p.ID = model.Producto.ID).SingleOrDefault(),
                                                  .Bodega = db.Bodegaeos.Where(Function(b) b.ID = model.Bodega.ID).SingleOrDefault()
                }
                db.Retorneos.Add(retorn)
                db.SaveChanges()
                Dim produ As Productos = db.Productoes.Where(Function(p) p.ID = model.Producto.ID).SingleOrDefault()
                produ.StockActual = produ.StockActual + model.Cantidad
                db.SaveChanges()
                Dim stockProduUpdate As New StockProductos With {.Bodega = db.Bodegaeos.Where(Function(b) b.ID = model.Bodega.ID).SingleOrDefault(),
                                                                     .Producto = db.Productoes.Where(Function(p) p.ID = model.Producto.ID).SingleOrDefault(),
                                                                     .Stock = model.Cantidad
                    }
                db.StockProductos.Add(stockProduUpdate)
                db.SaveChanges()
                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
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
                                                                .Fecha = ingreso.Fecha.ToShortDateString,
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

        <HttpGet>
        <Route("traspasos/{id}", Name:="GetLugares")>
        Public Function GetLugares(id As Integer) As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listStockBodega As List(Of StockProductos) = db.StockProductos.Where(Function(p) p.Producto.ID = id).ToList()
                If listStockBodega IsNot Nothing AndAlso listStockBodega.Count = 0 Then Return Me.Content(HttpStatusCode.BadRequest, "No existe producto disponible")
                Dim traspasoBodegas As New List(Of Models.BodegaTraspasoDTO)

                Dim stockProdu = From stock As StockProductos In listStockBodega
                                 Group stock By k = New With {Key stock.Bodega}
                                                                      Into Group
                                 Select New With {.stock = Group.Sum(Function(b) b.Stock), .ID = k.Bodega.ID, .Nombre = k.Bodega.Nombre}

                For Each item In stockProdu
                    If item.stock > 0 Then
                        Dim bodeDTO As New Models.BodegaDTO With {.ID = item.ID, .Nombre = item.Nombre}
                        traspasoBodegas.Add(New Models.BodegaTraspasoDTO With {.Bodega = bodeDTO, .Stock = item.stock})
                    End If
                Next
                Return Me.Ok(traspasoBodegas)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("traspasos/save", Name:="PostTraspasos")>
        Public Function PostTraspasos(<FromBody> model As List(Of Models.StockProductosDTO)) As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                If model Is Nothing AndAlso model.Count = 0 Then Return Me.Content(HttpStatusCode.BadRequest, "Los campos no deben estar en blanco")

                Dim id As Integer = model.Item(0).Producto.ID
                Dim producto As Productos = db.Productoes.Where(Function(p) p.ID = id).SingleOrDefault()
                Dim cont As Integer = 0
                For Each produDto As Models.StockProductosDTO In model
                    cont = cont + produDto.Stock
                Next
                If producto.StockActual <> cont Then Return Me.Content(HttpStatusCode.BadRequest, String.Format("Cantidades No Coinciden con el Stock Actual de {0}", producto.StockActual))

                For Each produDto As Models.StockProductosDTO In model
                    If produDto.Producto Is Nothing OrElse produDto.Producto.ID = 0 Then Return Me.Content(HttpStatusCode.BadRequest, "Debe seleccionar un Producto")

                    Dim listSotckUpdate As List(Of StockProductos) = db.StockProductos.Where(Function(sp) sp.Producto.ID = produDto.Producto.ID).Where(Function(b) b.Bodega.ID = produDto.Bodega.ID).ToList()
                    For Each listStockProdu As StockProductos In listSotckUpdate
                        listStockProdu.Stock = 0
                    Next
                    db.SaveChanges()
                    Dim stockProduUpdate As New StockProductos With {.Bodega = db.Bodegaeos.Where(Function(b) b.ID = produDto.Bodega.ID).SingleOrDefault(),
                                                                     .Producto = db.Productoes.Where(Function(p) p.ID = produDto.Producto.ID).SingleOrDefault(),
                                                                     .Stock = produDto.Stock
                    }
                    db.StockProductos.Add(stockProduUpdate)
                    db.SaveChanges()
                Next

                Return Me.Content(HttpStatusCode.OK, "Datos Actualizados Correctamente")

            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpGet>
        <Route("retornos", Name:="GetRetornos")>
        Public Function GetRetornos() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listRetornos As List(Of Retorno) = db.Retorneos.ToList()
                If listRetornos Is Nothing OrElse listRetornos.Count = 0 Then Return Me.Ok(New List(Of Models.SalidasDTO))
                Dim listOutDto As New List(Of Models.SalidasDTO)
                Dim listProdu As List(Of Productos) = db.Productoes.ToList()
                For Each retorn As Retorno In listRetornos
                    Dim produ As Productos = listProdu.Where(Function(p) p.ID = retorn.Producto.ID).SingleOrDefault()
                    listOutDto.Add(New Models.SalidasDTO With {.ID = retorn.ID,
                                                                .NumeroDocumento = retorn.NumeroDocumento,
                                                                .Cantidad = retorn.Cantidad,
                                                                .Fechas = retorn.Fechas,
                                                                .Producto = New Models.ProductosDTO With {.Nombre = produ.Nombre, .ID = produ.ID, .Unidad = produ.Unidad},
                                                                .Autorizador = New Models.UsuariosDTO With {.ID = retorn.Autorizador.ID, .Nombre = retorn.Autorizador.Nombre}
                                   })
                Next
                Return Me.Ok(listOutDto)
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