Imports System
Imports System.Data.Entity
Imports System.Data.Entity.Migrations
Imports System.Linq
Imports ARIAKA.Tuniche.EnStock.Data.Model

Namespace Migrations
    Friend NotInheritable Class Configuration
        Inherits DbMigrationsConfiguration(Of bdTunicheContext)

        Public Sub New()
            AutomaticMigrationsEnabled = False
        End Sub

        Protected Overrides Sub Seed(context As bdTunicheContext)
            '  This method will be called after migrating to the latest version.

            '  You can use the DbSet(Of T).AddOrUpdate() helper extension method 
            '  to avoid creating duplicate seed data.
        End Sub

    End Class

End Namespace
