Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_detalleIngresos
        Inherits DbMigration
    
        Public Overrides Sub Up()
            CreateTable(
                "dbo.DetalleIngresos",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Fecha = c.DateTime(nullable := False),
                        .Cantidad = c.Int(nullable := False),
                        .Bodega_ID = c.Int(),
                        .Ingresos_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Bodegas", Function(t) t.Bodega_ID) _
                .ForeignKey("dbo.Ingresos", Function(t) t.Ingresos_ID) _
                .Index(Function(t) t.Bodega_ID) _
                .Index(Function(t) t.Ingresos_ID)
            
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.DetalleIngresos", "Ingresos_ID", "dbo.Ingresos")
            DropForeignKey("dbo.DetalleIngresos", "Bodega_ID", "dbo.Bodegas")
            DropIndex("dbo.DetalleIngresos", New String() { "Ingresos_ID" })
            DropIndex("dbo.DetalleIngresos", New String() { "Bodega_ID" })
            DropTable("dbo.DetalleIngresos")
        End Sub
    End Class
End Namespace
