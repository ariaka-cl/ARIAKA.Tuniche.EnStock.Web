Namespace Models
    Public Class UsuariosDTO
        Public Property ID As Integer
        Public Property Nombre As String
        Public Property Run As String
        Public Property NickName As String
        Public Property Rol As RolDTO
        Public Property Password As String
    End Class

    Public Class RolDTO
        Public Property ID As Integer
        Public Property Nombre As String
    End Class
End Namespace
