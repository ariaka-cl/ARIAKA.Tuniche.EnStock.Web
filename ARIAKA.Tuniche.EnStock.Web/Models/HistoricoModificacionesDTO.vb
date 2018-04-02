Namespace Models
    Public Class HistoricoModificacionesDTO
        Public Property ID As Integer
        Public Overridable Property Usuario As UsuariosDTO
        Public Property Accion As String
        Public Property FechaAccion As Date?
    End Class

    Public Class HistorialSessionDTO
        Public Property UserID As Integer
        Public Property Accion As String
    End Class

End Namespace
