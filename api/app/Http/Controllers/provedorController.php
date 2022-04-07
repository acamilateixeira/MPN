<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProvedorController extends Controller
{
    public function createAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nomeRazaoSocial' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'telefone' => 'required|string|max:255',
            'username' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'erro' => 'Falha ao criar empresa.',
                'validacao' => $validator->errors(),
            ], 400);
        }

        // try {

        // } catch (\Exception $e) {
        //     return response()->json(['erro' => 'Falha ao criar acesso.'], 400);
        // }

        // auto create CodEmpresa
        // auto create CodAcesso
        $codEmpresa = rand(1, 99999);

        try {

            // $empresa = Empresa::create([
            //     'nomeRazaoSocial' => $request->nomeRazaoSocial,
            //     'email' => $request->email,
            //     'idAcesso' => 1,
            //     'codEmpresa' => $codEmpresa,
            //     'telefone' => $request->telefone,
            //     'username' => $request->username,
            //     'cadastradoPor' => 'provedor',
            //     'atualizadoPor' => 'provedor',
            // ]);

            $administrador = Admin::create([
                'cadastradoPor' => 'provedor',
                'atualizadoPor' => 'provedor',
                'codEmpresa' => 66027,
                'username' => 'provedor',
                'password' => hash('md5', 'provider$g@tm0'),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'erro' => 'Falha ao criar empresa.',
                'exception' => $e->getMessage(),
            ], 400);
        }

        // try {

        // } catch (\Exception $e) {
        //     return response()->json(['erro' => 'Falha ao criar administrador.'], 400);
        // }

        return response()->json([
            'message' => 'fim',
        ], 201);
    }
}
