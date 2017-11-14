﻿/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/knockout/knockout.d.ts" />
/// <reference path="../typings/devextreme/devextreme.d.ts" />

namespace App {
    'use strict';
    export interface Usuario {
        ID: number,
        Nombre: string,
        Run:string,
        NickName: string,
        Rol: string,
        Password: string        
    }
    export interface Rol {
        ID: number,
        Nombre:string
    }
}