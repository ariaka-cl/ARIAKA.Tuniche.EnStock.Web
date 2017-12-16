Namespace Model
    Public Class Retorno
        Public Property ID As Integer
        Public Property Fechas As Date
        Public Property NumeroDocumento As String
        Public Property Cantidad As Double
        Public Overridable Property Autorizador As Usuario
        Public Overridable Property Producto As Productos
        Public Overridable Property Bodega As Bodega

    End Class
End Namespace
