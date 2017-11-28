Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

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
            'listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Azadon", .BodegaPalmas = "Las Palmas", .StockActualPalmas = 2, .Categorias = New Models.CategoriaDTO With {.ID = 3, .Nombre = "Herramientas"}}))
            'listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Martillo", .BodegaPalmas = "Las Palmas", .StockActualPalmas = 3, .Categorias = New Models.CategoriaDTO With {.ID = 3, .Nombre = "Herramientas"}}))
            'listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Cuaderno", .BodegaPalmas = "Las Palmas", .StockActualPalmas = 3, .Categorias = New Models.CategoriaDTO With {.ID = 4, .Nombre = "Oficina"}}))
            'listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Hojas Oficio", .BodegaPalmas = "Las Palmas", .StockActualPalmas = 3, .Categorias = New Models.CategoriaDTO With {.ID = 4, .Nombre = "Oficina"}}))
            'listProduDto.Add((New Models.ProductosDTO With {.Nombre = "Cuaderno", .BodegaMercedes = "Las Mercedes", .StockActualMercedes = 2, .Categorias = New Models.CategoriaDTO With {.ID = 4, .Nombre = "Oficina"}}))


            Return Me.Ok(listProduDto.Where(Function(p) p.Categorias.ID = id).ToList())
        End Function

        <HttpPost>
        <Route("", Name:="PostProductos")>
        Public Function PostProductos(<FromBody> model As Models.ProductosDTO) As IHttpActionResult
            If model Is Nothing Then
                Return Me.Content(HttpStatusCode.BadRequest, "Sin Datos en el formulario")
            End If

            Dim db As New bdTunicheContext
            Try
                'If model.ID <> 0 Then
                '    Dim produExist As Productos = db.Productoes.Where(Function(p) p.ID = model.ID).SingleOrDefault()
                '    With userExist
                '        .Nombre = model.Nombre
                '        .NickName = model.NickName
                '        .Run = model.Run
                '        .Rol = New Rol With {.id = model.ID, .Nombre = model.Nombre}
                '        .Password = model.Password
                '    End With
                '    db.SaveChanges()
                '    Return Me.Ok(model)
                'End If

                'Dim user As New Usuario With {.Nombre = model.Nombre,
                '                            .NickName = model.NickName,
                '                            .Password = model.Password,
                '                            .Run = model.Run,
                '                            .rol = rol
                '}
                'db.Usuarieos.Add(user)
                'db.SaveChanges()
                'model.ID = user.ID
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
    End Class
End Namespace