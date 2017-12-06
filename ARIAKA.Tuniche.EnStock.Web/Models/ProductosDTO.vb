Namespace Models
    Public Class ProductosDTO
        Public Property ID As Integer
        Public Property Codigo As String
        Public Property StockMinimo As String
        Public Property Nombre As String
        Public Property Unidad As String
        Public Property Tipo As String
        Public Property Entrada As Integer
        Public Property Salida As Integer
        Public Property StockActual As Integer

        Public Property StockProducto As List(Of StockProductosDTO)

        Public Property Comentario As String
        Public Property Categorias As CategoriaDTO
    End Class
End Namespace
