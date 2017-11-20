Imports System.Net
Imports System.Web.Http
Imports ARIAKA.Tuniche.EnStock.Data.Model

Namespace Controllers.API
    <RoutePrefix("api/categorias")>
    Public Class CategoriasAPIController
        Inherits ApiController

        <HttpGet>
        <Route("", Name:="GetCategorias")>
        Public Function GetCategorias() As IHttpActionResult
            Dim db As New bdTunicheContext
            Try
                Dim listCategoria As List(Of Categorias) = db.Categoriaeos.ToList()
                If listCategoria Is Nothing OrElse listCategoria.Count = 0 Then Return Me.Ok(New List(Of Models.CategoriaDTO))

                Dim listCateDto As New List(Of Models.CategoriaDTO)
                For Each cate As Categorias In listCategoria
                    listCateDto.Add(New Models.CategoriaDTO With {.ID = cate.ID,
                                                                 .Nombre = cate.Nombre})
                Next
                Return Me.Ok(listCateDto)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpPost>
        <Route("", Name:="SaveCategorias")>
        Public Function SaveCategorias(<FromBody> model As Models.CategoriaDTO) As IHttpActionResult
            If model Is Nothing Then
                Return Me.Content(HttpStatusCode.BadRequest, "Sin Datos en el formulario")
            End If

            Dim db As New bdTunicheContext
            Try
                If model.ID <> 0 Then
                    Dim cateExist As Categorias = db.Categoriaeos.Where(Function(u) u.ID = model.ID).SingleOrDefault()
                    With cateExist
                        .Nombre = model.Nombre
                    End With
                    db.SaveChanges()
                    Return Me.Ok(model)
                End If

                Dim cate As New Categorias With {.Nombre = model.Nombre}
                db.Categoriaeos.Add(cate)
                db.SaveChanges()
                model.ID = cate.ID
                Return Me.Ok(model)
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

        <HttpDelete>
        <Route("{id}", Name:="DeleteCategorias")>
        Public Function DeleteCategorias(id As Integer) As IHttpActionResult
            If id = 0 Then
                Return Me.Content(HttpStatusCode.NotFound, "Categoria No Encontrada")
            End If

            Dim db As New bdTunicheContext
            Try
                Dim cate As Categorias = db.Categoriaeos.Where(Function(u) u.ID = id).SingleOrDefault()
                db.Categoriaeos.Remove(cate)
                db.SaveChanges()
                Return Me.Content(HttpStatusCode.OK, String.Format("Categoria Eliminada {0}", id))
            Catch ex As Exception
                Return Me.Content(HttpStatusCode.BadRequest, ex.Message)
            Finally
                db.Dispose()
            End Try
        End Function

    End Class
End Namespace