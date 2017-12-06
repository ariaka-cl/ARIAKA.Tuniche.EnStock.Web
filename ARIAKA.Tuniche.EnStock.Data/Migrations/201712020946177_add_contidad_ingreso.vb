Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_contidad_ingreso
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Ingresos", "Cantidad", Function(c) c.Int(nullable := False))
        End Sub
        
        Public Overrides Sub Down()
            DropColumn("dbo.Ingresos", "Cantidad")
        End Sub
    End Class
End Namespace
