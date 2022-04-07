<?php

namespace App\Http\Controllers;

use App\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmpresasController extends Controller
{
    public function index()
    {
        $empresas = Empresa::all();

        return response()->json($empresas);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nomeRazaoSocial' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:Empresas',
            'telefone' => 'required|string|max:255',
            'idAcesso' => 'required|integer',
            'username' => 'required|string|max:255|unique:Empresas',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'erro' => 'Falha ao criar empresa.',
                'validacao' => $validator->errors(),
            ], 400);
        }

        try {
            $empresa = Empresa::create([
                'nomeRazaoSocial' => $request->nomeRazaoSocial,
                'email' => $request->email,
                'telefone' => $request->telefone,
                'idAcesso' => $request->idAcesso,
                'username' => $request->username,
                'cadastradoPor' => auth()->user()->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao criar empresa.'], 400);
        }

        return response()->json([
            'message' => 'Empresa criada com sucesso.',
            'empresas' => Empresa::paginate(5),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nomeRazaoSocial' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'telefone' => 'required|string|max:255',
            'idAcesso' => 'required|integer',
            'username' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $empresa = Empresa::findOrFail($id);
            $empresa->update([
                'nomeRazaoSocial' => $request->nomeRazaoSocial,
                'email' => $request->email,
                'telefone' => $request->telefone,
                'idAcesso' => $request->idAcesso,
                'username' => $request->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao atualizar empresa.'], 400);
        }

        return response()->json([
            'message' => 'Empresa atualizada com sucesso.',
            'empresas' => Empresa::paginate(5),
        ], 201);
    }

    public function destroy($id)
    {
        try {
            $empresa = Empresa::findOrFail($id);
            $empresa->delete();
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao excluir empresa.'], 400);
        }

        return response()->json([
            'message' => 'Empresa excluída com sucesso.',
            'empresas' => Empresa::paginate(5),
        ], 200);
    }
}
