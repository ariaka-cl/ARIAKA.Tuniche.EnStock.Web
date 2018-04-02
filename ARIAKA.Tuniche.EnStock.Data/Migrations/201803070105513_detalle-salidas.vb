Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class detallesalidas
        Inherits DbMigration
    
        Public Overrides Sub Up()
            CreateTable(
                "dbo.DetalleSalidas",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Fecha = c.DateTime(nullable := False),
                        .Cantidad = c.Int(nullable := False),
                        .Bodega_ID = c.Int(),
                        .Salidas_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Bodegas", Function(t) t.Bodega_ID) _
                .ForeignKey("dbo.Salidas", Function(t) t.Salidas_ID) _
                .Index(Function(t) t.Bodega_ID) _
                .Index(Function(t) t.Salidas_ID)
            
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.DetalleSalidas", "Salidas_ID", "dbo.Salidas")
            DropForeignKey("dbo.DetalleSalidas", "Bodega_ID", "dbo.Bodegas")
            DropIndex("dbo.DetalleSalidas", New String() { "Salidas_ID" })
            DropIndex("dbo.DetalleSalidas", New String() { "Bodega_ID" })
            DropTable("dbo.DetalleSalidas")
        End Sub
    End Class
End Namespace
