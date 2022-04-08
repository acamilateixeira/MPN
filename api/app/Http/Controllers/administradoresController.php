<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdministradoresController extends Controller
{
    public function index()
    {
        $administradores = Admin::all();

        return response()->json($administradores);
    }

    public function store(Request $request)
    {
        if (auth()->user()->username !== 'provedor') {
            return response()->json(['erro' => 'Acesso negado.'], 400);
        }

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:Administradores',
            'codEmpresa' => 'required|string|max:255|unique:Administradores',
            'password' => 'required|string|min:6|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'erro' => 'Falha ao criar administrador.',
                'validacao' => $validator->errors(),
            ], 400);
        }

        try {
            $admin = Admin::create([
                'username' => $request->username,
                'codEmpresa' => $request->codEmpresa,
                'password' => hash('md5', $request->password),
                'cadastradoPor' => auth()->user()->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao criar administrador.'], 400);
        }

        return response()->json([
            'mensagem' => 'Administrador criado com sucesso.',
            'admin' => Admin::paginate(5),
        ], 201);
    }
}
