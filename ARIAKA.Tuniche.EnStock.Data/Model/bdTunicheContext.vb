Imports System
Imports System.Data.Entity
Imports System.Linq

Public Class bdTunicheContext
    Inherits DbContext

    Public Property Usuarieos As DbSet(Of Model.Usuario)
    Public Property Roleos As DbSet(Of Model.Rol)
    Public Property Productoes As DbSet(Of Model.Productos)
    Public Property Categoriaeos As DbSet(Of Model.Categorias)
    Public Property Transicioneos As DbSet(Of Model.Transaccion)

    Public Sub New()
        MyBase.New("name=bdTunicheContext")
    End Sub

    Protected Overrides Sub OnModelCreating(modelBuilder As DbModelBuilder)
        MyBase.OnModelCreating(modelBuilder)
    End Sub

End Class

