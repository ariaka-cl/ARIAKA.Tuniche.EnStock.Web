Namespace Models
    Public Class ProductosDTO
        Public Property ID As Integer
        Public Property Codigo As String
        Public Property Stock As String
        Public Property Nombre As String
        Public Property Unidad As String
        Public Property Tipo As Data.Tipos.Tipo
        Public Property Entrada As Integer
        Public Property Salida As Integer
        Public Property StockActual As Integer
        Public Property Comentario As String
        Public Property Categorias As Models.CategoriaDTO
        Public Property Bodega As String
    End Class
End Namespace
