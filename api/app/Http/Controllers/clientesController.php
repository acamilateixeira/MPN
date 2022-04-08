<?php

namespace App\Http\Controllers;

use App\Agenda;
use App\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientesController extends Controller
{
    public function index()
    {
        if (auth()->user()->username === 'provedor') {
            $clientes = Cliente::all();
            return response()->json($clientes);
        } else {
            $clientes = Agenda::where('codEmpresa', auth()->user()->codEmpresa)->with('clientes')->get();
            return response()->json($clientes->pluck('clientes'));
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:Clientes',
            'nome' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:Clientes',
            'telefone' => 'required|string|max:255',
            'password' => 'required|string|min:6|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'erro' => 'Falha ao criar cliente.',
                'validacao' => $validator->errors(),
            ], 400);
        }

        try {
            $cliente = Cliente::create([
                'username' => $request->username,
                'nome' => $request->nome,
                'email' => $request->email,
                'telefone' => $request->telefone,
                'password' => hash('md5', $request->password),
                'cadastradoPor' => auth()->user()->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao criar cliente.'], 400);
        }

        return response()->json([
            'mensagem' => 'Conta criada com sucesso.',
        ], 201);
    }

    public function destroy($id)
    {
        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['erro' => 'Cliente não encontrado.'], 400);
        }

        if (auth()->user()->username === 'provedor' || auth()->user()->username === $cliente->username) {
            $cliente = Cliente::find($id);
            $cliente->delete();
            return response()->json([
                'mensagem' => 'Conta excluída com sucesso.',
            ], 200);
        } else {
            return response()->json(['erro' => 'Acesso negado.'], 400);
        }
    }
}
