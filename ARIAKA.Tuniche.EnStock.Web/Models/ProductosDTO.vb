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
        Public Property StockActualPalmas As Integer
        Public Property StockActualMercedes As Integer
        Public Property Comentario As String
        Public Property Categorias As CategoriaDTO
        Public Property BodegaPalmas As String
        Public Property BodegaMercedes As String
        Public Property PrecioUnitario As String
        Public Property TipoDocumento As String
        Public Property NumeroDocumento As String
    End Class
End Namespace
