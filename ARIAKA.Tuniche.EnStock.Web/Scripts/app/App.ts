/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/knockout/knockout.d.ts" />
/// <reference path="../typings/devextreme/devextreme.d.ts" />

namespace App {
    'use strict';
    export interface Usuario {
        ID: number,
        Nombre: string,
        Run:string,
        NickName: string,
        Rol: Rol,
        Password: string        
    }
    export interface Rol {
        ID: number,
        Nombre:string
    }
    export interface Categoria {
        ID: number,
        Nombre: string
    }
    export interface IProductos {
        ID: number,
        Nombre: string,
        BodegaPalmas: string,
        StockActualPalmas: string,
        BodegaMercedes: string,
        StockActualMercedes: string,
        Categorias: string,        
        Codigo: string,
        Stock: string,
        PrecioUnitario: number,
        TipoDocumento: string,
        NumeroDocumento: string,
        Comentario:string
    }
    export interface IConsultaStock {
        ID: number,
        Nombre: string,
        StockMinimo: number,        
        Codigo: string,
        Unidad: string,
        Categoria: Categoria
    }
    export interface IBodega {
        ID: number,
        Nombre: string           
    }

    export interface IDetalleStock {
        ID: number,
        Stock: number,
        Bodega: IBodega
    }



}