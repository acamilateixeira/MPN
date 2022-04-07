<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::get('/', [AuthController::class, 'me'])->middleware('jwt.auth');
    Route::post('/admin', [AuthController::class, 'loginAdmin']);
    Route::post('/{codEmpresa}', [AuthController::class, 'loginCliente']);
    Route::delete('/', [AuthController::class, 'logout'])->middleware('jwt.auth');
});

Route::prefix('acessos')->middleware('jwt.auth')->group(function () {
    Route::get('/', [AcessosController::class, 'index']);
    Route::post('/', [AcessosController::class, 'store']);
    Route::put('/{id}', [AcessosController::class, 'update']);
    Route::delete('/{id}', [AcessosController::class, 'destroy']);
});

Route::prefix('clientes')->middleware('jwt.auth')->group(function () {
    Route::get('/', [ClientesController::class, 'index']);
    Route::post('/', [ClientesController::class, 'store']);
    Route::put('/{id}', [ClientesController::class, 'update']);
    Route::delete('/{id}', [ClientesController::class, 'destroy']);
});

Route::prefix('empresas')->middleware('jwt.auth')->group(function () {
    Route::get('/', [EmpresasController::class, 'index']);
    Route::post('/', [EmpresasController::class, 'store']);
    Route::put('/{id}', [EmpresasController::class, 'update']);
    Route::delete('/{id}', [EmpresasController::class, 'destroy']);
});

Route::prefix('horarios')->middleware('jwt.auth')->group(function () {
    Route::get('/', [HorariosController::class, 'index']);
    Route::post('/', [HorariosController::class, 'store']);
    Route::put('/{id}', [HorariosController::class, 'update']);
    Route::delete('/{id}', [HorariosController::class, 'destroy']);
});

Route::prefix('servicos')->middleware('jwt.auth')->group(function () {
    Route::get('/', [ServicosController::class, 'index']);
    Route::post('/', [ServicosController::class, 'store']);
    Route::put('/{id}', [ServicosController::class, 'update']);
    Route::delete('/{id}', [ServicosController::class, 'destroy']);
});

Route::prefix('agendamentos')->middleware('jwt.auth')->group(function () {
    Route::get('/', [AgendamentosController::class, 'index']);
    Route::post('/', [AgendamentosController::class, 'store']);
    Route::put('/{id}', [AgendamentosController::class, 'update']);
    Route::delete('/{id}', [AgendamentosController::class, 'destroy']);
});

Route::prefix('administradores')->middleware('jwt.auth')->group(function () {
    Route::get('/', [AdministradoresController::class, 'index']);
    Route::post('/', [AdministradoresController::class, 'store']);
    Route::put('/{id}', [AdministradoresController::class, 'update']);
    Route::delete('/{id}', [AdministradoresController::class, 'destroy']);
});
