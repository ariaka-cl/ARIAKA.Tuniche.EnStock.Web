Namespace Models
    Public Class SalidasDTO
        Public Property ID As Integer
        Public Property Fechas As Date
        Public Property TipoDocumento As String
        Public Property NumeroDocumento As String
        Public Property Cantidad As Double
        Public Property Autorizador As UsuariosDTO
        Public Property Producto As ProductosDTO
        Public Property Bodega As BodegaDTO
    End Class
End Namespace
