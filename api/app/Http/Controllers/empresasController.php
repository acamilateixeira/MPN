<?php

namespace App\Http\Controllers;

use App\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmpresasController extends Controller
{
    public function index()
    {
        if (auth()->user()->username === 'provedor') {
            return response()->json(
                Empresa::with('servicos', 'horarios', 'acessos', 'agendas')
                    ->get(),
                200);
        } else {
            if (auth()->user()->codEmpresa !== "9999") {
                return response()->json(
                    Empresa::with('servicos', 'horarios', 'acessos', 'agendas')
                        ->where('codEmpresa', auth()->user()->codEmpresa)
                        ->get(),
                    200);

            } else {
                $empresas = Empresa::with('servicos', 'horarios', 'acessos', 'agendas')
                    ->get();

                $empresasCollection = $empresas->map(function ($empresa) {
                    return [
                        'nomeRazaoSocial' => $empresa->nomeRazaoSocial,
                        'codEmpresa' => $empresa->codEmpresa,
                        'servicos' => $empresa->servicos,
                        'horarios' => $empresa->horarios,
                    ];
                });

                return response()->json(
                    $empresasCollection,
                    200);
            }
        }
    }

    public function store(Request $request)
    {
        if (auth()->user()->username !== 'provedor') {
            return response()->json(['erro' => 'Acesso negado.'], 400);
        }

        $validator = Validator::make($request->all(), [
            'nomeRazaoSocial' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:Empresas',
            'telefone' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'erro' => 'Falha ao criar empresa.',
                'validacao' => $validator->errors(),
            ], 400);
        }

        $codEmpresa = rand(1, 99999);

        try {
            $empresa = Empresa::create([
                'nomeRazaoSocial' => $request->nomeRazaoSocial,
                'email' => $request->email,
                'telefone' => $request->telefone,
                'idAcesso' => 1,
                'codEmpresa' => $codEmpresa,
                'cadastradoPor' => auth()->user()->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'erro' => 'Falha ao criar empresa.',
                'validacao' => $e->getMessage(),
            ], 400);
        }

        return response()->json([
            'message' => 'Empresa criada com sucesso.',
            'empresas' => Empresa::paginate(5),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->username !== 'provedor') {
            return response()->json(['erro' => 'Acesso negado.'], 400);
        }

        $validator = Validator::make($request->all(), [
            'nomeRazaoSocial' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:Empresas,email,' . $id,
            'telefone' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'erro' => 'Falha ao atualizar empresa.',
                'validacao' => $validator->errors(),
            ], 400);
        }

        try {
            $empresa = Empresa::find($id);
            $empresa->update([
                'nomeRazaoSocial' => $request->nomeRazaoSocial,
                'email' => $request->email,
                'telefone' => $request->telefone,
                'atualizadoPor' => auth()->user()->username,
            ]);

            $empresa->save();
        } catch (\Exception $e) {
            return response()->json([
                'erro' => 'Falha ao atualizar empresa.',
                'validacao' => $e->getMessage(),
            ], 400);
        }

        return response()->json([
            'message' => 'Empresa atualizada com sucesso.',
            'empresas' => Empresa::paginate(5),
        ], 201);
    }

    public function destroy($id)
    {
        if (auth()->user()->username !== 'provedor') {
            return response()->json(['erro' => 'Acesso negado.'], 400);
        }

        try {
            $empresa = Empresa::findOrFail($id);
            $empresa->delete();
        } catch (\Exception $e) {
            return response()->json([
                'erro' => 'Falha ao excluir empresa.',
                'validacao' => $e->getMessage(),
            ], 400);
        }

        return response()->json([
            'message' => 'Empresa excluída com sucesso.',
            'empresas' => Empresa::paginate(5),
        ], 200);
    }
}
