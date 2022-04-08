<?php

namespace App\Http\Controllers;

use App\Horario;
use App\Servico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HorariosController extends Controller
{
    public function index()
    {
        if (auth()->user()->username === 'provedor') {
            return response()->json(Horario::all(), 200);
        } else {
            $horarios = Horario::where('codEmpresa', auth()->user()->codEmpresa)->get();

            return response()->json($horarios, 200);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hora' => 'required|string|max:100',
            'idServico' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $servico = Servico::find($request->idServico);

        if (!$servico) {
            return response()->json(['erro' => 'Serviço não encontrado.'], 400);
        }

        if ($servico->codEmpresa !== auth()->user()->codEmpresa && auth()->user()->username !== 'provedor') {
            return response()->json(['erro' => 'Você não tem permissão para cadastrar horário para esse serviço.'], 400);
        }

        try {
            $horario = Horario::create([
                'hora' => $request->hora,
                'idServico' => $request->idServico,
                'codEmpresa' => auth()->user()->codEmpresa,
                'cadastradoPor' => auth()->user()->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json(['erro' => 'Falha ao criar horário.'], 400);
        }

        return response()->json([
            'message' => 'Horário criado com sucesso.',
            'horarios' => Horario::paginate(5),
        ], 201);
    }

}
