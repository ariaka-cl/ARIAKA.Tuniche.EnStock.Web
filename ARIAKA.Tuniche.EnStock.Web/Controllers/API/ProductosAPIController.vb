﻿Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

Namespace Controllers.API
    <RoutePrefix("api/productos")>
    Public Class ProductosAPIController
        Inherits ApiController

        <HttpGet>
        <Route("{id}", Name:="GetProductos")>
        Public Function GetProductos(id As Integer) As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listProduDto As New List(Of Models.ProductosDTO)
                If id < 0 Then
                    Return Me.Ok(listProduDto)
                End If
                Dim cate As Categorias = db.Categoriaeos.Where(Function(c) c.ID = id).SingleOrDefault
                Dim listProdu As List(Of Productos) = db.Productoes.Where(Function(p) p.Categorias.ID = id).ToList()
                For Each produ As Productos In listProdu
                    listProduDto.Add(New Models.ProductosDTO With {.ID = produ.ID,
                                                                    .Codigo = produ.Codigo,
                                                                    .Nombre = produ.Nombre,
                                                                    .StockMinimo = produ.StockMinimo,
                                                                    .StockActual = produ.StockActual,
                                                                    .Unidad = produ.Unidad,
                                                                    .Tipo = produ.Tipo,
                                                                    .Categorias = New Models.CategoriaDTO With {.ID = cate.ID,
                                                                                                                .Nombre = cate.Nombre}
                                                                    })

                Next
                Return Me.Ok(listProduDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="PostProductos")>
        Public Function PostProductos(<FromBody> model As Models.ProductosDTO) As IHttpActionResult
            If model Is Nothing Then
                Return Me.Content(HttpStatusCode.BadRequest, "Sin Datos en el formulario")
            End If

            Dim db As New bdTunicheContext
            Try
                If model.ID <> 0 Then
                    Dim produExist As Productos = db.Productoes.Where(Function(p) p.ID = model.ID).SingleOrDefault()
                    With produExist
                        .Nombre = model.Nombre
                        .Codigo = model.Codigo
                        .Unidad = model.Unidad
                        .Categorias = db.Categoriaeos.Where(Function(c) c.ID = model.Categorias.ID).Single
                        .StockMinimo = model.StockMinimo
                        .Tipo = model.Tipo
                        .StockActual = model.StockActual
                    End With
                    db.SaveChanges()
                    Return Me.Ok(model)

                End If

                Dim producto As New Productos With {.Nombre = model.Nombre,
                                                    .Codigo = model.Codigo,
                                                    .Unidad = model.Unidad,
                                                    .StockMinimo = model.StockMinimo,
                                                    .StockActual = model.StockActual,
                                                    .Tipo = model.Tipo,
                                                    .Categorias = db.Categoriaeos.Where(Function(c) c.ID = model.Categorias.ID).SingleOrDefault
                }
                db.Productoes.Add(producto)
                db.SaveChanges()
                model.ID = producto.ID
                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpGet>
        <Route("bodegas", Name:="GetBodegas")>
        Public Function GetBodegas() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listBodegas As List(Of Bodega) = db.Bodegaeos.ToList()
                Dim listBodegaDTO As New List(Of Models.BodegaDTO)
                If listBodegas IsNot Nothing OrElse listBodegas.Count > 0 Then

                    For Each bodega As Bodega In listBodegas
                        listBodegaDTO.Add(New Models.BodegaDTO With {.ID = bodega.ID, .Nombre = bodega.Nombre})
                    Next

                End If
                Return Me.Ok(listBodegaDTO)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpGet>
        <Route("", Name:="GetProducto")>
        Public Function GetProducto() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listProduDto As New List(Of Models.ProductosDTO)

                Dim cate As List(Of Categorias) = db.Categoriaeos.ToList()
                Dim listProdu As List(Of Productos) = db.Productoes.ToList()
                For Each produ As Productos In listProdu
                    Dim cateM As Categorias = cate.Where(Function(c) c.ID = produ.Categorias.ID).SingleOrDefault
                    listProduDto.Add(New Models.ProductosDTO With {.ID = produ.ID,
                                                                    .Codigo = produ.Codigo,
                                                                    .Nombre = produ.Nombre,
                                                                    .StockMinimo = produ.StockMinimo,
                                                                    .Unidad = produ.Unidad,
                                                                    .StockActual = produ.StockActual,
                                                                    .Categorias = New Models.CategoriaDTO With {.ID = cateM.ID, .Nombre = cateM.Nombre},
                                                                    .Tipo = produ.Tipo
                                                                    })

                Next
                Return Me.Ok(listProduDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function




    End Class
End Namespace