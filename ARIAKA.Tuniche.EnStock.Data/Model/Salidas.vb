Namespace Model
    Public Class Salidas
        Public Property ID As Integer
        Public Property Fechas As Date
        Public Property TipoDocumentoa As String
        Public Property NumeroDocumento As String
        Public Property Cantidad As Double
        Public Overridable Property Autorizador As Usuario
        Public Property Producto As Productos
        Public Property Bodega As Bodega

    End Class
End Namespace
