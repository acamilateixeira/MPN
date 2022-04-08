<?php

namespace App\Http\Controllers;

use App\Acesso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AcessosController extends Controller
{
    public function index()
    {
        $acessos = Acesso::all();

        return response()->json($acessos);
    }

    public function store(Request $request)
    {
        if (auth()->user()->username !== 'provedor') {
            return response()->json(['erro' => 'Acesso negado.'], 400);
        }

        $validator = Validator::make($request->all(), [
            'descricao' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $acesso = Acesso::create([
                'descricao' => $request->descricao,
                'cadastradoPor' => auth()->user()->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao criar acesso.'], 400);
        }

        return response()->json([
            'message' => 'Acesso criado com sucesso.',
            'acessos' => Acesso::paginate(5),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->username !== 'provedor') {
            return response()->json(['erro' => 'Acesso negado.'], 400);
        }

        $validator = Validator::make($request->all(), [
            'descricao' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        try {
            $acesso = Acesso::findOrFail($id);
            $acesso->update([
                'descricao' => $request->descricao,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao atualizar acesso.'], 400);
        }

        return response()->json([
            'message' => 'Acesso atualizado com sucesso.',
            'acessos' => Acesso::paginate(5),
        ], 200);
    }

    public function destroy($id)
    {
        if (auth()->user()->username !== 'provedor') {
            return response()->json(['erro' => 'Acesso negado.'], 400);
        }

        try {
            $acesso = Acesso::findOrFail($id);

            if ($acesso->empresas()->count() > 0) {
                return response()->json(['erro' => 'Acesso possui empresas associadas.'], 400);
            }

            $acesso->delete();
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao excluir acesso.'], 400);
        }

        return response()->json([
            'message' => 'Acesso excluído com sucesso.',
            'acessos' => Acesso::paginate(5),
        ], 200);
    }
}
