Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_historico_autorizador
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Ingresos", "Autorizador_ID", Function(c) c.Int())
            CreateIndex("dbo.Ingresos", "Autorizador_ID")
            AddForeignKey("dbo.Ingresos", "Autorizador_ID", "dbo.Usuarios", "ID")
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.Ingresos", "Autorizador_ID", "dbo.Usuarios")
            DropIndex("dbo.Ingresos", New String() { "Autorizador_ID" })
            DropColumn("dbo.Ingresos", "Autorizador_ID")
        End Sub
    End Class
End Namespace
