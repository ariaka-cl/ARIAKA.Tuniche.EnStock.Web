Imports System
Imports System.Data.Entity.Migrations
Imports Microsoft.VisualBasic

Namespace Migrations
    Public Partial Class add_historico
        Inherits DbMigration
    
        Public Overrides Sub Up()
            CreateTable(
                "dbo.HistoricoModificaciones",
                Function(c) New With
                    {
                        .ID = c.Int(nullable := False, identity := True),
                        .Accion = c.String(),
                        .FechaAccion = c.DateTime(),
                        .Usuario_ID = c.Int()
                    }) _
                .PrimaryKey(Function(t) t.ID) _
                .ForeignKey("dbo.Usuarios", Function(t) t.Usuario_ID) _
                .Index(Function(t) t.Usuario_ID)
            
        End Sub
        
        Public Overrides Sub Down()
            DropForeignKey("dbo.HistoricoModificaciones", "Usuario_ID", "dbo.Usuarios")
            DropIndex("dbo.HistoricoModificaciones", New String() { "Usuario_ID" })
            DropTable("dbo.HistoricoModificaciones")
        End Sub
    End Class
End Namespace
