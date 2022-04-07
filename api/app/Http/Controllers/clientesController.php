<?php

namespace App\Http\Controllers;

use App\Acesso;
use App\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientesController extends Controller
{
    public function index()
    {
        $clientes = Cliente::all();

        return response()->json($clientes);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:Clientes',
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:Clientes',
            'telefone' => 'required|string|max:255',
            'password' => 'required|string|min:6',
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
                'password' => hash('md5',$request->password),
                'cadastradoPor' => auth()->user()->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao criar cliente.'], 400);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'telefone' => 'required|string|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'erro' => 'Falha ao atualizar cliente.',
                'validacao' => $validator->errors(),
            ], 400);
        }

        try {
            $cliente = Cliente::find($id);
            $cliente->username = $request->username;
            $cliente->nome = $request->nome;
            $cliente->email = $request->email;
            $cliente->telefone = $request->telefone;
            $cliente->password = hash('md5',$request->password);
            $cliente->atualizadoPor = auth()->user()->username;
            $cliente->save();
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao atualizar cliente.'], 400);
        }
    }

