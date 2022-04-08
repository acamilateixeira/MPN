<?php

namespace App\Http\Controllers;

use App\Agenda;
use App\Cliente;
use App\Horario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AgendamentosController extends Controller
{
    public function index()
    {
        if (auth()->user()->username === 'provedor') {
            return response()->json(Agenda::all(), 200);
        } else {
            $agendamentos = Agenda::where('codEmpresa', auth()->user()->codEmpresa)->get();

            return response()->json($agendamentos, 200);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idHorario' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'erro' => 'Falha ao criar agendamento.',
                'validacao' => $validator->errors(),
            ], 400);
        }

        $horario = Horario::find($request->idHorario)->with('servicos')->first();

        if (!$horario) {
            return response()->json(['erro' => 'Horário não encontrado.'], 400);
        }

        if (auth()->user()->username !== 'provedor' || auth()->user()->codEmpresa !== $horario->codEmpresa) {
            $idCliente = $request->idCliente;
        } else {
            $idCliente = Cliente::where('username', auth()->user()->username)->first()->id;
        }

        try {
            $agendamento = Agenda::create([
                'idCliente' => $idCliente,
                'valor' => $horario->servicos->valor,
                'idStatus' => 1,
                'idServico' => $horario->idServico,
                'idHorario' => $request->idHorario,
                'codEmpresa' => $horario->codEmpresa,
                'cadastradoPor' => auth()->user()->username,
                'atualizadoPor' => auth()->user()->username,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'erro' => 'Falha ao criar agendamento.',
                'exception' => $e,
            ], 400);
        }

        return response()->json([
            'message' => 'Agendamento criado com sucesso.',
            'agendamentos' => Agenda::paginate(5),
        ], 201);
    }
}
