Namespace Model
    Public Class ProductosGralResultSet
        Public Property Codigo As String
        Public Property Nombre As String
        Public Property CategoriaID As Integer
        Public Property StockMinimo As Integer
        Public Property StockActual As Integer
        Public Property Unidad As String
        Public Property Tipo As String
        Public Property Bodegas As List(Of String)
    End Class

    Public Class IngresosGralResultSet
        Public Property ID As Integer
        Public Property Fecha As Date?
        Public Property Nombre As String
        Public Property TipoDocumento As String
        Public Property NumeroDocumento As String
        Public Property Cantidad As Integer
        Public Property Autorizador As String
        Public Property Bodegas As List(Of String)
    End Class

    Public Class SalidasGralResultSet
        Public Property ID As Integer
        Public Property Fecha As Date?
        Public Property Nombre As String
        Public Property TipoDocumento As String
        Public Property NumeroDocumento As String
        Public Property Cantidad As Integer
        Public Property Autorizador As String
        Public Property Bodegas As List(Of String)
    End Class

End Namespace