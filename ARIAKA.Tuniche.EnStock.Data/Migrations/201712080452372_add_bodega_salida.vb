Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_bodega_salida
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.Salidas", "Bodega_ID", Function(c) c.Int())
            CreateIndex("dbo.Salidas", "Bodega_ID")
            AddForeignKey("dbo.Salidas", "Bodega_ID", "dbo.Bodegas", "ID")
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.Salidas", "Bodega_ID", "dbo.Bodegas")
            DropIndex("dbo.Salidas", New String() { "Bodega_ID" })
            DropColumn("dbo.Salidas", "Bodega_ID")
        End Sub
    End Class
End Namespace
