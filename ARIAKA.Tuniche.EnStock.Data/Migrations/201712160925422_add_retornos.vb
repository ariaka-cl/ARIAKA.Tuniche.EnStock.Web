Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_retornos
        Inherits DbMigration
    
        Public Overrides Sub Up()
            CreateTable(
                "dbo.Retornoes",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Fechas = c.DateTime(nullable := False),
                        .NumeroDocumento = c.String(),
                        .Cantidad = c.Double(nullable := False),
                        .Autorizador_ID = c.Int(),
                        .Bodega_ID = c.Int(),
                        .Producto_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Usuarios", Function(t) t.Autorizador_ID) _
                .ForeignKey("dbo.Bodegas", Function(t) t.Bodega_ID) _
                .ForeignKey("dbo.Productos", Function(t) t.Producto_ID) _
                .Index(Function(t) t.Autorizador_ID) _
                .Index(Function(t) t.Bodega_ID) _
                .Index(Function(t) t.Producto_ID)
            
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.Retornoes", "Producto_ID", "dbo.Productos")
            DropForeignKey("dbo.Retornoes", "Bodega_ID", "dbo.Bodegas")
            DropForeignKey("dbo.Retornoes", "Autorizador_ID", "dbo.Usuarios")
            DropIndex("dbo.Retornoes", New String() { "Producto_ID" })
            DropIndex("dbo.Retornoes", New String() { "Bodega_ID" })
            DropIndex("dbo.Retornoes", New String() { "Autorizador_ID" })
            DropTable("dbo.Retornoes")
        End Sub
    End Class
End Namespace
