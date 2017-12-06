Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_ingresos_stock
        Inherits DbMigration
    
        Public Overrides Sub Up()
            AddColumn("dbo.StockProductos", "Ingresos_ID", Function(c) c.Int())
            CreateIndex("dbo.StockProductos", "Ingresos_ID")
            AddForeignKey("dbo.StockProductos", "Ingresos_ID", "dbo.Ingresos", "ID")
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.StockProductos", "Ingresos_ID", "dbo.Ingresos")
            DropIndex("dbo.StockProductos", New String() { "Ingresos_ID" })
            DropColumn("dbo.StockProductos", "Ingresos_ID")
        End Sub
    End Class
End Namespace
