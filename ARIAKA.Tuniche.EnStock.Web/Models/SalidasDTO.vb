Namespace Models
    Public Class SalidasDTO
        Public Property ID As Integer
        Public Property Fechas As String
        Public Property TipoDocumento As String
        Public Property NumeroDocumento As String
        Public Property Cantidad As Double
        Public Property Autorizador As UsuariosDTO
        Public Property Producto As ProductosDTO
        Public Property Bodega As BodegaDTO
        Public Property ModificadorID As String
    End Class
End Namespace
